import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import Team from "./team";
import Event from "./event";
import Category from "./category";

const Competitor = sequelize.define(
  "participante",
  {
    id_participante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_competido: {
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
  Event.hasMany(Competitor, { foreignKey: "evento_id" });
  Competitor.belongsTo(Event, { foreignKey: "evento_id" });
  Team.hasMany(Competitor, { foreignKey: "equipo_id" });
  Competitor.belongsTo(Team, { foreignKey: "equipo_id" });
  Category.hasMany(Competitor, { foreignKey: "categoria_id" });
  Competitor.belongsTo(Category, { foreignKey: "categoria_id" });
} catch (error) {
  console.log(error);
}

export default Competitor;
