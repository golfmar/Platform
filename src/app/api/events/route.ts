import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret"; // Fallback только для разработки

// Настройка Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  console.log("<====GET====>");
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const lat = parseFloat(searchParams.get("lat") || "NaN");
    const lng = parseFloat(searchParams.get("lng") || "NaN");
    const radius = parseFloat(searchParams.get("radius") || "10000");
    const title = searchParams.get("title") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const myEvents = searchParams.get("myEvents") === "true";
    const category = searchParams.get("category") || "";
    const sortOrder = searchParams.get("sortOrder") || "date-asc";
    const limit = parseInt(searchParams.get("limit") || "2"); // Совпадает с eventsPerPage=2
    const offset = parseInt(searchParams.get("offset") || "0");
    const authHeader = request.headers.get("Authorization");

    let userId: number | null = null;
    if (myEvents && authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      userId = decoded.userId;
      console.log("<====decoded token====>", decoded);
    }

    if (id) {
      // Запрос одного события по id
      const query = `
        SELECT e.id, e.title, e.event_date, e.description, ST_AsText(e.location) as location, u.email as organizer_email, e.category, e.image_url
        FROM events e
        JOIN users u ON e.organizer_id = u.id
        WHERE e.id = $1
      `;
      const params = [parseInt(id)];
      console.log("<====single event query====>", query, params);
      const events = await prisma.$queryRawUnsafe(query, ...params);
      console.log("<====single event raw====>", events);
      if (!events || !Array.isArray(events) || events.length === 0) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      const event = {
        ...events[0],
        event_date: new Date(events[0].event_date).toISOString(),
      };
      console.log("<====single event formatted====>", event);
      return NextResponse.json(event);
    }

    // Построение условий фильтрации
    let whereClause = `WHERE 1=1`;
    const params: any[] = [];
    let paramIndex = 1;

    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      whereClause += `
        AND ST_DWithin(
          e.location,
          ST_SetSRID(ST_MakePoint($${paramIndex}, $${
        paramIndex + 1
      }), 4326)::geography,
          $${paramIndex + 2}
        )`;
      params.push(lng, lat, radius);
      paramIndex += 3;
    }

    if (title) {
      whereClause += ` AND e.title ILIKE $${paramIndex}`;
      params.push(`%${title}%`);
      paramIndex++;
    }

    if (startDate) {
      whereClause += ` AND e.event_date >= $${paramIndex}`;
      params.push(new Date(startDate));
      paramIndex++;
    }

    if (endDate) {
      whereClause += ` AND e.event_date <= $${paramIndex}`;
      params.push(new Date(endDate));
      paramIndex++;
    }

    if (category) {
      whereClause += ` AND e.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (myEvents && userId) {
      whereClause += ` AND e.organizer_id = $${paramIndex}`;
      params.push(userId);
      paramIndex++;
    }

    // Подсчет общего количества событий
    const countQuery = `
      SELECT COUNT(*) as count
      FROM events e
      JOIN users u ON e.organizer_id = u.id
      ${whereClause}
    `;
    console.log("<====count query====>", countQuery, params);
    const countResult = await prisma.$queryRawUnsafe(countQuery, ...params);
    const totalCount = Number(countResult[0].count);
    console.log("<====total count====>", totalCount);

    // Построение сортировки
    let orderByClause = "";
    if (sortOrder === "date-asc") {
      orderByClause = `ORDER BY e.event_date ASC`;
    } else if (sortOrder === "date-desc") {
      orderByClause = `ORDER BY e.event_date DESC`;
    } else if (
      sortOrder === "distance-asc" &&
      lat &&
      lng &&
      !isNaN(lat) &&
      !isNaN(lng)
    ) {
      orderByClause = `
        ORDER BY ST_Distance(
          e.location,
          ST_SetSRID(ST_MakePoint($${paramIndex}, $${
        paramIndex + 1
      }), 4326)::geography
        ) ASC`;
      params.push(lng, lat);
      paramIndex += 2;
    } else {
      orderByClause = `ORDER BY e.event_date ASC`; // Фallback
    }

    // Запрос списка событий с пагинацией
    const query = `
      SELECT e.id, e.title, e.event_date, e.description, ST_AsText(e.location) as location, u.email as organizer_email, e.category, e.image_url
      FROM events e
      JOIN users u ON e.organizer_id = u.id
      ${whereClause}
      ${orderByClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    params.push(limit, offset);
    console.log("<====query====>", query, params);
    const events = await prisma.$queryRawUnsafe(query, ...params);
    console.log("<====events====>", events);

    // Преобразуем event_date для списка событий
    const formattedEvents = events.map((event: any) => ({
      ...event,
      event_date: new Date(event.event_date).toISOString(),
    }));

    return NextResponse.json({ events: formattedEvents, totalCount });
  } catch (error) {
    console.error("<====error====>", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    console.log("<====decoded token====>", decoded);

    // Обрабатываем multipart/form-data
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const event_date = formData.get("event_date") as string;
    const description = formData.get("description") as string | null;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string | null;
    const image = formData.get("image") as File | null;

    if (!title || !event_date || !location) {
      console.log("<====missing fields====>", { title, event_date, location });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Нормализация даты и времени в UTC
    const parsedDate = new Date(event_date);
    if (isNaN(parsedDate.getTime())) {
      console.log("<====invalid date====>", event_date);
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }
    const normalizedDate = new Date(
      Date.UTC(
        parsedDate.getUTCFullYear(),
        parsedDate.getUTCMonth(),
        parsedDate.getUTCDate(),
        parsedDate.getUTCHours(),
        parsedDate.getUTCMinutes(),
        0
      )
    );

    let image_url: string | null = null;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64Image = buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64Image}`,
        {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          folder: "events",
        }
      );
      image_url = result.secure_url;
      console.log("<====cloudinary upload====>", result);
    }

    console.log("<====formData====>", {
      title,
      event_date: normalizedDate.toISOString(),
      description,
      location,
      category,
      image: image ? image.name : null,
    });

    const event = await prisma.$queryRaw`
      INSERT INTO events (title, event_date, description, location, organizer_id, created_at, category, image_url)
      VALUES (${title}, ${normalizedDate}, ${description}, ST_GeomFromText(${location}), ${
      decoded.userId
    }, NOW(), ${category || "Other"}, ${image_url})
      RETURNING id, title, event_date, description, ST_AsText(location) as location, (
        SELECT email FROM users WHERE id = ${decoded.userId}
      ) as organizer_email, category, image_url
    `;
    console.log("<====created event====>", event);
    const formattedEvent = {
      ...event[0],
      event_date: new Date(event[0].event_date).toISOString(),
    };
    return NextResponse.json(formattedEvent, { status: 201 });
  } catch (error: any) {
    console.error("<====error====>", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { error: "Token expired====>" + error.message },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    console.log("<====decoded token====>", decoded);

    const formData = await request.formData();
    const id = parseInt(formData.get("id") as string);
    const title = formData.get("title") as string;
    const event_date = formData.get("event_date") as string;
    const description = formData.get("description") as string | null;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string | null;
    const image = formData.get("image") as File | null;

    if (!id || !title || !event_date || !location) {
      console.log("<====missing fields====>", {
        id,
        title,
        event_date,
        location,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Нормализация даты и времени в UTC
    const parsedDate = new Date(event_date);
    if (isNaN(parsedDate.getTime())) {
      console.log("<====invalid date====>", event_date);
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }
    const normalizedDate = new Date(
      Date.UTC(
        parsedDate.getUTCFullYear(),
        parsedDate.getUTCMonth(),
        parsedDate.getUTCDate(),
        parsedDate.getUTCHours(),
        parsedDate.getUTCMinutes(),
        0
      )
    );

    let image_url: string | null = null;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64Image = buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64Image}`,
        {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          folder: "events",
        }
      );
      image_url = result.secure_url;
      console.log("<====cloudinary upload====>", result);
    }

    const event = await prisma.$queryRaw`
      UPDATE events
      SET
        title = ${title},
        event_date = ${normalizedDate},
        description = ${description},
        location = ST_GeomFromText(${location}),
        category = ${category || "Other"},
        image_url = COALESCE(${image_url}, image_url)
      WHERE id = ${id} AND organizer_id = ${decoded.userId}
      RETURNING id, title, event_date, description, ST_AsText(location) as location, (
        SELECT email FROM users WHERE id = ${decoded.userId}
      ) as organizer_email, category, image_url
    `;
    console.log("<====updated event====>", event);
    if (!event || event.length === 0) {
      return NextResponse.json(
        { error: "Event not found or unauthorized" },
        { status: 404 }
      );
    }
    const formattedEvent = {
      ...event[0],
      event_date: new Date(event[0].event_date).toISOString(),
    };
    return NextResponse.json(formattedEvent);
  } catch (error: any) {
    console.error("<====error====>", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { error: "Token expired====>" + error.message },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    // 1. Проверка авторизационного заголовка
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token required" }, // Сообщение на английском
        { status: 401 }
      );
    }

    // 2. Валидация ID события
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    
    // 2.1. Проверка наличия ID
    if (!idParam) {
      return NextResponse.json(
        { error: "Event ID parameter is required" },
        { status: 400 }
      );
    }

    // 2.2. Проверка формата ID (должно быть положительное число)
    const eventId = parseInt(idParam);
    if (isNaN(eventId) {
      return NextResponse.json(
        { error: "Event ID must be a number" },
        { status: 400 }
      );
    }

    if (eventId <= 0) {
      return NextResponse.json(
        { error: "Event ID must be positive" },
        { status: 400 }
      );
    }

    // 3. Верификация JWT токена
    const token = authHeader.replace("Bearer ", "").trim();
    let userId: number;
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      userId = decoded.userId;
    } catch (err) {
      // Разные ошибки для разных случаев
      if (err instanceof jwt.TokenExpiredError) {
        return NextResponse.json(
          { error: "Authentication token expired" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    // 4. Проверка существования события и прав доступа
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { 
        image_url: true,
        organizer_id: true 
      }
    });

    // 4.1. Событие не найдено
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // 4.2. Проверка, что пользователь - организатор
    if (event.organizer_id !== userId) {
      return NextResponse.json(
        { error: "Not authorized to delete this event" },
        { status: 403 }
      );
    }

    // 5. Удаление изображения из Cloudinary (если есть)
    if (event.image_url) {
      try {
        // Извлекаем public_id из URL Cloudinary
        const publicId = event.image_url
          .split('/')
          .slice(-2) // Берем последние 2 части пути
          .join('/')
          .split('.')[0]; // Удаляем расширение файла
        
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary deletion error:", err);
        // Продолжаем удаление даже если не удалили изображение
      }
    }

    // 6. Удаление события из базы данных
    await prisma.event.delete({
      where: { id: eventId }
    });

    // 7. Успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: "Event deleted successfully",
        deletedId: eventId 
      },
      { status: 200 }
    );

  } catch (error) {
    // Логируем непредвиденные ошибки
    console.error("Event deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    // Закрываем соединение с базой
    await prisma.$disconnect();
  }
}