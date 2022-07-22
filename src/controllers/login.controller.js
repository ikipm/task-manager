import UsersModel from "../models/Users";
import bcrypt from "bcrypt";

// Render nologed.hbs and creates a user or logs in
const RenderLogin = (req, res) => {
  // if user redirects to index
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("nologed");
  }
};

// Save the user in the db encrypting the key
const RegisterUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10); // encrypt key
    const dbUser = await UsersModel(req.body).save(); // saves the user in the db
    req.session.user = req.body.user;
    req.session.userID = dbUser._id;
    res.redirect("/");
  } catch (error) {
    res.render("nologed", { showRegisterAlert: true });
    console.error(error);
  }
};

// Compare if the credentials are right and logs in with the user
const LoginUser = (req, res) => {
  try {
    // find the user in the db
    UsersModel.find({ user: req.body.user }, function (error, dbEntry) {
      try {
        // compare db password and form
        if (bcrypt.compareSync(req.body.password, dbEntry[0].password)) {
          req.session.user = req.body.user;
          req.session.userID = dbEntry[0]._id;
          res.redirect("/");
        } else {
          res.render("nologed", { showLoginAlert: true });
        }
      } catch (error) {
        res.redirect("/login");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// Logging out user
const LogoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

export { RenderLogin, RegisterUser, LoginUser, LogoutUser };
