import {
  type Subscriber,
  type InsertSubscriber,
  type ContactSubmission,
  type InsertContact,
  type ProductReview,
  type InsertProductReview,
  subscribers,
  contactSubmissions,
  productReviews,
} from "@shared/schema";
import { db } from "./db";
import { and, desc, eq, isNull, sql } from "drizzle-orm";

export interface ReviewSummary {
  count: number;
  average: number | null;
}

export interface IStorage {
  // Newsletter Subscribers
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  getAllSubscribers(): Promise<Subscriber[]>;

  // Contact Submissions
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  // Product reviews (wallets + exchanges)
  createProductReview(
    review: InsertProductReview,
    opts?: { hiddenAt?: Date },
  ): Promise<ProductReview>;
  getProductReviews(
    targetKind: string,
    targetSlug: string,
    limit?: number,
  ): Promise<ProductReview[]>;
  getProductReviewSummary(
    targetKind: string,
    targetSlug: string,
  ): Promise<ReviewSummary>;
  listAllProductReviews(limit?: number): Promise<ProductReview[]>;
  hideProductReview(id: number): Promise<ProductReview | undefined>;
  unhideProductReview(id: number): Promise<ProductReview | undefined>;
  deleteProductReview(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async createSubscriber(data: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db.insert(subscribers).values(data).returning();
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subscriber;
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return db.select().from(subscribers);
  }

  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions);
  }

  async createProductReview(
    data: InsertProductReview,
    opts?: { hiddenAt?: Date },
  ): Promise<ProductReview> {
    const [review] = await db
      .insert(productReviews)
      .values({ ...data, hiddenAt: opts?.hiddenAt ?? null })
      .returning();
    return review;
  }

  async getProductReviews(
    targetKind: string,
    targetSlug: string,
    limit = 20,
  ): Promise<ProductReview[]> {
    return db
      .select()
      .from(productReviews)
      .where(
        and(
          eq(productReviews.targetKind, targetKind),
          eq(productReviews.targetSlug, targetSlug),
          isNull(productReviews.hiddenAt),
        ),
      )
      .orderBy(desc(productReviews.createdAt))
      .limit(limit);
  }

  async getProductReviewSummary(
    targetKind: string,
    targetSlug: string,
  ): Promise<ReviewSummary> {
    const [row] = await db
      .select({
        count: sql<number>`count(*)::int`,
        average: sql<number | null>`avg(${productReviews.rating})::float`,
      })
      .from(productReviews)
      .where(
        and(
          eq(productReviews.targetKind, targetKind),
          eq(productReviews.targetSlug, targetSlug),
          isNull(productReviews.hiddenAt),
        ),
      );
    return {
      count: row?.count ?? 0,
      average: row?.average ?? null,
    };
  }

  async listAllProductReviews(limit = 100): Promise<ProductReview[]> {
    return db
      .select()
      .from(productReviews)
      .orderBy(desc(productReviews.createdAt))
      .limit(limit);
  }

  async hideProductReview(id: number): Promise<ProductReview | undefined> {
    const [row] = await db
      .update(productReviews)
      .set({ hiddenAt: new Date() })
      .where(eq(productReviews.id, id))
      .returning();
    return row;
  }

  async unhideProductReview(id: number): Promise<ProductReview | undefined> {
    const [row] = await db
      .update(productReviews)
      .set({ hiddenAt: null })
      .where(eq(productReviews.id, id))
      .returning();
    return row;
  }

  async deleteProductReview(id: number): Promise<boolean> {
    const rows = await db
      .delete(productReviews)
      .where(eq(productReviews.id, id))
      .returning({ id: productReviews.id });
    return rows.length > 0;
  }
}

export const storage = new DatabaseStorage();
