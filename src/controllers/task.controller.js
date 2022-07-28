import TaskModel from "../models/Task";
import UsersModel from "../models/Users";

// Add the task
const AddTask = async (req, res) => {
  if (req.session.user) {
    try {
      req.body.userID = req.session.userID;
      await TaskModel(req.body).save(); // Save the task into the db.
      res.redirect("/"); // Redirect to home when finishing.
    } catch (error) {
      console.error(error); // if there is an error, show it
    }
  } else {
    res.redirect("/login");
  }
};

// Delete the task
const DeleteTask = async (req, res) => {
  if (req.session.user) {
    const task = await TaskModel.findById(req.params.id).lean();
    if (task.userID === req.session.userID) {
      await TaskModel.findByIdAndDelete(req.params.id); // find a task by the id and delete it.
      res.redirect("/"); // redirect to index.hbs file
    } else {
      res.render("404");
    }
  } else {
    res.redirect("/login");
  }
};

// Task info
const RenderTaskInfo = async (req, res) => {
  if (req.session.user) {
    const task = await TaskModel.findById(req.params.id).lean(); // getting tasks from the db by the id and converting to normal js object.
    const creator = await UsersModel.findById(task.userID).lean();
    if (
      task.userID === req.session.userID ||
      task.share.includes(req.session.email)
    ) {
      if (task && creator) {
        res.render("info", { task, creator }); // rendering info.hbs file when user visits /info
      } else {
        res.redirect("/"); // redirect to index.hbs file
      }
    } else {
      res.render("404");
    }
  } else {
    res.redirect("/login");
  }
};

// Edit tasks
const EditTask = async (req, res) => {
  if (req.session.user) {
    const task = await TaskModel.findById(req.params.id).lean();
    if (task.userID === req.session.userID) {
      await TaskModel.findByIdAndUpdate(req.params.id, req.body); // Update the task by the id
      res.redirect("/"); // redirect to index.hbs file
    } else {
      res.render("404");
    }
  } else {
    res.redirect("/login");
  }
};

const RenderTaskEdit = async (req, res) => {
  if (req.session.user) {
    try {
      const task = await TaskModel.findById(req.params.id).lean(); // getting tasks from the db by the id and converting to normal js object.
      if (task.userID === req.session.userID) {
        if (task) {
          res.render("edit", { task }); // rendering edit.hbs file when user visits /edit
        } else {
          res.redirect("/"); // redirect to index.hbs file
        }
      } else {
        res.render("404");
      }
    } catch (error) {
      console.error(error); // if there is an error, show it
    }
  } else {
    res.redirect("/login");
  }
};

// Load tasks
const LoadTasks = async (req, res) => {
  if (req.session.user) {
    const tasks = await TaskModel.find({ userID: req.session.userID }).lean();
    const shareTasks = await TaskModel.find({
      share: req.session.email,
    }).lean();
    if (!req.params.otherPage) {
      const user = req.session.user;
      res.render("index", { tasks, shareTasks, user }); // rendering index.hbs file when user visits /
    } else {
      res.render("404");
    }
  } else {
    res.redirect("/login");
  }
};

// ToggleDone from tasks
const ToggleDone = async (req, res) => {
  if (req.session.user) {
    const task = await TaskModel.findById(req.params.id); // getting tasks from the db by the id
    task.done = !task.done; // set done with the opposite value
    await task.save(); // save the changes
    res.redirect("/"); // redirect to index.hbs file
  } else {
    res.redirect("/login");
  }
};

// Share system
const RenderShare = async (req, res) => {
  if (req.session.user) {
    const task = await TaskModel.findById(req.params.id).lean();
    if (task.userID === req.session.userID) {
      const users = task.share; // get array of the users that have access to the task
      res.render("share", { task, users });
    } else {
      res.render("404");
    }
  } else {
    res.redirect("/login");
  }
};

const AddShareUser = async (req, res) => {
  if (req.session.user) {
    const task = await TaskModel.findById(req.params.id).lean();
    if (task.userID === req.session.userID) {
      if (!task.share.includes(req.body.userEmail)) {
        // if the array have the element it doesn't add it
        task.share.push(req.body.userEmail);
        await TaskModel.findByIdAndUpdate(req.params.id, task);
      }
      res.redirect("/share/" + req.params.id);
    } else {
      res.render("404");
    }
  } else {
    res.redirect("/login");
  }
};

const DeleteShareUser = async (req, res) => {
  if (req.session.user) {
    const task = await TaskModel.findById(req.params.id).lean();
    if (task.userID === req.session.userID) {
      task.share = task.share.filter((data) => data != req.params.user); // delete the entries with the same user
      await TaskModel.findByIdAndUpdate(req.params.id, task);
      res.redirect("/share/" + req.params.id);
    } else {
      res.render("404")
    }
  } else {
    res.redirect("/login");
  }
};

// Render about.hbs
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
  RenderTaskInfo,
  RenderShare,
  AddShareUser,
  DeleteShareUser,
};
