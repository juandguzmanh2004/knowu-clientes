const labels: Record<string, string> = {
  video: "Edición de video", grafico: "Diseño gráfico e ilustración",
  "3d": "Modelado o impresión 3D", otro: "Un proyecto de diseño o digital",
};

export type MailResult = "accepted" | "unavailable";
export function confirmationMessage(need: string, description: string) {
  return [
    "¡Hola!", "",
    "Recibimos tu propuesta de encargo en KnowU. Tu interés en el piloto quedó registrado.", "",
    "Tipo de encargo: " + (labels[need] || labels.otro),
    ...(description ? ["Tu idea: " + description] : []), "",
    "¿Qué sigue? El equipo podrá escribirte a este correo para conocer los detalles y revisar si tu proyecto encaja con una prueba del piloto.", "",
    "Registrar tu interés no genera cobros ni confirma disponibilidad o contratación. El alcance, el plazo y el presupuesto se acordarán antes de empezar.", "",
    "Puedes responder a este mensaje si quieres aclarar tu idea o retirar tu interés.", "",
    "El equipo de KnowU",
    "https://knowu-vercel-proxy.vercel.app/",
  ].join("\n");
}

export async function sendPilotConfirmation(
  config: { apiKey?: string; sender?: string },
  request: { id: string; email: string; need: string; description: string },
  transport: typeof fetch = fetch,
): Promise<MailResult> {
  if (!config.apiKey || !config.sender) return "unavailable";
  const text = confirmationMessage(request.need, request.description);
  const escaped = text.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
  try {
    const response = await transport("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": config.apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "KnowU", email: config.sender },
        replyTo: { name: "KnowU", email: config.sender },
        to: [{ email: request.email }],
        subject: "Recibimos tu idea en KnowU",
        textContent: text,
        htmlContent: '<div style="font-family:Arial,sans-serif;max-width:600px;line-height:1.6;color:#171719"><h1 style="color:#3036d6">KnowU.</h1><div style="white-space:pre-wrap">' + escaped + "</div></div>",
        headers: { IdempotencyKey: request.id },
        tags: ["knowu-piloto"],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error("Pilot mail rejected, status", response.status);
    return response.ok ? "accepted" : "unavailable";
  } catch {
    console.error("Pilot mail unavailable");
    return "unavailable";
  }
}
