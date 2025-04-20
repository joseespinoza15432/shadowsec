import express from "express";
import multer from "multer";
import { handleUpload } from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/upload
router.post("/", upload.single("file"), handleUpload);

export default router;
