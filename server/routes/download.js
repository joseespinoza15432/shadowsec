import express from "express";
import { handleDownload } from "../controllers/downloadController.js";

const router = express.Router();

// GET /api/download/:key

router.get("/:key", handleDownload);

export default router;
