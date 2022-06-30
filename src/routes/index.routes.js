import { Router } from "express";
import TaskModel from "../models/Task";

const router = Router();

// Get routers
router.get("/", (req, res) => {
  res.render("index"); // rendering index.hbs file when user visits /
});

router.get("/about", (req, res) => {
  res.render("about"); // rendering about.hbs file when user visits /about
});

router.get("/edit", (req, res) => {
  res.render("edit"); // rendering edit.hbs file when user visits /edit
});

// Post routers
router.post("/tasks/add", async (req, res) => {
  await TaskModel(req.body).save(); // Save the task into the db.
  res.redirect("/"); // Redirect to home when finishing.
});

export default router;
