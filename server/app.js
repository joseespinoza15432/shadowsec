import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("ShadowSec backend running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
