const ejecutarQuery = require("../../config/base-de-datos.config");
const { encriptacion, LLAVE_SEGUNDA } = require("../utils/crypto.util");
const { crearToken } = require("../utils/jwt.util");

const login = async (email = "") => {
  const query = "SELECT * FROM usuarios WHERE email = ?";
  const parametros = [email];
  const usuario = await ejecutarQuery(query, parametros);

  if (usuario.length > 0) {
    const jwtData = {
      email,
      rolId: usuario[0].rol_id,
    };

    const datosEncriptados = encriptacion(JSON.stringify(jwtData));
    const token = crearToken(
      { datos: datosEncriptados, llave: LLAVE_SEGUNDA },
      process.env.JWT_SECRETO,
      { expiresIn: "15m" }
    );
    return token;
  }

  throw new Error("No existe este usuario.");
};

module.exports = {
  login,
};
