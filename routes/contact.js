const express = require('express');
const axios = require('axios');
const validator = require('validator');
const router = express.Router();
const Contact = require('../models/Contact');

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '6LdcaGsrAAAAAKwV01cFIhFTEiE1GQ83Pe6UQNvw';

router.post('/contact', async (req, res) => {
  const { token, Nombre_Completo, Correo_Electronico, Telefono, Mensaje } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token de reCAPTCHA no proporcionado' });
  }

  try {
    // Validar el token de reCAPTCHA con Google
    const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    const { success } = captchaRes.data;
    if (!success) {
      return res.status(400).json({ error: 'Falló la validación del CAPTCHA' });
    }

    // Sanitización
    const cleanName = validator.escape(Nombre_Completo.trim());
    const cleanEmail = validator.normalizeEmail(Correo_Electronico);
    const cleanPhone = Telefono.replace(/[^\d]/g, "");
    const cleanMessage = validator.escape(Mensaje.trim());

    if (!validator.isLength(cleanName, { min: 3 })) {
      return res.status(400).json({ error: "Nombre inválido" });
    }

    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({ error: "Correo inválido" });
    }

    if (!validator.isLength(cleanPhone, { min: 10, max: 15 })) {
      return res.status(400).json({ error: "Teléfono inválido" });
    }

    if (!validator.isLength(cleanMessage, { min: 10 })) {
      return res.status(400).json({ error: "Mensaje muy corto" });
    }

    // Crear y guardar
    const contact = await Contact.create({
      Nombre_Completo: cleanName,
      Correo_Electronico: cleanEmail,
      Telefono: cleanPhone,
      Mensaje: cleanMessage,
    });

    res.status(201).json({ message: 'Mensaje guardado correctamente', contact });
  } catch (error) {
    console.error('Error al guardar mensaje:', error);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});

module.exports = router;
