import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the form data
      const validatedData = contactFormSchema.parse(req.body);
      
      // Anti-spam checks
      if (validatedData.honeypot && validatedData.honeypot.trim() !== "") {
        // Silently reject spam
        return res.status(200).json({ success: true });
      }
      
      if (validatedData.formStartTime && validatedData.submissionTime) {
        const timeTaken = (validatedData.submissionTime - validatedData.formStartTime) / 1000;
        if (timeTaken < 3) {
          return res.status(429).json({ error: "Please wait a moment before submitting again." });
        }
      }
      
      // Here you could save to database, send email, etc.
      // For now, we'll just log the contact form submission
      console.log("Contact form submission:", {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        timestamp: new Date().toISOString()
      });
      
      res.json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid form data" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
