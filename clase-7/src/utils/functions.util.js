const { ROLES } = require("./constants.util");

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

module.exports = {
  init,
};
