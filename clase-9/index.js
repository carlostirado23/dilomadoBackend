require("dotenv").config({ path: "./.env" });
const socket = require("socket.io");
const http = require("http");
const express = require("express");
require("./src/utils/functions.util").init();
const { testConnection, sequelize } = require("./config/sequelize.config");
require("./src/models/index.model");

//Llamado de las tablas
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("MODELOS SINCRONIZADOS");
  } catch (error) {
    console.log(error);
  }
})();

const app = express();
const server = http.createServer(app);
const io = socket(server);

// io.on("connection", (instanciaSocketConectado) => {
//   console.log("Conectado");

//   instanciaSocketConectado.on("comunicate", (mensajes) => {
//     console.log("Mensaje entrante", mensajes);
//     const nuevoMensaje = {
//       mensaje: "Mensaje Recibido, saludos",
//       fecha: new Date(),
//     };
//     instanciaSocketConectado.emit("comunicate", JSON.stringify(nuevoMensaje));
//   });

//   instanciaSocketConectado.on("disconnect", () => {
//     console.log("Salio del chat.");
//   });
// });

const users = {};

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  // Manejar evento cuando un nuevo usuario se une al chat
  socket.on("chat", (username) => {
    users[socket.id] = username;
    console.log(`Usuario ${username} ha entrado al chat`);

    // Emitir evento a todos los clientes, informando sobre la conexión de un nuevo usuario
    io.emit("usuariosOnline", username);
  });

  // Manejar evento cuando un usuario envía un mensaje
  socket.on("mensaje", (message) => {
    console.log(`Mensaje recibido de ${users[socket.id]}: ${message}`);

    io.to(socket.id).emit("mensaje", "Su mensaje fue recibido");

    // Emitir el mensaje a todos los clientes excepto al emisor
    socket.broadcast.emit("mensaje", {
      username: users[socket.id],
      message: message,
    });
  });

  // Manejar evento cuando un usuario se desconecta
  socket.on("disconnect", () => {
    console.log(`Usuario ${users[socket.id]} se ha desconectado`, socket.id);
    // Emitir evento de desconexión a todos los clientes
    io.emit("user disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

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

server.listen(9001);

testConnection().then();
