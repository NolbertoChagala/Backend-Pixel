const { DataTypes } = require("sequelize");
const { sequelize } = require('../config/initDB');
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Antes de crear el usuario, hashea la contraseña
User.beforeCreate(async (user) => {
  console.log("Hashing password para usuario:", user.email);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});



module.exports = User;
