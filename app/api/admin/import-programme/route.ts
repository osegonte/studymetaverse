import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required." }, { status: 400 });

    // Fetch the page HTML
    const pageRes = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Studymetaverse/1.0)" },
    });

    if (!pageRes.ok) {
      return NextResponse.json({ error: `Could not fetch page (${pageRes.status}). Try a different URL.` }, { status: 400 });
    }

    const html = await pageRes.text();

    // Strip scripts/styles to reduce tokens, keep readable text
    const cleaned = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 12000); // Cap at ~12k chars

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are extracting structured data from a German university programme page.

Extract the following fields from this page content. Return ONLY a valid JSON object with these exact keys. If a field cannot be determined, use null.

Fields to extract:
- title: Programme name (string)
- degree_type: One of: "masters" | "bachelors" | "preparatory_course" (string)
- language_of_instruction: One of: "german_only" | "english_only" | "german_english" (string)
- study_mode: One of: "fully_onsite" | "fully_online" | "hybrid" (string)
- start_semester: One of: "winter" | "summer" | "summer_winter" (string)
- std_period_semesters: Number of semesters as integer (number or null)
- program_details: Brief description of the programme, 2-4 sentences max (string or null)
- nc_status: One of: "non_restricted" | "restricted" (string)
- ects_required: ECTS credits required, usually 180 or 210 for bachelors, 0 for masters (number)
- tuition_fee: true if there is a tuition fee, false if free (boolean)
- tuition_fee_amount: Tuition fee per semester in EUR as number, or null if free (number or null)
- deadline_winter: Application deadline for winter semester in YYYY-MM-DD format (string or null)
- deadline_summer: Application deadline for summer semester in YYYY-MM-DD format (string or null)
- subject_area: Subject area/field of study as free text e.g. "Computer Science", "Business Administration" (string or null)
- university_name: Full name of the university (string or null)
- university_city: City where university is located in Germany (string or null)
- university_website: Root URL of university website e.g. "https://www.th-koeln.de" (string or null)

Page content:
${cleaned}

Return ONLY the JSON object, no explanation, no markdown.`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";

    // Parse JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Could not parse programme data from this page." }, { status: 422 });
    }

    const extracted = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ ok: true, data: extracted });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}