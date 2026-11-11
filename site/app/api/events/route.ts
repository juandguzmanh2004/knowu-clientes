import { getDb } from "@/db";
import { landingEvents } from "@/db/schema";
import { allowedOrigin, eventSchema } from "@/lib/pilot";
export async function POST(request: Request) {
  if (!allowedOrigin(request)) return new Response(null, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 2048)
    return new Response(null, { status: 413 });
  try {
    const parsed = eventSchema.safeParse(await request.json());
    if (!parsed.success) return new Response(null, { status: 400 });
    const { attribution, ...data } = parsed.data;
    const id =
      data.event === "visit" ? `visit:${data.sessionId}` : crypto.randomUUID();
    await getDb()
      .insert(landingEvents)
      .values({
        id,
        ...data,
        ...attribution,
        audience: "client",
        createdAt: new Date().toISOString(),
        version: 2,
      })
      .onConflictDoNothing();
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
}
