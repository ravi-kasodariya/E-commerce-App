const Sequelize = require("sequelize");
const config = require("../config/config.json");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userType: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      firstName: { type: Sequelize.STRING, allowNull: true },
      lastName: { type: Sequelize.STRING, allowNull: true },
      password: { type: Sequelize.STRING, allowNull: false },
      profilePic: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
          const pic = this.getDataValue("profile_pic");
          return pic ? config.site_url + pic : "";
        },
      },
      phone: { type: Sequelize.STRING, allowNull: false },
    },
    { tableName: "users" }
  );

  // User.associate = function (models) {
  //   User.hasMany(models.Order, {
  //     foreignKey: "userId",
  //     as: "userId",
  //   });
  // };
  return User;
};
