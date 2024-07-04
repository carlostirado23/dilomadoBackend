const crypto = require("crypto");
const ejecutarQuery = require("../../config/base-de-datos.config");
const Usuarios = require("../models/Usuarios.model");
const { hashContrasena } = require("../utils/functions.util");
const Roles = require("../models/Roles.model");

const getTodosLosUsuarios = async () => {
  const usuarios = await Usuarios.findAll({
    include: [
      {
        model: Roles,
        required: true,
        attributes: ["rol"],
      },
    ],
  });
  // const query = "SELECT * FROM usuarios";
  // const usuarios = await ejecutarQuery(query, []);
  return usuarios;
};

const getUsuarioPorId = async (id) => {
  // const query = "SELECT * FROM usuarios WHERE id = ?";
  // const parametros = [id];
  // const usuario = await ejecutarQuery(query, parametros);
  const usuario = await Usuarios.findOne({
    include: [
      {
        model: Roles,
        required: true,
        attributes: ["rol"],
      },
    ],
    where: { id },
  });
  return usuario;
};

const postCrearUsuarios = async (usuario = {}) => {
  const { email, contrasena, rol_id } = usuario;
  const nuevaContrasena = await hashContrasena(contrasena);
  const usuarioCreado = await Usuarios.create({
    email,
    contrasena: nuevaContrasena,
    rol_id,
    uuid: crypto.randomUUID(),
  });
  // const query = "INSERT INTO usuarios (email, rol_id) VALUES (?, ?)";
  // const parametros = [email, rol_id];
  // const usuarioCreado = await ejecutarQuery(query, parametros);
  return usuarioCreado;
};

const putActualizarUsuarioPorId = async (id, usuario = {}) => {
  const { email, rol_id } = usuario;
  const query = "UPDATE usuarios SET email = ?, rol_id = ? WHERE id = ?";
  const parametros = [email, rol_id, id];
  const usuarioActualizado = await ejecutarQuery(query, parametros);
  return usuarioActualizado;
};

const deleteUsuarioPorId = async (id) => {
  const query = "DELETE FROM usuarios WHERE id = ?";
  const parametros = [id];
  const usuario = await ejecutarQuery(query, parametros);
  return usuario;
};

module.exports = {
  getTodosLosUsuarios,
  postCrearUsuarios,
  getUsuarioPorId,
  putActualizarUsuarioPorId,
  deleteUsuarioPorId,
};
