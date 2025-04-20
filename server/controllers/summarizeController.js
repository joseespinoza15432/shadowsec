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

export const handleSummarize = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Missing text input" });

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Summarize the following text in plain language:\n\n${text}`,
            },
          ],
        },
      ],
    });

    const summary =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No Summary Generated.";

    res.json({ summary });
  } catch (err) {
    console.error("Vertex AI Gemini error:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
