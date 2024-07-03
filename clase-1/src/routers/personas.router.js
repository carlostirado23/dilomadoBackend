const ruta = require("express").Router();
const { getTodasLasPersonas } = require("../controllers/personas.controller");

ruta.get("/todas-las-personas", function (req, res) {
  getTodasLasPersonas()
    .then(function (respuesta) {
      res.status(200).json(respuesta);
    })
    .catch(function (error) {
      res.status(400).json({ mensaje: "La peticion fallo", error });
    });
});

module.exports = {
  indice: "/personas",
  ruta,
};
