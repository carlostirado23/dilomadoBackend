const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sequelize.config");
class Roles extends Model {}

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "roles",
  }
);

module.exports = Roles;
