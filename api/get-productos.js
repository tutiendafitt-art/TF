const { Client } = require('pg');

export default async function handler(request, response) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM productos');
    await client.end();
    
    // En Vercel la respuesta es más directa
    return response.status(200).json(result.rows);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
