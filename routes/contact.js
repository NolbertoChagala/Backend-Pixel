const express = require('express');
const axios = require('axios');
const router = express.Router();
const Contact = require('../models/Contact');

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '6LdcaGsrAAAAAKwV01cFIhFTEiE1GQ83Pe6UQNvw';

router.post('/contact', async (req, res) => {
  const { token, Nombre_Completo, Correo_Electronico, Telefono, Mensaje } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token de reCAPTCHA no proporcionado' });
  }

  try {
    // Validar el token con Google
    const captchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    const { success } = captchaRes.data;

    if (!success) {
      return res.status(400).json({ error: 'Falló la validación del CAPTCHA' });
    }

    // CAPTCHA válido, guardar el contacto
    const contact = await Contact.create({
      Nombre_Completo,
      Correo_Electronico,
      Telefono,
      Mensaje,
    });

    res.status(201).json({ message: 'Mensaje guardado correctamente', contact });
  } catch (error) {
    console.error('Error al guardar mensaje:', error);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});

module.exports = router;
