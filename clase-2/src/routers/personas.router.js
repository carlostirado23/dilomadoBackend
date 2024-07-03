const ruta = require("express").Router();
const {
  getTodasLasPersonas,
  postCrearPersona,
} = require("../controllers/personas.controller");

ruta.get("/todas-las-personas", function (req, res) {
  getTodasLasPersonas()
    .then(function (respuesta) {
      res.status(200).json(respuesta);
    })
    .catch(function (error) {
      res.status(400).json({ mensaje: "La peticion fallo", error });
    });
});

ruta.post("/crear-persona", function (req, res) {
  console.log(req.body)
  postCrearPersona(req.body)
    .then(function (respuesta) {
      res.status(201).json(respuesta);
    })
    .catch(function (error) {
      res.status(400).json({ mensaje: "La preicion fallo", error });
    });
});

module.exports = {
  indice: "/personas",
  ruta,
};
