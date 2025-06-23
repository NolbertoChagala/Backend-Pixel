const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  }
}, {
  tableName: 'contacts',
  timestamps: false
});

module.exports = Contact;
