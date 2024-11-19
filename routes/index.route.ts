import { taskRoutes } from "./task.route";
import { userRoutes } from "./user.route";
import { Express } from "express";

const mainV1Routes = (app: Express): void => {

  app.use("/tasks", taskRoutes);

  app.use("/users", userRoutes);

};

export default mainV1Routes