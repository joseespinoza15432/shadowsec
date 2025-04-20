// server/routes/signS3.js
import express from "express";
import { handleSignS3 } from "../controllers/signS3Controller.js";

const router = express.Router();
router.post("/", handleSignS3);

export default router;
