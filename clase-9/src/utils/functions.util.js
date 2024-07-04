const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const { ROLES } = require("./constants.util");

const direccionTemporal = path.join(__dirname, "../tmp");

const inicializadorDeRoles = () => {
  //1: ADMINISTRADOR
  //2: TESTER

  const rolesEnArray = [
    {
      numeroRol: 1,
      nombreRol: "Administrador",
    },
    {
      numeroRol: 2,
      nombreRol: "Tester",
    },
  ];

  rolesEnArray.forEach((rol) => {
    ROLES.set(rol.nombreRol, rol.numeroRol);
  });
};

const init = () => {
  inicializadorDeRoles();
};

const hashContrasena = (contrasena) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(contrasena, Number(process.env.SALT_ROUNDS), (err, hash) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(hash);
    });
  });
};

const compararContrasena = (contrasenaHash, contrasenaNormal) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(contrasenaNormal, contrasenaHash, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

// (async () => {
//   console.log("entro");
//   const hash = await hashContrasena("123456");
//   console.log(hash);
//   console.log("aqui terminar");
// })();

const crearArchivo = (data) => {
  const archivo = path.join(direccionTemporal, "diplomado.txt");
  fs.writeFileSync(archivo, data, "utf-8");
};

const leerArchivo = () => {
  const archivo = path.join(direccionTemporal, "diplomado.txt");
  const data = fs.readFileSync(archivo, { encoding: "utf-8" });
  console.log("Leyendo...", data);
};

const eliminarArchivo = () => {
  const archivo = path.join(direccionTemporal, "diplomado.txt");
  fs.unlinkSync(archivo);
};

module.exports = {
  init,
  hashContrasena,
  compararContrasena,
};
