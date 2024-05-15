import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import Competitor from "./competitor";
import User from "./user";
import CheckPoint from "./check-point";

const Time = sequelize.define(
  "tiempo",
  {
    id_tiempo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tiempo: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    tipo_registro: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

try {
  Competitor.hasMany(Time, { foreignKey: "participante_id" });
  Time.belongsTo(Competitor, { foreignKey: "participante_id" });
  User.hasMany(Time, { foreignKey: "usuario_id" });
  Time.belongsTo(User, { foreignKey: "usuario_id" });
  CheckPoint.hasMany(Time, { foreignKey: "punto_control_id" });
  Time.belongsTo(CheckPoint, { foreignKey: "punto_control_id" });
} catch (error) {
  console.log(error);
}

export default Time;
