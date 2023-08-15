import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import bcrypt from "bcrypt";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    modelName: "User",
    tableName: "user",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      },
    },
  }
);

User.prototype.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
};

export default User;
