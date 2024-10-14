import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Movie = sequelize.define("Movie", {
  title: DataTypes.STRING,
  producers: DataTypes.STRING,
  studios: DataTypes.STRING,
  year: DataTypes.INTEGER,
  winner: DataTypes.BOOLEAN,
});

export default Movie;
