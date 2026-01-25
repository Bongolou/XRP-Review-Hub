import { 
  type Subscriber, 
  type InsertSubscriber,
  type ContactSubmission,
  type InsertContact,
  subscribers,
  contactSubmissions
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Newsletter Subscribers
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  getAllSubscribers(): Promise<Subscriber[]>;
  
  // Contact Submissions
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
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
}

export const storage = new DatabaseStorage();
