import type { Request } from "express";
import type { ProductReview } from "@shared/schema";

function buildAdminLink(req: Request): string {
  const override = process.env.PUBLIC_BASE_URL?.trim();
  if (override) {
    return `${override.replace(/\/+$/, "")}/admin/reviews`;
  }
  const proto =
    (req.headers["x-forwarded-proto"] as string)?.split(",")[0]?.trim() ||
    req.protocol ||
    "https";
  const host =
    (req.headers["x-forwarded-host"] as string)?.split(",")[0]?.trim() ||
    req.headers.host ||
    "localhost";
  return `${proto}://${host}/admin/reviews`;
}

function truncateBody(body: string, max = 500): string {
  return body.length > max ? `${body.slice(0, max - 1)}…` : body;
}

function buildMessage(review: ProductReview, adminLink: string): string {
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
  const target = `${review.targetKind}/${review.targetSlug}`;
  return [
    `New review submitted for *${target}* — ${stars} (${review.rating}/5)`,
    `Author: ${review.authorName}`,
    "",
    truncateBody(review.body),
    "",
    `Moderate: ${adminLink}`,
  ].join("\n");
}

async function postWebhook(url: string, message: string): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      // `text` is what Slack incoming webhooks read; `content` is what Discord
      // webhooks read. Sending both lets one env var work for either service
      // without the operator telling us which one it is.
      body: JSON.stringify({ text: message, content: message }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        `[ReviewNotify] Webhook responded ${res.status}: ${detail.slice(0, 200)}`,
      );
    }
  } finally {
    clearTimeout(timer);
  }
}

export function notifyNewReview(review: ProductReview, req: Request): void {
  const webhookUrl = process.env.REVIEW_NOTIFY_WEBHOOK_URL?.trim();
  if (!webhookUrl) return;

  const adminLink = buildAdminLink(req);
  const message = buildMessage(review, adminLink);

  // Fire-and-forget: never let a notification failure block the response or
  // the review from being saved.
  setImmediate(() => {
    postWebhook(webhookUrl, message).catch((err) => {
      console.error("[ReviewNotify] Failed to send webhook:", err);
    });
  });
}
