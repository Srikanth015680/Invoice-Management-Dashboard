import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

// get analytics summary
router.get("/", getAnalytics);

export default router;