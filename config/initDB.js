// config/initDB.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false, // opcional: desactiva logs de SQL
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
