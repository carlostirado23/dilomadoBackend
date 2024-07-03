const ejecutarQuery = require("../../config/base-de-datos.config");

async function getTodasLasPersonas() {
  const query = "SELECT * FROM personas";
  const personas = await ejecutarQuery(query, []);
  return personas;
}

module.exports = {
  getTodasLasPersonas: getTodasLasPersonas,
};
