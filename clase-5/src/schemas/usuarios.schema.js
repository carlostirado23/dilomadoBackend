const { body, param } = require("express-validator");

const validarParametrosUsuarioPorId = [
  param("id")
    .isString()
    .withMessage("El id debe de ser numerico")
    .notEmpty()
    .withMessage("El id debe de enviarse")
    .toInt(),
];

const validarBodyCrearUsuarios = [
  body("email")
    .isString()
    .withMessage("El email tiene que ser un string")
    .notEmpty()
    .withMessage("El email no puede estar vacio"),
  body("rol_id")
    .isNumeric()
    .withMessage("El rol_id tiene que ser numerico")
    .notEmpty()
    .withMessage("El rol_id no puede estar vacio"),
];

const validarParametrosActualizarUsuario = [
  param("usuarioId")
    .notEmpty()
    .withMessage("usuarioId no puede estar vacio")
    .isString()
    .withMessage("usuarioId tiene que ser un string")
    .toInt(),
];

const validarParametrosEliminarUsuario = [
  param("usuarioId")
    .notEmpty()
    .withMessage("usuarioId no puede estar vacio")
    .isString()
    .withMessage("usuarioId tiene que ser un string")
    .toInt(),
];

module.exports = {
  validarParametrosUsuarioPorId,
  validarBodyCrearUsuarios,
  validarParametrosActualizarUsuario,
  validarParametrosEliminarUsuario,
};