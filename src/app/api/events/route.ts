import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export async function GET(request: Request) {
  console.log("<====GET====>");
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");
    const radius = parseFloat(searchParams.get("radius") || "10000");
    const title = searchParams.get("title") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const myEvents = searchParams.get("myEvents") === "true";
    const authHeader = request.headers.get("Authorization");

    let userId: number | null = null;
    if (myEvents && authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      userId = decoded.userId;
      console.log("<====decoded token====>", decoded);
    }

    let query = `
      SELECT e.id, e.title, e.event_date, e.description, ST_AsText(e.location) as location, u.email as organizer_email
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

    if (myEvents && userId) {
      query += ` AND e.organizer_id = $${params.length + 1}`;
      params.push(userId);
    }

    console.log("<====query====>", query, params);
    const events = await prisma.$queryRawUnsafe(query, ...params);
    console.log("<====events====>", events);
    return NextResponse.json(events);
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

    const body = await request.json();
    console.log("<====POST body====>", body);
    const { title, event_date, description, location } = body;

    if (!title || !event_date || !location) {
      console.log("<====missing fields====>", { title, event_date, location });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.$queryRaw`
      INSERT INTO events (title, event_date, description, location, organizer_id, created_at)
      VALUES (${title}, ${new Date(
      event_date
    )}, ${description}, ST_GeomFromText(${location}), ${decoded.userId}, NOW())
      RETURNING id, title, event_date, description, ST_AsText(location) as location, (
        SELECT email FROM users WHERE id = ${decoded.userId}
      ) as organizer_email
    `;
    console.log("<====created event====>", event);
    return NextResponse.json(event[0], { status: 201 });
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

    const body = await request.json();
    console.log("<====PUT body====>", body);
    const { id, title, event_date, description, location } = body;

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

    // Проверяем, что пользователь — создатель события
    const eventCheck = await prisma.$queryRaw`
      SELECT organizer_id FROM events WHERE id = ${id}
    `;
    if (!eventCheck || eventCheck[0]?.organizer_id !== decoded.userId) {
      return NextResponse.json(
        { error: "Unauthorized: You can only edit your own events" },
        { status: 403 }
      );
    }

    const event = await prisma.$queryRaw`
      UPDATE events
      SET title = ${title}, event_date = ${new Date(
      event_date
    )}, description = ${description}, location = ST_GeomFromText(${location})
      WHERE id = ${id}
      RETURNING id, title, event_date, description, ST_AsText(location) as location, (
        SELECT email FROM users WHERE id = ${decoded.userId}
      ) as organizer_email
    `;
    console.log("<====updated event====>", event);
    return NextResponse.json(event[0], { status: 200 });
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

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    console.log("<====decoded token====>", decoded);

    const { id } = await request.json();
    console.log("<====DELETE id====>", id);

    if (!id) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    // Проверяем, что пользователь — создатель события
    const eventCheck = await prisma.$queryRaw`
      SELECT organizer_id FROM events WHERE id = ${id}
    `;
    if (!eventCheck || eventCheck[0]?.organizer_id !== decoded.userId) {
      return NextResponse.json(
        { error: "Unauthorized: You can only delete your own events" },
        { status: 403 }
      );
    }

    const result = await prisma.$queryRaw`
      DELETE FROM events WHERE id = ${id}
      RETURNING id
    `;
    console.log("<====deleted event====>", result);
    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("<====error====>", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
