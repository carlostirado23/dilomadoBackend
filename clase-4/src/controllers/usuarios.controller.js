const ejecutarQuery = require("../../config/base-de-datos.config");

const getTodosLosUsuarios = async () => {
  const query = "SELECT * FROM usuarios";
  const usuarios = await ejecutarQuery(query, []);
  return usuarios;
};

const getUsuarioPorId = async (id) => {
  const query = "SELECT * FROM usuarios WHERE id = ?";
  const parametros = [id];
  const usuario = await ejecutarQuery(query, parametros);
  return usuario;
};

const postCrearUsuarios = async (usuario = {}) => {
  const { email, rol_id } = usuario;
  const query = "INSERT INTO usuarios (email, rol_id) VALUES (?, ?)";
  const parametros = [email, rol_id];
  const usuarioCreado = await ejecutarQuery(query, parametros);
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
