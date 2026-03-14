import { NextRequest, NextResponse } from "next/server";
import { generateExplanation } from "@/lib/aiClient";
import { ExplainRequest, ExplainResponse, ExplainError } from "@/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ExplainResponse | ExplainError>> {
  try {
    const body: ExplainRequest = await request.json();

    if (!body.topic || typeof body.topic !== "string" || body.topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a topic to continue." },
        { status: 400 }
      );
    }

    const topic = body.topic.trim();

    const explanation = await generateExplanation(topic);

    return NextResponse.json({ explanation });
  } catch (error: unknown) {
    console.error("API /api/explain error:", error);

    // Surface the specific error message when possible
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
