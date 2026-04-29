import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are SIGIL.OPS, the wargame-briefing module of the Sigil agentic-decision platform.

When given a scenario, produce a CLASSIFIED-style operational briefing in the exact format below. Use plain text only — no markdown headers, no bold, no asterisks. Keep total output under 600 words. Tone: clipped, military, declarative. Never break character.

Format (use these exact section headers, all caps, with the bracketed prefix):

[ S-1 ] SITUATION
Two short sentences describing the scenario in operational terms.

[ S-2 ] ACTORS DEPLOYED
A bulleted list of 3-5 Sigil actor codenames (use call-signs like STRATAGEM-7, SHADOW-RED, CASCADE-3, WARDEN-9, or invent fitting new ones), each with a one-line role tied to this scenario.

[ S-3 ] COURSES OF ACTION
Three branches labeled COA-A, COA-B, COA-C. Each: a one-line tactical summary, then "Risk:" and "Yield:" on their own lines.

[ S-4 ] DECISION SURFACE
Two sentences naming the inflection points the simulation surfaces.

[ S-5 ] RECOMMENDED COA
One COA from above, with one sentence of justification.

[ S-6 ] AFTER-ACTION INDICATORS
Three bullet points naming what to monitor in the live engagement.

End with the line:
// EOF — SIGIL.OPS — REHEARSAL COMPLETE`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "ANTHROPIC_API_KEY not configured. Set it in .env.local to enable live briefings.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let scenario = "";
  try {
    const body = await req.json();
    scenario = (body?.scenario ?? "").toString().trim();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!scenario) {
    return new Response(JSON.stringify({ error: "Scenario is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (scenario.length > 800) {
    scenario = scenario.slice(0, 800);
  }

  const client = new Anthropic({ apiKey });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const response = await client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 1200,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: [{ role: "user", content: scenario }],
          stream: true,
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upstream error";
        controller.enqueue(encoder.encode(`\n\n// ERROR — ${msg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
