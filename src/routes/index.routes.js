import { Router } from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
  RenderLogin,
} from "../controllers/login.controller";
import {
  AddTask,
  DeleteTask,
  EditTask,
  LoadTasks,
  RenderTaskEdit,
  ToggleDone,
  RenderAbout,
  RenderTaskInfo,
  RenderShare,
  AddShareUser,
  DeleteShareUser,
} from "../controllers/task.controller";

const router = Router();

// Get routers
router.get("/about", RenderAbout);

router.get("/login", RenderLogin);

router.get("/logout", LogoutUser);

router.get("/:otherPage?", LoadTasks);

router.get("/task/edit/:id", RenderTaskEdit);

router.get("/task/delete/:id", DeleteTask);

router.get("/task/done/:id", ToggleDone);

router.get("/task/info/:id", RenderTaskInfo);

router.get("/share/:id", RenderShare);

router.get("/share/delete/:id/:user", DeleteShareUser)

// Post routers
router.post("/task/add", AddTask);

router.post("/task/edit/:id", EditTask);

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

router.post("/share/add/:id", AddShareUser)

export default router;
