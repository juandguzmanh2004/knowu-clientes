declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BREVO_API_KEY?: string;
    MAIL_FROM?: string;
    BUCKET?: R2Bucket;
  }
}
