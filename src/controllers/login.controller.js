import UsersModel from "../models/Users";
import bcrypt from "bcrypt";

// Render nologed.hbs and creates a user or logs in
const RenderLogin = (req, res) => {
  res.render("nologed");
};

// Save the user in the db encrypting the key
const RegisterUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    await UsersModel(req.body).save();
    res.send(req.body);
  } catch (error) {
    res.redirect("/");
    console.error(error);
  }
};

export { RenderLogin, RegisterUser };
