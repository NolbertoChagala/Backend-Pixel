require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initializeDatabase = require('./config/initDB');
const sequelize = require('./config/database');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', contactRoutes);

async function startServer() {
  try {
    await initializeDatabase();
    await sequelize.sync();
    console.log('Base de datos y tablas listas');

    app.listen(PORT, () => {
      console.log(`Servidor backend en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar servidor:', err);
  }
}

startServer();
