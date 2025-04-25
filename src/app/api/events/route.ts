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
    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");
    const radius = parseFloat(searchParams.get("radius") || "10000");
    const title = searchParams.get("title") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const myEvents = searchParams.get("myEvents") === "true";
    const category = searchParams.get("category") || "";
    const limit = parseInt(searchParams.get("limit") || "5");
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
      // Преобразуем event_date в ISO-строку для корректного парсинга
      const event = {
        ...events[0],
        event_date: new Date(events[0].event_date).toISOString(),
      };
      console.log("<====single event formatted====>", event);
      return NextResponse.json(event);
    }

    // Существующий запрос списка с пагинацией
    let query = `
      SELECT e.id, e.title, e.event_date, e.description, ST_AsText(e.location) as location, u.email as organizer_email, e.category, e.image_url
      FROM events e
      JOIN users u ON e.organizer_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      query += `
        AND ST_DWithin(
          e.location,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
          $3
        )
      `;
      params.push(lng, lat, radius);
    }

    if (title) {
      query += ` AND e.title ILIKE $${params.length + 1}`;
      params.push(`%${title}%`);
    }

    if (startDate) {
      query += ` AND e.event_date >= $${params.length + 1}`;
      params.push(new Date(startDate));
    }

    if (endDate) {
      query += ` AND e.event_date <= $${params.length + 1}`;
      params.push(new Date(endDate));
    }

    if (category) {
      query += ` AND e.category = $${params.length + 1}`;
      params.push(category);
    }

    if (myEvents && userId) {
      query += ` AND e.organizer_id = $${params.length + 1}`;
      params.push(userId);
    }

    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    console.log("<====query====>", query, params);
    const events = await prisma.$queryRawUnsafe(query, ...params);
    console.log("<====events====>", events);
    // Преобразуем event_date для списка событий
    const formattedEvents = events.map((event: any) => ({
      ...event,
      event_date: new Date(event.event_date).toISOString(),
    }));
    return NextResponse.json(formattedEvents);
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
      INSERT INTO events (title, event_date, description, location, organizer_id, created_at, category, image_url)
      VALUES (${title}, ${new Date(
      event_date
    )}, ${description}, ST_GeomFromText(${location}), ${
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
        event_date = ${new Date(event_date)},
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
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
