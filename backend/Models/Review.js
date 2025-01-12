const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define(
    "Review",
    {
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
    },
    { tableName: "reviews" }
  );

  Review.associate = function (models) {
    Review.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });

    Review.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Review;
};
