import express from "express";
import { handleSecurityCoachChat } from "../controllers/securityCoachController.js";

const router = express.Router();
router.post("/", handleSecurityCoachChat);

export default router;
