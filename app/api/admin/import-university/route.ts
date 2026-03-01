import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required." }, { status: 400 });

    const pageRes = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Studymetaverse/1.0)" },
    });

    if (!pageRes.ok) {
      return NextResponse.json({ error: `Could not fetch page (${pageRes.status}). Try the university homepage URL.` }, { status: 400 });
    }

    const html = await pageRes.text();
    const cleaned = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 10000);

    // Also try to guess logo URL from common patterns
    const baseUrl = new URL(url).origin;
    const logoGuesses = [
      `${baseUrl}/img/logo.svg`,
      `${baseUrl}/images/logo.svg`,
      `${baseUrl}/logo.svg`,
      `${baseUrl}/assets/logo.svg`,
    ];

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      messages: [{
        role: "user",
        content: `Extract structured data about a German university from this page content.
Return ONLY a valid JSON object with these exact keys. Use null if not found.

- name: Full official university name (string)
- city: City in Germany where the university is located (string)
- type: "public" or "private" — German state universities are public (string)
- website_url: Root URL e.g. "https://www.th-koeln.de" (string)
- description: 2-3 sentence description of the university (string or null)
- address: Street address if visible (string or null)
- student_count: Number of enrolled students as integer (number or null)
- ranking: Any ranking mentioned e.g. "#37 QS 2024" (string or null)
- logo_url: Direct URL to university logo image if found in page source (string or null)

The base URL of the page is: ${baseUrl}

Page content:
${cleaned}

Return ONLY the JSON object.`,
      }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Could not extract university data from this page." }, { status: 422 });
    }

    const extracted = JSON.parse(jsonMatch[0]);

    // If no logo found, add guesses for the frontend to try
    if (!extracted.logo_url) {
      extracted.logo_url = logoGuesses[0]; // best guess
    }

    return NextResponse.json({ ok: true, data: extracted });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}