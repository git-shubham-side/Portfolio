import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.render("index", {
    title: "Shubham Rathod — Full Stack Developer",
  });
});

export default router;
