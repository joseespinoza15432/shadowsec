import express from "express";
import {
  saveFileMetadata,
  getAllFiles,
} from "../controllers/fileController.js";

const router = express.Router();

router.post("/", saveFileMetadata);
router.get("/", getAllFiles);

export default router;
