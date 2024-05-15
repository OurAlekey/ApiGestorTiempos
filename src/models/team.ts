import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const Team = sequelize.define(
  "equipo",
  {
    id_equipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export default Team;