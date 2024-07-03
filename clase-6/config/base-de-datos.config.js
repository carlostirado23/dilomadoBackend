require('dotenv').config({path: '../.env'})
const mysql = require("mysql2/promise");
const { HOST, USUARIO_BD, BASE_DE_DATOS, CONTRASENA } = process.env;

async function conectar() {
  const conexion = await mysql.createConnection({
    host: HOST,
    user: USUARIO_BD,
    database: BASE_DE_DATOS,
    password: CONTRASENA,
  });

  return conexion;
}

async function ejecutarQuery(query = "", valores = []) {
  try {
    const conexion = await conectar();
    const [resultados] = await conexion.query(query, valores);
    return resultados;
  } catch (error) {
    console.error("Hubo un error al ejecutar el query", error);
    throw error;
  }
}

module.exports = ejecutarQuery;
