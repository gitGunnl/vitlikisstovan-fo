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
          name: "Verkstova 1: Nýtslu spurtur",
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
    hugskotið: {
      name: "Vitlíkisverkstova",
      company: "Hugskotið",
      labs: [
        {
                  id: "innovation-lab",
                  name: "Venjing 1: Nýtslu spurtur",
                  description: "Hvat kann TÚ nýta ChatGPT til?",
                  steps: [
                // s1 — leave as is
                    {
                    title: "Stig 1: Ein samrøða við vitlíki",
                    description: "Koyr fyrst ChatGPT á vanliga GPT 5.1 myndilin. Um tú hevur nakra fílu sum lýsur teg, so kann tú skoyta hettar uppí nú. Kopiera so byrtið niðanfyri og koyr tað inn í ChatGPT og send. Svara síðan spurningunum, sum verða settir.",
                    prompt: `
        Du er en **neutral, professionel interviewer** med det formål at forstå personens arbejde **dybt og konkret**. Denne indsigt skal gøre det muligt for en kollega at kortlægge detaljerne til potentielle AI/ChatGPT-anvendelser i næste trin. På dette stadie må du **aldrig** foreslå løsninger eller bringe AI-brug op – din eneste opgave er at stille spørgsmål og indsamle information.

        ---

        ### Rolle og adfærd (prioriteret)
        1. **Neutral interviewer:** Stil kun spørgsmål; ingen rådgivning eller forslag.
        2. **Struktureret og effektiv:** Gennemgå de vigtigste områder systematisk: rolle, kalender, opgaver, kommunikation, artefakter, workflows, værktøjer, regler, smertepunkter, ønskeliste.
        3. **Kort og klart:** Spørgsmålene skal være præcise, lette at svare på og uden fagjargon.

        ---

        ### Plan for interviewforløb
        Begin with a concise checklist (3-7 bullets) of de primære delopgaver i interviewet:
        - Etablere grundlæggende rolle/kontekst
        - Udforske centrale arbejdsområder og processer
        - Indsamle eksempler og detaljer om opgaver
        - Optegne eksisterende værktøjer, artefakter og workflows
        - Identificere smertepunkter og ønskeliste
        - Opsummere relevante arbejdsmønstre
        - Validere forståelse løbende
        Følg denne konceptuelle struktur, men tilpas rækkefølge og fokus ud fra samtalens indhold.

        ### Sådan gennemfører du interviewet
        - **Stil & tempo:**
          - Stil **1-2 præcise spørgsmål ad gangen**.
          - Formuler dem, så de besvares i **2-5 sætninger eller korte bullets**.
          - Undgå både alt for brede ("Fortæl alt om…") og snævre ("Hvilken knap?") spørgsmål.

        - **Arbejdsnoter (Working Notes):**
          - Hold korte **Arbejdsnoter**, opdateret ca. hver **2-3 interaktioner** (kun bullets).
          - Brug dem til at holde styr på det væsentlige; vis dem kun ved korte recaps.
          - Ved risiko for misforståelse, brug eksempelvis:
            - "Jeg har forstået X → Y → Z. Har jeg fanget det rigtigt?"

        - **Post-action Validering:**
          - Efter hver større afklaring eller opdatering af Arbejdsnoter, valider forståelsen kort i 1-2 linjer og tilbyd at afklare evt. uklarheder, før du fortsætter til næste emne.

        - **Varighed:**
          - Fortsæt interviewet, indtil personen beder dig stoppe **og** giver dig din næste opgave.

        - **Sikkerhed & privatliv:**
          - Anmod om **anonymiserede/redigerede** eksempler, hvis det gavner forståelsen.
          - Bed **aldrig** om adgangskoder, login, personnumre eller andre fortrolige oplysninger.

        - **Sprog:**
          - Tilpas sprog og tone som brugeren (dansk, engelsk mv.).
          - Brug **klar og enkel dansk** ved tvivl.

        ---

        ### Hvad du især skal lytte efter
        *(Brug kun som linse for dine spørgsmål – du må stadig ikke foreslå løsninger)*
        - Tunge skrive- og omskrivningsopgaver
        - Opsummering af dokumenter, e-mails, møder
        - Idégenerering & sparring
        - Syntese & videnhentning
        - Klassifikation, tagging, routing af henvendelser
        - Datahåndtering (udtræk af info fra tekst/tal/diagram)
        - Kundekommunikation/support
        - Oversættelse & tone-skift
        - Planlægning & koordinering
        - Repetitive processer med klare input/output
        - Dokumentoprettelse fra skabeloner

        ---

        ### Dækningsområder (metodisk gennemgang)
        1. **Rolle & kontekst:** titel, team, forretningsområde, mission, succeskriterier
        2. **Kalender-realitet:** faste møder, deadlines, sæson/årshjul
        3. **Daglige/ugentlige opgaver:** frekvens, volumen, varighed, input/output
        4. **Kommunikation:** samarbejdspartnere, kanaler, typiske beskeder
        5. **Artefakter:** dokumenter, regneark, præsentationer, systemer
        6. **Workflows & godkendelser:** rækkefølge, overleveringer, beslutningspunkter
        7. **Værktøjer & systemer:** M365/Google, CRM/ERP, fagsystemer, tickets, datakilder
        8. **Regler & begrænsninger:** compliance, fortrolighed, kvalitetskrav, SLA/KPI’er
        9. **Smertepunkter:** flaskehalse, fejl, ventetid, copy-paste-arbejde
        10. **Ønskeliste & idealbillede:** hvad "rigtig godt" ville være (uden at nævne AI)

        ---

        ### Spørgsmål-heuristikker (Guldhårs-testen)
        - Omformulér "Fortæl om X" til fx:
          - "I en typisk uge, hvor mange X? Hvor lang tid varer de? Hvad adskiller en nem fra en svær?"
        - Kvantificér hvor muligt:
          - "Circa hvor mange om ugen? Minutter pr. opgave? Hvor stor andel skal rettes/godkendes?"
        - Følg processen:
          - "Hvad er inputtene? Hvor kommer de fra? Hvad sker derefter? Hvem bruger output?"
        - Stil spørgsmål om variation:
          - "Hvad er de 3 mest almindelige undtagelser? Hvor tit sker de?"

        ---

        ### Arbejdsnoter (struktur)
        Opdater løbende bullets som:
        - **Rolle & mål:** …
        - **Højvolumen-opgaver (frekvens/tid):** …
        - **Artefakter & værktøjer:** …
        - **Workflows & beslutningspunkter:** …
        - **Begrænsninger/KPI’er:** …
        - **Observeret friktion:** …
        Vis kun Arbejdsnoter ved recaps, og brug "Har jeg fanget det rigtigt?" kun hvor reel misforståelsesfare er til stede.

        ---

        ### Vigtig begrænsning
        Du må **aldrig** i interviewet foreslå eller beskrive, hvordan ChatGPT/AI kan hjælpe. Din opgave er udelukkende at indsamle **præcis og grundig kontekst** til senere analyse.

        ---

        ### Startlogik
        **Hvis brugeren har vedhæftet en fil med baggrundsinformation (rolle, team, ansvar eller arbejdskontekst):**
        1. **Læs filen grundigt før interviewet.**
        2. **Integrér filens indhold** i din indledende forståelse.
        3. **Tilpas dine første spørgsmål,** så du undgår at spørge om ting, filen allerede forklarer.
        4. Brug filen til et første udkast til **Arbejdsnoter**.

        **Hvis der ikke er vedhæftet en fil:**
        - Hilse kort, forklar din rolle, og stil disse åbningsspørgsmål:

        1. "Hvad er din **rolle/titel**, og hvilket **team/område** arbejder du i? Kan du i én sætning beskrive jeres **overordnede mission**?"
        2. "Gennemgå en **typisk uge**. Hvad er de **3 vigtigste tilbagevendende opgaver**, som tager mest af din tid?"

        **Start nu.**


                    `,
                    requiresConfirmation: false
                    },
                    {
                    title: "Stig 2: Samandráttur (við Thinking-modellinum)",
                    description: "Skift fyrst til 'Thinking'-modellið. Kopiera samandráttar birtið niðanfyri, set tað aftast í somu samrøðu, sum tú júst hevði við ChatGPT, og send.",
                    prompt: `
        Stop interviewet nu og opsummér mit arbejde udelukkende ud fra den information jeg har givet dig. 

        Din opgave er at producere et detaljeret, velstruktureret resumé, der kan bruges som grundlag for at finde ChatGPT-anvendelser senere.

        Brug kun information, der kommer direkte fra mine input. 
        - Ingen gæt, ingen udfyldning af huller.
        - Hvis noget ikke er nævnt, så lad det være usagt.

        Returnér præcis disse sektioner og overskrifter:

        1) Rolle-overblik
           - Kort beskrivelse af hvad jeg gør, hvem jeg betjener, og hvilke hovedresultater jeg bliver målt på.

        2) Kerneansvar
           - Punktliste med stærke udsagnsord i starten (fx “Udarbejder…”, “Koordinerer…”, “Godkender…”).
           - Én linje pr. punkt.

        3) Tilbagevendende workflows & leverancer
           - For hvert workflow: beskriv typiske input → output (hver del maks. 8 ord).
           - Angiv frekvens, hvis jeg har nævnt den (fx “ugentligt”, “dagligt”, “månedligt”).

        4) Værktøjer, systemer & begrænsninger
           - Punktliste over apps, systemer, datakilder, adgangsgrænser, compliance-/fortrolighedsforhold, jeg har nævnt.

        Generelle begrænsninger:
        - Ingen generelle påstande om AI.
        - Ingen råd, vejledning eller tutorials.
        - Ingen marketing-sprog eller “flotte” formuleringer – skriv nøgternt og konkret.
        - Ingen information, der ikke kan spores tilbage til noget, jeg faktisk har sagt.

                    `,
                    requiresConfirmation: true,
                    confirmationText: "Eg vátti, at eg havi fingið ein fullfíggjaðan samandrátt, lisið hann og staðfest, at hann er rættur."
                    },
                    {
                    title: "Stig 3: Opna nýggjan glugga og fær aftur inn á ChatGPT",
                    description: "Opna eitt nýtt vindeyga í kaganum og lat upp ChatGPT aftur. Læt fyrra vindeyga við samandráttinum vera opið.",
                    requiresConfirmation: false
                    },
                    {
                    title: "Stig 4: Deep Research",
                    description: "Kopiera birti niðanfyri inn í nýggja ChatGPT-vindeyga, skoyt samandráttin inn har tað er merkt, tendra Deep Research og send so.",
                    prompt: `
        Du skal bruge Deep Research til at skrive en samlet rapport til ledere om, hvordan personer i en given rolle faktisk bruger ChatGPT og lignende LLM-værktøjer i deres arbejde.

        Rollen beskrives her:

        <arbejds_beskrivelse>
        <------------Indsæt her--------------->
        </arbejds_beskrivelse>

        ---

        ## Formål

        Rapporten skal hjælpe en leder med at forstå:

        - Hvilke typer opgaver og arbejdssituationer folk i lignende roller bruger ChatGPT til.
        - De forskellige “arbejdsmåder”/roller, som ChatGPT typisk indtager i deres hverdag (du finder selv de bedste betegnelser ud fra kilderne).
        - Forskellen mellem:
          - Overfladisk brug (primært skrivning, omskrivning, opsummering) og  
          - Dybere brug, hvor ChatGPT bruges som reel sparringspartner, tænkende medspiller og beslutningsstøtte.
        - Hvad brugere typisk oplever som begrænsninger og faldgruber.

        Fokus: Rapporten skal være forklarende og narrativ, ikke en punktliste med “top 50 use cases”.

        ---

        ## Researchfokus (Deep Research)

        Brug dine Deep Research-evner til at:

        1. Identificere kilder, hvor personer med lignende roller beskriver, hvordan de bruger ChatGPT/LLM’er i praksis, fx:
           - Blogindlæg, personlige erfaringer, case stories.
           - Community-tråde og fora (Q&A, diskussionsfora, LinkedIn-indlæg m.m.).
           - Artikler, interviews og officielle eksempler, hvor konkrete arbejdssituationer gennemgås.

        2. Udlede mønstre:
           - Hvilke typer opgaver og situationer går igen?
           - Hvordan beskriver de interaktionen med ChatGPT (dialog, iterativ sparring, “rolle-spil” osv.)?
           - Hvor oplever de størst værdi? Hvor oplever de typisk skuffelse eller begrænsninger?

        3. Læg særlig vægt på kilder, hvor ChatGPT omtales som:
           - sparringspartner / medtænker,
           - problemløsningsmakker,
           - beslutnings- og refleksionsstøtte.

        Altså der, hvor værktøjet bruges til at tænke, strukturere og udvikle løsninger, ikke kun til at skrive pænt eller oversætte tekst.

        Hvis kilderne er uenige, eller der findes forskellige erfaringer, skal det tydeligt fremgå i rapporten.

        ---

        ## Inspiration til gode kilder (vejledende)

        Som del af din research kan du med fordel orientere dig mod:

        - Rollebaserede playbooks fra modelleverandører, fx:
          - OpenAI-materiale om “ChatGPT for work/for any role” og tilhørende prompt-pakker for specifikke funktioner.
          - Googles Gemini-materiale med “role-specific prompts & use cases” og Workspace-handbooks for forskellige roller.
          - Microsoft Copilot-guides om “top use cases by role”, “Copilot for work” og adoption-playbooks.
          - Claude-guides til almindelige use cases og prompt-biblioteker.

        - Kataloger og dossierer fra de store konsulenthuse, fx:
          - McKinsey-rapporter om økonomisk potentiale og funktionsopdelte GenAI-use cases.
          - Deloitte-dossier(er) med generative AI-use cases på tværs af brancher.
          - PwC’s interaktive “use case compass” og relaterede whitepapers.
          - Accenture, BCG, EY, KPMG og World Economic Forum-publikationer, der samler og strukturerer GenAI-anvendelser.

        Du skal ikke liste eller referere alle disse eksplicit; brug dem som inspiration og kildebase for at forstå de mest udbredte og modne mønstre på tværs af roller og brancher.

        ---

        ## Rapportens struktur

        Skriv en sammenhængende rapport i klart, enkelt dansk, rettet mod en travl leder. Brug overskrifter og korte underafsnit.

        Brug denne struktur:

        ### 1. Executive summary (ca. 1–1½ side)

        - Kort beskrivelse af rollen (som du forstår den ud fra <job_summary>).  
        - De vigtigste indsigter om, hvad folk i lignende roller faktisk bruger ChatGPT til.  
        - En klar forklaring af forskellen mellem:
          - Overfladisk brug (skrivning/opsummering), og  
          - Dybere brug (sparring, tænkning, beslutningsstøtte).  
        - 3–5 hovedpointer, som en leder bør tage med sig.

        ### 2. Rolle og arbejdskontekst (kort)

        - Din syntese af, hvordan rollen typisk arbejder: opgavetyper, ansvar, arbejdsrytme.  
        - Hvilke dele af arbejdet der ser ud til at være mest tekst-, viden- og beslutningstungt.  
        - Hvor der – ud fra kilderne – typisk opstår kompleksitet, usikkerhed og behov for sparring.

        ### 3. Typiske brugsmønstre for ChatGPT i lignende roller

        Beskriv de mest almindelige måder, folk bruger ChatGPT på i lignende jobs – som arbejdsmåder/roller værktøjet kan indtage, ikke som løse enkeltfunktioner.

        Del dette i to niveauer:

        3.1 Overfladiske brugsscenarier (første lag af værdi)  
        - Forklar, hvordan ChatGPT bruges til at skrive, omskrive, forkorte, oversætte og opsummere.  
        - Beskriv med ord, hvorfor det er nyttigt (tid, kvalitet, struktur) – men også hvorfor det kun er “første lag” af værdien.

        3.2 Dybere brugsscenarier (sparring, tænkning og beslutningsstøtte)  
        - Beskriv de arbejdsmåder, hvor ChatGPT bruges til fx:
          - at strukturere komplekse problemstillinger og cases,  
          - at udforske muligheder, scenarier og konsekvenser,  
          - at forberede beslutninger, møder og forhandlinger,  
          - at teste argumenter og modargumenter,  
          - at planlægge, designe og forbedre workflows, processer og kommunikation.
        - For hver arbejdsmåde:
          - Giv den et kort, men sigende navn (ud fra kilderne).  
          - Forklar hvad den går ud på, hvad den typisk bruges til, og hvorfor brugerne oplever høj værdi.  
          - Brug konkrete, kortfattede eksempler fra kilderne til at illustrere.

        ### 4. Begrænsninger og typiske faldgruber

        - Hvilke typer opgaver fortæller brugere, at ChatGPT ikke er godt til alene?  
        - Hvor ser de risiko (fx faktuel nøjagtighed, lokal lovgivning, compliance, domænespecifik viden)?  
        - Hvilke arbejdssituationer kræver, at mennesket bevarer kontrol, dømmekraft og ansvar?  
        - Beskriv typiske faldgruber og misforståelser (fx “AI som sandhedsorakel”) i tekstform – ikke som ren tjekliste.

        ### 5. Implikationer og refleksionsspørgsmål for kunden

        - Forklar, hvad denne viden betyder for en leder, der overvejer at udbrede brugen af ChatGPT i sin afdeling.  
        - Fremhæv især:
          - at den største værdi opstår, når medarbejdere lærer at bruge ChatGPT som sparringspartner og tænkende makker,  
          - at skrivning/opsummering er vigtige, men kun det første skridt.  
        - Afslut med 5–8 konkrete refleksionsspørgsmål, der hjælper lederen med at kigge på egne workflows og spørge fx:
          - “Hvor i vores arbejde kunne disse arbejdsmåder give mening?”  
          - “Hvor ville sparring og scenarie-tænkning med ChatGPT konkret aflaste os?”  
          - “Hvordan kan vi eksperimentere sikkert med dette – uden at gå på kompromis med compliance?”  
          - “Hvor skal vi ikke læne os for tungt op ad AI?”

        ---

        ## Kvalitetskrav

        - Skriv i et roligt, nøgternt, ikke-hypet sprog.  
        - Gør rapporten behagelig og hurtig at læse for en chef, med tydelige overskrifter og korte afsnit.  
        - Undgå punktlister over “use cases”; fokusér på typer af arbejde og måder at samarbejde med ChatGPT på.  
        - Inddrag konkrete eksempler fra dine kilder i kort form, og brug kildehenvisninger efter behov.  
        - Hvis der er usikkerhed eller uenighed i kilderne, så sig det direkte.

        Rapporten skal kunne læses selvstændigt af en leder, der aldrig har brugt ChatGPT før men kender til det, men som har stærk faglig forståelse for sin egen rolle og organisation.

        `,
                    requiresConfirmation: false
                    },
                    {
                    title: "Stig 5: Nýggjur gluggi og møguleikalisti",
                    description: "Opna ein nýggjan glugga við ChatGPT. Kopiera birtið, fyll inn tín samandrátt. Broyt nú myndilin til [ChatGPT 5.1 Thinking] og send avstað. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
                    prompt: `
        ## Introduktion

        Vi undersøger, hvordan sprogmodeller (LLM’er) kan automatisere opgaver i et kontormiljø på Færøerne. Målet er at finde opgaver, hvor automation strømliner arbejdsgange, sparer tid, fjerner kedeligt arbejde og sparer penge – især ved at bruge ChatGPT som **tænke‑partner og sparringspartner**, ikke kun som “dokumentmaskine”.

        Jeg vil have dig til at foreslå en liste med de **15** bedste ting, min klient kan bruge ChatGPT til. Her er information om klienten:

        <arbejds_beskrivelse>
        <------------Indsæt her--------------->
        </arbejds_beskrivelse>

        Nedenfor er vejledning om, hvilke typer opgaver ChatGPT er god til. Brug den til at forme dine ideer og undgå at foreslå ting, modellen ikke kan.

        <tasks_types>

        ### Hvad ChatGPT kan og ikke kan (2025)

        ---

        #### Introduktion

        ChatGPT er en alsidig sprogmodel, der er stærk til at strukturere, forklare, oversætte, brainstorme, spille roller, lave simple visualiseringer, lave research og støtte analyser. Den er bedst, når der er klare mål, konkrete input og et menneske, der kvalitetssikrer output. Nedenfor beskrives, hvad den typisk er **god til**, hvor den er **svagere**, og hvilke mønstre der giver mest værdi i praksis.

        ---

        ### Højværdimønstre (brug disse først)

        Når du foreslår anvendelser, bør du især lede efter opgaver, hvor ChatGPT:

        * **Hjælper mennesker med at tænke og beslutte**
          – fx strategisparring, scenarier, trade‑off‑analyser, prioritering.
        * **Omdanner rodede input til struktur**
          – fx planer, tjeklister, SOP’er, risikoregistre, skemaer, taxonomier.
        * **Forstærker tilbagevendende processer**
          – fx standardsvar, skabelonbaserede breve, faste rapporter.
        * **Understøtter flersproget arbejde (EN/DK ↔ FO)**
          – fx kladder på engelsk/dansk, efterfulgt af oversættelse til færøsk og kort menneskelig redigering.

        Når du vælger og rangerer ideer, skal du **prioritere disse mønstre** over ren “dokumentskrivning”.

        ---

        ### Mest værdifuldt: Sparring, beslutningsstøtte og tænke‑partner

        ChatGPT er særlig værdifuld, når den bruges som en interaktiv partner, der stiller spørgsmål, udfordrer antagelser og hjælper med beslutninger:

        * **Beslutnings‑ & strategisparring**
          God til at skærpe mål, synliggøre antagelser, udvide mulige løsninger og sammenligne trade‑offs for fx projektprioritering, bemanding, leverandørvalg og ændringer i retningslinjer/politikker.

        * **Kvalitetsfeedback på udkast**
          God til struktureret feedback på klarhed, logik, evidens, tone og konsistens – og til at hjælpe med at skrive korte, skarpe ledelsesresuméer.

        * **Rollespil & kommunikationstræning**
          God til at simulere kolleger, ledere, borgere/kunder eller andre interessenter, inkl. svære samtaler, indvendinger, forhandling og feedback‑dialoger.

        * **Kreativitet & idéudvikling**
          Meget god til idéspurt, laterale vinkler og mange mulige forslag til kampagner, forbedringer af arbejdsgange, nye servicekoncepter m.m.

        * **Risikotænkning & “hvad‑nu‑hvis”**
          God til pre‑mortems (“hvad kan gå galt?”), red‑teaming vs. steelmanning, scenarie‑skitser og konkrete forslag til risikoreduktion.

        * **Faglig forklaring & mikrosparring:** God til at forklare komplekse faglige emner i forskellige sværhedsgrader, give eksempler og små øvelser, så medarbejdere hurtigt kan sætte sig ind i nye regler, værktøjer eller metoder.

        * **HR‑ & udviklingssparring:** God til at beskrive roller og kompetenceprofiler, forberede MUS‑/udviklingssamtaler, formulere udviklingsmål og rolle‑spille svære HR‑dialoger.

        > **Vigtigt:** Når du senere foreslår anvendelser, skal **mindst 5** af de 15 ideer ligge i denne kategori (sparring / beslutningsstøtte / feedback / rolle‑spil / risikotænkning). Behandl disse som **kerne‑anvendelser**.

        ---

        ### Research & analyse

        * **Aktuelle faktaopslag med kilder:**
          God til at finde opdateret information via indbygget Search og give korte svar med kildehenvisninger, når emner ændrer sig over tid (fx regler, priser, datoer, nyheder).

        * **Fordybelsesresearch (multi‑step undersøgelser):**
          God til at planlægge en research‑sti, sammenholde flere kilder, syntetisere synspunkter og lave refererede sammenfatninger – med et menneske, der tjekker de vigtigste konklusioner. Prioritér research, der bruges til **konkrete beslutninger eller tilbagevendende opgaver**.

        * **Datafortolkning:**
          God til at forklare mønstre og indsigter fra brugerleverede tabeller, rapporter eller resumeer og foreslå simple nøgletal eller næste analytiske skridt.

        * **Avanceret dataanalyse (ADA / Python):**
          God til beregninger, hurtige prognoser og visualiseringer med tydelige antagelser, som et menneske derefter sanity‑checker.

        * **Logik‑, fejlslutnings‑ og bias‑tjek:**
          God til at gennemgå tekst for argumentationsfejl, uunderbyggede påstande og mulige bias og mærke “påstande, der kræver kilder”.

        ---

        ### Dokumentation & viden (sekundært og gentagende)

        Denne kategori er vigtig, men bør typisk **nedprioriteres ift. sparring og beslutningsstøtte**, medmindre opgaven er tilbagevendende og tidskrævende.

        * **At omdanne noter til struktur:**
          God til at gøre løse noter til tabeller, tjeklister, JSON/CSV‑skemaer, som kan genbruges.

        * **SOP’er & tjeklister:**
          God til at udkaste og vedligeholde standardprocedurer med klare roller, trin og forventede resultater.

        * **Content‑repurposing pipelines:**
          God til at omdanne én kilde (fx en rapport) til slide‑oversigt, manus og målgruppespecifikke opslag, mens kernebudskaber bevares.

        * **Regel‑ & politikfortolkning til praksis:** God til at forklare love, regler og interne politikker i almindeligt sprog for forskellige målgrupper og omsætte dem til tjeklister, FAQ og enkle beslutningstræer (ikke som juridisk rådgivning, men som støtte til forståelse).

        * **Dokumentopsummering & Q&A:** God til at læse et indsat dokument (fx rapport, kontrakt, notat), trække nøglepunkter ud, forklare indholdet i forskellige niveauer af detaljer og besvare konkrete spørgsmål til dokumentet.

        * **Mødeforberedelsespakker (uden mødedeltagelse):**
          God til agendaer, mål, talepunkter og forslag til smarte spørgsmål – baseret på input, du giver.

        * **E‑mail‑/trådresuméer:**
          God til at opsummere indsatte samtaler, udtrække beslutninger, actions og ansvarlige.

        * **Tværfaglig kommunikation:**
          God til at oversætte teknisk sprog til almindeligt sprog og tilpasse budskaber til forskellige målgrupper.

        * **Sags‑ & henvendelsestriage:** God til at klassificere indkomne henvendelser (e‑mails, formularer), foreslå prioritet og udkaste standardsvar eller tekst‑moduler, som medarbejderen kan tilpasse – uden at ChatGPT selv sender noget.

        * **Persona / user‑stories / JTBD:**
          God til at omsætte interview/antagelser til personas, user stories, acceptance criteria og målbare effekter.

        * **Lokaliserings‑QA (EN/DK → FO):**
          God til back‑oversættelse, håndhævelse af ordliste/glossar og tonekontrol på tværs af sprog – altid med et sidste menneskeligt tjek for færøsk kvalitet.

        * **Vidensarkitektur:**
          God til at kategorisere/tilføje tags til indhold samt foreslå taksonomier og navngivningskonventioner.

        * **Promptbibliotek & QA:**
          God til at udkaste genbrugelige prompts, rubrikker og stilguides og teste prompts for konsistens.

        * **Læringsmaterialer:**
          God til mikrokurser, quizzer og flashcards til onboarding eller policy‑træning.

        * **Dokumentations‑ & skrivesupport (sekundært):**
          God til at lave dispositioner, skrive første udkast og revidere for klarhed og tone – især når der er tale om **standardiserede/skabelonbaserede tekster**, ikke engangs‑emails.

        ---

        ### Drift & eksekveringsstøtte (ofte kombineret med sparring)

        * **Opgaveprioritering & organisering:**
          God til at gøre rodede todo‑lister til prioriterede oversigter, simple planer eller kanban‑opdelinger.

        * **Kapacitetsplanlægningsudkast (ingen kalenderkontrol):**
          God til at skitsere mulige fordeling‑scenarier af opgaver ud fra angivne begrænsninger og fairness‑hensyn, som mennesker senere lægger i kalenderen.

        * **Regneark/regex/SQL‑hjælp:**
          God til at formulere Excel/Sheets‑formler, regex‑mønstre og små SQL‑snipper med eksempler.

        * **Testcases & edgecases:**
          God til at opstille testscenarier for funktioner, processer eller politikker (ud over klassiske unit‑tests).

        * **Proceskortlægning & forbedring:** God til at omsætte beskrivelser af arbejdsgange til simple procesflows, pege på flaskehalse og foreslå “as‑is” vs. “to‑be” forbedringer – ofte kombineret med sparring om konsekvenser.

        * **Risikoregistre:**
          God til at udkaste og vedligeholde risici, triggere, mitigeringer og ejere for igangværende projekter.

        > Mange af disse opgaver bliver endnu stærkere, når ChatGPT samtidig bruges som **sparringspartner** til at udfordre antagelser og valg.

        ---

        ### Billeder, kode & stemme (kun hvis relevant)

        * **Billedgenerering:**
          God til enkle illustrationer, mockups, ikoner eller “slide‑stemninger”, der støtter kommunikation.

        * **Billedinput:**
          God til at analysere skærmbilleder/diagrammer og finde struktur (fx skemaer fra et foto, simple CSS‑forslag ud fra et billede).

        * **Kodehjælp (små ting):**
          Meget god til små scripts og hjælpeværktøjer til fx datarensning eller simple automatiseringer – **ikke** til store, komplekse systemer.

        * **Stemme (Voice):**
          God til øvelse i tone og tempo, sproglig træning og håndfri brainstorming, hvis stemmetilstand er tilgængelig.

        > Foreslå kun billed‑, kode‑ eller stemme‑anvendelser, hvis de **klart matcher klientens kontekst** og er mere værdifulde end andre muligheder.

        ---

        ### Færøsk & sprogvejledning

        * **Forståelse vs. skrivekvalitet:**
          ChatGPT forstår færøsk udmærket, men skriver relativt svagere på færøsk. Kvaliteten bliver højere, hvis man **skriver kladder på engelsk eller dansk** og derefter **oversætter til færøsk** med kort manuel redigering.

        * **Standard‑workflow for FO‑tekster:**
          Antag som udgangspunkt, at:

          1. ChatGPT hjælper med at udvikle indhold på **engelsk eller dansk**,
          2. ChatGPT oversætter til **færøsk**,
          3. Et menneske laver en **kort sproglig og faglig gennemgang**.

        * **Ordliste & konsistens:**
          En lille ordliste over foretrukne færøske begreber forbedrer konsistensen; usikre begreber kan markeres til menneskelig vurdering.

        > Du må gerne foreslå arbejdsgange, hvor ChatGPT **udnytter EN/DK + FO‑kombinationen** (fx EN‑udkast → FO‑brevskabelon → menneskelig finpudsning).

        ---

        ### Værktøjstags til “How ChatGPT helps”

        I dine forslag skal du – når relevant – nævne, hvilke værktøjer der bruges:

        * **Search:** Indbygget web‑søgning til opdateret viden med kilder.
        * **ADA:** Advanced Data Analysis (Python) til beregninger, analyser og simple grafer.
        * **Image:** Billedgenerering eller billedforståelse (hvis slået til).
        * **Voice:** Stemmetilstand til øvelser, diktering og dialog.
        * **Sparring:** Interaktivt frem‑og‑tilbage, spørgsmål, rolle‑spil og kritik.

        ---

        ### Hvor ChatGPT er svagere (og typiske workarounds)

        * **Højpræcist udtræk på tværs af mange dokumenter:**
          Svagere til perfekt konsistente tal på tværs af store dokumentmængder; brug citater fra kilder og menneskelig verifikation af nøgletal.

        * **Kompleks eller reguleret analyse i stor skala:**
          Svagere på meget store datasæt eller højrisiko‑økonomi/statistik; brug ChatGPT til rammesætning, forklaringer og skitser, og lad specialværktøjer klare kerneanalysen.

        * **Meget lange dokumenter i ét hug:**
          Svagere til fuld konsistens i meget lange tekster; kvaliteten øges ved at arbejde i sektioner med en overordnet disposition og en afsluttende konsistensgennemgang.

        * **Direkte kontrol af værktøjer og systemer:**
          ChatGPT kan **ikke** styre kalendere, sende e‑mails, ændre data i systemer eller integrere direkte med virksomhedens it‑værktøjer. Det kan kun udkaste indhold, planer og forslag, som mennesker bagefter udfører.

        * **Live mødedeltagelse:**
          ChatGPT deltager ikke i møder eller lytter til møder på færøsk; det kan hjælpe med forberedelse og opsamling baseret på input, du giver.

        * **Forståelse af virkelig kontekst:**
          ChatGPT mangler fuld real‑world kontekst og bør typisk bruges til de **første ~80%** (idéer, strukturer, udkast). Mennesker vælger de bedste muligheder og tjekker, at det giver mening i praksis.

        ---

        ### Hvad der bør nedprioriteres i top‑15‑listen

        Medmindre der er en **meget stærk, klientspecifik grund**, bør følgende **ikke fylde** i top‑15‑listen:

        * Engangs‑opgaver som “omskriv denne ene e‑mail” eller små, sporadiske tekstrettelser.
        * Generiske blogindlæg eller sociale medier‑opslag uden klart forretningsmål.
        * Store, komplekse softwareprojekter eller hele systemer.
        * Meget nichepræget eller hårdt reguleret analyse, hvor specialister og systemer er afgørende.
        * Billed‑ eller kodeprojekter uden tydelig kobling til klientens kerneopgaver.

        ---

        ### Sådan vælger du de bedste anvendelser (selektionsheuristik)

        Når du vælger og rangerer ideer for denne klient, skal du foretrække opgaver, der:

        * Forekommer **ofte** (fx ugentligt eller månedligt).
        * Opleves som **kedelige, monotone eller tidskrævende** for mennesker.
        * Involverer **tænkning, vurdering eller trade‑offs**, ikke kun formatering.
        * Kan udføres **direkte i ChatGPT**, uden integrationer til andre systemer.
        * Har tydelige **tids‑ eller omkostningsbesparelser** eller forbedrer kvalitet/ensartethed.
        * Gør det **nemmere at træffe bedre beslutninger** eller at lære hurtigere.

        Brug disse kriterier – sammen med klientinformationen – når du vælger, hvilke ideer der skal på top‑15‑listen, og hvordan de skal prioriteres.

        </tasks_types>

        ### Din opgave

        Lav en **gennemtænkt liste med 15 ideer**, som min klient kan bruge ChatGPT til. **Rangordn dem efter nytteværdi** ud fra:

        * Tidsbesparelse
        * Lethed ved implementering
        * Hvor kedelig/monoton opgaven er (mere kedelig → højere prioritet)
        * Andre relevante faktorer for denne klient (fx kvalitet, risiko, læring)

        **Vigtige begrænsninger**

        * Foreslå **ikke** handlinger, der kræver at ChatGPT styrer kalendere, sender e‑mails, deltager i møder eller på anden måde tager direkte handling i eksterne systemer. Det kan den ikke.
        * Foretræk ideer, som klienten kan gennemføre **direkte i ChatGPT**, uden integrationer.
        * Inkludér **mindst 5 interaktive** ideer inden for **sparring/coaching/rolle‑spil** (beslutningsstøtte, feedback/kritik, rolle‑spil, brainstorming eller risikotænkning).
        * Brug vejledningen i <tasks_types> til at fokusere på de mest værdifulde mønstre (tænke‑partner, strukturering af rodede input, tilbagevendende processer og flersproget arbejde).

        **Output‑format (hold hvert punkt kort og konkret):**

        1. **Titel (fed)** — én sætning, der beskriver ideen.

           * **Hvorfor det er vigtigt:** (1 linje)
           * **Hvordan ChatGPT hjælper:** (1 linje;)
           * **Indsats:** Lav / Mellem / Høj

        Skriv ideerne kort, konkrete og tilpasset denne klient. Undgå generiske forslag som “omskriv min e‑mail”, medmindre det i denne klients kontekst er **ekstraordinært** værdifuldt og tilbagevendende.

                    `,
                    requiresConfirmation: true,
                    confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
                    },
                    {
                    title: "Stig 6: Bygg víðari – partur 1",
                    description: "Kopiera birti niðanfyri og send.",
                    prompt: "Rigtig godt. Nu vil jeg gerne have, at du tænker ud af boksen. Lav en ny analyse af opgaver, som min klient kan bruge ChatGPT til. I denne analyse vil jeg have dig til at finde opgaver, der kunne revolutionere deres arbejdsliv og branche. Giv disse ideer en vurdering af, hvor svære de er at implementere, og hvor stor en positiv effekt de kunne have på deres arbejdsliv. Præsenter de 3 bedste ideer, du finder.",
                    requiresConfirmation: false
                    },
                    {
                    title: "Stig 7: Bygg víðari – partur 2",
                    description: "Kopiera birtið niðanfyri inn í sama kjatt og send.",
                    prompt: `
                    Rigtig godt. Nu, en sidste gang: Slip alle forudfattede meninger om, hvordan min klients opgaver bør løses, og giv mig en liste over revolutionerende måder at udføre deres arbejde på med AI, baseret på 'first principles'-tænkning.

                    Giv disse ideer en vurdering af, hvor svære de er at implementere, og hvor stor en positiv effekt de kan have på deres arbejdsliv. Præsenter de 3 bedste ideer, du finder.

                    Vær opmærksom på, at ideerne ikke må falde uden for det, de rent faktisk laver, men skal være forslag til, hvordan de kan udføre deres job på en helt ny og forbedret måde.
        `,
                    requiresConfirmation: false
                    },
                    {
                    title: "Stig 8: Ger listan",
                    description: "Kopiera birtið inn í ChatGPT og send.",
                    prompt: `Find nu på meget relevante metrikker til at måle effektiviteten af disse ideer. Gennemgå derefter alle ideerne, og ranger dem ud fra dine metrikker. Præsenter til sidst en sorteret liste over alle 21 idéer.`,
                    requiresConfirmation: false
                    },
                    {
                    title: "Stig 9: Skoyt uppí meira forkláring",
                    description: "Kopiera birtið inn í ChatGPT og send.",
                    prompt: `
        "Til sidst skal du tilføje følgende elementer til alle ideerne på listen:

        1.  **Idé-titel** – en kort, handlingsorienteret titel.
        2.  **Hvad det er, og hvad man får** – 2-3 sætninger, der forklarer, hvad brugeren skal bruge ChatGPT til, og hvilket konkret udbytte de får (f.eks. tydeligere e-mails, hurtigere resuméer, bedre beslutninger).
        3.  **Eksempel fra deres arbejde** – 2-4 sætninger, der beskriver en konkret situation fra klientens arbejdsuge. Gør det i eksemplet helt tydeligt, hvad brugeren skal indsætte i ChatGPT (f.eks. 'den seneste e-mail i tråden', 'dine stikord fra mødet', 'et rodet udkast'), og hvad de skal bede ChatGPT om at gøre med det.

        Hold hver beskrivelse kort og praktisk, så en kontormedarbejder med det samme kan se, hvordan de kan afprøve det i virkeligheden.

        Output nu den fulde færdige liste, klar til at printe.
                    `,
                    requiresConfirmation: false
                    },
                    {
                    title: "Stig 10: Send listan til Hannu.",
                    description: "Um tit ynskja tað so kann Vitlíkisstovan hyggja eftir tykkara listar og gera teir til virðismikklar vegleiðingar tit altíð kunna hava hjá, tí kunnu tit senda listan við hugskotum til Hannu á [HACA@betri.fo], um tit ynskja ein tílíkan lista. ",
                    requiresConfirmation: false
                    },
                    {
                    title: "Stig 11: Liðugt – takk fyri!",
                    description: "Hattar var venjingin – vónandi hevur tú nú ein góðan lista.",
                    requiresConfirmation: false
                    }
                    ]
                    },
      ]
    },
    betri: {
      name: "Betri Verkstova",
      company: "Betri",
      labs: [
        {
          id: "innovation-lab",
          name: "Venjing 1: Nýtslu spurtur",
          description: "Hvat kann TÚ nýta ChatGPT til?",
          steps: [
        // s1 — leave as is
            {
            title: "Stig 1: Ein samrøða við vitlíki",
            description: "Koyr fyrst ChatGPT á vanliga GPT 5.1 myndilin. Um tú hevur nakra fílu sum lýsur teg, so kann tú skoyta hettar uppí nú. Kopiera so byrtið niðanfyri og koyr tað inn í ChatGPT og send. Svara síðan spurningunum, sum verða settir.",
            prompt: `
Du er en **neutral, professionel interviewer** med det formål at forstå personens arbejde **dybt og konkret**. Denne indsigt skal gøre det muligt for en kollega at kortlægge detaljerne til potentielle AI/ChatGPT-anvendelser i næste trin. På dette stadie må du **aldrig** foreslå løsninger eller bringe AI-brug op – din eneste opgave er at stille spørgsmål og indsamle information.

---

### Rolle og adfærd (prioriteret)
1. **Neutral interviewer:** Stil kun spørgsmål; ingen rådgivning eller forslag.
2. **Struktureret og effektiv:** Gennemgå de vigtigste områder systematisk: rolle, kalender, opgaver, kommunikation, artefakter, workflows, værktøjer, regler, smertepunkter, ønskeliste.
3. **Kort og klart:** Spørgsmålene skal være præcise, lette at svare på og uden fagjargon.

---

### Plan for interviewforløb
Begin with a concise checklist (3-7 bullets) of de primære delopgaver i interviewet:
- Etablere grundlæggende rolle/kontekst
- Udforske centrale arbejdsområder og processer
- Indsamle eksempler og detaljer om opgaver
- Optegne eksisterende værktøjer, artefakter og workflows
- Identificere smertepunkter og ønskeliste
- Opsummere relevante arbejdsmønstre
- Validere forståelse løbende
Følg denne konceptuelle struktur, men tilpas rækkefølge og fokus ud fra samtalens indhold.

### Sådan gennemfører du interviewet
- **Stil & tempo:**
  - Stil **1-2 præcise spørgsmål ad gangen**.
  - Formuler dem, så de besvares i **2-5 sætninger eller korte bullets**.
  - Undgå både alt for brede ("Fortæl alt om…") og snævre ("Hvilken knap?") spørgsmål.

- **Arbejdsnoter (Working Notes):**
  - Hold korte **Arbejdsnoter**, opdateret ca. hver **2-3 interaktioner** (kun bullets).
  - Brug dem til at holde styr på det væsentlige; vis dem kun ved korte recaps.
  - Ved risiko for misforståelse, brug eksempelvis:
    - "Jeg har forstået X → Y → Z. Har jeg fanget det rigtigt?"

- **Post-action Validering:**
  - Efter hver større afklaring eller opdatering af Arbejdsnoter, valider forståelsen kort i 1-2 linjer og tilbyd at afklare evt. uklarheder, før du fortsætter til næste emne.

- **Varighed:**
  - Fortsæt interviewet, indtil personen beder dig stoppe **og** giver dig din næste opgave.

- **Sikkerhed & privatliv:**
  - Anmod om **anonymiserede/redigerede** eksempler, hvis det gavner forståelsen.
  - Bed **aldrig** om adgangskoder, login, personnumre eller andre fortrolige oplysninger.

- **Sprog:**
  - Tilpas sprog og tone som brugeren (dansk, engelsk mv.).
  - Brug **klar og enkel dansk** ved tvivl.

---

### Hvad du især skal lytte efter
*(Brug kun som linse for dine spørgsmål – du må stadig ikke foreslå løsninger)*
- Tunge skrive- og omskrivningsopgaver
- Opsummering af dokumenter, e-mails, møder
- Idégenerering & sparring
- Syntese & videnhentning
- Klassifikation, tagging, routing af henvendelser
- Datahåndtering (udtræk af info fra tekst/tal/diagram)
- Kundekommunikation/support
- Oversættelse & tone-skift
- Planlægning & koordinering
- Repetitive processer med klare input/output
- Dokumentoprettelse fra skabeloner

---

### Dækningsområder (metodisk gennemgang)
1. **Rolle & kontekst:** titel, team, forretningsområde, mission, succeskriterier
2. **Kalender-realitet:** faste møder, deadlines, sæson/årshjul
3. **Daglige/ugentlige opgaver:** frekvens, volumen, varighed, input/output
4. **Kommunikation:** samarbejdspartnere, kanaler, typiske beskeder
5. **Artefakter:** dokumenter, regneark, præsentationer, systemer
6. **Workflows & godkendelser:** rækkefølge, overleveringer, beslutningspunkter
7. **Værktøjer & systemer:** M365/Google, CRM/ERP, fagsystemer, tickets, datakilder
8. **Regler & begrænsninger:** compliance, fortrolighed, kvalitetskrav, SLA/KPI’er
9. **Smertepunkter:** flaskehalse, fejl, ventetid, copy-paste-arbejde
10. **Ønskeliste & idealbillede:** hvad "rigtig godt" ville være (uden at nævne AI)

---

### Spørgsmål-heuristikker (Guldhårs-testen)
- Omformulér "Fortæl om X" til fx:
  - "I en typisk uge, hvor mange X? Hvor lang tid varer de? Hvad adskiller en nem fra en svær?"
- Kvantificér hvor muligt:
  - "Circa hvor mange om ugen? Minutter pr. opgave? Hvor stor andel skal rettes/godkendes?"
- Følg processen:
  - "Hvad er inputtene? Hvor kommer de fra? Hvad sker derefter? Hvem bruger output?"
- Stil spørgsmål om variation:
  - "Hvad er de 3 mest almindelige undtagelser? Hvor tit sker de?"

---

### Arbejdsnoter (struktur)
Opdater løbende bullets som:
- **Rolle & mål:** …
- **Højvolumen-opgaver (frekvens/tid):** …
- **Artefakter & værktøjer:** …
- **Workflows & beslutningspunkter:** …
- **Begrænsninger/KPI’er:** …
- **Observeret friktion:** …
Vis kun Arbejdsnoter ved recaps, og brug "Har jeg fanget det rigtigt?" kun hvor reel misforståelsesfare er til stede.

---

### Vigtig begrænsning
Du må **aldrig** i interviewet foreslå eller beskrive, hvordan ChatGPT/AI kan hjælpe. Din opgave er udelukkende at indsamle **præcis og grundig kontekst** til senere analyse.

---

### Startlogik
**Hvis brugeren har vedhæftet en fil med baggrundsinformation (rolle, team, ansvar eller arbejdskontekst):**
1. **Læs filen grundigt før interviewet.**
2. **Integrér filens indhold** i din indledende forståelse.
3. **Tilpas dine første spørgsmål,** så du undgår at spørge om ting, filen allerede forklarer.
4. Brug filen til et første udkast til **Arbejdsnoter**.

**Hvis der ikke er vedhæftet en fil:**
- Hilse kort, forklar din rolle, og stil disse åbningsspørgsmål:

1. "Hvad er din **rolle/titel**, og hvilket **team/område** arbejder du i? Kan du i én sætning beskrive jeres **overordnede mission**?"
2. "Gennemgå en **typisk uge**. Hvad er de **3 vigtigste tilbagevendende opgaver**, som tager mest af din tid?"

**Start nu.**


            `,
            requiresConfirmation: false
            },
            {
            title: "Stig 2: Samandráttur (við Thinking-modellinum)",
            description: "Skift fyrst til 'Thinking'-modellið. Kopiera samandráttar birtið niðanfyri, set tað aftast í somu samrøðu, sum tú júst hevði við ChatGPT, og send.",
            prompt: `
Stop interviewet nu og opsummér mit arbejde udelukkende ud fra den information jeg har givet dig. 

Din opgave er at producere et detaljeret, velstruktureret resumé, der kan bruges som grundlag for at finde ChatGPT-anvendelser senere.

Brug kun information, der kommer direkte fra mine input. 
- Ingen gæt, ingen udfyldning af huller.
- Hvis noget ikke er nævnt, så lad det være usagt.

Returnér præcis disse sektioner og overskrifter:

1) Rolle-overblik
   - Kort beskrivelse af hvad jeg gør, hvem jeg betjener, og hvilke hovedresultater jeg bliver målt på.

2) Kerneansvar
   - Punktliste med stærke udsagnsord i starten (fx “Udarbejder…”, “Koordinerer…”, “Godkender…”).
   - Én linje pr. punkt.

3) Tilbagevendende workflows & leverancer
   - For hvert workflow: beskriv typiske input → output (hver del maks. 8 ord).
   - Angiv frekvens, hvis jeg har nævnt den (fx “ugentligt”, “dagligt”, “månedligt”).

4) Værktøjer, systemer & begrænsninger
   - Punktliste over apps, systemer, datakilder, adgangsgrænser, compliance-/fortrolighedsforhold, jeg har nævnt.

Generelle begrænsninger:
- Ingen generelle påstande om AI.
- Ingen råd, vejledning eller tutorials.
- Ingen marketing-sprog eller “flotte” formuleringer – skriv nøgternt og konkret.
- Ingen information, der ikke kan spores tilbage til noget, jeg faktisk har sagt.

            `,
            requiresConfirmation: true,
            confirmationText: "Eg vátti, at eg havi fingið ein fullfíggjaðan samandrátt, lisið hann og staðfest, at hann er rættur."
            },
            {
            title: "Stig 3: Opna nýggjan glugga og fær aftur inn á ChatGPT",
            description: "Opna eitt nýtt vindeyga í kaganum og lat upp ChatGPT aftur. Læt fyrra vindeyga við samandráttinum vera opið.",
            requiresConfirmation: false
            },
            {
            title: "Stig 4: Deep Research",
            description: "Kopiera birti niðanfyri inn í nýggja ChatGPT-vindeyga, skoyt samandráttin inn har tað er merkt, tendra Deep Research og send so.",
            prompt: `
Du skal bruge Deep Research til at skrive en samlet rapport til ledere om, hvordan personer i en given rolle faktisk bruger ChatGPT og lignende LLM-værktøjer i deres arbejde.

Rollen beskrives her:

<arbejds_beskrivelse>
<------------Indsæt her--------------->
</arbejds_beskrivelse>

---

## Formål

Rapporten skal hjælpe en leder med at forstå:

- Hvilke typer opgaver og arbejdssituationer folk i lignende roller bruger ChatGPT til.
- De forskellige “arbejdsmåder”/roller, som ChatGPT typisk indtager i deres hverdag (du finder selv de bedste betegnelser ud fra kilderne).
- Forskellen mellem:
  - Overfladisk brug (primært skrivning, omskrivning, opsummering) og  
  - Dybere brug, hvor ChatGPT bruges som reel sparringspartner, tænkende medspiller og beslutningsstøtte.
- Hvad brugere typisk oplever som begrænsninger og faldgruber.

Fokus: Rapporten skal være forklarende og narrativ, ikke en punktliste med “top 50 use cases”.

---

## Researchfokus (Deep Research)

Brug dine Deep Research-evner til at:

1. Identificere kilder, hvor personer med lignende roller beskriver, hvordan de bruger ChatGPT/LLM’er i praksis, fx:
   - Blogindlæg, personlige erfaringer, case stories.
   - Community-tråde og fora (Q&A, diskussionsfora, LinkedIn-indlæg m.m.).
   - Artikler, interviews og officielle eksempler, hvor konkrete arbejdssituationer gennemgås.

2. Udlede mønstre:
   - Hvilke typer opgaver og situationer går igen?
   - Hvordan beskriver de interaktionen med ChatGPT (dialog, iterativ sparring, “rolle-spil” osv.)?
   - Hvor oplever de størst værdi? Hvor oplever de typisk skuffelse eller begrænsninger?

3. Læg særlig vægt på kilder, hvor ChatGPT omtales som:
   - sparringspartner / medtænker,
   - problemløsningsmakker,
   - beslutnings- og refleksionsstøtte.
   
Altså der, hvor værktøjet bruges til at tænke, strukturere og udvikle løsninger, ikke kun til at skrive pænt eller oversætte tekst.

Hvis kilderne er uenige, eller der findes forskellige erfaringer, skal det tydeligt fremgå i rapporten.

---

## Inspiration til gode kilder (vejledende)

Som del af din research kan du med fordel orientere dig mod:

- Rollebaserede playbooks fra modelleverandører, fx:
  - OpenAI-materiale om “ChatGPT for work/for any role” og tilhørende prompt-pakker for specifikke funktioner.
  - Googles Gemini-materiale med “role-specific prompts & use cases” og Workspace-handbooks for forskellige roller.
  - Microsoft Copilot-guides om “top use cases by role”, “Copilot for work” og adoption-playbooks.
  - Claude-guides til almindelige use cases og prompt-biblioteker.

- Kataloger og dossierer fra de store konsulenthuse, fx:
  - McKinsey-rapporter om økonomisk potentiale og funktionsopdelte GenAI-use cases.
  - Deloitte-dossier(er) med generative AI-use cases på tværs af brancher.
  - PwC’s interaktive “use case compass” og relaterede whitepapers.
  - Accenture, BCG, EY, KPMG og World Economic Forum-publikationer, der samler og strukturerer GenAI-anvendelser.

Du skal ikke liste eller referere alle disse eksplicit; brug dem som inspiration og kildebase for at forstå de mest udbredte og modne mønstre på tværs af roller og brancher.

---

## Rapportens struktur

Skriv en sammenhængende rapport i klart, enkelt dansk, rettet mod en travl leder. Brug overskrifter og korte underafsnit.

Brug denne struktur:

### 1. Executive summary (ca. 1–1½ side)

- Kort beskrivelse af rollen (som du forstår den ud fra <job_summary>).  
- De vigtigste indsigter om, hvad folk i lignende roller faktisk bruger ChatGPT til.  
- En klar forklaring af forskellen mellem:
  - Overfladisk brug (skrivning/opsummering), og  
  - Dybere brug (sparring, tænkning, beslutningsstøtte).  
- 3–5 hovedpointer, som en leder bør tage med sig.

### 2. Rolle og arbejdskontekst (kort)

- Din syntese af, hvordan rollen typisk arbejder: opgavetyper, ansvar, arbejdsrytme.  
- Hvilke dele af arbejdet der ser ud til at være mest tekst-, viden- og beslutningstungt.  
- Hvor der – ud fra kilderne – typisk opstår kompleksitet, usikkerhed og behov for sparring.

### 3. Typiske brugsmønstre for ChatGPT i lignende roller

Beskriv de mest almindelige måder, folk bruger ChatGPT på i lignende jobs – som arbejdsmåder/roller værktøjet kan indtage, ikke som løse enkeltfunktioner.

Del dette i to niveauer:

3.1 Overfladiske brugsscenarier (første lag af værdi)  
- Forklar, hvordan ChatGPT bruges til at skrive, omskrive, forkorte, oversætte og opsummere.  
- Beskriv med ord, hvorfor det er nyttigt (tid, kvalitet, struktur) – men også hvorfor det kun er “første lag” af værdien.

3.2 Dybere brugsscenarier (sparring, tænkning og beslutningsstøtte)  
- Beskriv de arbejdsmåder, hvor ChatGPT bruges til fx:
  - at strukturere komplekse problemstillinger og cases,  
  - at udforske muligheder, scenarier og konsekvenser,  
  - at forberede beslutninger, møder og forhandlinger,  
  - at teste argumenter og modargumenter,  
  - at planlægge, designe og forbedre workflows, processer og kommunikation.
- For hver arbejdsmåde:
  - Giv den et kort, men sigende navn (ud fra kilderne).  
  - Forklar hvad den går ud på, hvad den typisk bruges til, og hvorfor brugerne oplever høj værdi.  
  - Brug konkrete, kortfattede eksempler fra kilderne til at illustrere.

### 4. Begrænsninger og typiske faldgruber

- Hvilke typer opgaver fortæller brugere, at ChatGPT ikke er godt til alene?  
- Hvor ser de risiko (fx faktuel nøjagtighed, lokal lovgivning, compliance, domænespecifik viden)?  
- Hvilke arbejdssituationer kræver, at mennesket bevarer kontrol, dømmekraft og ansvar?  
- Beskriv typiske faldgruber og misforståelser (fx “AI som sandhedsorakel”) i tekstform – ikke som ren tjekliste.

### 5. Implikationer og refleksionsspørgsmål for kunden

- Forklar, hvad denne viden betyder for en leder, der overvejer at udbrede brugen af ChatGPT i sin afdeling.  
- Fremhæv især:
  - at den største værdi opstår, når medarbejdere lærer at bruge ChatGPT som sparringspartner og tænkende makker,  
  - at skrivning/opsummering er vigtige, men kun det første skridt.  
- Afslut med 5–8 konkrete refleksionsspørgsmål, der hjælper lederen med at kigge på egne workflows og spørge fx:
  - “Hvor i vores arbejde kunne disse arbejdsmåder give mening?”  
  - “Hvor ville sparring og scenarie-tænkning med ChatGPT konkret aflaste os?”  
  - “Hvordan kan vi eksperimentere sikkert med dette – uden at gå på kompromis med compliance?”  
  - “Hvor skal vi ikke læne os for tungt op ad AI?”

---

## Kvalitetskrav

- Skriv i et roligt, nøgternt, ikke-hypet sprog.  
- Gør rapporten behagelig og hurtig at læse for en chef, med tydelige overskrifter og korte afsnit.  
- Undgå punktlister over “use cases”; fokusér på typer af arbejde og måder at samarbejde med ChatGPT på.  
- Inddrag konkrete eksempler fra dine kilder i kort form, og brug kildehenvisninger efter behov.  
- Hvis der er usikkerhed eller uenighed i kilderne, så sig det direkte.

Rapporten skal kunne læses selvstændigt af en leder, der aldrig har brugt ChatGPT før men kender til det, men som har stærk faglig forståelse for sin egen rolle og organisation.

`,
            requiresConfirmation: false
            },
            {
            title: "Stig 5: Nýggjur gluggi og møguleikalisti",
            description: "Opna ein nýggjan glugga við ChatGPT. Kopiera birtið, fyll inn tín samandrátt. Broyt nú myndilin til [ChatGPT 5.1 Thinking] og send avstað. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
            prompt: `
## Introduktion

Vi undersøger, hvordan sprogmodeller (LLM’er) kan automatisere opgaver i et kontormiljø på Færøerne. Målet er at finde opgaver, hvor automation strømliner arbejdsgange, sparer tid, fjerner kedeligt arbejde og sparer penge – især ved at bruge ChatGPT som **tænke‑partner og sparringspartner**, ikke kun som “dokumentmaskine”.

Jeg vil have dig til at foreslå en liste med de **15** bedste ting, min klient kan bruge ChatGPT til. Her er information om klienten:

<arbejds_beskrivelse>
<------------Indsæt her--------------->
</arbejds_beskrivelse>

Nedenfor er vejledning om, hvilke typer opgaver ChatGPT er god til. Brug den til at forme dine ideer og undgå at foreslå ting, modellen ikke kan.

<tasks_types>

### Hvad ChatGPT kan og ikke kan (2025)

---

#### Introduktion

ChatGPT er en alsidig sprogmodel, der er stærk til at strukturere, forklare, oversætte, brainstorme, spille roller, lave simple visualiseringer, lave research og støtte analyser. Den er bedst, når der er klare mål, konkrete input og et menneske, der kvalitetssikrer output. Nedenfor beskrives, hvad den typisk er **god til**, hvor den er **svagere**, og hvilke mønstre der giver mest værdi i praksis.

---

### Højværdimønstre (brug disse først)

Når du foreslår anvendelser, bør du især lede efter opgaver, hvor ChatGPT:

* **Hjælper mennesker med at tænke og beslutte**
  – fx strategisparring, scenarier, trade‑off‑analyser, prioritering.
* **Omdanner rodede input til struktur**
  – fx planer, tjeklister, SOP’er, risikoregistre, skemaer, taxonomier.
* **Forstærker tilbagevendende processer**
  – fx standardsvar, skabelonbaserede breve, faste rapporter.
* **Understøtter flersproget arbejde (EN/DK ↔ FO)**
  – fx kladder på engelsk/dansk, efterfulgt af oversættelse til færøsk og kort menneskelig redigering.

Når du vælger og rangerer ideer, skal du **prioritere disse mønstre** over ren “dokumentskrivning”.

---

### Mest værdifuldt: Sparring, beslutningsstøtte og tænke‑partner

ChatGPT er særlig værdifuld, når den bruges som en interaktiv partner, der stiller spørgsmål, udfordrer antagelser og hjælper med beslutninger:

* **Beslutnings‑ & strategisparring**
  God til at skærpe mål, synliggøre antagelser, udvide mulige løsninger og sammenligne trade‑offs for fx projektprioritering, bemanding, leverandørvalg og ændringer i retningslinjer/politikker.

* **Kvalitetsfeedback på udkast**
  God til struktureret feedback på klarhed, logik, evidens, tone og konsistens – og til at hjælpe med at skrive korte, skarpe ledelsesresuméer.

* **Rollespil & kommunikationstræning**
  God til at simulere kolleger, ledere, borgere/kunder eller andre interessenter, inkl. svære samtaler, indvendinger, forhandling og feedback‑dialoger.

* **Kreativitet & idéudvikling**
  Meget god til idéspurt, laterale vinkler og mange mulige forslag til kampagner, forbedringer af arbejdsgange, nye servicekoncepter m.m.

* **Risikotænkning & “hvad‑nu‑hvis”**
  God til pre‑mortems (“hvad kan gå galt?”), red‑teaming vs. steelmanning, scenarie‑skitser og konkrete forslag til risikoreduktion.

* **Faglig forklaring & mikrosparring:** God til at forklare komplekse faglige emner i forskellige sværhedsgrader, give eksempler og små øvelser, så medarbejdere hurtigt kan sætte sig ind i nye regler, værktøjer eller metoder.

* **HR‑ & udviklingssparring:** God til at beskrive roller og kompetenceprofiler, forberede MUS‑/udviklingssamtaler, formulere udviklingsmål og rolle‑spille svære HR‑dialoger.

> **Vigtigt:** Når du senere foreslår anvendelser, skal **mindst 5** af de 15 ideer ligge i denne kategori (sparring / beslutningsstøtte / feedback / rolle‑spil / risikotænkning). Behandl disse som **kerne‑anvendelser**.

---

### Research & analyse

* **Aktuelle faktaopslag med kilder:**
  God til at finde opdateret information via indbygget Search og give korte svar med kildehenvisninger, når emner ændrer sig over tid (fx regler, priser, datoer, nyheder).

* **Fordybelsesresearch (multi‑step undersøgelser):**
  God til at planlægge en research‑sti, sammenholde flere kilder, syntetisere synspunkter og lave refererede sammenfatninger – med et menneske, der tjekker de vigtigste konklusioner. Prioritér research, der bruges til **konkrete beslutninger eller tilbagevendende opgaver**.

* **Datafortolkning:**
  God til at forklare mønstre og indsigter fra brugerleverede tabeller, rapporter eller resumeer og foreslå simple nøgletal eller næste analytiske skridt.

* **Avanceret dataanalyse (ADA / Python):**
  God til beregninger, hurtige prognoser og visualiseringer med tydelige antagelser, som et menneske derefter sanity‑checker.

* **Logik‑, fejlslutnings‑ og bias‑tjek:**
  God til at gennemgå tekst for argumentationsfejl, uunderbyggede påstande og mulige bias og mærke “påstande, der kræver kilder”.

---

### Dokumentation & viden (sekundært og gentagende)

Denne kategori er vigtig, men bør typisk **nedprioriteres ift. sparring og beslutningsstøtte**, medmindre opgaven er tilbagevendende og tidskrævende.

* **At omdanne noter til struktur:**
  God til at gøre løse noter til tabeller, tjeklister, JSON/CSV‑skemaer, som kan genbruges.

* **SOP’er & tjeklister:**
  God til at udkaste og vedligeholde standardprocedurer med klare roller, trin og forventede resultater.

* **Content‑repurposing pipelines:**
  God til at omdanne én kilde (fx en rapport) til slide‑oversigt, manus og målgruppespecifikke opslag, mens kernebudskaber bevares.

* **Regel‑ & politikfortolkning til praksis:** God til at forklare love, regler og interne politikker i almindeligt sprog for forskellige målgrupper og omsætte dem til tjeklister, FAQ og enkle beslutningstræer (ikke som juridisk rådgivning, men som støtte til forståelse).

* **Dokumentopsummering & Q&A:** God til at læse et indsat dokument (fx rapport, kontrakt, notat), trække nøglepunkter ud, forklare indholdet i forskellige niveauer af detaljer og besvare konkrete spørgsmål til dokumentet.

* **Mødeforberedelsespakker (uden mødedeltagelse):**
  God til agendaer, mål, talepunkter og forslag til smarte spørgsmål – baseret på input, du giver.

* **E‑mail‑/trådresuméer:**
  God til at opsummere indsatte samtaler, udtrække beslutninger, actions og ansvarlige.

* **Tværfaglig kommunikation:**
  God til at oversætte teknisk sprog til almindeligt sprog og tilpasse budskaber til forskellige målgrupper.

* **Sags‑ & henvendelsestriage:** God til at klassificere indkomne henvendelser (e‑mails, formularer), foreslå prioritet og udkaste standardsvar eller tekst‑moduler, som medarbejderen kan tilpasse – uden at ChatGPT selv sender noget.

* **Persona / user‑stories / JTBD:**
  God til at omsætte interview/antagelser til personas, user stories, acceptance criteria og målbare effekter.

* **Lokaliserings‑QA (EN/DK → FO):**
  God til back‑oversættelse, håndhævelse af ordliste/glossar og tonekontrol på tværs af sprog – altid med et sidste menneskeligt tjek for færøsk kvalitet.

* **Vidensarkitektur:**
  God til at kategorisere/tilføje tags til indhold samt foreslå taksonomier og navngivningskonventioner.

* **Promptbibliotek & QA:**
  God til at udkaste genbrugelige prompts, rubrikker og stilguides og teste prompts for konsistens.

* **Læringsmaterialer:**
  God til mikrokurser, quizzer og flashcards til onboarding eller policy‑træning.

* **Dokumentations‑ & skrivesupport (sekundært):**
  God til at lave dispositioner, skrive første udkast og revidere for klarhed og tone – især når der er tale om **standardiserede/skabelonbaserede tekster**, ikke engangs‑emails.

---

### Drift & eksekveringsstøtte (ofte kombineret med sparring)

* **Opgaveprioritering & organisering:**
  God til at gøre rodede todo‑lister til prioriterede oversigter, simple planer eller kanban‑opdelinger.

* **Kapacitetsplanlægningsudkast (ingen kalenderkontrol):**
  God til at skitsere mulige fordeling‑scenarier af opgaver ud fra angivne begrænsninger og fairness‑hensyn, som mennesker senere lægger i kalenderen.

* **Regneark/regex/SQL‑hjælp:**
  God til at formulere Excel/Sheets‑formler, regex‑mønstre og små SQL‑snipper med eksempler.

* **Testcases & edgecases:**
  God til at opstille testscenarier for funktioner, processer eller politikker (ud over klassiske unit‑tests).

* **Proceskortlægning & forbedring:** God til at omsætte beskrivelser af arbejdsgange til simple procesflows, pege på flaskehalse og foreslå “as‑is” vs. “to‑be” forbedringer – ofte kombineret med sparring om konsekvenser.

* **Risikoregistre:**
  God til at udkaste og vedligeholde risici, triggere, mitigeringer og ejere for igangværende projekter.

> Mange af disse opgaver bliver endnu stærkere, når ChatGPT samtidig bruges som **sparringspartner** til at udfordre antagelser og valg.

---

### Billeder, kode & stemme (kun hvis relevant)

* **Billedgenerering:**
  God til enkle illustrationer, mockups, ikoner eller “slide‑stemninger”, der støtter kommunikation.

* **Billedinput:**
  God til at analysere skærmbilleder/diagrammer og finde struktur (fx skemaer fra et foto, simple CSS‑forslag ud fra et billede).

* **Kodehjælp (små ting):**
  Meget god til små scripts og hjælpeværktøjer til fx datarensning eller simple automatiseringer – **ikke** til store, komplekse systemer.

* **Stemme (Voice):**
  God til øvelse i tone og tempo, sproglig træning og håndfri brainstorming, hvis stemmetilstand er tilgængelig.

> Foreslå kun billed‑, kode‑ eller stemme‑anvendelser, hvis de **klart matcher klientens kontekst** og er mere værdifulde end andre muligheder.

---

### Færøsk & sprogvejledning

* **Forståelse vs. skrivekvalitet:**
  ChatGPT forstår færøsk udmærket, men skriver relativt svagere på færøsk. Kvaliteten bliver højere, hvis man **skriver kladder på engelsk eller dansk** og derefter **oversætter til færøsk** med kort manuel redigering.

* **Standard‑workflow for FO‑tekster:**
  Antag som udgangspunkt, at:

  1. ChatGPT hjælper med at udvikle indhold på **engelsk eller dansk**,
  2. ChatGPT oversætter til **færøsk**,
  3. Et menneske laver en **kort sproglig og faglig gennemgang**.

* **Ordliste & konsistens:**
  En lille ordliste over foretrukne færøske begreber forbedrer konsistensen; usikre begreber kan markeres til menneskelig vurdering.

> Du må gerne foreslå arbejdsgange, hvor ChatGPT **udnytter EN/DK + FO‑kombinationen** (fx EN‑udkast → FO‑brevskabelon → menneskelig finpudsning).

---

### Værktøjstags til “How ChatGPT helps”

I dine forslag skal du – når relevant – nævne, hvilke værktøjer der bruges:

* **Search:** Indbygget web‑søgning til opdateret viden med kilder.
* **ADA:** Advanced Data Analysis (Python) til beregninger, analyser og simple grafer.
* **Image:** Billedgenerering eller billedforståelse (hvis slået til).
* **Voice:** Stemmetilstand til øvelser, diktering og dialog.
* **Sparring:** Interaktivt frem‑og‑tilbage, spørgsmål, rolle‑spil og kritik.

---

### Hvor ChatGPT er svagere (og typiske workarounds)

* **Højpræcist udtræk på tværs af mange dokumenter:**
  Svagere til perfekt konsistente tal på tværs af store dokumentmængder; brug citater fra kilder og menneskelig verifikation af nøgletal.

* **Kompleks eller reguleret analyse i stor skala:**
  Svagere på meget store datasæt eller højrisiko‑økonomi/statistik; brug ChatGPT til rammesætning, forklaringer og skitser, og lad specialværktøjer klare kerneanalysen.

* **Meget lange dokumenter i ét hug:**
  Svagere til fuld konsistens i meget lange tekster; kvaliteten øges ved at arbejde i sektioner med en overordnet disposition og en afsluttende konsistensgennemgang.

* **Direkte kontrol af værktøjer og systemer:**
  ChatGPT kan **ikke** styre kalendere, sende e‑mails, ændre data i systemer eller integrere direkte med virksomhedens it‑værktøjer. Det kan kun udkaste indhold, planer og forslag, som mennesker bagefter udfører.

* **Live mødedeltagelse:**
  ChatGPT deltager ikke i møder eller lytter til møder på færøsk; det kan hjælpe med forberedelse og opsamling baseret på input, du giver.

* **Forståelse af virkelig kontekst:**
  ChatGPT mangler fuld real‑world kontekst og bør typisk bruges til de **første ~80%** (idéer, strukturer, udkast). Mennesker vælger de bedste muligheder og tjekker, at det giver mening i praksis.

---

### Hvad der bør nedprioriteres i top‑15‑listen

Medmindre der er en **meget stærk, klientspecifik grund**, bør følgende **ikke fylde** i top‑15‑listen:

* Engangs‑opgaver som “omskriv denne ene e‑mail” eller små, sporadiske tekstrettelser.
* Generiske blogindlæg eller sociale medier‑opslag uden klart forretningsmål.
* Store, komplekse softwareprojekter eller hele systemer.
* Meget nichepræget eller hårdt reguleret analyse, hvor specialister og systemer er afgørende.
* Billed‑ eller kodeprojekter uden tydelig kobling til klientens kerneopgaver.

---

### Sådan vælger du de bedste anvendelser (selektionsheuristik)

Når du vælger og rangerer ideer for denne klient, skal du foretrække opgaver, der:

* Forekommer **ofte** (fx ugentligt eller månedligt).
* Opleves som **kedelige, monotone eller tidskrævende** for mennesker.
* Involverer **tænkning, vurdering eller trade‑offs**, ikke kun formatering.
* Kan udføres **direkte i ChatGPT**, uden integrationer til andre systemer.
* Har tydelige **tids‑ eller omkostningsbesparelser** eller forbedrer kvalitet/ensartethed.
* Gør det **nemmere at træffe bedre beslutninger** eller at lære hurtigere.

Brug disse kriterier – sammen med klientinformationen – når du vælger, hvilke ideer der skal på top‑15‑listen, og hvordan de skal prioriteres.

</tasks_types>

### Din opgave

Lav en **gennemtænkt liste med 15 ideer**, som min klient kan bruge ChatGPT til. **Rangordn dem efter nytteværdi** ud fra:

* Tidsbesparelse
* Lethed ved implementering
* Hvor kedelig/monoton opgaven er (mere kedelig → højere prioritet)
* Andre relevante faktorer for denne klient (fx kvalitet, risiko, læring)

**Vigtige begrænsninger**

* Foreslå **ikke** handlinger, der kræver at ChatGPT styrer kalendere, sender e‑mails, deltager i møder eller på anden måde tager direkte handling i eksterne systemer. Det kan den ikke.
* Foretræk ideer, som klienten kan gennemføre **direkte i ChatGPT**, uden integrationer.
* Inkludér **mindst 5 interaktive** ideer inden for **sparring/coaching/rolle‑spil** (beslutningsstøtte, feedback/kritik, rolle‑spil, brainstorming eller risikotænkning).
* Brug vejledningen i <tasks_types> til at fokusere på de mest værdifulde mønstre (tænke‑partner, strukturering af rodede input, tilbagevendende processer og flersproget arbejde).

**Output‑format (hold hvert punkt kort og konkret):**

1. **Titel (fed)** — én sætning, der beskriver ideen.

   * **Hvorfor det er vigtigt:** (1 linje)
   * **Hvordan ChatGPT hjælper:** (1 linje;)
   * **Indsats:** Lav / Mellem / Høj

Skriv ideerne kort, konkrete og tilpasset denne klient. Undgå generiske forslag som “omskriv min e‑mail”, medmindre det i denne klients kontekst er **ekstraordinært** værdifuldt og tilbagevendende.

            `,
            requiresConfirmation: true,
            confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
            },
            {
            title: "Stig 6: Bygg víðari – partur 1",
            description: "Kopiera birti niðanfyri og send.",
            prompt: "Rigtig godt. Nu vil jeg gerne have, at du tænker ud af boksen. Lav en ny analyse af opgaver, som min klient kan bruge ChatGPT til. I denne analyse vil jeg have dig til at finde opgaver, der kunne revolutionere deres arbejdsliv og branche. Giv disse ideer en vurdering af, hvor svære de er at implementere, og hvor stor en positiv effekt de kunne have på deres arbejdsliv. Præsenter de 3 bedste ideer, du finder.",
            requiresConfirmation: false
            },
            {
            title: "Stig 7: Bygg víðari – partur 2",
            description: "Kopiera birtið niðanfyri inn í sama kjatt og send.",
            prompt: `
            Rigtig godt. Nu, en sidste gang: Slip alle forudfattede meninger om, hvordan min klients opgaver bør løses, og giv mig en liste over revolutionerende måder at udføre deres arbejde på med AI, baseret på 'first principles'-tænkning.

            Giv disse ideer en vurdering af, hvor svære de er at implementere, og hvor stor en positiv effekt de kan have på deres arbejdsliv. Præsenter de 3 bedste ideer, du finder.

            Vær opmærksom på, at ideerne ikke må falde uden for det, de rent faktisk laver, men skal være forslag til, hvordan de kan udføre deres job på en helt ny og forbedret måde.
`,
            requiresConfirmation: false
            },
            {
            title: "Stig 8: Ger listan",
            description: "Kopiera birtið inn í ChatGPT og send.",
            prompt: `Find nu på meget relevante metrikker til at måle effektiviteten af disse ideer. Gennemgå derefter alle ideerne, og ranger dem ud fra dine metrikker. Præsenter til sidst en sorteret liste over alle 21 idéer.`,
            requiresConfirmation: false
            },
            {
            title: "Stig 9: Skoyt uppí meira forkláring",
            description: "Kopiera birtið inn í ChatGPT og send.",
            prompt: `
"Til sidst skal du tilføje følgende elementer til alle ideerne på listen:

1.  **Idé-titel** – en kort, handlingsorienteret titel.
2.  **Hvad det er, og hvad man får** – 2-3 sætninger, der forklarer, hvad brugeren skal bruge ChatGPT til, og hvilket konkret udbytte de får (f.eks. tydeligere e-mails, hurtigere resuméer, bedre beslutninger).
3.  **Eksempel fra deres arbejde** – 2-4 sætninger, der beskriver en konkret situation fra klientens arbejdsuge. Gør det i eksemplet helt tydeligt, hvad brugeren skal indsætte i ChatGPT (f.eks. 'den seneste e-mail i tråden', 'dine stikord fra mødet', 'et rodet udkast'), og hvad de skal bede ChatGPT om at gøre med det.

Hold hver beskrivelse kort og praktisk, så en kontormedarbejder med det samme kan se, hvordan de kan afprøve det i virkeligheden.

Output nu den fulde færdige liste, klar til at printe.
            `,
            requiresConfirmation: false
            },
            {
            title: "Stig 10: Send listan til Hannu.",
            description: "Um tit ynskja tað so kann Vitlíkisstovan hyggja eftir tykkara listar og gera teir til virðismikklar vegleiðingar tit altíð kunna hava hjá, tí kunnu tit senda listan við hugskotum til Hannu á [HACA@betri.fo], um tit ynskja ein tílíkan lista. ",
            requiresConfirmation: false
            },
            {
            title: "Stig 11: Liðugt – takk fyri!",
            description: "Hattar var venjingin – vónandi hevur tú nú ein góðan lista.",
            requiresConfirmation: false
            }
            ]
            },
        
        {
          id: "deep-research-lab",
          name: "Venjing 2: Lumma-ráðgevin",
          description:
            "Endamálið er at gera trýggjar Deep Research-frágreiðingar, sum passa júst til tín tørv.",
          steps: [
            {
              title: "Stig 1: Bið ChatGPT finna uppá evnir",
              description:
                "Koyr birti niðanfyri inn í ChatGPT og skoyt uppí tína arbeiðis lýsing frá venjing 1.",
              prompt: `
**Rolle:** Du er min **Research Triage-konsulent**. Dit job er at scanne min kontekst og foreslå **specifikke emner af høj værdi**, som er **velegnede til ChatGPT Deep Research** (værktøjet, der udfører undersøgelser på nettet i flere trin og sammenfatter fund med kildehenvisninger), og som er mest værdifulde for mig. Deep Research er mest nyttig, når:

* Spørgsmålet kræver **indsamling og sammenligning af mange uafhængige kilder** (især nylig, foranderlig eller niche-info).
* Svaret skal kunne **forsvares og være underbygget af links** (citater, verificerbarhed).
* Opgaven involverer **sammenligninger på tværs af flere kriterier**, **tendensanalyse**, **sporing af politik/standarder**, **konkurrence- eller markedsscanninger** eller **litteraturgennemgange**.

Deep Research er **ikke** ideel til: hurtige fakta fra en enkelt kilde, ren idéudvikling eller redigering, statiske baggrundsorienteringer eller opgaver, der kan løses ved ræsonnement over tekst, jeg allerede har leveret. (Brug almindelig chat eller Søg til disse).

**Mit jobresumé:**

<job_summary>
<---------------DIT JOBRESUMÉ--------------->
</job_summary>

### Dine mål

1.  **Triage min kontekst** og identificer, hvor Deep Research vil give ekstraordinær værdi i forhold til almindelig chat; kig efter både det, der er meget værdifuldt for mit arbejde, og det, der er meget interessant for mig.
2.  **Foreslå 8–12 konkrete kandidater til Deep Research** (undersøgelser, jeg kunne køre som fulde rapporter).
3.  For hver kandidat skal du forklare, *hvorfor* den opfylder kriterierne for Deep Research, og hvordan det ville være en værdifuld rapport at have.

### Hvad du skal inkludere for hvert foreslået Deep Research-emne

* **Titel** (klar, beslutningsorienteret).
* **Primær(e) beslutning(er), den vil informere** (f.eks. go/no-go, prioritering, leverandørvalg, udformning af politik).
* **Nøglespørgsmål & sammenligninger** rapporten bør besvare (3–6 punkter).

### Output-format

En liste med 8 til 12 idéer til værdifulde og interessante rapporter, jeg kunne generere. For hver idé skal du tydeligt beskrive, hvad rapporten vil handle om, og fortælle mig, hvorfor den enten er interessant eller værdifuld.

### Retningslinjer

* Brug **klart, verificerbart sprog**; ingen markedsførings-fyldord.

### Beslutningsregel (anvend denne, mens du triagerer)

* Hvis et spørgsmål kan besvares af **én velrenommeret kilde** eller **ved ræsonnement over tekst, jeg har leveret**, hører det til i almindelig chat – **ekskluder det**.
* Hvis det sandsynligvis kræver **undersøgelse af flere kilder**, **vægtning af beviser** og udarbejdelse af et **citat-rigt notat**, så **inkluder det** som en Deep Research-kandidat.

### Eksempler hvor Deep Research skinner mest igennem (evidensbaseret)

Ud over at (a) gennemsøge, hvad brugere og 'thought leaders' siger, og (b) finde autoritative kilder, er Deep Research særligt værdifuld til:

1.  **Systematiske evidenssynteser (systematiske reviews / metaanalyser).** Når vi har brug for et omfattende, gennemsigtigt, citat-rigt svar på tværs af mange studier og skal vise vores metode (PRISMA-stil).

2.  **Scoping- & kortlægningsreviews.** Når målet er at kortlægge bredden af et emne, afklare definitioner og organisere litteraturen, før man går i dybden.

3.  **Horisontscanning & fremtidsanalyser (Foresight briefs).** Tidlige advarselsscanninger af ny teknologi, risici og svage signaler, opdateret fra flere kilder.

4.  **Omverdens- / landskabsanalyser.** Et side-om-side billede af interne/eksterne faktorer, aktører og tendenser til at informere strategien.

5.  **Sporing af standarder & lovgivningsmæssige ændringer.** Sammenligning af rammeværk (f.eks. **NIST AI RMF**, **ISO/IEC 42001**) og overvågning af opdateringer på tværs af jurisdiktioner.

6.  **Multikriterie-sammenligninger & beslutningsmatricer (MCDA).** At gøre rodede valg med mange faktorer til forsvarlige rangordninger med eksplicitte vægtninger og trade-offs.

7.  **Vendor due diligence & indkøbsscoring (inkl. TCO).** Opbygning af vægtede scorecards, risikotjek og sammenligninger af **totalomkostninger (TCO)** fra mange dokumenter.

8.  **Teknologispejding & markeds-/patentgennemgange.** Systematisk identifikation af relevant teknologi, aktører og IP; kortlægning af muligheder ift. behov.

9.  **Evidens- & gap-kortlægning.** Visuelle kort, der viser, hvor evidensen er stærk/svag for at guide prioriteter og næste research.

10. **Benchmarking & konkurrencelandskabsanalyser.** Indsamling af sammenlignelige nøgletal/praksisser på tværs af fagfæller (peers) og kortlægning af, hvor vi fører eller halter bagefter.
              `,
              requiresConfirmation: true,
              confirmationText:
                "Eg vátti, at eg havi fingið ein lista við evnum, sum passa til mín leiklut."
            },
            {
              title: "Stig 2: Vel tíni 3 yndisbirt",
              description:
                "Les listan og vel 3 evni tú vilt arbeiða víðari við. Um tú ikki sært nakað spennandi, sig so bara ChatGPT frá hesum og lýs so fyri tí hvat tú heldur manglar ella hví tær ikki dámar hugskotini. Og royn so aftur.",
              requiresConfirmation: true,
              confirmationText:
                "Eg vátti, at eg havi valt 3 evni."
            },
            {
              title: "Stig 3: Bygg klár Deep Research‑birt til tey valdu evnini",
              description:
                "Í sama kjatt, avrita birti niðanfyri og fyll inn tíni 3 valdu evnir.",
              prompt: `
**Ny rolle**
Nu er du *Senior Research Prompt Architect* for Deep Research. Dit job er at omdanne mine valgte emner til interessante prompter af høj værdi til Deep Research.

**Læser**
Hold *min jobbeskrivelse, som allerede er delt i denne chat*, forrest i tankerne. Optimér for øjeblikkelig forretningsværdi for mig.

**Inputs**
**Emner:** ⬇️

<------------Indsæt emner her------------>

**Menu over rapporttyper (vælg den, der passer bedst pr. emne; én pr. emne)**

1.  **Executive Brief** (bestyrelsesklare muligheder & trade-offs/afvejninger)
2.  **Leverandør-/Landskabsscanning** (sammenligningsmatrix, 'must-haves'/stoppere)
3.  **Lovgivningsovervågning** (hvad er ændret, hvem påvirkes, hvornår)
4.  **Scenarie- & Risikonotat** (basis/optimistisk/konservativ + risikoregister)
5.  **Analytics QA-notat** (definitionsfælder, grænsetilfælde/edge cases, 5 'spike tests')
6.  **RFP-rubrik** (vægtninger, 'must-haves', stoppere, evidens-prompts)
7.  **Kunde-/Driftskommunikation** (email/FAQ/SMS-varianter; hvis-X-så-Y)
8.  **Implementerings-playbook** (faset plan, RACI, dag-0/30/90-tjek)
9.  **Vurdering af forretningsmulighed (BOTE)** (antagelser, intervaller, følsomheder)
10. **Forklaring / Mytedræber** (misforståelser vs. fakta med citater)

**Regler for skrivning af hver kort prompt (håndhæv alle, hold det stramt)**

* **Mål & omfang:** ét skarpt spørgsmål; inkluder tidshorisont & geografi; angiv én udelukkelse.
* **Kilder:** foretræk officielle/tilsynsmyndigheder, primære dokumenter, peer-reviewed, topinstitutter; *enhver ikke-indlysende påstand skal have inline-citation med link + dato*.
* **Leverance:** match den valgte rapporttype; inkluder altid antagelser & begrænsninger; bemærk uenigheder.
* **QA & fejltilstande:** kræv verificeringstrin (f.eks. citer nøglesætninger; krydstjek 2 kilder).
* **Begrænsninger:** ingen PII (personfølsomme data); rensede eksempler; output-only; brug **absolutte datoer**.
* **Stil:** jævnt sprog, aktiv form, beslutningsorienteret.
* **Længde:** hver prompt ≤ **55 ord**. Tilføj en linje på **≤12 ord**: "Hvorfor det passer".
* **Udfør ikke research nu** – generér kun prompter.

**Standarder for rapporttyper (brug disse leverance-stikord inde i prompterne)**

* *Executive Brief:* exec resumé; tabel over muligheder/kriterier; 3 scenarier; risikoregister; revisionsfodnote.
* *Leverandør-/Landskabsscanning:* sammenligningsmatrix (vægtninger/scorer); 'must-haves'/stoppere; røde flag; evidenslog.
* *Lovgivningsovervågning:* tidslinje + delta-tabel; påvirkede roller/processer; compliance-tjekliste; observationsliste.
* *Scenarie- & Risikonotat:* drivere; basis/opt/kon-scenarier; udløsere; risikobegrænsning; grænser.
* *Analytics QA-notat:* definitionsfælder; edge cases; 5 spike tests; forbehold for datahygiejne.
* *RFP-rubrik:* kriterier + vægtninger; stoppere; standardiserede leverandørspørgsmål; evidens-prompts.
* *Kunde-/Driftskommunikation:* 3 varianter (email/FAQ/SMS); hvis-X-så-Y flows; tone-tjek.
* *Implementerings-playbook:* faset plan; RACI; afhængigheder; dag-0/30/90-tjekliste.
* *Vurdering af forretningsmulighed (BOTE):* intervaller med antagelser; følsomhed over for 2-3 drivere; beslutningsudløsere.
* *Forklaring/Mytedræber:* kortfattet forklaring; misforståelser vs. fakta; citatbank.

**Generér nu**
For hvert emne: vælg den bedste rapporttype og lav én kort prompt (≤200 ord), der **eksplicit** angiver: rolle+mål, omfang (tid/geo, én udelukkelse), kildepolitik (prioritér/kræv citater), leverance (pr. type), QA-trin, begrænsninger. Efter hver prompt, tilføj en linje på ≤12 ord: *Hvorfor det passer*.
              `,
              requiresConfirmation: true,
              confirmationText:
                "Eg vátti, at eg havi fingið 3 birt."
            },
            {
              title: "Stig 4: Tendra Deep Research",
              description:
                "Nú skalt tú tendra tíni trý Deep Research, men bara eitt í senn. Opna eitt nýtt kjatt og koyr tað fyrsta birti inn. Trýst so á tað stóra + við kjatti og tendra fyri Deep Research. Send nú birti. Ger hettar fyri hvørt birt.",
              requiresConfirmation: true,
              confirmationText:
                "Eg vátti, at eg havi sett tríggjar Deep Research‑uppgávur í gongd."
            },
            {
              title: "Stig 6: Liðugt",
              description:
                "Nú arbeiður ChatGPT allarhelst uppá tínar frásagnir. Tá ið tær eru lidnar kunna tær takast niður sum PDF.",
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