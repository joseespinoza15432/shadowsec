import express from "express";
import { analyzePhishingLink } from "../controllers/phishingController.js";

const router = express.Router();

router.post("/", analyzePhishingLink);

export default router;
