import fs from "fs";
import csv from "csv-parser";
import Movie from "../models/movie.js";
import path from "path";

const parseCsv = () => {
  const fileName = "./src/data/movielist.csv";
  const file = path.resolve(fileName);

  const result = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        const data = {
          year: parseInt(row["year"]),
          title: row["title"],
          studios: row["studios"],
          producers: row["producers"],
          winner:
            row["winner"].toString().toLocaleLowerCase() === "yes"
              ? true
              : false,
        };
        result.push(data);
      })
      .on("end", () => {
        resolve(result);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export const loadMovies = async () => {
  const movies = await parseCsv();

  await Movie.bulkCreate(movies).then(() => {
    console.log("Data created");
  });
};
