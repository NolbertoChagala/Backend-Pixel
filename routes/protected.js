const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Ruta protegida
router.get("/", authMiddleware, (req, res) => {
  res.json({ message: `Hola, usuario con ID ${req.user.id}` });
});

module.exports = router;
