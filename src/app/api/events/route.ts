import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  console.log("<====GET====>");
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");
    const radius = parseFloat(searchParams.get("radius") || "10000");

    let events;
    if (lat && lng) {
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
    )}, ${description}, ST_GeomFromText(${location}), 1, NOW())
      RETURNING id, title, event_date, description, ST_AsText(location) as location
    `;
    console.log("<====created event====>", event);
    return NextResponse.json(event[0], { status: 201 });
  } catch (error) {
    console.error("<====error====>", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
