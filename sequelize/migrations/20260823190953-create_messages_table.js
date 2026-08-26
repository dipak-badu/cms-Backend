"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.createTable("message", {
        id: {
          type: Sequelize.UUID(),
          allowNull: false,
          primaryKey: true,
          unique: true,
          defaultValue: Sequelize.UUIDV4(),
        },
        sender: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        receiver: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNullNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNullNull: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("Message");
  },
};
