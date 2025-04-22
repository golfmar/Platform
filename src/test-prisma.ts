import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const events = await prisma.events.findMany({
      select: {
        id: true,
        title: true,
        event_date: true,
      },
    });
    console.log("Events:", events);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
