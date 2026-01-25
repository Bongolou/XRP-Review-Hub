import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Newsletter subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getSubscriberByEmail(data.email);
      if (existing) {
        return res.status(400).json({ error: "Email already subscribed" });
      }
      
      const subscriber = await storage.createSubscriber(data);
      res.status(201).json({ success: true, message: "Successfully subscribed!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      console.error("Subscribe error:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(data);
      res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Please fill in all required fields" });
      }
      console.error("Contact error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  return httpServer;
}
