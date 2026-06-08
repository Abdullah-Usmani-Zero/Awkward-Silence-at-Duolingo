import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL;
  const baseUrl = process.env.OPENROUTER_BASE_URL;

  if (!apiKey || !model || !baseUrl) {
    return NextResponse.json(
      { error: "Missing OpenRouter env configuration" },
      { status: 500 }
    );
  }

  let message = "";
  try {
    const body = await req.json();
    message = typeof body?.message === "string" ? body.message : "";
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://openrouter.ai",
        "X-Title": "Duolingo Video Call - Lily",
      },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "You are a friendly Spanish conversation tutor. Reply in short, encouraging sentences.",
          },
          { role: "user", content: message || "¡Hola! ¿Cómo estás?" },
        ],
      }),
    });

    let data: {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    try {
      data = await response.json();
    } catch {
      return NextResponse.json(
        { error: "OpenRouter returned a non-JSON response" },
        { status: 502 }
      );
    }

    if (!response.ok) {
      const detail =
        data?.error?.message ?? `OpenRouter responded ${response.status}`;
      return NextResponse.json({ error: detail }, { status: response.status });
    }

    const reply = data?.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach OpenRouter" },
      { status: 502 }
    );
  }
}
