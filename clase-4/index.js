const express = require("express");
require("./src/utils/functions.util").init();
const app = express();

app.use(express.json({ limit: "10mb" }));

const rutaPrincipal = express.Router();
const rutaPersonas = require("./src/routers/personas.router");
const rutaUsuarios = require("./src/routers/usuarios.router");
const rutaLogin = require("./src/routers/login.router");

const { jwtVerificadorTiempoToken } = require("./src/utils/jwt.util");

app.get("/", function (req, res, next) {
  res.send("Hola mundo!");
});

rutaPrincipal.use(rutaPersonas.indice, rutaPersonas.ruta);
rutaPrincipal.use(rutaUsuarios.indice, rutaUsuarios.ruta);
rutaPrincipal.use(rutaLogin.indice, rutaLogin.ruta);

app.use(jwtVerificadorTiempoToken);
app.use("/api", rutaPrincipal);

app.listen(9001);
