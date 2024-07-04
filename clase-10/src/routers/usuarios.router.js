const ruta = require("express").Router();

const {
  getTodosLosUsuarios,
  getUsuarioPorId,
  postCrearUsuarios,
  deleteUsuarioPorId,
  putActualizarUsuarioPorId,
} = require("../controllers/usuarios.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");

const validacionDeParametros = require("../middlewares/validaciones.middleware");

const {
  validarParametrosUsuarioPorId,
  validarBodyCrearUsuarios,
  validarParametrosEliminarUsuario,
  validarParametrosActualizarUsuario,
} = require("../schemas/usuarios.schema");

const { roles } = require("../utils/constants.util");
const { ADMINTRADOR, TESTER } = roles;

ruta.get("/todos-los-usuarios", function (req, res) {
  getTodosLosUsuarios()
    .then(function (respuesta) {
      res.status(200).json(respuesta);
    })
    .catch(function (error) {
      res.status(400).json({ mensaje: "La peticion fallo", error });
    });
});

ruta.get(
  "/usuario/:id",
  validarParametrosUsuarioPorId,
  validacionDeParametros,
  function (req, res) {
    getUsuarioPorId(req.params.id)
      .then(function (respuesta) {
        res.status(200).json(respuesta);
      })
      .catch(function (error) {
        res.status(400).json({ mensaje: "La persona no existe", error });
      });
  }
);

ruta.post(
  "/crear-usuario",
  // jwtMiddleware([ADMINTRADOR]),
  validarBodyCrearUsuarios,
  validacionDeParametros,
  function (req, res) {
    postCrearUsuarios(req.body)
      .then(function (respuesta) {
        res.status(201).json(respuesta);
      })
      .catch(function (error) {
        res.status(400).json({ mensaje: "La preticion fallo", error });
      });
  }
);

ruta.put(
  "/actualizar-usuario/:usuarioId",
  validarParametrosActualizarUsuario,
  validacionDeParametros,
  function (req, res) {
    const usuarioId = Number(req.params.usuarioId);
    putActualizarUsuarioPorId(usuarioId, req.body)
      .then(function (respuesta) {
        res.status(200).json(respuesta);
      })
      .catch(function (error) {
        res.status(400).json({ mensaje: "La preticion fallo", error });
      });
  }
);

ruta.delete(
  "/eliminar-usuario/:usuarioId",
  validarParametrosEliminarUsuario,
  validacionDeParametros,
  function (req, res) {
    deleteUsuarioPorId(req.params.usuarioId)
      .then(function (respuesta) {
        res.status(200).json(respuesta);
      })
      .catch(function (error) {
        res.status(400).json({ mensaje: "La peticion fallo", error });
      });
  }
);

module.exports = {
  indice: "/usuarios",
  ruta,
};
