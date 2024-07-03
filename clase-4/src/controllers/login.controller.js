const ejecutarQuery = require("../../config/base-de-datos.config");
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
    const token = crearToken(jwtData, "SECRETO", { expiresIn: "15m" });

    return token;
  }

  throw new Error("No existe este usuario.");
};

module.exports = {
  login,
};
