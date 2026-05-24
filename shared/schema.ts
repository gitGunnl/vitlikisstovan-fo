import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export const workshopContactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  organization: z.string().min(1, "Organization is required").max(200),
  workEmail: z.string().email("Please enter a valid work email"),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export type WorkshopContactForm = z.infer<typeof workshopContactFormSchema>;

export const bookingRequestSchema = z.object({
  email: z.string().email("Vinarliga skriva ein gildigan teldupost"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ógildig dato"),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Ógildigur tími"),
});

export type BookingRequest = z.infer<typeof bookingRequestSchema>;
