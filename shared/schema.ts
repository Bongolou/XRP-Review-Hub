import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, integer, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source"),
  leadMagnet: text("lead_magnet"),
  language: text("language"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const SUPPORTED_SUBSCRIBER_LANGUAGES = [
  "en",
  "es",
  "zh",
  "ja",
  "ko",
  "pt",
  "de",
  "fr",
] as const;

export type SubscriberLanguage = (typeof SUPPORTED_SUBSCRIBER_LANGUAGES)[number];

export const insertSubscriberSchema = createInsertSchema(subscribers, {
  language: z.enum(SUPPORTED_SUBSCRIBER_LANGUAGES).optional(),
}).pick({
  email: true,
  source: true,
  leadMagnet: true,
  language: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const productReviews = pgTable(
  "product_reviews",
  {
    id: serial("id").primaryKey(),
    targetKind: text("target_kind").notNull(),
    targetSlug: text("target_slug").notNull(),
    authorName: text("author_name").notNull(),
    rating: integer("rating").notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    hiddenAt: timestamp("hidden_at"),
  },
  (table) => ({
    targetIdx: index("product_reviews_target_idx").on(table.targetKind, table.targetSlug),
  }),
);

export const insertProductReviewSchema = createInsertSchema(productReviews, {
  targetKind: z.enum(["wallet", "exchange"]),
  targetSlug: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9-]+$/, "Invalid slug"),
  authorName: z.string().trim().min(2, "Name is too short").max(60, "Name is too long"),
  rating: z.number().int().min(1).max(5),
  body: z
    .string()
    .trim()
    .min(20, "Review must be at least 20 characters")
    .max(1000, "Review must be 1000 characters or fewer"),
}).pick({
  targetKind: true,
  targetSlug: true,
  authorName: true,
  rating: true,
  body: true,
});

export type InsertProductReview = z.infer<typeof insertProductReviewSchema>;
export type ProductReview = typeof productReviews.$inferSelect;
