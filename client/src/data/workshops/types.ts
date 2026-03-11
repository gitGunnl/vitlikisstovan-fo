export interface WorkshopStep {
  title: string;
  description: string;
  prompt?: string;
  requiresConfirmation?: boolean;
  confirmationText?: string;
  window?: string;       // Indicates if this is a new chat or adding to current chat
  model?: string;        // Indicates which AI model to use for this step
  files?: {
    name: string;        // Display name for the file
    filename: string;    // Actual filename in attached_assets
    description?: string; // Optional description of the file
  }[];
}

export interface Lab {
  id: string;
  name: string;
  description: string;
  steps: WorkshopStep[];
}

export interface SinglePageContent {
  heroTitle: string;
  heroSubtitle: string;
  image: string;
  imageAlt: string;
  description: string;
  bullets: string[];
  agenda: { time: string; title: string; description: string }[];
  ctaText: string;
  ctaDescription: string;
}

export interface Workshop {
  name: string;
  company: string;
  labs: Lab[];
  singlePage?: boolean;
  pageContent?: SinglePageContent;
}
