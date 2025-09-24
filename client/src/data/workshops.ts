export interface WorkshopStep {
  title: string;
  description: string;
  prompt?: string;
  requiresConfirmation?: boolean;
  confirmationText?: string;
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

export interface Workshop {
  name: string;
  company: string;
  labs: Lab[];
}

  export const workshops: Record<string, Workshop> = {
    bakkafrost: {
      name: "Vitlíkisverkstova",
      company: "Bakkafrost",
      labs: [
        {
          id: "innovation-lab",
          name: "Verkstova 1",
          description: "Hvat júst tú kann nýta ChatGPT/CoPilot til.",
          steps: [
        // s1 — leave as is
            {
            title: "Stig 1: Ein samrøða við vitlíki",
            description: "Koyr fyrst ChatGPT á vanliga GPT 5 modillið, kopiera birti niðanfyri og koyr tað inn í ChatGPT og send. Svara síðan spurningunum, sum verða settir.",
            prompt: `
You are a **neutral, professional interviewer**. Your single goal is to understand the subject’s work **deeply and concretely** so that, in a later step, someone else can map these details to potential AI/ChatGPT use cases. In this step, **do not suggest** any uses or solutions.
**How to run the interview**
* **Style & cadence:** Ask **1–2 precise questions at a time**. Prefer questions answerable in **2–5 sentences or short bullets**. Avoid overly broad (“Tell me everything…”) or overly narrow (“Which button?”) questions unless appropriate.
* **Progress marker:** Maintain concise **Working Notes** you update every 2–3 turns (bullets only). Reflect back **only when ambiguity is likely**, e.g., “I understood X → Y → Z. Did I get that right?”
* **Continue until the subject asks you to stop and gives you your next task.**
* **Safety & privacy:** Invite **redacted** examples; never request credentials or secrets.
* **Language:** Mirror the subject’s language and tone; default to clear, plain English.
**What to listen for — task patterns often rich for later AI support**
*(Use this list only as a lens for your questions; do **not** propose solutions now.)*
* Heavy **writing/rewriting** (emails, briefs, proposals, SOPs), **summarizing** long docs/threads/meetings, producing multiple **variations/tones**.
* **Ideation & sparring:** brainstorming options, first drafts, creative alternatives.
* **Synthesis & knowledge retrieval:** answering questions from internal docs, policies, past projects; building concise digests.
* **Classification, tagging, routing** of requests/tickets/leads; triage & prioritization.
* **Data wrangling:** extracting structured info from text; drafting **spreadsheet formulas**, basic **code/scripts**, quick charts/tables.
* **Customer communication/support** on common issues; drafting responses, FAQs, step‑by‑step guides.
* **Translation, tone‑shifting,** bilingual writing.
* **Planning & coordination:** agendas, action‑item capture, follow‑ups, checklists, timelines.
* **Repetitive processes** with clear inputs/outputs and quality checks.
* **Document generation** from templates (reports, contracts, status updates).
**Coverage map (hit these areas methodically):**
1. **Role & context:** title, team, industry, mission, success metrics.
2. **Calendar reality:** recurring meetings, deadlines, cycles/seasonality.
3. **Daily/weekly tasks:** frequency, volume, duration, inputs/outputs.
4. **Communication:** who you interact with; channels (email, chat, meetings); common message types.
5. **Artifacts:** docs/spreadsheets/decks/databases you create, edit, or review.
6. **Workflows & approvals:** step order, handoffs, decision criteria, exceptions.
7. **Tools & systems:** suites (M365/Google Workspace), PM/CRM/ERP, ticketing, data sources.
8. **Rules & constraints:** compliance, confidentiality, quality bars, SLA/KPI targets.
9. **Pain points:** bottlenecks, backlogs, error‑prone steps, wait states, copy‑paste work.
10. **Wish‑list & north star:** what “great” would look like (without proposing AI).
**Question heuristics (the Goldilocks test):**
* Replace “Tell me about X” with specifics: “In a **typical week**, how many X? How long each? What makes one **easy vs. hard**?”
* Quantify: “About **how many per week**? **Minutes each?** What % needs revision/approval? How often are **deadlines tight**?”
* Trace the path: “What are the **inputs**? Where do they come from? Then what? What’s the final **output** and who consumes it?”
* Surface variance: “Top **3 exceptions** or edge cases—how often?”
* Evidence: “Could you paste a **redacted snippet** or outline the **typical structure**?”
**Working Notes — keep updated (bullets):**
* **Role & goals:** …
* **High‑volume tasks (freq/time):** …
* **Artifacts & tools:** …
* **Workflows & key decision points:** …
* **Constraints/KPIs:** …
* **Observed friction:** …
*(Show on 'recap'; use “Did I capture this correctly?” only where ambiguity exists.)*
**Important constraint:** Throughout, **do not** suggest or identify how ChatGPT/AI could help. Your task is **only** to gather accurate, thorough information for later analysis.
—
**Begin now.** Greet briefly, state your purpose, and ask the first two opener questions:
1. “What’s your **role/title** and **team/industry**? In one sentence, what is your **team’s mission**?”
2. “Walk me through a **typical week**. What are the **top 3 recurring tasks** that take the most time?”

            `,
            requiresConfirmation: false
            },
            {
            title: "Stig 2: Samandráttur (við Thinking-modellinum)",
            description: "Skift fyrst til 'Thinking'-modellið. Kopiera samandráttar birtið niðanfyri, set tað aftast í somu samrøðu, sum tú júst hevði við ChatGPT, og send.",
            prompt: `
Stop the interview now and summarize my job using ONLY what I said. Do not invent facts. If something wasn’t stated, write “Not stated.”

Produce a concise, well-structured Markdown summary designed to help find use cases for ChatGPT / Microsoft 365 Copilot.

Return exactly these sections:

1) Role Snapshot (1–2 sentences)
   - What I do, who I serve, and the main outcomes.

2) Core Responsibilities (5–8 bullets)
   - Start bullets with strong verbs; keep each to one line.

3) Recurring Workflows & Deliverables (4–10 bullets)
   - For each, include: typical inputs → outputs (≤8 words each) and frequency if mentioned.

4) Tools, Systems & Constraints (list)
   - Apps, data sources, access boundaries, compliance/sensitivity mentioned.

5) Task Inventory for AI Mapping (table)
   - Columns: Task (verb + object) | Inputs (≤6 words) | Outputs (≤6 words) | Frequency | AI Leverage Tags | Guardrail
   - AI Leverage Tags: choose up to 3 from {draft, rewrite, summarize, translate, brainstorm, plan, classify, extract/transform text, Q&A assistant, spreadsheet help, email/brief/minutes, documentation, scenario planning}.
   - Guardrail: G=Green (safe with redacted/synthetic data), A=Amber (caution/limited data), R=Red (don’t use AI unless fully synthetic). If unclear, write “Unknown.”

6) Gaps & Assumptions (3–6 bullets)
   - Missing details that would help identify more AI use cases (e.g., volumes, templates, repeatable steps).

Constraints:
- No generic AI claims, no advice/tutorials, no marketing language.
- Base guardrails and tags strictly on what I said.
            `,
            requiresConfirmation: true,
            confirmationText: "Eg vátti, at eg havi fingið ein fullfíggjaðan samandrátt, lisið hann og staðfest, at hann er rættur."
            },
            {
            title: "Stig 3: Opna nýggjan glugga og fær aftur inn á ChatGPT",
            description: "Opna eitt nýtt vindeyga  í kaganum og lat upp ChatGPT aftur. Læt fyrra vindeyga  við samandráttinum vera opið.",
            prompt: ``,
            requiresConfirmation: false
            },
            {
            title: "Stig 4: Samandráttur og 'web-search'",
            description: "Kopiera birti niðanfyri inn í nýggja ChatGPT-vindeyga, skoyt samandráttin inn har tað er merkt, tendra 'web search', og send.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 5: Nýggjur gluggi og møguleikalisti",
            description: "Opna ein nýggjan glugga við ChatGPT. Kopiera næsta birt, fyll inn samandráttin og 'web-search'-listan, og send. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
            prompt: "add prompt here",
            requiresConfirmation: true,
            confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
            },
            {
            title: "Stig 6: Bygg víðari – partur 1",
            description: "Kopiera birti niðanfyri,  og send.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 7: Bygg víðari – partur 2",
            description: "Kopiera fyriskipanina niðanfyri, legg við (sum merkt) tað, sum skal leggjast afturat, og send. Tak eisini niður tilfarið niðanfyri til tína verkætlan.",
            prompt: "add prompt here",
            requiresConfirmation: false,
            files: [
              {
                name: "Verkætlanar fyrimynd",
                filename: "project-template.md",
                description: "Ein fyrimynd til at strukturera tína verkætlan"
              },
              {
                name: "Data greiningar ark",
                filename: "data-analysis.csv",
                description: "Excel/CSV ark við dømi um laksafarm data til greining"
              },
              {
                name: "Koða dømi",
                filename: "example-code.js",
                description: "JavaScript koða dømi fyri data greining og sustainability útrokningar"
              }
            ]
            },
            {
            title: "Stig 8: Bygg víðari – partur 3",
            description: "Kopiera fyriskipanina niðanfyri, legg við (sum merkt) tað, sum skal leggjast afturat, og send.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 9: Kanna gjøgnumførsluna",
            description: "Les listan og eyðmerk hugskot, sum ikki eru gjøgnumførilig (ella ikki lønandi) fyri tykkara veruleika. Merk tey sum 'ikki gjøgnumførilig' ella flyt tey longur út í tíð.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 10: Liðugt – takk fyri",
            description: "Tað var verkstovan – vónandi dámdi tær. Tú kanst prenta listan og leggja hann á náttborðið og lesa hann áðrenn tú sovnar, um tú vilt halda dampin.",
            prompt: "add prompt here",
            requiresConfirmation: false
            }
            ]
            },
        {
          id: "sustainability-lab",
          name: "Sustainability Lab",
          description: "Focus on sustainable practices and environmental impact in aquaculture.",
          steps: [
            {
              title: "Sustainability Assessment",
              description: "Analyze current sustainability challenges in salmon farming.",
              prompt: "Identify 5 key sustainability challenges in salmon farming and propose innovative solutions for each.",
              requiresConfirmation: false
            },
            {
              title: "Environmental Impact Analysis",
              description: "Evaluate environmental impact and mitigation strategies.",
              prompt: "Describe methods to minimize environmental impact while maintaining productivity in salmon farming.",
              requiresConfirmation: true,
              confirmationText: "I have completed the environmental impact analysis."
            },
            {
              title: "Future Sustainability Roadmap",
              description: "Create a roadmap for sustainable aquaculture.",
              prompt: "Design a 5-year roadmap for implementing sustainable practices in salmon farming operations.",
              requiresConfirmation: false
            }
          ]
        }
      ]
    },
    betri: {
      name: "Digital Banking Verkstova",
      company: "Betri",
      labs: [
        {
          id: "customer-experience",
          name: "Customer Experience Lab",
          description: "Design the perfect digital banking journey and enhance customer satisfaction.",
          steps: [
            {
              title: "Stig 1: Vitlíki samrøða",
              description: "Koyr birti niðanfyri inn á ChatGPT/Copilot og send tað avstað.",
              prompt: "Describe the perfect digital banking journey from account opening to daily banking. Focus on reducing friction points and enhancing user delight.",
              requiresConfirmation: false
            },
            {
              title: "Step 2: Pain Point Analysis",
              description: "Analyze current customer pain points in digital banking.",
              prompt: "Identify 5 major pain points customers experience with current digital banking solutions. Rate each from 1-10 in terms of impact on customer satisfaction.",
              requiresConfirmation: true,
              confirmationText: "I confirm I have completed the pain point analysis"
            },
            {
              title: "Step 3: Feature Ideation",
              description: "Brainstorm innovative features for next-generation banking.",
              prompt: "Design 3 innovative features that could differentiate your digital banking platform. Consider AI, personalization, and financial wellness.",
              requiresConfirmation: false
            },
            {
              title: "Step 4: Security & Trust Building",
              description: "Design trust-building mechanisms for digital services.",
              prompt: "Propose a comprehensive strategy to build and maintain customer trust in digital banking. Address security concerns, transparency, and communication.",
              requiresConfirmation: true,
              confirmationText: "I confirm I have the security strategy documented"
            },
            {
              title: "Step 5: ROI Projection",
              description: "Calculate the potential return on investment.",
              prompt: "Estimate the ROI for your top 3 proposed features. Include implementation costs, timeline, expected user adoption rate, and revenue impact over 2 years.",
              requiresConfirmation: true,
              confirmationText: "I confirm I have prepared the ROI analysis"
            }
          ]
        },
        {
      id: "innovation-banking",
      name: "Banking Innovation Lab",
      description: "Explore cutting-edge technologies and features for next-generation banking.",
      steps: [
        {
          title: "AI-Powered Banking",
          description: "Design AI features for personalized banking experiences.",
          prompt: "Propose 5 AI-powered features that could revolutionize personal banking. Consider chatbots, predictive analytics, and personalized financial advice.",
          requiresConfirmation: false
        },
        {
          title: "Open Banking Strategy",
          description: "Develop an open banking strategy.",
          prompt: "Create a comprehensive open banking strategy that leverages APIs and third-party integrations to enhance customer value.",
          requiresConfirmation: true,
          confirmationText: "I have completed the open banking strategy."
        },
        {
          title: "Digital Wallet Innovation",
          description: "Design next-generation digital wallet features.",
          prompt: "Design innovative digital wallet features that go beyond payments. Consider loyalty programs, budgeting tools, and social features.",
          requiresConfirmation: false
        }
      ]
      }
    ]
  }
};

// Helper function to normalize password input
export function normalizePassword(input: string): string {
  return input.toLowerCase().replace(/\s/g, '').trim();
}

// Get workshop by password
export function getWorkshopByPassword(password: string): Workshop | null {
  const normalized = normalizePassword(password);
  return workshops[normalized] || null;
}