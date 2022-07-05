import { Router } from "express";
import TaskModel from "../models/Task";

const router = Router();

// Get routers
router.get("/", async (req, res) => {
  const tasks = await TaskModel.find().lean(); // getting tasks from the db and converting to normal js object.
  res.render("index", { tasks }); // rendering index.hbs file when user visits /
});

router.get("/about", (req, res) => {
  res.render("about"); // rendering about.hbs file when user visits /about
});

router.get("/edit/:id", async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id).lean(); // getting tasks from the db by the id and converting to normal js object.
    if (task) {
      res.render("edit", { task }); // rendering edit.hbs file when user visits /edit
    } else {
      res.redirect("/"); // redirect to index.hbs file
    }
  } catch (error) {
    console.error(error); // if there is an error, show it
  }
});

router.get("/delete/:id", async (req, res) => {
  await TaskModel.findByIdAndDelete(req.params.id); // find a task by the id and delete it.
  res.redirect("/"); // redirect to index.hbs file
});

router.get("/done/:id", async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  task.done = !task.done;
  await task.save();
  res.redirect("/"); // redirect to index.hbs file
});

// Post routers
router.post("/tasks/add", async (req, res) => {
  try {
    await TaskModel(req.body).save(); // Save the task into the db.
    res.redirect("/"); // Redirect to home when finishing.
  } catch (error) {
    console.error(error); // if there is an error, show it
  }
});

router.post("/edit/:id", async (req, res) => {
  await TaskModel.findByIdAndUpdate(req.params.id, req.body); // Update the task by the id
  res.redirect("/"); // redirect to index.hbs file
});

export default router;
