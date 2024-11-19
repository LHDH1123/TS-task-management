import { Router } from "express";
import * as controller from "../controllers/task.controller"
const router: Router = Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMultiPatch);

router.post("/create", controller.createPost);

router.patch("/edit/:id", controller.editPatch);

router.delete("/delete/:id", controller.deleteTask);


export const taskRoutes: Router = router;
