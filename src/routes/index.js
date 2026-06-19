import { Router } from "express";
import contactRoutes from "./contact.js";
import homeRoutes from "./home.js";
import resumeRoutes from "./resume.js";

const router = Router();

router.use("/", homeRoutes);
router.use("/resume", resumeRoutes);
router.use("/api/contact", contactRoutes);

export default router;
