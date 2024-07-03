const mysql = require("mysql2/promise");

async function conectar() {
  const conexion = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "diplomado",
    password: "12345678",
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
  }
}

module.exports = ejecutarQuery;
