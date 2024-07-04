const ejecutarQuery = require("../../config/base-de-datos.config");

async function getTodasLasPersonas() {
  const query = "SELECT * FROM personas";
  const personas = await ejecutarQuery(query, []);
  return personas;
}

async function getPersonaPorId(id = 0) {
  const query = "SELECT * FROM personas WHERE id = ?";
  const parametros = [id];
  const persona = await ejecutarQuery(query, parametros);
  return persona;
}

async function postCrearPersona(persona = {}) {
  const { nombre, apellidos, edad } = persona;
  const query =
    "INSERT INTO personas(nombre, apellidos, edad) VALUES (?, ?, ?)";
  console.log(query);
  const parametros = [nombre, apellidos, edad];
  console.log(parametros);
  const crearPersona = await ejecutarQuery(query, parametros);
  return crearPersona;
}

async function putActualizarPersona(personaId = "", persona = {}) {
  const { nombre, apellidos, edad } = persona;
  const query = "UPDATE personas SET nombre=?, apellidos=?, edad=? WHERE id=?";
  const parametros = [nombre, apellidos, edad, personaId];
  const actualizarPersona = await ejecutarQuery(query, parametros);
  return actualizarPersona;
}

async function deleteEliminarPersona(personaId = 0) {
  console.log(personaId);
  const query = "DELETE FROM personas WHERE id= ?";
  const parametros = [personaId];
  const eliminarPersona = await ejecutarQuery(query, parametros);
  return eliminarPersona;
}

module.exports = {
  getTodasLasPersonas: getTodasLasPersonas,
  getPersonaPorId,
  postCrearPersona,
  putActualizarPersona,
  deleteEliminarPersona,
};
