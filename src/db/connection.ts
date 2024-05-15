import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME || "dbname", process.env.DB_USER || "dbuser", process.env.DB_PASS || "dbpass",{
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
});

export default sequelize;