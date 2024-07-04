const mongo = require("../../config/mongo.config");

const UsuariosModel = async () => await mongo("usuarios");

module.exports = {
  UsuariosModel,
};
