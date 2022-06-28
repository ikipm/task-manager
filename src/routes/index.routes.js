import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index"); // rendering index.hbs file when user visits /
});

router.get("/about", (req, res) => {
  res.render("about"); // rendering about.hbs file when user visits /about
});

router.get("/edit", (req, res) => {
  res.render("edit"); // rendering edit.hbs file when user visits /edit
});

export default router;
