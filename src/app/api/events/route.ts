// import { Pool } from "@neondatabase/serverless";

// export async function GET() {
//   const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false }, // Важно для Neon!
//   });

//   try {
//     const { rows } = await pool.query("SELECT * FROM events LIMIT 5");
//     console.log("Результат запроса:", rows); // Логируем данные
//     return Response.json(rows);
//   } catch (error) {
//     console.error("Ошибка запроса:", error);
//     return Response.json({ error: error.message }, { status: 500 });
//   } finally {
//     await pool.end();
//   }
// }
import { Pool } from "@neondatabase/serverless";
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

// export async function GET(request: Request) {
//   console.log("<====GET====>");
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     const lat = parseFloat(searchParams.get("lat") || "NaN");
//     const lng = parseFloat(searchParams.get("lng") || "NaN");
//     const radius = parseFloat(searchParams.get("radius") || "10000");
//     const title = searchParams.get("title") || "";
//     const startDate = searchParams.get("startDate") || "";
//     const endDate = searchParams.get("endDate") || "";
//     const myEvents = searchParams.get("myEvents") === "true";
//     const category = searchParams.get("category") || "";
//     const sortOrder = searchParams.get("sortOrder") || "date-asc";
//     const limit = parseInt(searchParams.get("limit") || "2"); // Совпадает с eventsPerPage=2
//     const offset = parseInt(searchParams.get("offset") || "0");
//     const authHeader = request.headers.get("Authorization");

//     let userId: number | null = null;
//     if (myEvents && authHeader && authHeader.startsWith("Bearer ")) {
//       const token = authHeader.replace("Bearer ", "");
//       const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
//       userId = decoded.userId;
//       console.log("<====decoded token====>", decoded);
//     }

//     if (id) {
//       // Запрос одного события по id
//       const query = `
//         SELECT e.id, e.title, e.event_date, e.description, ST_AsText(e.location) as location, u.email as organizer_email, e.category, e.image_url
//         FROM events e
//         JOIN users u ON e.organizer_id = u.id
//         WHERE e.id = $1
//       `;
//       const params = [parseInt(id)];
//       console.log("<====single event query====>", query, params);
//       const events = await prisma.$queryRawUnsafe(query, ...params);
//       console.log("<====single event raw====>", events);
//       if (!events || !Array.isArray(events) || events.length === 0) {
//         return NextResponse.json({ error: "Event not found" }, { status: 404 });
//       }
//       const event = {
//         ...events[0],
//         event_date: new Date(events[0].event_date).toISOString(),
//       };
//       console.log("<====single event formatted====>", event);
//       return NextResponse.json(event);
//     }

//     // Построение условий фильтрации
//     let whereClause = `WHERE 1=1`;
//     const params: any[] = [];
//     let paramIndex = 1;

//     if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
//       whereClause += `
//         AND ST_DWithin(
//           e.location,
//           ST_SetSRID(ST_MakePoint($${paramIndex}, $${
//         paramIndex + 1
//       }), 4326)::geography,
//           $${paramIndex + 2}
//         )`;
//       params.push(lng, lat, radius);
//       paramIndex += 3;
//     }

//     if (title) {
//       whereClause += ` AND e.title ILIKE $${paramIndex}`;
//       params.push(`%${title}%`);
//       paramIndex++;
//     }

//     if (startDate) {
//       whereClause += ` AND e.event_date >= $${paramIndex}`;
//       params.push(new Date(startDate));
//       paramIndex++;
//     }

//     if (endDate) {
//       whereClause += ` AND e.event_date <= $${paramIndex}`;
//       params.push(new Date(endDate));
//       paramIndex++;
//     }

//     if (category) {
//       whereClause += ` AND e.category = $${paramIndex}`;
//       params.push(category);
//       paramIndex++;
//     }

//     if (myEvents && userId) {
//       whereClause += ` AND e.organizer_id = $${paramIndex}`;
//       params.push(userId);
//       paramIndex++;
//     }

//     // Подсчет общего количества событий
//     const countQuery = `
//       SELECT COUNT(*) as count
//       FROM events e
//       JOIN users u ON e.organizer_id = u.id
//       ${whereClause}
//     `;
//     console.log("<====count query====>", countQuery, params);
//     const countResult = await prisma.$queryRawUnsafe(countQuery, ...params);
//     const totalCount = Number(countResult[0].count);
//     console.log("<====total count====>", totalCount);

//     // Построение сортировки
//     let orderByClause = "";
//     if (sortOrder === "date-asc") {
//       orderByClause = `ORDER BY e.event_date ASC`;
//     } else if (sortOrder === "date-desc") {
//       orderByClause = `ORDER BY e.event_date DESC`;
//     } else if (
//       sortOrder === "distance-asc" &&
//       lat &&
//       lng &&
//       !isNaN(lat) &&
//       !isNaN(lng)
//     ) {
//       orderByClause = `
//         ORDER BY ST_Distance(
//           e.location,
//           ST_SetSRID(ST_MakePoint($${paramIndex}, $${
//         paramIndex + 1
//       }), 4326)::geography
//         ) ASC`;
//       params.push(lng, lat);
//       paramIndex += 2;
//     } else {
//       orderByClause = `ORDER BY e.event_date ASC`; // Фallback
//     }

//     // Запрос списка событий с пагинацией
//     const query = `
//       SELECT e.id, e.title, e.event_date, e.description, ST_AsText(e.location) as location, u.email as organizer_email, e.category, e.image_url
//       FROM events e
//       JOIN users u ON e.organizer_id = u.id
//       ${whereClause}
//       ${orderByClause}
//       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
//     `;
//     params.push(limit, offset);
//     console.log("<====query====>", query, params);
//     const events = await prisma.$queryRawUnsafe(query, ...params);
//     console.log("<====events====>", events);

