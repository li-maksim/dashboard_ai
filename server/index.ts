import "dotenv/config";
import cors from "cors";
import express from "express";
import { mapErrorToHttp } from "./errors.js";
import { askGemini } from "./gemini";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/ask", async (req, res) => {
  const question =
    typeof req.body?.question === "string" ? req.body.question.trim() : "";

  if (!question) {
    return res.status(400).json({ error: "Введите вопрос" });
  }

  try {
    const answer = await askGemini(question);
    return res.json({ answer });
  } catch (error) {
    const { status, message } = mapErrorToHttp(error);
    return res.status(status).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
