const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  if (process.env.MYSQL_URL) {
    const connection = await mysql.createConnection(process.env.MYSQL_URL);
    console.log('Base de datos conectada correctamente con MYSQL_URL ✅');
    return connection;
  }

  // Fallback si no existe MYSQL_URL
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  });

  console.log('Base de datos conectada correctamente con variables separadas ✅');
  return connection;
}

module.exports = initializeDatabase;
