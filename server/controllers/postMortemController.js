import { VertexAI } from "@google-cloud/vertexai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vertexAI = new VertexAI({
  project: "shadowsec-summarizer",
  location: "us-central1",
  googleAuthOptions: {
    keyFile: path.join(
      __dirname,
      "../auth/shadowsec-summarizer-2d6f09895601.json"
    ),
  },
});

const model = vertexAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-04-17",
});

export const handlePostMortemUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileText = req.file.buffer.toString("utf-8");

  const prompt = `Generate a detailed security post-mortem based on the following log data:\n\n${fileText}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const summary =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Gemini was unable to generate a summary.";

    res.json({ summary });
  } catch (err) {
    console.error("Gemini Post-Mortem error:", err);
    res.status(500).json({ error: "Failed to generate post-mortem summary" });
  }
};
