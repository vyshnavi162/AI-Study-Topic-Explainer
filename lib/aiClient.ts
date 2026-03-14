/**
 * Gemini AI Client
 *
 * Handles communication with the Google Gemini API
 * to generate topic explanations for students.
 */

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateExplanation(topic: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please set it in your environment variables."
    );
  }

  const prompt = `Explain the topic "${topic}" in simple, clear language suitable for a student. Keep the explanation short and easy to understand. Use at most 4 to 6 sentences.`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      console.log(`Retrying Gemini API call (attempt ${attempt + 1})...`);
      await sleep(RETRY_DELAY_MS * attempt);
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (response.status === 429) {
      lastError = new Error(
        "API rate limit reached. Please wait a moment and try again."
      );
      console.warn(`Gemini API rate limited (429) on attempt ${attempt + 1}`);
      continue;
    }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Gemini API error (${response.status}):`, errorBody);
      throw new Error(`Gemini API request failed (${response.status}).`);
    }

    const data = await response.json();

    const explanation =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!explanation) {
      throw new Error("No explanation was returned from the AI model.");
    }

    return explanation;
  }

  // All retries exhausted
  throw lastError ?? new Error("Failed to get a response from the AI model.");
}
