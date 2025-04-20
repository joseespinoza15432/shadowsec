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

export const analyzePhishingLink = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  const prompt = `Determine whether the following URL is a phishing attempt. If yes, explain why. If no, explain why not.\n\nURL: ${url}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const responseText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from model";

    res.json({ result: responseText });
  } catch (err) {
    console.error("Gemini phishing check error:", err);
    res.status(500).json({ error: "Gemini error" });
  }
};
