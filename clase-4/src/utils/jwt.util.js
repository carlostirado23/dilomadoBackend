const jwt = require("jsonwebtoken");
const { ROLES, listaNegra } = require("./constants.util");

const crearToken = (jwtData, secreto, expiracion) => {
  const token = jwt.sign(jwtData, secreto, expiracion);
  return token;
};

const verificarTiempoToken = (token) => {
  const { exp } = jwt.decode(token); //ESTA PERMITE ENTENDER COMO FUNCIONA EL JWT
  const tiempoActual = new Date().getTime() / 1000;
  return exp > tiempoActual;
};

const jwtVerificadorTiempoToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    next();
    return null;
  }
  const [, TOKEN] = token.split(" ");

  if (!TOKEN) {
    next();
    return null;
  }

  if (verificarTiempoToken(TOKEN) === false) {
    res.status(401).json({ mensaje: "Token expirado" });
    return null;
  }

  next();
  return null;
};

const verificarToken = (token) => {
  try {
    if (listaNegra.includes(token)) return false;
    const verificado = jwt.verify(token, "SECRETO"); //ESTA PERMITE VERIFICAR TODO LO QUE MANDEMOS A TRAVES DE JWT
    return verificado;
  } catch (error) {
    return false;
  }
};

const verificarRol = (roles = [], rol) => {
  if (roles.length === 0) return true;
  //[...ROLES] de un mapa, pasa a ser una matrix
  //[0][0] = Administrador, 1
  //[1][1] = Tester, 2

  //key, value (Administrador...., 1.....)
  //[, value]
  const encontrado = [...ROLES].find(([, value]) => value === rol)[1];
  return roles.includes(encontrado);
};

module.exports = {
  crearToken,
  verificarTiempoToken,
  jwtVerificadorTiempoToken,
  verificarToken,
  verificarRol,
};
