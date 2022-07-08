import TaskModel from "../models/Task";

// Add the task
const AddTask = async (req, res) => {
  try {
    await TaskModel(req.body).save(); // Save the task into the db.
    res.redirect("/"); // Redirect to home when finishing.
  } catch (error) {
    res.redirect("/error");
    console.error(error); // if there is an error, show it
  }
};

// Delete the task
const DeleteTask = async (req, res) => {
  await TaskModel.findByIdAndDelete(req.params.id); // find a task by the id and delete it.
  res.redirect("/"); // redirect to index.hbs file
};

// Edit tasks
const EditTask = async (req, res) => {
  await TaskModel.findByIdAndUpdate(req.params.id, req.body); // Update the task by the id
  res.redirect("/"); // redirect to index.hbs file
};

const RenderTaskEdit = async (req, res) => {
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
};

// Load tasks
const LoadTasks = async (req, res) => {
  const tasks = await TaskModel.find().lean(); // getting tasks from the db and converting to normal js object.
  if (req.params.showAlert === "error") {
    res.render("index", { tasks, showAlert: true }); // rendering index.hbs file when user visits / and showing alert
  } else if (!req.params.showAlert) {
    res.render("index", { tasks }); // rendering index.hbs file when user visits /
  } else {
    res.render("404")
  }
};

// ToggleDone from tasks
const ToggleDone = async (req, res) => {
  const task = await TaskModel.findById(req.params.id); // getting tasks from the db by the id
  task.done = !task.done; // set done with the opposite value
  await task.save(); // save the changes
  res.redirect("/"); // redirect to index.hbs file
};

const RenderAbout = (req, res) => {
  res.render("about");
};

export {
  AddTask,
  DeleteTask,
  EditTask,
  RenderTaskEdit,
  LoadTasks,
  ToggleDone,
  RenderAbout,
};
