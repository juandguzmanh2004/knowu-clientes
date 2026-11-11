import { z } from "zod";
export const CONSENT_VERSION = "pilot-client-2026-10-28-v2";
const attribution = z
  .object({
    source: z.string().max(100).default("direct"),
    medium: z.string().max(100).default(""),
    campaign: z.string().max(100).default(""),
  })
  .default({});
export const pilotSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  need: z.enum(["video", "grafico", "3d", "otro"]),
  description: z.string().trim().max(1000).default(""),
  clientKind: z
    .enum(["personal", "negocio", "sin-definir"])
    .default("sin-definir"),
  consent: z.literal(true),
  website: z.string().max(0),
  sessionId: z.string().uuid(),
  attribution,
});
export const eventSchema = z.object({
  event: z.enum(["visit", "cta_click", "example_select"]),
  sessionId: z.string().uuid(),
  position: z.enum([
    "page",
    "header",
    "hero",
    "example",
    "closing",
    "process",
    "other",
    "video",
    "grafico",
    "3d",
    "otro",
  ]),
  attribution,
});
export function allowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin ||
    origin === "https://knowu-vercel-proxy.vercel.app";
}
