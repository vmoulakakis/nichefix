import { providerStatus } from "@foundation/ai";

export async function GET() {
  return Response.json({
    ok: true,
    service: "ai-saas-foundation",
    timestamp: new Date().toISOString(),
    providers: providerStatus(),
  });
}
