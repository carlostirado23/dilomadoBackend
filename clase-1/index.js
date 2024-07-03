const express = require("express");
const app = express();
const rutaPrincipal = express.Router();
const rutaPersonas = require('./src/routers/personas.router')

app.get("/", function (req, res, next) {
  res.send("Hola mundo!");
});

rutaPrincipal.use(rutaPersonas.indice, rutaPersonas.ruta)

app.use('/api', rutaPrincipal)

app.listen(9001);