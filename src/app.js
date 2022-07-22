import express from "express";
import session from "express-session";
import { create } from "express-handlebars";
import { PASSWORD } from "./config";
import indexRoutes from "./routes/index.routes";
import path from "path";

const app = express();

// Set views path
app.set("views", path.join(__dirname, "views"));

// Add handlebars engine configuration
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);

// Middleware
app.use(express.urlencoded({ extended: false })); // for post request. Convert to a JSON file the req.
app.use(session({ secret: PASSWORD, secure: true, resave: true, saveUninitialized: true })); // password for managing sessions in express.

// Set handlebars as the default template engine
app.set("view engine", ".hbs");

// Use routes
app.use(indexRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));

export default app;
