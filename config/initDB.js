// config/initDB.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectOptions: {
    // Esto permite conexiones SSL sin rechazar si no hay certificado válido,
    // importante para conexiones seguras en servicios cloud
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // Desactivar logs SQL
  pool: {
    max: 10,      // máximo de conexiones simultáneas
    min: 0,       // mínimo de conexiones abiertas en pool
    acquire: 30000, // tiempo máximo para intentar obtener una conexión antes de error
    idle: 10000,  // tiempo que una conexión puede estar inactiva antes de ser cerrada
  },
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Base de datos conectada correctamente");
  } catch (error) {
    console.error("❌ Error al conectar la base de datos:", error);
    throw error;
  }
}

module.exports = { sequelize, initializeDatabase };
