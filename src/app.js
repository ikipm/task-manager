import express from "express";
import { create } from "express-handlebars";
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

// Set handlebars as the default template engine
app.set("view engine", ".hbs");

// Use routes
app.use(indexRoutes);

export default app;
