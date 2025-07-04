require('dotenv').config();

const { Sequelize } = require('sequelize');

const connectionString = process.env.DATABASE_URL || 
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(connectionString, {
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada correctamente');
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);
    throw error;
  }
}

module.exports = { sequelize, initializeDatabase };
