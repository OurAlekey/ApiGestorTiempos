import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import Category from "./category";

const Event = sequelize.define(
  "evento",
  {
    id_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ubicacion: {
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

try {
  Category.hasMany(Event, { foreignKey: "categoria_id" });
  Event.belongsTo(Category, { foreignKey: "categoria_id" });
} catch (error) {
  console.log(error);
}

export default Event;
