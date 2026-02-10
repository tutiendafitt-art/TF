const { Client } = require('pg');

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    // Traemos categorías activas ordenadas por su número de orden
    const result = await client.query("SELECT * FROM categorias WHERE estado = 'M' ORDER BY orden ASC");
    await client.end();
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
