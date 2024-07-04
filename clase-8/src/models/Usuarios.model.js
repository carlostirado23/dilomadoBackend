const { Model, DataTypes, UUIDV4, Sequelize } = require("sequelize");
const { sequelize } = require("../../config/sequelize.config");
const Roles = require("./Roles.model");

class Usuarios extends Model {}

Usuarios.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Roles,
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
    modelName: "usuarios",
    timestamps: false,
  }
);

Usuarios.belongsTo(Roles, { foreignKey: "rol_id" });
Roles.hasOne(Usuarios, { foreignKey: "rol_id" });

module.exports = Usuarios;
