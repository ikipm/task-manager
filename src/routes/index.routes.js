import { Router } from "express";
import { RegisterUser, RenderLogin } from "../controllers/login.controller";
import {
  AddTask,
  DeleteTask,
  EditTask,
  LoadTasks,
  RenderTaskEdit,
  ToggleDone,
  RenderAbout,
} from "../controllers/task.controller";

const router = Router();

// Get routers
router.get("/about", RenderAbout);

router.get("/login", RenderLogin);

router.get("/:showAlert?", LoadTasks);

router.get("/task/edit/:id", RenderTaskEdit);

router.get("/task/delete/:id", DeleteTask);

router.get("/task/done/:id", ToggleDone);

// Post routers
router.post("/task/add", AddTask);

router.post("/task/edit/:id", EditTask);

router.post("/register", RegisterUser);

export default router;
