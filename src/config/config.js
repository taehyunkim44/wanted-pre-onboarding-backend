import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "qwer1234",
    database: process.env.DB_NAME || "database",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};

const sequelize = new Sequelize(config[env]);

export default sequelize;
