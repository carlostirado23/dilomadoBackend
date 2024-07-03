const { verificarToken, verificarRol } = require("../utils/jwt.util");

const jwtMiddleware =
  (roles = []) =>
  (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      res.status(401).json({ mensaje: "Token no encontrado" });
      return null;
    }

    const [, TOKEN] = token.split(" ");

    if (!TOKEN) {
      res.status(401).json({ mensaje: "Acceso denegado" });
      return null;
    }

    const verificado = verificarToken(TOKEN);
    if (
      verificado === false ||
      verificarRol(roles, verificado.rolId) === false
    ) {
      res.status(401).json({ mensaje: "Acceso denegado" });
      return null;
    }

    req.user = verificado;

    next();
    return null;
  };

module.exports = jwtMiddleware;
