import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "qwer1234",
    database: process.env.DB_NAME || "wanted-pre-onboarding",
    host: process.env.DB_HOST || "my-database",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};

const sequelize = new Sequelize(config[env]);

export default sequelize;
