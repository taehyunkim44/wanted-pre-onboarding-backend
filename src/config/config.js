import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dialect = process.env.DB_DIALECT || "mysql";

const config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: dialect,
  },
};

const sequelize = new Sequelize(config[env]);

export default sequelize;
