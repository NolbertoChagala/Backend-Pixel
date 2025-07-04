const express = require("express");
const axios = require("axios");
const validator = require("validator");
const router = express.Router();
const Contact = require("../models/Contact");

const RECAPTCHA_SECRET_KEY =
  process.env.RECAPTCHA_SECRET_KEY ||
  "6LdcaGsrAAAAAKwV01cFIhFTEiE1GQ83Pe6UQNvw";

// Crear un contacto con reCAPTCHA
router.post("/contact", async (req, res) => {
  const { token, Nombre_Completo, Correo_Electronico, Telefono, Mensaje } =
    req.body;

  if (!token) {
    return res
      .status(400)
      .json({ error: "Token de reCAPTCHA no proporcionado" });
  }

  try {
    // Validar reCAPTCHA
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
      return res.status(400).json({ error: "Falló la validación del CAPTCHA" });
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
      status: "pendiente",
    });
    await contact.reload();

    res
      .status(201)
      .json({ message: "Mensaje guardado correctamente", contact });
  } catch (error) {
    console.error("Error al guardar mensaje:", error);
    res.status(500).json({ error: "Error al guardar el mensaje" });
  }
});

// Cambiar el status de un mensaje existente
router.patch("/contact/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pendiente", "en_proceso", "Atendido"].includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    contact.status = status;
    await contact.save();

    res.json({ message: "Status actualizado correctamente", contact });
  } catch (error) {
    console.error("Error al actualizar status:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
