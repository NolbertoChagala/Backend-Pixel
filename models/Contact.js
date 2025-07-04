const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/initDB');

const Contact = sequelize.define('Contact', {
  Nombre_Completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Correo_Electronico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'en_proceso', 'Atendido'),
    defaultValue: 'pendiente',
  },
});

module.exports = Contact;
