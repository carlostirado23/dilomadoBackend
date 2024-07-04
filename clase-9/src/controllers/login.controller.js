const ejecutarQuery = require("../../config/base-de-datos.config");
const Usuarios = require("../models/Usuarios.model");
const { encriptacion, LLAVE_SEGUNDA } = require("../utils/crypto.util");
const { compararContrasena } = require("../utils/functions.util");
const { crearToken } = require("../utils/jwt.util");

const login = async (email = "", contrasenaParam = "") => {
  try {
    const usuario = await Usuarios.findOne({
      where: { email },
    });
    if (usuario && usuario.dataValues) {
      const { contrasena, rol_id } = usuario.dataValues;
      const comparacion = await compararContrasena(contrasena, contrasenaParam);
      if (comparacion === false) {
        return Promise.reject({
          mensaje: "El email o la contraseña no son conrrectas",
        });
      }

      const jwtData = {
        email,
        rolId: rol_id,
      };

      const datosEncriptados = encriptacion(JSON.stringify(jwtData));
      const token = crearToken(
        { datos: datosEncriptados, llave: LLAVE_SEGUNDA },
        process.env.JWT_SECRETO,
        { expiresIn: "15m" }
      );
      return token;
    }

    return Promise.reject({ mesaje: "No existe este usuario." });
  } catch (error) {
    return Promise.reject({ error });
  }
};

module.exports = {
  login,
};
