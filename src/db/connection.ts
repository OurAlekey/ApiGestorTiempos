import { Sequelize } from "sequelize";

const sequelize = new Sequelize("gestor_tiempos", "remoteuser", "root#2023", {
  host: "69.197.150.177",
  dialect: "mysql",
});

export default sequelize;
