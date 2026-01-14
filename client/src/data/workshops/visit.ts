import { Workshop } from "./types";

export const visit: Workshop = {
  name: "Vitlíkisverkstova",
  company: "Visit Faroe Islands",
labs: [
  {
    id: "innovation-lab",
        name: "Venjing 1: Nýtslu spurtur",
        description: "Hvat kann TÚ nýta ChatGPT til?",
        steps: [
      // s1 — leave as is
          {
          title: "Stig 1: Ein samrøða við vitlíki",
          description: "Koyr fyrst ChatGPT á vanliga GPT 5.1 myndilin (GPT 5.1 Auto). Um tú hevur nakra fílu sum lýsur teg, so kann tú skoyta hettar uppí nú. Kopiera so byrtið niðanfyri og koyr tað inn í ChatGPT og send. Svara síðan spurningunum, sum verða settir.",
          window: "Nýtt kjatt",
          model: "GPT 5.1",
          prompt: `
You are a **neutral, professional interviewer** with the goal of understanding the person's work **deeply and concretely**. This insight must enable a colleague to map the details to potential AI/ChatGPT use cases in the next step. At this stage, you must **never** suggest solutions or bring up AI usage—your only task is to ask questions and gather information.

---

### Role and Behavior (Prioritized)
1.  **Neutral Interviewer:** Ask questions only; no advice or suggestions.
2.  **Structured and Efficient:** Go through key areas systematically: role, calendar, tasks, communication, artifacts, workflows, tools, rules/constraints, pain points, wishlist.
3.  **Brief and Clear:** Questions must be precise, easy to answer, and free of unnecessary jargon.

---

### Interview Plan
Begin with a concise checklist (3-7 bullets) of the primary sub-tasks in the interview:
- Establish basic role/business context
- Explore central work areas and processes
- Gather examples and details about specific tasks
- Map existing tools, artifacts, and workflows
- Identify pain points and the "wishlist"
- Summarize relevant work patterns
- Validate understanding continuously
Follow this conceptual structure, but adapt the order and focus based on the conversation's content.

### How to Conduct the Interview
-   **Style & Pace:**
    -   Ask **1-2 precise questions at a time**.
    -   Formulate them so they can be answered in **2-5 sentences or short bullets**.
    -   Avoid questions that are too broad ("Tell me everything about...") or too narrow ("Which specific button?").

-   **Working Notes:**
    -   Keep short **Working Notes**, updated approximately every **2-3 interactions** (bullets only).
    -   Use them to keep track of essentials; show them only during brief recaps.
    -   If there is a risk of misunderstanding, use for example:
        -   "I have understood X → Y → Z. Have I captured that correctly?"

-   **Post-action Validation:**
    -   After every major clarification or update of Working Notes, briefly validate understanding in 1-2 lines and offer to clarify any ambiguities before moving to the next topic.

-   **Duration:**
    -   Continue the interview until the person asks you to stop **and** gives you your next assignment.

-   **Security & Privacy:**
    -   Request **anonymized/redacted** examples if it benefits understanding.
    -   **Never** ask for passwords, logins, personal ID numbers, or other confidential trade secrets.

-   **Language:**
    -   Adapt language and tone to the user (English, Danish, etc.).
    -   Use **clear and simple English** in case of doubt.

---

### What to Listen For
*(Use only as a lens for your questions – you must still not suggest solutions)*
-   Heavy writing and rewriting tasks (proposals, content, code, emails)
-   Summarization of documents, threads, meetings
-   Idea generation & brainstorming
-   Synthesis & knowledge retrieval
-   Classification, tagging, routing of inquiries
-   Data handling (extracting info from text/numbers/diagrams)
-   Client communication/support
-   Translation & tone-shifting
-   Planning & coordination
-   Repetitive processes with clear input/output
-   Document creation from templates (contracts, decks, reports)

---

### Coverage Areas (Methodical Review)
1.  **Role & Context:** Title, company/venture, industry, mission, success criteria.
2.  **Calendar Reality:** Fixed meetings, deadlines, seasonal peaks, launch cycles.
3.  **Daily/Weekly Tasks:** Frequency, volume, duration, input/output.
4.  **Communication:** Collaborators, clients, channels (Slack, Email, WhatsApp, etc.), typical message types.
5.  **Artifacts:** Documents, spreadsheets, pitch decks, design files, code repositories.
6.  **Workflows & Decisions:** Order of operations, handovers, client feedback loops, decision points.
7.  **Tools & Systems:** M365/Google Workspace, Notion/Trello/Asana, CRM, specialized industry software, data sources.
8.  **Rules & Constraints:** Client requirements, confidentiality, industry standards, deadlines/metrics.
9.  **Pain Points:** Bottlenecks, errors, waiting time, manual "grunt work" (copy-paste).
10. **Wishlist & Ideal State:** What "really good" would look like (without mentioning AI).

---

### Question Heuristics (The Goldilocks Test)
-   **Rephrase "Tell me about X" to, for example:**
    -   "In a typical week, how many X? How long do they take? What distinguishes an easy one from a hard one?"
-   **Quantify where possible:**
    -   "Approximately how many per week? Minutes per task? What percentage requires revision/feedback?"
-   **Follow the process:**
    -   "What are the inputs? Where do they come from? What happens next? Who uses the output?"
-   **Ask about variation:**
    -   "What are the 3 most common exceptions? How often do they occur?"

---

### Working Notes (Structure)
Continuously update bullets such as:
-   **Role & Goal:** ...
-   **High-Volume Tasks (Frequency/Time):** ...
-   **Artifacts & Tools:** ...
-   **Workflows & Decision Points:** ...
-   **Constraints/Metrics:** ...
-   **Observed Friction:** ...
Show Working Notes only during recaps, and use "Have I captured that correctly?" only where there is a genuine risk of misunderstanding.

---

### Important Limitation
You must **never** suggest or describe how ChatGPT/AI can help during the interview. Your task is solely to collect **precise and thorough context** for later analysis.

---

### Start Logic
**If the user has attached a file with background information (role, company, responsibilities, or work context):**
1.  **Read the file thoroughly before the interview.**
2.  **Integrate the file's content** into your initial understanding.
3.  **Adapt your opening questions** to avoid asking about things the file already explains.
4.  Use the file to create a first draft of **Working Notes**.

**If no file is attached:**
-   Greet briefly, explain your role, and ask these opening questions:

1.  "What is your **role/title**, and what **company or project** are you working on? Can you describe your **primary mission** or value proposition in one sentence?"
2.  "Walk me through a **typical week**. What are the **3 most important recurring tasks** that consume most of your time?"

**Start now.**
          `,
          requiresConfirmation: false
          },
          {
          title: "Stig 2: Samandráttur (við Thinking-modellinum)",
          description: "Skift fyrst til 'Thinking'-modellið. Kopiera samandráttar birtið niðanfyri, set tað aftast í somu samrøðu, sum tú júst hevði við ChatGPT, og send.",
                window: "Sama kjatttráð",
                model: "GPT 5.1 Thinking",
          prompt: `
Stop the interview now and summarize my work exclusively based on the information I have given you.

Your task is to produce a detailed, well-structured summary that can be used as a basis for finding ChatGPT use cases later.

Use only information that comes directly from my inputs.
- No guessing, no filling in gaps.
- If something was not mentioned, leave it unsaid.

Return exactly these sections and headings:

1) Role Overview
 - Short description of what I do, who I serve (clients/team/users), and what key results or success criteria I aim for.

2) Core Responsibilities
 - Bullet list starting with strong verbs (e.g., "Drafting...", "Coordinating...", "Approving...", "Pitching...").
 - One line per bullet.

3) Recurring Workflows & Deliverables
 - For each workflow: describe typical input → output (each part max. 8 words).
 - Indicate frequency if I have mentioned it (e.g., "weekly", "daily", "monthly").

4) Tools, Systems & Constraints
 - Bullet list of apps, platforms, data sources, resource limits, or confidentiality/client requirements I have mentioned.

General Constraints:
- No general claims about AI.
- No advice, guidance, or tutorials.
- No marketing language or "fluffy" phrasing – write soberly and concretely.
- No information that cannot be traced back to something I actually said.
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
              window: "Nýtt kjatt",
              model: "GPT 5.1 + Deep Research",
          prompt: `
You must use Deep Research to write a comprehensive report for leaders and founders about how people in a given role actually use ChatGPT and similar LLM tools in their work.

The role is described here:

<job_description>
<------------Insert here--------------->
</job_description>

---

## Purpose

The report must help a leader or founder understand:

- What types of tasks and work situations people in similar roles use ChatGPT for.
- The different "modes of work"/roles that ChatGPT typically assumes in their daily lives (you identify the best terminology based on sources).
- The difference between:
    - **Surface-level use** (primarily writing, rewriting, summarizing), and
    - **Deep use**, where ChatGPT is used as a genuine sparring partner, thinking companion, and decision support.
- What users typically experience as limitations and pitfalls.

**Focus:** The report must be explanatory and narrative, not just a bulleted list of "top 50 use cases."

---

## Research Focus (Deep Research)

Use your Deep Research capabilities to:

1.  **Identify sources** where people with similar roles describe how they use ChatGPT/LLMs in practice, e.g.:
    -   Blog posts, personal experiences, case stories (e.g., on Medium, Substack, Indie Hackers).
    -   Community threads and forums (Q&A, Reddit, LinkedIn posts, etc.).
    -   Articles, interviews, and official examples where concrete work situations are reviewed.

2.  **Deduce patterns:**
    -   What types of tasks and situations recur?
    -   How do they describe the interaction with ChatGPT (dialogue, iterative sparring, "role-play," etc.)?
    -   Where do they experience the greatest value? Where do they typically experience disappointment or limitations?

3.  **Place special emphasis** on sources where ChatGPT is referred to as:
    -   A sparring partner / co-thinker,
    -   A problem-solving buddy,
    -   Decision and reflection support.

In other words, instances where the tool is used to **think, structure, and develop solutions**, not just to polish text or translate languages.

If sources disagree, or if varied experiences exist, this must be clearly stated in the report.

---

## Inspiration for Good Sources (Guidance)

As part of your research, you may advantageously look towards:

-   **Role-based playbooks** from model providers, e.g.:
    -   OpenAI material on "ChatGPT for work/for any role" and associated prompt packs.
    -   Google Gemini material with "role-specific prompts & use cases."
    -   Microsoft Copilot guides on "top use cases by role."
    -   Claude guides for common use cases and prompt libraries.

-   **Catalogs and dossiers** from major consultancies (validating professional trends), e.g.:
    -   McKinsey reports on economic potential and function-specific GenAI use cases.
    -   Deloitte dossiers with generative AI use cases across industries.
    -   PwC's interactive "use case compass."
    -   Accenture, BCG, EY, and World Economic Forum publications structuring GenAI applications.

*Do not list or reference all of these explicitly; use them as inspiration and a source base to understand the most widespread and mature patterns across roles and industries.*

---

## Report Structure

Write a coherent report in clear, simple English, aimed at a busy leader or entrepreneur. Use headings and short subsections.

Use this structure:

### 1. Executive Summary (approx. 1–1.5 pages)
-   Brief description of the role (as you understand it from <job_description>).
-   The most important insights into what people in similar roles *actually* use ChatGPT for.
-   A clear explanation of the difference between:
    -   Surface use (writing/summarizing), and
    -   Deep use (sparring, thinking, decision support).
-   3–5 main takeaways that a leader/founder should note.

### 2. Role and Work Context (Brief)
-   Your synthesis of how the role typically works: task types, responsibilities, work rhythm.
-   Which parts of the work appear to be the most text-heavy, knowledge-heavy, or decision-heavy.
-   Where—based on sources—complexity, uncertainty, and a need for sparring typically arise.

### 3. Typical Usage Patterns for ChatGPT in Similar Roles
Describe the most common ways people use ChatGPT in similar jobs—focus on the "modes of work" or roles the tool adopts, not just loose individual functions.

Divide this into two levels:

**3.1 Surface Usage Scenarios (First Layer of Value)**
-   Explain how ChatGPT is used to write, rewrite, shorten, translate, and summarize.
-   Describe in words why this is useful (time, quality, structure)—but also why it is only the "first layer" of value.

**3.2 Deep Usage Scenarios (Sparring, Thinking, and Decision Support)**
-   Describe the working modes where ChatGPT is used to, for example:
    -   Structure complex problems and business cases.
    -   Explore opportunities, scenarios, and consequences.
    -   Prepare for decisions, pitch meetings, and negotiations.
    -   Test arguments and counter-arguments.
    -   Plan, design, and improve workflows, processes, and communication.
-   For each working mode:
    -   Give it a short but descriptive name (based on sources).
    -   Explain what it involves, what it is typically used for, and why users experience high value.
    -   Use concrete, concise examples from sources to illustrate.

### 4. Limitations and Typical Pitfalls
-   What types of tasks do users say ChatGPT is *not* good at alone?
-   Where do they see risks (e.g., factual accuracy, data privacy/IP, hallucinations, specific domain knowledge)?
-   Which work situations require the human to retain control, judgment, and responsibility?
-   Describe typical pitfalls and misunderstandings (e.g., "AI as a Truth Oracle") in narrative form—not just as a checklist.

### 5. Implications and Reflection Questions
-   Explain what this knowledge means for a leader/founder considering expanding the use of ChatGPT in their team or company.
-   Highlight especially:
    -   That the greatest value arises when staff learn to use ChatGPT as a sparring partner and thinking buddy.
    -   That writing/summarizing is important, but only the first step.
-   Conclude with 5–8 concrete reflection questions helping the leader look at their own workflows, such as:
    -   "Where in our work would these 'sparring modes' make sense?"
    -   "Where would scenario-thinking with ChatGPT concretely relieve our workload?"
    -   "How can we experiment safely with this—without compromising client confidentiality or IP?"
    -   "Where should we NOT lean too heavily on AI?"

---

## Quality Requirements

-   Write in a calm, sober, non-hyped language.
-   Make the report pleasant and quick to read for a busy professional, with clear headings and short paragraphs.
-   Avoid bullet lists of "use cases"; focus on **types of work** and **modes of collaboration** with ChatGPT.
-   Include concrete examples from your sources in short form, and use citations as needed.
-   If there is uncertainty or disagreement in the sources, state it directly.

The report must be readable independently by a leader who may never have used ChatGPT before but knows of it, and who has a strong professional understanding of their own role and organization.

`,
          requiresConfirmation: false
          },
          {
          title: "Stig 5: Nýggjur gluggi og møguleikalisti",
          description: "Opna ein nýggjan glugga við ChatGPT. Kopiera birtið, fyll inn tín samandrátt. Broyt nú myndilin til [ChatGPT 5.1 Thinking] og send avstað. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
              window: "Nýtt kjatt",
              model: "GPT 5.1 Thinking",
          prompt: `
## Introduction

We are exploring how Large Language Models (LLMs) can automate tasks in a **shared office/startup environment**. The goal is to find tasks where automation streamlines workflows, saves time, removes tedious work, and saves money – especially by using ChatGPT as a **thinking partner and sparring partner**, not just a "document machine."

I want you to suggest a list of the **15 best things** my client (an entrepreneur, freelancer, or startup team member) can use ChatGPT for. Here is information about the client:

<job_description>
<------------Insert here--------------->
</job_description>

Below is guidance on what types of tasks ChatGPT is good at. Use it to shape your ideas and avoid suggesting things the model cannot do.

<tasks_types>

### What ChatGPT Can and Cannot Do (2025)

---

#### Introduction

ChatGPT is a versatile language model strong at structuring, explaining, translating, brainstorming, role-playing, creating simple visualizations, doing research, and supporting analysis. It is best when there are clear goals, concrete inputs, and a human to quality-assure the output. Below is a description of what it is typically **good at**, where it is **weaker**, and which patterns provide the most value in practice.

---

### High-Value Patterns (Use These First)

When suggesting applications, look especially for tasks where ChatGPT:

* **Helps humans think and decide**
    – e.g., strategy sparring, scenarios, trade-off analyses, prioritization.
* **Transforms messy inputs into structure**
    – e.g., plans, checklists, SOPs, risk registers, schemas, taxonomies.
* **Amplifies recurring processes**
    – e.g., standard responses, template-based letters/updates, recurring reports.
* **Supports multilingual work**
    – e.g., drafts in native language ↔ English, polishing grammar/tone for international clients.

When selecting and ranking ideas, **prioritize these patterns** over pure "document writing."

---

### Most Valuable: Sparring, Decision Support & Thinking Partner

ChatGPT is particularly valuable when used as an interactive partner that asks questions, challenges assumptions, and helps with decisions:

* **Decision & Strategy Sparring:**
    Good for sharpening goals, highlighting assumptions, expanding possible solutions, and comparing trade-offs for e.g., project prioritization, hiring, vendor selection, or pivot decisions.

* **Quality Feedback on Drafts:**
    Good for structured feedback on clarity, logic, evidence, tone, and consistency – and for helping write short, sharp executive summaries or pitch decks.

* **Role-Playing & Communication Training:**
    Good for simulating investors, clients, partners, or difficult employees, including handling objections, negotiation, and feedback dialogues.

* **Creativity & Idea Development:**
    Very good for idea sprinting, lateral angles, and generating many possible suggestions for marketing campaigns, workflow improvements, new service concepts, etc.

* **Risk Thinking & "Pre-mortems":**
    Good for asking "what could go wrong?", red-teaming vs. steelmanning, scenario sketches, and concrete suggestions for risk reduction.

* **Expert Explanation & Micro-Sparring:**
    Good for explaining complex topics at different difficulty levels, giving examples, so entrepreneurs can quickly understand new regulations, tools, or methods.

* **HR & Development Sparring:**
    Good for describing roles/competency profiles (even for first hires), preparing performance reviews, formulating development goals, and role-playing difficult HR dialogues.

>   **Important:** When you later suggest applications, **at least 5** of the 15 ideas must fall into this category (sparring / decision support / feedback / role-playing / risk thinking). Treat these as **core applications**.

---

### Research & Analysis

* **Current Fact Lookup with Sources:**
    Good for finding updated information via built-in Search and providing short answers with citations when topics change over time (e.g., regulations, prices, news).

* **Deep Dive Research (Multi-step):**
    Good for planning a research path, cross-referencing multiple sources, synthesizing viewpoints, and creating referenced summaries – with a human checking key conclusions. Prioritize research used for **concrete decisions or recurring tasks**.

* **Data Interpretation:**
    Good for explaining patterns and insights from user-provided tables, reports, or summaries and suggesting simple KPIs or next analytical steps.

* **Advanced Data Analysis (ADA / Python):**
    Good for calculations, quick forecasts, and visualizations with clear assumptions, which a human then sanity-checks.

* **Logic, Fallacy & Bias Checks:**
    Good for reviewing text/pitches for argumentation errors, unsupported claims, and possible bias, tagging "claims requiring sources."

---

### Documentation & Knowledge (Secondary & Recurring)

This category is important but should typically be **deprioritized relative to sparring and decision support**, unless the task is recurring and time-consuming.

* **Transforming Notes to Structure:**
    Good for turning loose notes into tables, checklists, JSON/CSV schemas that can be reused.

* **SOPs & Checklists:**
    Good for drafting and maintaining standard procedures with clear roles, steps, and expected results.

* **Content-Repurposing Pipelines:**
    Good for turning one source (e.g., a report or blog post) into a slide outline, script, and platform-specific social posts while preserving core messages.

* **Rule & Policy Interpretation for Practice:**
    Good for explaining laws, regulations, and internal policies in plain language for different audiences and translating them into checklists, FAQs, and simple decision trees.

* **Document Summarization & Q&A:**
    Good for reading an inserted document (e.g., report, contract, memo), extracting key points, explaining content at different levels of detail, and answering concrete questions about the document.

* **Meeting Prep Packages (No Attendance):**
    Good for agendas, goals, talking points, and suggestions for smart questions – based on inputs you provide.

* **Email/Thread Summaries:**
    Good for summarizing inserted conversations, extracting decisions, actions, and owners.

* **Cross-Disciplinary Communication:**
    Good for translating technical language to plain language and adapting messages for different audiences (e.g., dev to marketing).

* **Case & Inquiry Triage:**
    Good for classifying incoming inquiries (emails, forms), suggesting priority, and drafting standard responses or text modules that the user can adapt – without ChatGPT sending anything itself.

* **Persona / User Stories / JTBD:**
    Good for generating well-structured user personas, user stories, and jobs-to-be-done from rough notes or interviews.

---

### Code & Technical Tasks

This is rarely relevant for non-technical entrepreneurs or startup team members. Skip unless the client is a developer or has technical responsibilities.

* **Code Writing & Debugging:**
    Good for writing, explaining, debugging, and improving code across many languages.

* **Technical Documentation:**
    Good for generating API docs, README files, and inline comments from code.

* **Code Review & Refactoring:**
    Good for suggesting improvements, spotting bugs, and explaining complex code.

---

### Writing & Editing (Necessary but Not Primary)

Writing is a common use case, but it should be **deprioritized** compared to sparring, decision support, and recurring processes – unless the client's core job is producing written content.

* **Drafting & Rewriting:**
    Good for first drafts, rewrites, tone shifts, and shortening/expanding text.

* **Grammar & Style:**
    Good for polishing grammar, punctuation, and style for different audiences.

* **Translation:**
    Good for quick translations between common languages.

---

### What ChatGPT Is **Not** Good At (or Risky)

Avoid suggesting these unless explicitly requested and with clear caveats:

* **Real-time information** (without Search enabled).
* **Precise legal, medical, or financial advice** (always require human expert review).
* **Tasks requiring access to external systems** (e.g., sending emails, managing calendars, executing code on external servers).
* **Tasks requiring up-to-date, proprietary, or confidential data** (unless the user provides it).
* **Tasks requiring perfect factual accuracy** (always verify critical facts).
* **Tasks requiring deep domain expertise** (e.g., specialized scientific analysis, niche industry regulations).
* **Tasks involving personal data or privacy-sensitive information** (be cautious).
* Very niche or heavily regulated analysis where specialists and systems are crucial.
* Image or code projects without a clear link to the client's core tasks.

---

### How to Choose the Best Applications (Selection Heuristic)

When selecting and ranking ideas for this client, prefer tasks that:

* Occur **often** (e.g., weekly or monthly).
* Are experienced as **boring, monotonous, or time-consuming** for humans.
* Involve **thinking, judgment, or trade-offs**, not just formatting.
* Can be performed **directly in ChatGPT**, without integrations to other systems.
* Have clear **time or cost savings** or improve quality/consistency.
* Make it **easier to make better decisions** or learn faster.

Use these criteria – along with the client information – when choosing which ideas go on the top 15 list and how they should be prioritized.

</tasks_types>

### Your Task

Create a **thoughtful list of 15 ideas** that my client can use ChatGPT for. **Rank them by utility value** based on:

* Time savings
* Ease of implementation
* How boring/monotonous the task is (more boring → higher priority)
* Other relevant factors for this client (e.g., quality, risk, learning)

**Important Constraints**

* Do **not** suggest actions that require ChatGPT to manage calendars, send emails, attend meetings, or otherwise take direct action in external systems. It cannot do that.
* Prefer ideas that the client can execute **directly in ChatGPT**, without integrations.
* Include **at least 5 interactive** ideas within **sparring/coaching/role-play** (decision support, feedback/critique, role-play, brainstorming, or risk thinking).
* Use the guidance in <tasks_types> to focus on the most valuable patterns (thinking partner, structuring messy inputs, recurring processes, and multilingual support).

**Output Format (Keep each point short and concrete):**

1.  **Title (Bold)** — one sentence describing the idea.
    * **Why it matters:** (1 line)
    * **How ChatGPT helps:** (1 line;)
    * **Effort:** Low / Medium / High

Write the ideas briefly, concretely, and adapted to this client. Avoid generic suggestions like "rewrite my email" unless it is **extraordinarily** valuable and recurring in this client's context.
          `,
          requiresConfirmation: true,
          confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
          },
          {
          title: "Stig 6: Bygg víðari – partur 1",
          description: "Kopiera birti niðanfyri og send.",
                window: "Sama kjatttráð",
                model: "GPT 5.1 Thinking",
          prompt: `Great. Now I want you to think **outside the box**.

            Conduct a new analysis of tasks my client can use ChatGPT for. In this analysis, I want you to find use cases that could **revolutionize their business, workflow, or industry**.

            Focus on ideas that could give them a significant **competitive advantage** or **10x their output**.

            Rate these ideas on:
            1.  **Implementation Difficulty** (Low/Medium/High)
            2.  **Potential Impact** (High/Transformational)

            Present the **3 best ideas** you find.`,
          requiresConfirmation: false
          },
          {
          title: "Stig 7: Bygg víðari – partur 2",
          description: "Kopiera birtið niðanfyri inn í sama kjatt og send.",
              window: "Sama kjatttráð",
              model: "GPT 5.1 Thinking",
          prompt: `
Excellent. Now, one last time:

Let go of all preconceived notions about how my client's tasks *should* be solved. Give me a list of revolutionary ways to execute their work using AI, based on **"first principles" thinking**.

Rate these ideas on:
1.  **Implementation Difficulty**
2.  **Potential Impact** (on their output or business value)

Present the **3 best ideas** you find.

**Important:** The ideas must not fall outside the scope of what they actually do (their core purpose), but must be proposals for how they can execute their job in a completely new, reimagined way.
`,
          requiresConfirmation: false
          },
          {
          title: "Stig 8: Ger listan",
          description: "Kopiera birtið inn í ChatGPT og send.",
              window: "Sama kjatttráð",
              model: "GPT 5.1 Thinking",
          prompt: `Develop highly relevant metrics to measure the effectiveness and ROI of all these 21 ideas.

Then, review all the ideas and rank them based on your metrics.

Finally, present a sorted list of all 21 ideas.`,
          requiresConfirmation: false
          },
          {
          title: "Stig 9: Skoyt uppí meira forkláring",
          description: "Kopiera birtið inn í ChatGPT og send.",
              window: "Sama kjatttráð",
              model: "GPT 5.1 Thinking",
          prompt: `
Finally, add the following elements to all ideas on the list:

1.  **Actionable Title** – A short, punchy title.
2.  **Concept & Value** – 2-3 sentences explaining *how* to use ChatGPT and the specific *benefit* (e.g., clearer pitches, faster workflows, better strategic decisions).
3.  **Real-World Example** – 2-4 sentences describing a concrete scenario from their work week. Make it explicitly clear what the user must **paste/input** (e.g., "the latest client email," "your rough meeting notes," "a messy draft") and what they should **ask** ChatGPT to do with it.

Keep each description short and practical so a busy professional can immediately see how to try it in reality.

**Output the full, finalized list now, ready to print.**
`,
          requiresConfirmation: false
          },
          {
          title: "Stig 10: Liðugt – takk fyri!",
          description: "Hattar var hattar, um tú nú er ágrýtin so fert tú at hyggja væl eftir listanum og royna tað tú hevur fingið viðmælt. Menn meira sannlíkt er at tú fert aftur til arbeiðis og gloymur alt um hendan listan og finnur hann aftur um eitt hálvt ár og so hevur tú gloymt alt um hvat hettar snúði seg um. Mítt viðmæli er tað fyrra.",
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
              window: "Nýtt kjatt",
              model: "GPT 5.1 Thinking",
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
              window: "Sama kjatttráð",
              model: "GPT 5.1 Thinking",
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
              "Nú skalt tú tendra tíni trý Deep Research, men bara eitt í senn. Opna eitt nýtt kjatt og koyr tað fyrsta birti inn. Trýst so á tað stóra + við kjatti og tendra fyri Deep Research. Send nú birti. Ger hettar fyri hvørt birt tú fekk frá myndlinum.",
              window: "Nýtt kjatt",
              model: "GPT 5.1 + Deep Research",
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
};
