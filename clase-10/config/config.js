const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { HOST, USUARIO_BD, BASE_DE_DATOS, CONTRASENA } = process.env;
module.exports = {
  development: {
    username: USUARIO_BD,
    password: CONTRASENA,
    database: BASE_DE_DATOS,
    host: HOST,
    dialect: "mysql", // Puedes cambiarlo según tu base de datos
  },
  // Puedes agregar configuraciones para otros entornos como producción, prueba, etc.
};
