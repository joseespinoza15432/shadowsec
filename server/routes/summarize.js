import express from "express";
import { handleSummarize } from "../controllers/summarizeController.js";

const router = express.Router();

router.post("/", handleSummarize);

export default router;
