import { Router } from "express";
import {
  IfIsLogged,
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
import {
  CreateToken,
  DeleteToken,
  GetTasksApi,
  RenderApiToken,
} from "../controllers/api.controller";

const router = Router();

// Get routers
router.get("/about", RenderAbout);

router.get("/login", RenderLogin);

router.get("/logout", IfIsLogged, LogoutUser);

router.get("/:otherPage?", IfIsLogged, LoadTasks);

router.get("/task/edit/:id", IfIsLogged, RenderTaskEdit);

router.get("/task/delete/:id", IfIsLogged, DeleteTask);

router.get("/task/done/:id", IfIsLogged, ToggleDone);

router.get("/task/info/:id", IfIsLogged, RenderTaskInfo);

router.get("/share/:id", IfIsLogged, RenderShare);

router.get("/share/delete/:id/:user", IfIsLogged, DeleteShareUser);

// Post routers
router.post("/task/add", IfIsLogged, AddTask);

router.post("/task/edit/:id", IfIsLogged, EditTask);

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

router.post("/share/add/:id", IfIsLogged, AddShareUser);

///////////////// API /////////////////

// Get routers
router.get("/api/create-token", IfIsLogged, RenderApiToken);

router.get("/api/delete-token/:token", IfIsLogged, DeleteToken);

router.get("/api/tasks", GetTasksApi);

// Post routers
router.post("/api/create-token", IfIsLogged, CreateToken);

export default router;
