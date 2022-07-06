import { Router } from "express";
import {
  AddTask,
  DeleteTask,
  EditTask,
  LoadTasks,
  RenderTaskEdit,
  ToggleDone,
} from "../controllers/task.controller";

const router = Router();

// Get routers
router.get("/", LoadTasks);

router.get("/task/edit/:id", RenderTaskEdit);

router.get("/task/delete/:id", DeleteTask);

router.get("/task/done/:id", ToggleDone);

// Post routers
router.post("/task/add", AddTask);

router.post("/task/edit/:id", EditTask);

export default router;
