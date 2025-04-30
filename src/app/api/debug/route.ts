import { Pool } from "@neondatabase/serverless";

export async function GET() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    // Самый простой запрос без JOIN и сложных условий
    const { rows } = await pool.query("SELECT id, title FROM events LIMIT 1");
    return Response.json({
      success: true,
      data: rows,
      connection: "Успешное подключение к Neon",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        connection: "Ошибка подключения к Neon",
      },
      { status: 500 }
    );
  } finally {
    await pool.end();
  }
}
export async function POST() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    const { rows } = await pool.query(`
      SELECT e.id, e.title, u.email as organizer_email
      FROM events e
      JOIN users u ON e.organizer_id = u.id
      LIMIT 1
    `);

    return Response.json({
      success: true,
      data: rows,
      message: rows.length
        ? "Данные найдены"
        : "Таблица пуста (но JOIN сработал)",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: "Ошибка при JOIN-запросе",
      },
      { status: 500 }
    );
  } finally {
    await pool.end();
  }
}