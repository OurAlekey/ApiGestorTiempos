import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import Event from "./event";
import User from "./user";

const CheckPoint = sequelize.define(
  "punto_control",
  {
    id_punto_control: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kilometro: {
      type: DataTypes.DECIMAL(10, 2),
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
  Event.hasMany(CheckPoint, { foreignKey: "evento_id" });
  CheckPoint.belongsTo(Event, { foreignKey: "evento_id" });
  User.hasMany(CheckPoint, { foreignKey: "id_usuario" });
  CheckPoint.belongsTo(User, { foreignKey: "id_usuario" });
} catch (error) {
  console.log(error);
}

export default CheckPoint;
