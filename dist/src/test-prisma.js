import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient();
async function testConnection() {
    try {
        const events = await prisma.events.findMany({
            select: {
                id: true,
                title: true,
                event_date: true,
                // location: true,
            },
        });
        console.log("Events:", events);
    }
    catch (error) {
        console.error("Error:", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
testConnection();
