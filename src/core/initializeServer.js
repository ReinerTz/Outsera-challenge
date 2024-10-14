import express from "express";
import { loadMovies } from "../scripts/loadCsv.js";
import sequelize from "../config/database.js";
import routes from "../routes/index.js";

const app = express();
const defaultPort = 3000;

app.use("/api", routes);
app.use(express.json());

export const initializeServer = async () => {
  try {
    await sequelize.sync({ force: true });
    await loadMovies();
  } catch (err) {
    console.error("Error initializing server", err);
  }
  return app;
};

export const startServer = async (port = defaultPort) => {
  const appInstance = await initializeServer();
  const server = appInstance.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on("close", async () => {
    await sequelize.close();
  });

  return { app: appInstance, server };
};
