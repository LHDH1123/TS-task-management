import { taskRoutes } from "./task.route";
import { Express } from "express";

const mainV1Routes = (app: Express): void => {

  app.use("/tasks", taskRoutes);

};

export default mainV1Routes