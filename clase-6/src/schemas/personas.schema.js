const { body, param } = require("express-validator");

const validarParametrosPersonaPorId = [
  param("id")
    .isString()
    .withMessage("El id debe de ser numerico")
    .notEmpty()
    .withMessage("El id debe de enviarse")
    .toInt(),
];

const validarBodyCrearPersonas = [
  body("nombre")
    .isString()
    .withMessage("El nombre tiene que ser un string")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
  body("apellidos")
    .isString()
    .withMessage("El apellidos tiene que ser un string")
    .notEmpty()
    .withMessage("El apellidos no puede estar vacio"),
  body("edad")
    .isNumeric()
    .withMessage("La edad tiene que ser numerico")
    .notEmpty()
    .withMessage("La edad no puede estar vacio"),
];

const validarParametrosEliminarPersona = [
  param("personaId")
    .notEmpty()
    .withMessage("personaId no puede estar vacio")
    .isString()
    .withMessage("personaId tiene que ser un string")
    .toInt(),
];

module.exports = {
  validarParametrosPersonaPorId,
  validarBodyCrearPersonas,
  validarParametrosEliminarPersona,
};
