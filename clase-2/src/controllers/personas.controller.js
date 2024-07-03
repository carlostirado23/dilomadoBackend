const ejecutarQuery = require("../../config/base-de-datos.config");

async function getTodasLasPersonas() {
  const query = "SELECT * FROM personas";
  const personas = await ejecutarQuery(query, []);
  return personas;
}

async function postCrearPersona(persona = {}) {
  const { nombre, apellido, edad } = persona;
  const query = "INSERT INTO personas(nombre, apellido, edad) VALUES (?, ?, ?)";
  console.log(query);
  const parametros = [nombre, apellido, edad];
  console.log(parametros)
  const crearPersona = await ejecutarQuery(query, parametros);
  return crearPersona;
}

module.exports = {
  getTodasLasPersonas: getTodasLasPersonas,
  postCrearPersona
};
