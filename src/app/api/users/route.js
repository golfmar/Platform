import { Pool } from "@neondatabase/serverless";

export async function GET() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const { rows } = await pool.query("SELECT * FROM users LIMIT 5");
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  } finally {
    await pool.end();
  }
}
