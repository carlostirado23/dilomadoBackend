"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "personas",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        nombres: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        apellidos: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        edad: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        update_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        timestamp: false,
        modelName: "personas",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("personas");
  },
};
