import TaskModel from "../models/Task";
import ApiModel from "../models/Api";

// Creating API token
const RenderApiToken = async (req, res) => {
  const token = await ApiModel.find({ userID: req.session.userID }).lean();
  res.render("apiToken", { token });
};

const GetTasksApi = async (req, res) => {
  try {
    const tokenEntry = await ApiModel.find({
      token: req.headers.authorization,
    }).lean();
    if (!tokenEntry) { error }
    const tasks = await TaskModel.find({ userID: tokenEntry[0].userID }).lean();
    res.send(tasks);
  } catch (error) {
    res.status(401).send({
      message: "Token not valid or expired",
    });
  }
};

const CreateToken = async (req, res) => {
  var chars =
    "0sda123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var token = "";
  for (var i = 0; i <= 50; i++) {
    token += chars[Math.floor(Math.random() * 40)];
  }

  req.body.userID = req.session.userID;
  req.body.token = token;

  await ApiModel(req.body).save();
  res.redirect("/api/create-token");
};

const DeleteToken = async (req, res) => {
  try {
    const token = await ApiModel.find({ token: req.params.token });
    if (token[0].userID === req.session.userID) {
      await ApiModel.findOneAndDelete({ token: req.params.token });
      res.redirect("/api/create-token");
    } else {
      res.status(404).render("404");
    }
  } catch (error) {
    console.error(error);
    res.status(404).render("404");
  }
};

export { GetTasksApi, RenderApiToken, CreateToken, DeleteToken };
