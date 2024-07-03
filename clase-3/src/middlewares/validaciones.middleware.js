const { validationResult } = require("express-validator");

function validacionDeParametros(req, res, next) {
  const errores = validationResult(req);
  console.log("Validaciones", !errores.isEmpty());
  if (!errores.isEmpty()) {
    res.status(400).json({
      errores: errores.array(),
    });

    return null;
  }

  next();
}

module.exports = validacionDeParametros;
