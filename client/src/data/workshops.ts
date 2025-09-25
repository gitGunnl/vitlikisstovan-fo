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
            requiresConfirmation: false
            },
            {
            title: "Stig 4: Samandráttur og 'web-search'",
            description: "Kopiera birti niðanfyri inn í nýggja ChatGPT-vindeyga, skoyt samandráttin inn har tað er merkt, tendra 'web search', og send.",
            prompt: `
I want to work a bit on discovering what can be done regarding a job summary and how they can use ChatPGT to help them in their work. Here is the job summary:

<job_summary>
<------------ADD HERE--------------->
</job_summary>

Look on the web for what tasks other LLM users say can be automated using ChatGPT and similar AI tech in the field we are exploring.

Look for blogs or forums for what people seem to use ChatGPT and similar tools for in similar roles.

Then make a general description of the tasks. The description should explain what types of tasks users say can be automated with great success and alternatively also what does not work for them.

We will use this description so the client can understand what is possible and useful to automate, helping them think through their workflows and identify tasks for automation.
`,
            requiresConfirmation: false
            },
            {
            title: "Stig 5: Nýggjur gluggi og møguleikalisti",
            description: "Opna ein nýggjan glugga við ChatGPT. Kopiera birtið, fyll inn samandráttin og nýggja 'web-search'-listan, og send. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
            prompt: `
## Introduction

We are exploring how language models (LLMs) can automate tasks in the Faroe Islands. The goal is to find tasks where automation streamlines workflows, saves time, removes boring work, and saves money.

I want you to propose a list of **15** things my client can use ChatGPT for. Here is information about my client:

<client_information>
<------------ADD HERE--------------->
</client_information>

Below is guidance on what types of tasks ChatGPT is good at for this client. Use it to shape your ideas and avoid suggesting things the model cannot do.

<tasks_types>

### What ChatGPT Does and Doesn’t (2025)

---

#### Introduction

ChatGPT is a versatile language model that excels at drafting, structuring, explaining, translating, brainstorming, and supporting light analysis and visuals. It performs best with clear goals, concrete inputs, and a brief human check for accuracy and fit. The summaries below describe what it is typically **good at** and where it is **weaker**.

---

#### What ChatGPT Excels At

**Research & Analysis**

* **Current fact lookups with citations:** ChatGPT is good at finding up‑to‑date information using built‑in Search and returning concise answers with source citations when topics change over time (e.g., rules, prices, dates, news).
* **Deep Research (multi‑step investigations):** ChatGPT is good at planning a research path, comparing multiple sources, synthesizing viewpoints, and presenting a referenced summary while avoiding speculation.
* **Data interpretation:** ChatGPT is good at explaining patterns and insights from user‑provided tables, reports, or summaries, and at proposing metrics or next analytical steps.
* **Advanced Data Analysis (Python):** ChatGPT is good at running code for calculations, quick forecasts, and charts, especially when assumptions are stated and results receive a human sanity check.
* **Logic/fallacy/bias audits:** ChatGPT is good at reviewing text for reasoning errors, unsupported claims, and potential bias, and at tagging “claims needing sources.”

**Documentation, Communication & Knowledge**

* **Turning notes into structure:** ChatGPT is good at converting unstructured notes into tables, checklists, JSON, or CSV schemas ready for reuse.
* **SOPs & checklists:** ChatGPT is good at drafting and maintaining standard operating procedures with roles, steps, and outcomes clearly defined.
* **Content repurposing pipelines:** ChatGPT is good at transforming a source (e.g., report) into a slide outline, a script, and audience‑specific social posts while preserving key messages.
* **Meeting prep packs (no meeting joining):** ChatGPT is good at producing crisp agendas, objectives, talking points, and smart questions to raise in meetings.
* **Email/thread summarization:** ChatGPT is good at summarizing pasted conversations, extracting action items, decisions, and owners.
* **Cross‑functional communication:** ChatGPT is good at translating technical language to plain language and tailoring messages for different stakeholders.
* **Persona / user‑story / JTBD drafting:** ChatGPT is good at turning interviews/notes into personas, user stories, acceptance criteria, and measurable outcomes.
* **Localization QA (EN/DK → FO):** ChatGPT is good at back‑translation, enforcing a glossary, and calibrating tone across languages, with a final human pass for Faroese quality.
* **Text anonymization / redaction:** ChatGPT is good at masking names, IDs, and sensitive details and at generating a verification checklist.
* **Knowledge architecture:** ChatGPT is good at categorizing/tagging content and proposing taxonomies and naming conventions.
* **Prompt library design & QA:** ChatGPT is good at drafting reusable prompt templates, rubrics, and style guides, and at testing prompts for consistency.
* **Learning aids:** ChatGPT is good at producing micro‑lessons, quizzes, and flashcards for onboarding or policy training.
* **Documentation & writing support:** ChatGPT is good at outlining, drafting, revising for clarity and tone, translating, summarizing, and maintaining consistent style across documents.

**Operations & Execution Support**

* **Task prioritization & organization:** ChatGPT is good at turning scattered notes into prioritized lists and simple plans (e.g., Kanban‑style groupings).
* **Capacity planning drafts (no calendar control):** ChatGPT is good at sketching workload‑leveling options under stated constraints and fairness notes for later human scheduling.
* **Spreadsheet/regex/SQL helpers:** ChatGPT is good at producing Excel/Sheets formulas, regex patterns, and small SQL snippets with worked examples.
* **Test‑case & edge‑case generation:** ChatGPT is good at enumerating cases for features, processes, or policies (beyond unit tests).
* **Risk registers:** ChatGPT is good at drafting and maintaining risks, triggers, mitigations, and owners for ongoing projects.

**Interactive Sparring & Training**

* **Decision & strategy sparring:** ChatGPT is good at framing objectives, surfacing assumptions, expanding options, and comparing trade‑offs using simple multi‑criteria views.
* **Quality feedback on drafts:** ChatGPT is good at structured critique for clarity, logic, evidence, tone, and consistency, and at sharpening executive summaries.
* **Role‑play & communication rehearsal:** ChatGPT is good at simulating stakeholders, objections, negotiations, and difficult conversations for practice and refinement.
* **Creativity & brainstorming:** ChatGPT is good at running idea sprints (e.g., SCAMPER, forced analogies) and then converging on practical options.
* **Risk thinking:** ChatGPT is good at pre‑mortems, red‑team vs. steelman perspectives, and proposing concrete mitigations.

**Images, Coding & Voice**

* **Image generation & image input:** ChatGPT is good at creating illustrations, mockups, icons, and slide‑style mood concepts, and at analyzing screenshots or diagrams; complex, brand‑perfect infographics remain a design task.
* **Coding assistance:** ChatGPT is good at producing small scripts, explaining code, and generating tests for quick utilities (e.g., data cleaning); results benefit from a human review.
* **Voice for practice:** ChatGPT is good at voice‑based rehearsal (tone, pacing), English practice, and hands‑free brainstorming; it does not join or transcribe real meetings.

---

#### Where ChatGPT Is Weaker (and Typical Workarounds)

* **High‑precision extraction across many documents:** ChatGPT is weaker at perfectly consistent retrieval across large corpora; reliability improves when it quotes sources and a human verifies final numbers.
* **Complex or regulated analytics at scale:** ChatGPT is weaker on very large datasets or high‑stakes financial/statistical work; it helps with scaffolding, explanations, and charts while specialized tools handle the core analysis.
* **Very long documents in one go:** ChatGPT is weaker at sustaining perfect consistency over long, single‑pass drafts; results improve when work is broken into sections with a brief outline and a final consistency pass.
* **Direct control of tools and systems:** ChatGPT does not operate calendars, send emails, or control enterprise tools; it drafts content and plans for a human to execute.
* **Live meeting participation:** ChatGPT does not join or listen to meetings; meeting prep and debrief summaries are supported from user‑provided inputs.

---

#### Faroese & Language Guidance

* **Understanding vs. writing quality:** ChatGPT generally understands Faroese well but produces weaker Faroese writing. Quality is higher when drafting in English or Danish and then translating to Faroese with a short manual edit.
* **Glossary & consistency:** A small glossary of preferred Faroese terms improves consistency; uncertain terms can be flagged for human review.

</tasks_types>

We already found these tasks from searching the internet:

<tasksFound>
<------------ADD HERE--------------->
</tasksFound>

### Your task

Make a **well‑thought‑out list of 15 ideas** my client can use ChatGPT for. **Order them by usefulness**, considering:

* Time saved
* Ease of implementation
* How boring the task is (higher boredom → higher priority)
* Any other relevant factors for this client

**Important constraints**

* **Do not** suggest actions that require controlling calendars, sending emails, or joining meetings. Drafts and guidance are fine; the human executes.
* **Prefer ideas the client can do directly in ChatGPT** (no external integrations).
* When an idea depends on **current information**, explicitly mention that it uses Search with citations.
* When numbers matter, explicitly mention that it uses ADA (Python) with stated assumptions.
* **Include at least 5 interactive “sparring/coaching” ideas** (decision support, feedback/critique, role‑play, brainstorming, or risk thinking).

**Output format (for each item, keep it tight):**

1. **Title (bold)** — one‑sentence description.

   * **Why it matters:** (1 line)
   * **How ChatGPT helps:** (1 line; mention *Search/ADA/Image/Voice/Sparring* if relevant)
   * **Effort:** Low / Medium / High

Keep the writing concise, specific to the client, and practical. Avoid generic “rewrite my email” ideas unless you make them unusually effective for this client’s context.
            `,
            requiresConfirmation: true,
            confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
            },
            {
            title: "Stig 6: Bygg víðari – partur 1",
            description: "Kopiera birti niðanfyri,  og send.",
            prompt: "Very good. Now I want you to think outside the box. Make another analysis of tasks my client can use ChatGPT for. For this analysis, I want you to find tasks that could revolutionize their worklife and field. Give these ideas a rating for how hard it is to implement and how positively impactful it could be for their worklife.",
            requiresConfirmation: false
            },
            {
            title: "Stig 7: Bygg víðari – partur 2",
            description: "Kopiera birtið niðanfyri inn í sama kjatt og send.",
            prompt: `Very good. Now, one last time, lose any predefined notion of how my client’s work should be done and give me a list of revolutionary ways of doing their work with AI, totally based on first principal thinking. Give these ideas a rating for how hard it is to implement and how positively impactful it could be on their worklife.

              Be careful the ideas don’t fall outside what they actually do, but are ideas on how to do their jobs in a totally new and improved way.
`,
            requiresConfirmation: false
            },
            {
            title: "Stig 8: Ger fyrsta listan",
            description: "Kopiera birtið inn í ChatGPT og send.",
            prompt: "Now looking at all the lists you have made, I want you to think about which of these my client should start with. Make a list of the top 5 best and most practical ideas from the lists, these should be the low hanging fruits that give big results.",
            requiresConfirmation: false
            },
            {
            title: "Stig 9: Ger listan lidnan",
            description: "Kopiera birtið inn í ChatGPT og send.",
            prompt: "Now come up with the rest of the list, this should be the top 6-20 ideas, be sure to carefully rank each idea, and then list them.",
            requiresConfirmation: false
            },
            {
            title: "Stig 10: Liðugt – takk fyri!",
            description: "Hattar var verkstovan – vónandi hevur tú nú ein góðan lista. Nú kanst tú prenta listan og leggja hann á náttborðið og lesa hann áðrenn tú sovnar.",
            requiresConfirmation: false
            }
            ]
            },
        {
          id: "next-steps-lab",
          name: "Next Steps Lab",
          description: "Convert your job summary + top‑20 use cases into actionable assets (tests, guardrails, playbooks, deep research). Lane defaults: Amber — describe/redact/synthetic; keep sources in M365.",
          steps: [
            {
              title: "Step 1: Assumption Map & Confidence Heatmap",
              description: "De‑risk your top ideas by exposing hidden assumptions and prioritizing fast validations. Lane: Amber. Action: paste job summary + top‑20 use cases.",
              prompt: "You are my Assumption Mapper. Using my job summary and top‑20 use cases (pasted below), build a table with columns: Assumption | Affects which use‑case(s) | Confidence (Low/Med/High) | Business impact if wrong (1–5) | 48‑hour test to validate | Owner | Data needed. Then prioritize by (impact × (1–confidence)) and propose the first 3 tests to run this week. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I created the assumption table and selected 3 validation tests."
            },
            {
              title: "Step 2: Edge‑Case Bank & Fallback Protocols",
              description: "Design reliability before you launch. Enumerate odd scenarios, first moves, and fallbacks so workflows don’t jam. Lane: Amber.",
              prompt: "Act as a Risk‑aware Ops Designer. From my top‑20 use cases, generate an Edge‑Case Bank. For each high‑value workflow, list 5 edge cases, detection cues, first response, fallback path, and who to notify. End with a top‑5 edge‑case rehearsal plan for the team. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I built the edge‑case bank and rehearsal plan."
            },
            {
              title: "Step 3: Data Coverage & Trust Contract",
              description: "Answer “Can we trust this?” up front. Add a concise trust box to reports and a 2‑line disclaimer for email summaries. Lane: Amber.",
              prompt: "Be my Data Trust Editor. For each reporting/analysis use case, draft a Data Coverage & Trust Contract: What’s included/excluded • Freshness • Known gaps • Quality checks • Caveats • When to escalate. Produce a reader‑friendly box for pasting atop reports and a 2‑line disclaimer for email summaries. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I added a trust box + 2‑line disclaimer to our templates."
            },
            {
              title: "Step 4: Quality Rubric & Calibration Pack",
              description: "Raise quality and consistency. Define clear scoring anchors and self‑check guidance for your 3 most common artifacts. Lane: Green/Amber.",
              prompt: "You are a Rubric Builder. Pick 3 recurring artifacts in my role (e.g., incident notes, SOP updates, stakeholder emails). For each, create a 5‑criteria scoring rubric (1–5) with clear anchor examples of 1 vs 5. Then grade this sample (I’ll paste) and recommend one rewrite to reach a 4+. Materials: <PASTE JOB SUMMARY + TYPICAL ARTIFACTS>",
              requiresConfirmation: true,
              confirmationText: "I confirm I have 3 rubrics with anchors and a calibrated rewrite."
            },
            {
              title: "Step 5: Non‑Goals Charter & Anti‑Patterns",
              description: "Prevent scope‑creep and misuse. Write what we will NOT do, why, the risk, and the exception path. Lane: Green.",
              prompt: "Act as my Scope Bodyguard. From my top‑20, draft a Non‑Goals Charter: what we will NOT do, why, and the risk of doing it. Add an Anti‑Patterns section: “If you see X, do Y instead.” Close with a simple “How to request an exception” flow. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I documented Non‑Goals, Anti‑Patterns, and exceptions."
            },
            {
              title: "Step 6: Guardrails & Redaction Playbook",
              description: "Make safe usage repeatable. Create Green/Amber/Red examples from your work, token redaction patterns, and an output‑only strategy. Lane: Amber/Red (policy).",
              prompt: "You are a Safety Coach. Build a Guardrails & Redaction Playbook for my role: Green/Amber/Red examples mapped to my top‑20 use cases; how to describe vs paste; token redaction patterns (names, IDs); synthetic twin guidance; output‑only patterns (tables/outlines). End with a 30‑second self‑check to run before any prompt. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I created the guardrails playbook with a 30‑second self‑check."
            },
            {
              title: "Step 7: Experiment Factory (Prove the Value)",
              description: "Produce quick evidence. Ship five tiny experiments with success metrics, baseline, and kill criteria in one table. Lane: Green/Amber.",
              prompt: "Be my Experiment Designer. For my top 5 promising use cases, define 1 tiny experiment each: Hypothesis • Success metric (simple) • Baseline vs AI‑assisted method • Sample size • 1‑week plan • Kill criteria. Output as a single table and propose a simple results log (spreadsheet columns). Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I have 5 experiments with metrics and a results log."
            },
            {
              title: "Step 8: Deep Research — Tenant‑Safe LLM ROI & Adoption Playbook",
              description: "Executive‑ready, cited brief: workflows with ROI ranges, adoption model + guardrails, case studies, 90‑day plan, pitfalls. Run in Deep Research if enabled. Lane: Amber.",
              prompt: "Deep Research mode. Using my job summary + top‑20 use cases (below), produce a Tenant‑Safe LLM ROI & Adoption Playbook. Deliver: 1) Executive summary (≤150 words); 2) Top 7 workflows with ROI ranges (minutes saved/week and a quality proxy), assumptions, and 2–3 credible citations each from the last 18 months; 3) Adoption model (skills, change mgmt, training) with guardrails (data residency, no‑training commitments, M365/Copilot governance); 4) 3 comparable case studies (manufacturing/food/remote ops) with outcomes; 5) A 90‑day pilot plan (weeks, milestones, metrics, owners); 6) Red‑team: top 5 pitfalls + early warning signs; 7) Annotated bibliography with source quality notes. Make it board‑ready and state what NOT to do. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I generated the ROI & Adoption Playbook with citations."
            },
            {
              title: "Step 9: Deep Research — Failure Pattern Atlas (Identity/Endpoints & Sites)",
              description: "Build a living atlas of top failure modes with symptoms, first moves, baselines, early warnings, and checklists. Run in Deep Research if enabled. Lane: Amber.",
              prompt: "Deep Research mode. Using my job summary, compile a Failure Pattern Atlas for M365 identity, endpoints, and distributed sites. Deliver: 1) Top 12 failure modes with symptoms, root‑cause patterns, and first moves; 2) A 90‑day “good enough” baseline: lowest‑regret checks/policies that won’t crush productivity (map to Microsoft baseline/CIS where relevant); 3) Early‑warning signals and simple weekly health checks (no code) + a triage decision tree; 4) 3 short case write‑ups from credible sources in the last 18 months; 5) Risks & trade‑offs table. Output a one‑pager for managers + a checklist for operators. Include links and dates. Materials: <PASTE JOB SUMMARY>",
              requiresConfirmation: true,
              confirmationText: "I confirm I produced the Failure Pattern Atlas with sources and checklists."
            },
            {
              title: "Step 10: Escalation Ladder & Comms Tree",
              description: "Decide faster under pressure. Define who decides, how fast, fallbacks, and who to inform with ready‑to‑send templates. Lane: Green.",
              prompt: "Be my Ops Playbook Writer. For the top 5 workflows most likely to jam, produce an Escalation Ladder (trigger → decider → target response time → fallback if unavailable) and a Comms Tree (who to notify, in what order, with a 50‑word template). Keep it to one page. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I have a 1‑page escalation ladder and comms tree."
            },
            // Append these to next-steps-lab.steps
            {
              title: "Step 11.1: Describe Your Problem in Detail",
              description:
                "Clearly articulate the problem before asking for solutions. Include who is affected, where it shows up, what you’ve tried, constraints, stakes/impact, and the ideal outcome. Treat it like briefing a brilliant colleague. Lane: Amber — describe/redact names, IDs, order #s.",
              prompt:
                "Copy and paste the template and fill in the bracketed sections with your problem.\n\nMy problem is: [describe the issue in detail]\nWho is affected: [roles/teams/customers]\nWhere it shows up: [systems/processes/channels]\nImpact today: [time, risk, cost, CSAT, compliance]\nWhat I’ve tried: [attempts + outcomes]\nConstraints: [tools, policy, budget, people, time]\nIdeal outcome: [what 'good' looks like]\nSuccess signals: [how we’ll know it worked]",
              requiresConfirmation: true,
              confirmationText: "I confirm I wrote a detailed problem brief (with constraints, impact, and ideal outcome)."
            },
            {
              title: "Step 11.2: Ask the AI to Become Your Coach (Clarify, No Solutions)",
              description:
                "Before brainstorming, switch the AI to a coaching mode to challenge assumptions and refine the problem. This yields a deeper, better-defined brief and prevents premature solutions.",
              prompt:
                "Act as a critical thinking coach. Based on the problem I just described, your only goal is to help me understand my problem better. Do NOT suggest any solutions. Ask me at least five clarifying questions that challenge assumptions, explore constraints, and help me define the problem more precisely. After I answer, ask follow-up questions until the problem statement is sharp.",
              requiresConfirmation: true,
              confirmationText: "I confirm I answered the coach’s questions and sharpened the problem statement."
            },
            {
              title: "Step 11.3: Brainstorm a Universe of Solutions (Expert Panel)",
              description:
                "Now generate a broad, non-obvious solution set. Use multiple expert lenses to avoid sameness, and force categorization to balance quick wins vs strategic bets.",
              prompt:
                "Act as a panel of experts consisting of an innovator, a pragmatist, and a systems thinker. Using our entire conversation so far (my detailed problem and my answers to your questions), brainstorm 15 distinct and creative solutions. For each solution, provide a 1–2 sentence description and categorize it as one of: Quick Win (simple/easy), Strategic Project (more effort/high impact), or Unconventional Idea (out-of-the-box/status-quo challenge). Ensure diversity of approaches and call out any dependencies or prerequisites.",
              requiresConfirmation: true,
              confirmationText: "I confirm I generated 15 categorized solutions (quick wins, strategic projects, unconventional ideas)."
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