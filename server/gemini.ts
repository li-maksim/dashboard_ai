import { GoogleGenerativeAI } from "@google/generative-ai";
import { EmptyResponseError, MissingApiKeyError } from "./errors.js";
import { SYSTEM_PROMPT } from "./prompts/systemPrompt";

const MODEL = "gemini-2.5-flash";

export async function askGemini(question: string): Promise<string> {
  // Mock mode – return a deterministic fake answer
  if (process.env.MOCK_API === "true") {
    return `🤖 Мок‑ответ на: ${question}`;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new MissingApiKeyError();
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500,
    },
  });

  const result = await model.generateContent(question);
  const answer = result.response.text().trim();

  if (!answer) {
    throw new EmptyResponseError();
  }

  return answer;
}
