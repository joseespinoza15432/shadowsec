import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";
import downloadRoutes from "./routes/download.js";
import summarizeRoutes from "./routes/summarize.js";
import signS3Routes from "./routes/signS3.js";
import mongoose from "mongoose";
import fileRoutes from "./routes/files.js";
import phishingRoutes from "./routes/phishing.js";
import contactRoutes from "./routes/contact.js";
import securityCoachRoutes from "./routes/securityCoach.js";
import postMortemRoutes from "./routes/postMortem.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadRoutes);
app.use("/api/download", downloadRoutes);
app.use("/api/summarize", summarizeRoutes);
app.use("/api/sign-s3", signS3Routes);
app.use("/api/files", fileRoutes);
app.use("/api/phishing", phishingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/security-coach", securityCoachRoutes);
app.use("/api/post-mortem", postMortemRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("ShadowSec backend running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
