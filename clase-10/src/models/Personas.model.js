const { Model, DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../config/sequelize.config");
const Usuarios = require("./Usuarios.model");

class Personas extends Model {}

Personas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuarios,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    update_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "personas",
    timestamps: false,
  }
);

Usuarios.hasOne(Personas, { foreignKey: "usuario_id" });
Personas.belongsTo(Usuarios, { foreignKey: "usuario_id" });

module.exports = Personas;
