import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "your-secret-key"; // Замени на ключ в .env

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");
    const radius = parseFloat(searchParams.get("radius") || "10000");

    let events;
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      console.log("<====filter====>", { lat, lng, radius });
      events = await prisma.$queryRaw`
        SELECT id, title, event_date, description, ST_AsText(location) as location
        FROM events
        WHERE ST_DWithin(
          location,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
          ${radius}
        )
      `;
    } else {
      events = await prisma.$queryRaw`
        SELECT id, title, event_date, description, ST_AsText(location) as location
        FROM events
      `;
    }
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
      RETURNING id, title, event_date, description, ST_AsText(location) as location
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
