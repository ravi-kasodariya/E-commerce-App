"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("reviews", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rating: { type: Sequelize.FLOAT, allowNull: true },
      review: { type: Sequelize.STRING, allowNull: true },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: "products", key: "id" },
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: { model: "orders", key: "id" },
        onDelete: "CASCADE",
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("reviews");
  },
};
