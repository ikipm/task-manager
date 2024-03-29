import UsersModel from "../models/Users";
import bcrypt from "bcrypt";

// Check if user is logged
const IfIsLogged = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

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
    if (!req.session.user) {
      req.body.password = bcrypt.hashSync(req.body.password, 10); // encrypt key
      const dbUser = await UsersModel(req.body).save(); // saves the user in the db
      req.session.user = req.body.user;
      req.session.userID = dbUser._id;
      req.session.email = req.body.email;
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.render("nologed", { showRegisterAlert: true });
    console.error(error);
  }
};

// Compare if the credentials are right and logs in with the user
const LoginUser = (req, res) => {
  try {
    if (!req.session.user) {
      // find the user in the db
      UsersModel.find({ user: req.body.user }, function (error, dbEntry) {
        try {
          // compare db password and form
          if (bcrypt.compareSync(req.body.password, dbEntry[0].password)) {
            req.session.user = req.body.user;
            req.session.userID = dbEntry[0]._id;
            req.session.email = dbEntry[0].email;
            res.redirect("/");
          } else {
            res.render("nologed", { showLoginAlert: true });
          }
        } catch (error) {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
  }
};

// Logging out user
const LogoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

export { IfIsLogged, RenderLogin, RegisterUser, LoginUser, LogoutUser };
