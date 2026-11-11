ALTER TABLE `pilot_requests` ADD `confirmation_status` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `pilot_requests` ADD `confirmation_updated_at` text;