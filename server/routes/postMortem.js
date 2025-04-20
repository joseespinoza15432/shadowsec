import express from "express";
import multer from "multer";
import { handlePostMortemUpload } from "../controllers/postMortemController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("logfile"), handlePostMortemUpload);

export default router;
