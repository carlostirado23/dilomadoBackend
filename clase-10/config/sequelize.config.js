const { Sequelize } = require("sequelize");
const { HOST, USUARIO_BD, BASE_DE_DATOS, CONTRASENA } = process.env;

const sequelize = new Sequelize(BASE_DE_DATOS, USUARIO_BD, CONTRASENA, {
  host: HOST,
  dialect: "mysql",
  logging: false,
  port: 3306,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("ESTOY FUNCIONANDO DESDE EL ORM");
  } catch (error) {
    console.log("NO FUNCIONO LA CONEXION AL ORM :(");
  }
};

module.exports = {
  sequelize,
  testConnection,
};
