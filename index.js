require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importa la conexión y función para inicializar la DB
const { sequelize, initializeDatabase } = require('./config/initDB');

const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://frontend-pixel.vercel.app",
    ];

    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS no permite este origen.'));
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use('/api', contactRoutes);
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', dashboardRoutes);

async function startServer() {
  try {
    // Inicializa la conexión a la base de datos
    await initializeDatabase();

    // Sincroniza todos los modelos (crea/actualiza tablas)
    await sequelize.sync({ alter: true });

    // Levanta el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
  }
}

startServer();
