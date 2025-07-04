// En tu archivo de rutas, p.ej., users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'email', 'password'] });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// GET all leads
router.get("/contact", async (req, res) => {
  try {
    const leads = await Contact.findAll({ 
      attributes: ['id', 'Nombre_Completo', 'Correo_Electronico', 'Telefono', 'Mensaje', 'status'],
    });
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener leads" });
  }
});


module.exports = router;
