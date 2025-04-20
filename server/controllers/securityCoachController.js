// server/controllers/securityCoachController.js
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

export const handleSecurityCoachChat = async (req, res) => {
  const { question: userMessage } = req.body;
  if (!userMessage)
    return res.status(400).json({ error: "Missing user message" });

  const prompt = `You are a helpful cybersecurity coach. Answer the user query clearly. If they ask for a quiz or game, generate an interactive format.

User: ${userMessage}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini Security Coach error:", err);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
};
