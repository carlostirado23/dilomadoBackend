const { login } = require("../controllers/login.controller");

const ruta = require("express").Router();

ruta.post("/", (req, res) => {
  const { email, contrasena } = req.body;
  login(email, contrasena)
    .then((respuesta) => res.status(200).json({ token: respuesta }))
    .catch((error) => {
      console.log(error)
      res.status(400).json(error);
    });
});

module.exports = {
  indice: "/login",
  ruta,
};
