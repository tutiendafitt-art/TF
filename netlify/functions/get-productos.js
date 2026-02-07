const { Client } = require('pg');

exports.handler = async (event, context) => {
  // Netlify ya tiene tu DATABASE_URL gracias a la conexión con Neon
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    // Traemos los datos de la tabla que creaste
    const result = await client.query('SELECT * FROM productos ORDER BY id ASC');
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
