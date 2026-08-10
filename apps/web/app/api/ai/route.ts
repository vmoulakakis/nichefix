import { generateWithPolicy, modelIntents } from "@foundation/ai";
import { z } from "zod";

const Body = z.object({
  prompt: z.string().min(1).max(8000),
  intent: z.enum(modelIntents).default("general"),
});

export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const result = await generateWithPolicy(parsed.data);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: "No usable model provider is configured", detail: String(error) },
      { status: 503 },
    );
  }
}
