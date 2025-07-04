require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const initializeDatabase = require("./config/initDB");
const sequelize = require("./config/database");
const contactRoutes = require("./routes/contact");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use("/api", contactRoutes);
app.use("/api", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", dashboardRoutes);

async function startServer() {
  try {
    await initializeDatabase();
    await sequelize.sync();
    console.log("Base de datos y tablas listas");

    app.listen(PORT, () => {
      console.log(`Servidor backend en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error al iniciar servidor:", err);
  }
}

startServer();
