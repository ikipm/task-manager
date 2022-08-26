import express from "express";
import session from "express-session";
import { create } from "express-handlebars";
import { PASSWORD } from "./config";
import indexRoutes from "./routes/index.routes";
import path from "path";
import rateLimit from "express-rate-limit";

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
app.use(
  session({
    secret: PASSWORD,
    secure: true,
    resave: true,
    saveUninitialized: true,
  })
); // password for managing sessions in express.

var apiLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // Each minute
  max: 15, // 15 requests from each IP
  message: {
    message: "More requests than accepted. Only 15 requests each minute",
  },
});
app.use("/api", apiLimit); // Setting a limiter to API

var dbLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // Each minute
  max: 20, // 20 requests from each IP
});
app.use("/user", dbLimit); // Setting a limiter to login and register

var generalLimit = rateLimit({
  windowMs: 1 * 10 * 1000,
  max: 30,
});
app.use(generalLimit);

// Set handlebars as the default template engine
app.set("view engine", ".hbs");

// Use routes
app.use(indexRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// 404 configuration
app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
