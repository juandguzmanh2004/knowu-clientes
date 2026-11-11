import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const pilotRequests = sqliteTable("pilot_requests", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  audience: text("audience").notNull(),
  need: text("need").notNull(),
  description: text("description").notNull().default(""),
  confirmationStatus: text("confirmation_status").notNull().default("pending"),
  confirmationUpdatedAt: text("confirmation_updated_at"),
  clientKind: text("client_kind").notNull().default("sin-definir"),
  consentVersion: text("consent_version").notNull(),
  createdAt: text("created_at").notNull(),
  source: text("source").notNull(),
  medium: text("medium").notNull(),
  campaign: text("campaign").notNull(),
});
export const landingEvents = sqliteTable("landing_events", {
  id: text("id").primaryKey(),
  event: text("event").notNull(),
  sessionId: text("session_id").notNull(),
  audience: text("audience").notNull(),
  position: text("position").notNull(),
  source: text("source").notNull(),
  medium: text("medium").notNull(),
  campaign: text("campaign").notNull(),
  createdAt: text("created_at").notNull(),
  version: integer("version").notNull(),
});
