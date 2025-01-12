const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
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
      quantity: {
        type: Sequelize.INTEGER,
      },
      status: { type: Sequelize.STRING, allowNull: true },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    { tableName: "orders" }
  );

  Order.associate = function (models) {
    Order.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });

    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Order;
};