//     // Преобразуем event_date для списка событий
//     const formattedEvents = events.map((event: any) => ({
//       ...event,
//       event_date: new Date(event.event_date).toISOString(),
//     }));

//     return NextResponse.json({ events: formattedEvents, totalCount });
//   } catch (error) {
//     console.error("<====error====>", error);
//     return NextResponse.json(
//       { error: "Failed to fetch events" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

import { Pool } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export async function GET(request: Request) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

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
    const limit = parseInt(searchParams.get("limit") || "2");
    const offset = parseInt(searchParams.get("offset") || "0");
    const authHeader = request.headers.get("Authorization");

    let userId: number | null = null;
    if (myEvents && authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      userId = decoded.userId;
    }

    // Запрос одного события по ID
    if (id) {
      const query = `
        SELECT 
          e.id, e.title, e.event_date, e.description, 
          ST_AsText(e.location) as location, 
          u.email as organizer_email, e.category, e.image_url
        FROM events e
        JOIN users u ON e.organizer_id = u.id
        WHERE e.id = $1
      `;
      const { rows } = await pool.query(query, [parseInt(id)]);

      if (!rows || rows.length === 0) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      const event = {
        ...rows[0],
        event_date: new Date(rows[0].event_date).toISOString(),
      };
      return NextResponse.json(event);
    }

    // Построение основного запроса
    let whereParts: string[] = ["1=1"];
    const queryParams: any[] = [];
    let paramIndex = 1;

    // Гео-фильтр
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      whereParts.push(`
        ST_DWithin(
          e.location,
          ST_SetSRID(ST_MakePoint($${paramIndex}, $${
        paramIndex + 1
      }), 4326)::geography,
          $${paramIndex + 2}
        )
      `);
      queryParams.push(lng, lat, radius);
      paramIndex += 3;
    }

    // Текстовый фильтр
    if (title) {
      whereParts.push(`e.title ILIKE $${paramIndex}`);
      queryParams.push(`%${title}%`);
      paramIndex++;
    }

    // Фильтр по дате начала
    if (startDate) {
      whereParts.push(`e.event_date >= $${paramIndex}`);
      queryParams.push(new Date(startDate));
      paramIndex++;
    }

    // Фильтр по дате окончания
    if (endDate) {
      whereParts.push(`e.event_date <= $${paramIndex}`);
      queryParams.push(new Date(endDate));
      paramIndex++;
    }

    // Фильтр по категории
    if (category) {
      whereParts.push(`e.category = $${paramIndex}`);
      queryParams.push(category);
      paramIndex++;
    }

    // Фильтр "мои события"
    if (myEvents && userId) {
      whereParts.push(`e.organizer_id = $${paramIndex}`);
      queryParams.push(userId);
      paramIndex++;
    }

    const whereClause =
      whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

    // Подсчет общего количества
    const countQuery = `
      SELECT COUNT(*) as count
      FROM events e
      JOIN users u ON e.organizer_id = u.id
      ${whereClause}
    `;
    const countResult = await pool.query(countQuery, queryParams);
    const totalCount = Number(countResult.rows[0]?.count || 0);

    // Определение сортировки
    let orderByClause = "ORDER BY e.event_date ASC";
    if (sortOrder === "date-desc") {
      orderByClause = "ORDER BY e.event_date DESC";
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
        ) ASC
      `;
      queryParams.push(lng, lat);
      paramIndex += 2;
    }

    // Основной запрос данных
    const dataQuery = `
      SELECT 
        e.id, e.title, e.event_date, e.description,
        ST_AsText(e.location) as location,
        u.email as organizer_email, e.category, e.image_url
      FROM events e
      JOIN users u ON e.organizer_id = u.id
      ${whereClause}
      ${orderByClause}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    queryParams.push(limit, offset);

    const { rows } = await pool.query(dataQuery, queryParams);

    // Форматирование результата
    const formattedEvents = rows.map((event: any) => ({
      ...event,
      event_date: new Date(event.event_date).toISOString(),
    }));

    return NextResponse.json({
      events: formattedEvents,
      totalCount,
    });
  } catch (error: any) {
    console.error("Error in GET /api/events:", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { error: error.message || "Failed to fetch events" },
      { status: 500 }
    );
  } finally {
    await pool.end();
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
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    console.log("<====decoded token====>", decoded);

    const body = await request.json();
    const id = parseInt(body.id);
    if (!id) {
      console.log("<====missing id====>", body);
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    // Находим событие, чтобы получить image_url
    const event = await prisma.$queryRaw`
      SELECT image_url
      FROM events
      WHERE id = ${id} AND organizer_id = ${decoded.userId}
    `;
    console.log("<====event to delete====>", event);

    if (!event || event.length === 0) {
      return NextResponse.json(
        { error: "Event not found or unauthorized" },
        { status: 404 }
      );
    }

    // Удаляем изображение из Cloudinary, если оно есть
    const imageUrl = event[0].image_url;
    if (imageUrl) {
      const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0]; // Например, "events/123456"
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log("<====cloudinary delete====>", publicId);
      } catch (cloudinaryError) {
        console.error("<====cloudinary delete error====>", cloudinaryError);
        // Не прерываем удаление события, но логируем ошибку
      }
    }

    // Удаляем событие из базы
    const deletedEvent = await prisma.$queryRaw`
      DELETE FROM events
      WHERE id = ${id} AND organizer_id = ${decoded.userId}
      RETURNING id
    `;
    console.log("<====deleted event====>", deletedEvent);

    if (!deletedEvent || deletedEvent.length === 0) {
      return NextResponse.json(
        { error: "Event not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Event deleted successfully" });
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
      { error: "Failed to delete event" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
