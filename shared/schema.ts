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

export const WORKSHOP_REGISTRATION_DATES = ["2026-08-19", "2026-09-02"] as const;
export const WORKSHOP_REGISTRATION_PRICE_DKK = 2599;

export const workshopRegistrationSchema = z.object({
  name: z.string().min(1, "Skriva títt navn").max(100),
  organization: z.string().min(1, "Skriva navnið á fyritøkuni").max(200),
  email: z.string().email("Vinarliga skriva ein gildigan teldupost"),
  phone: z.string().min(5, "Skriva telefonnummar").max(30),
  date: z.enum(WORKSHOP_REGISTRATION_DATES, {
    errorMap: () => ({ message: "Vel ein dag" }),
  }),
  seats: z.number().int().min(1, "Í minsta lagi 1 seti").max(20, "Í mesta lagi 20 seti"),
  acknowledgedInvoice: z.literal(true, {
    errorMap: () => ({ message: "Tú mást samtykkja, at vit senda eina rokning" }),
  }),
  website: z.string().max(0).optional().default(""),
});

export type WorkshopRegistration = z.infer<typeof workshopRegistrationSchema>;

export const ritlingurRequestSchema = z.object({
  email: z.string().email("Vinarliga skriva ein gildigan teldupost"),
  consent: z.boolean().optional().default(false),
  website: z.string().max(0).optional().default(""),
});

export type RitlingurRequest = z.infer<typeof ritlingurRequestSchema>;

export const guideFeedbackSchema = z.object({
  message: z
    .string()
    .min(5, "Skriva í minsta lagi nøkur orð")
    .max(2000, "Boðið má vera styttri enn 2000 stavir"),
  email: z
    .string()
    .email("Vinarliga skriva ein gildigan teldupost")
    .optional()
    .or(z.literal("")),
  guide: z.string().optional().default(""),
  // Honeypot — kept out of strict validation so a bot/autofill filling it does
  // not surface a hidden, un-rendered validation error. It is short-circuited
  // in the submit handler instead.
  website: z.string().optional().default(""),
});

export type GuideFeedbackRequest = z.infer<typeof guideFeedbackSchema>;
