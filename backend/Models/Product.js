const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING, allowNull: true },
      category: { type: Sequelize.STRING, allowNull: true },
      type: { type: Sequelize.STRING, allowNull: true },
      image: { type: Sequelize.STRING, allowNull: true },
      price: { type: Sequelize.FLOAT, allowNull: true },
      discount: { type: Sequelize.STRING, allowNull: true },
      description: { type: Sequelize.STRING, allowNull: true },
      detailedDescription: { type: Sequelize.STRING, allowNull: true },
      sellerId: {
        type: Sequelize.INTEGER,
        references: { model: "sellers", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
    { tableName: "products" }
  );

  Product.associate = function (models) {
    Product.hasMany(models.Review, {
      foreignKey: "productId",
      as: "reviews",
    });

    Product.hasMany(models.Review, {
      foreignKey: "productId",
      as: "review",
    });

    Product.hasOne(models.Order, {
      foreignKey: "productId",
      as: "order",
    });

    Product.belongsTo(models.Seller, {
      foreignKey: "sellerId",
      as: "seller",
    });
  };

  return Product;
};
