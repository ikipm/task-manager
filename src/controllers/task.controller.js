import TaskModel from "../models/Task";
import { user, userID } from "./login.controller";

// Add the task
const AddTask = async (req, res) => {
  if (user === "N/A") {
    res.redirect("/login");
  } else {
    try {
      req.body.userID = userID;
      await TaskModel(req.body).save(); // Save the task into the db.
      res.redirect("/"); // Redirect to home when finishing.
    } catch (error) {
      console.error(error); // if there is an error, show it
    }
  }
};

// Delete the task
const DeleteTask = async (req, res) => {
  if (user === "N/A") {
    res.redirect("/login");
  } else {
    await TaskModel.findByIdAndDelete(req.params.id); // find a task by the id and delete it.
    res.redirect("/"); // redirect to index.hbs file
  }
};

// Edit tasks
const EditTask = async (req, res) => {
  if (user === "N/A") {
    res.redirect("/login");
  } else {
    await TaskModel.findByIdAndUpdate(req.params.id, req.body); // Update the task by the id
    res.redirect("/"); // redirect to index.hbs file
  }
};

const RenderTaskEdit = async (req, res) => {
  if (user === "N/A") {
    res.redirect("/login");
  } else {
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
  }
};

// Load tasks
const LoadTasks = async (req, res) => {
  if (user !== "N/A") {
    const tasks = await TaskModel.find({ userID: userID }).lean();
    if (!req.params.otherPage) {
      res.render("index", { tasks, user }); // rendering index.hbs file when user visits /
    } else {
      res.render("404");
    }
  } else {
    res.redirect("/login");
  }
};

// ToggleDone from tasks
const ToggleDone = async (req, res) => {
  if (user === "N/A") {
    res.redirect("/login");
  } else {
    const task = await TaskModel.findById(req.params.id); // getting tasks from the db by the id
    task.done = !task.done; // set done with the opposite value
    await task.save(); // save the changes
    res.redirect("/"); // redirect to index.hbs file
  }
};

// Render about.hbs
const RenderAbout = (req, res) => {
  res.render("about");
};

// Render nologed.hbs and creates a user or logs in
const RenderLogin = (req, res) => {
  res.render("nologed");
};

export {
  AddTask,
  DeleteTask,
  EditTask,
  RenderTaskEdit,
  LoadTasks,
  ToggleDone,
  RenderAbout,
  RenderLogin,
};
