import { getDb } from "@/db";
import { env } from "cloudflare:workers";
import { and, eq, lt, or } from "drizzle-orm";
import { sendPilotConfirmation } from "@/lib/pilot-confirmation";
import { landingEvents, pilotRequests } from "@/db/schema";
import { allowedOrigin, CONSENT_VERSION, pilotSchema } from "@/lib/pilot";
export async function POST(request: Request) {
  if (!allowedOrigin(request))
    return Response.json({ error: "Solicitud no permitida." }, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 4096)
    return Response.json(
      { error: "Solicitud demasiado larga." },
      { status: 413 },
    );
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json(
      { error: "Revisa los datos del formulario." },
      { status: 400 },
    );
  }
  const parsed = pilotSchema.safeParse(input);
  if (!parsed.success)
    return Response.json(
      { error: "Revisa el correo y autoriza el contacto sobre el piloto." },
      { status: 400 },
    );
  const data = parsed.data;
  const now = new Date().toISOString();
  try {
    const db = getDb();
    const result = await db
      .insert(pilotRequests)
      .values({
        id: crypto.randomUUID(),
        email: data.email,
        audience: "client",
        clientKind: data.clientKind,
        need: data.need,
        description: data.description,
        consentVersion: CONSENT_VERSION,
        createdAt: now,
        ...data.attribution,
      })
      .onConflictDoNothing({ target: pilotRequests.email })
      .returning({ id: pilotRequests.id });
    if (result.length) {
      try {
        await db
          .insert(landingEvents)
          .values({
            id: crypto.randomUUID(),
            event: "pilot_request",
            sessionId: data.sessionId,
            audience: "client",
            position: "form",
            ...data.attribution,
            createdAt: now,
            version: 2,
          });
      } catch {
        /* La solicitud guardada es la fuente de verdad de la conversión. */
      }
    }
    // Delivery is separate from saving: mail failure must not lose the request.
    let confirmation = "unavailable";
    try {
      const record = await db.select().from(pilotRequests)
        .where(eq(pilotRequests.email, data.email)).get();
      if (record?.confirmationStatus === "accepted") confirmation = "already_sent";
      else if (record && env.BREVO_API_KEY && env.MAIL_FROM) {
        const retryBefore = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const claimed = await db.update(pilotRequests)
          .set({ confirmationStatus: "sending", confirmationUpdatedAt: now })
          .where(and(eq(pilotRequests.id, record.id), or(
            eq(pilotRequests.confirmationStatus, "pending"),
            and(eq(pilotRequests.confirmationStatus, "failed"), lt(pilotRequests.confirmationUpdatedAt, retryBefore)),
          )))
          .returning({ id: pilotRequests.id });
        if (claimed.length) {
          confirmation = await sendPilotConfirmation({ apiKey: env.BREVO_API_KEY, sender: env.MAIL_FROM }, record);
          await db.update(pilotRequests).set({
            confirmationStatus: confirmation === "accepted" ? "accepted" : "failed",
            confirmationUpdatedAt: new Date().toISOString(),
          }).where(eq(pilotRequests.id, record.id));
        }
      }
    } catch { console.error("Pilot confirmation could not complete"); }
    return Response.json({ ok: true, confirmation });
  } catch {
    return Response.json(
      {
        error:
          "No pudimos guardar tu solicitud. Inténtalo de nuevo; el formulario conserva tus datos.",
      },
      { status: 503 },
    );
  }
}
