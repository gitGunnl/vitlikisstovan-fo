import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export const ELECTION_QUESTIONS = [
  {
    id: "q1",
    text: "Hvat er heildarætlanin hjá tykkara flokki fyri vitlíki (AI) í Føroyum?",
    description: "T.d. stýring, íløga, samskipan við náttúruligar avmarkingar í einum lítlum landi."
  },
  {
    id: "q2",
    text: "Hvussu eigur vitlíki at nýtast í almennari tænastu — t.d. heilsuverk, undirvísing og kommunal umsiting?",
    description: "T.d. sjálvvirkni, betri tænastur, minni bíðitíð, og hvussu persónuupplýsingar verða varðveitt."
  },
  {
    id: "q3",
    text: "Hvussu eiga skúlar og útbúgving at føra næstu kynslóð inn í eina heim við vitlíki?",
    description: "T.d. námsætlanir, læraraútbúgving, týdning av kritiskari hugsun."
  },
  {
    id: "q4",
    text: "Hvat eigur at gerast fyri at tryggja føroyskt mál og mentan í eini støðugt meira digitalisera heimi?",
    description: "T.d. máltøknilig verkfør, føroyskt innihald í AI-skipanum, støða til føroyskar royndir."
  },
  {
    id: "q5",
    text: "Hvussu tryggja vit ábyrgdarfulla, gagnsæliga og rættvísa nýtslu av vitlíki í føroyskum samfelagnum?",
    description: "T.d. lóggáva, eftirlitsráð, siðaviðurskifti, almenn vitund."
  }
];

export const PARTY_STATUSES = {
  invited: "Bjóðað",
  received: "Svar móttikið",
  partial: "Partsvar móttikið",
  "no-response": "Einki svar enn"
} as const;

export type PartyStatus = keyof typeof PARTY_STATUSES;

export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
  status: PartyStatus;
  invitedAt: string;
  respondedAt?: string;
}

export interface ElectionSubmission {
  id: string;
  partyId: string;
  partyName: string;
  respondentName: string;
  respondentRole: string;
  email: string;
  phone?: string;
  isOfficialResponse: boolean;
  answers: Record<string, string>;
  extraComment?: string;
  consentGiven: boolean;
  submittedAt: string;
  published: boolean;
  publishedAt?: string;
  addedByAdmin: boolean;
}

export interface ElectionData {
  parties: Party[];
  submissions: ElectionSubmission[];
  deadline: string;
  lastUpdated: string;
}

export const submissionFormSchema = z.object({
  partyName: z.string().min(1, "Flokksnavn er kravt"),
  respondentName: z.string().min(1, "Navn er kravt"),
  respondentRole: z.string().min(1, "Starv/títul er kravt"),
  email: z.string().email("Vinarliga skriva eitt gilt teldupostbústað"),
  phone: z.string().optional(),
  isOfficialResponse: z.boolean(),
  answers: z.record(z.string(), z.string().min(1, "Vinarliga svara spurninginum")),
  extraComment: z.string().optional(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: "Tú mást samtykkja, at svarið verður birta á síðuni" })
  })
});

export type SubmissionFormData = z.infer<typeof submissionFormSchema>;

export const adminSubmissionSchema = submissionFormSchema.extend({
  partyId: z.string().min(1),
  published: z.boolean().default(true),
  addedByAdmin: z.literal(true)
});

export const adminUpdatePartySchema = z.object({
  status: z.enum(["invited", "received", "partial", "no-response"]),
  respondedAt: z.string().optional()
});

export const adminUpdateSubmissionSchema = z.object({
  published: z.boolean().optional(),
  answers: z.record(z.string(), z.string()).optional(),
  extraComment: z.string().optional()
});
