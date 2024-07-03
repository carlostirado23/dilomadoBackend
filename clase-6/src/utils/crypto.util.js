const crypto = require("crypto");
const { ALGORITMO, CONTRASENA_CRYPTO, CONTRASENA_CRYPTO_SEGUNDA } = process.env;

const LLAVE = crypto
  .createHash("sha512")
  .update(CONTRASENA_CRYPTO)
  .digest("hex")
  .substring(0, 32);

const LLAVE_SEGUNDA = crypto
  .createHash("sha512")
  .update(CONTRASENA_CRYPTO_SEGUNDA)
  .digest("hex")
  .substring(0, 16);

const encriptacion = (texto = "") => {
  const cifrado = crypto.createCipheriv(ALGORITMO, LLAVE, LLAVE_SEGUNDA);
  return Buffer.from(
    cifrado.update(texto, "utf8", "hex") + cifrado.final("hex")
  ).toString("base64");
};

const desencriptado = (texto = "") => {
  const buffer = Buffer.from(texto, "base64");
  const desencriptadoFinal = crypto.createDecipheriv(
    ALGORITMO,
    LLAVE,
    LLAVE_SEGUNDA
  );
  return (
    desencriptadoFinal.update(buffer.toString("utf8"), "hex", "utf8") +
    desencriptadoFinal.final("utf8")
  );
};

module.exports = {
  encriptacion,
  desencriptado,
  LLAVE_SEGUNDA
};
