CREATE TABLE `landing_events` (
	`id` text PRIMARY KEY NOT NULL,
	`event` text NOT NULL,
	`session_id` text NOT NULL,
	`audience` text NOT NULL,
	`position` text NOT NULL,
	`source` text NOT NULL,
	`medium` text NOT NULL,
	`campaign` text NOT NULL,
	`created_at` text NOT NULL,
	`version` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pilot_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`audience` text NOT NULL,
	`need` text NOT NULL,
	`client_kind` text DEFAULT 'sin-definir' NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` text NOT NULL,
	`source` text NOT NULL,
	`medium` text NOT NULL,
	`campaign` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pilot_requests_email_unique` ON `pilot_requests` (`email`);