const { login } = require("../controllers/login.controller");

const ruta = require("express").Router();

ruta.post("/", (req, res) => {
  login(req.body.email)
    .then((respuesta) => res.status(200).json({ token: respuesta }))
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = {
  indice: "/login",
  ruta,
};
