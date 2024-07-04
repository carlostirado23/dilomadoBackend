const ROLES = new Map();

const listaNegra = new Array(100).fill(null);

const roles = Object.freeze({
  ADMINTRADOR: 1,
  TESTER: 2,
});

module.exports = {
  ROLES, //EL MAPA QUE TRAEMOS DE LA BASE DE DATOS - ROLES GUARDADOS EN LA BASE DE DATOS
  listaNegra,
  roles, //INDICA LOS ROLES EXISTENTES - MANEJO DE ROL EN EL MIDDLEWARE
};
