import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  console.log("<====GET====>");
  try {
    const events = await prisma.events.findMany({
      select: {
        id: true,
        title: true,
        event_date: true,
        description: true,
        // location: true,
      },
    });
    console.log("<====events====>", events);
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
