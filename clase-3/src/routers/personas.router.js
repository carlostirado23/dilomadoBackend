const ruta = require("express").Router();
const {
  getTodasLasPersonas,
  postCrearPersona,
  putActualizarPersona,
  deleteEliminarPersona,
} = require("../controllers/personas.controller");
const validacionDeParametros = require("../middlewares/validaciones.middleware");
const {
  validarBodyCrearPersonas,
  validarParametrosEliminarPersona,
} = require("../schemas/personas.schema");

ruta.get("/todas-las-personas", function (req, res) {
  getTodasLasPersonas()
    .then(function (respuesta) {
      res.status(200).json(respuesta);
    })
    .catch(function (error) {
      res.status(400).json({ mensaje: "La peticion fallo", error });
    });
});

ruta.post(
  //METODO HTTP POST
  "/crear-persona", //LA RUTA DE ACCESO
  validarBodyCrearPersonas, //PRIMER MIDDLEWARE QUE EVALUA EL BODY
  validacionDeParametros, //SEGUNDO MIDDLEWARE SE ENCARGA DE DECIRNOS LOS RESULTADOS DE VALIDACION
  function (req, res) {
    console.log(req.body);
    postCrearPersona(req.body)
      .then(function (respuesta) {
        res.status(201).json(respuesta);
      })
      .catch(function (error) {
        res.status(400).json({ mensaje: "La preticion fallo", error });
      });
  }
);

ruta.put("/actualizar-persona/:personaId", function (req, res) {
  const personaId = Number(req.params.personaId);
  putActualizarPersona(personaId, req.body)
    .then(function (respuesta) {
      res.status(200).json(respuesta);
    })
    .catch(function (error) {
      res
        .status(400)
        .json({ mensaje: "No se pudo actualizar la persona", error });
    });
});

ruta.delete(
  "/eliminar-persona/:personaId", 
  validarParametrosEliminarPersona, //EVALUA LOS PARAMETROS DE LA RUTA
  validacionDeParametros,
  function (req, res) {
    deleteEliminarPersona(req.params.personaId)
      .then(function () {
        res.sendStatus(200);
      })
      .catch(function (error) {
        res
          .status(400)
          .json({ mensaje: "No se pudo eliminar la persona", error });
      });
  }
);

module.exports = {
  indice: "/personas",
  ruta,
};
