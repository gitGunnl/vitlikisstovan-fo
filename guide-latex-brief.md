# Brief: Recreate the "Vitlíkisstovan" AI guides as a LaTeX PDF

## 1. What these documents are

These are six short, practical Faroese-language guides that teach non-technical professionals (kindergarten staff, caretakers, sports coaches, teachers, service-industry workers, craftsmen) how to use everyday AI chat tools (ChatGPT, Gemini, Copilot). They are warm, editorial, magazine-like reading documents — **not** technical manuals. The tone is calm, friendly, and human.

Each guide is built from Markdown with a few custom "block" extensions. The goal of the LaTeX version is to faithfully reproduce the **look and feel**: an elegant serif reading column with a small set of distinctive, color-coded callout boxes and "prompt" cards. **Do not reproduce any interactive elements** (no copy buttons, no download buttons, no links-as-buttons).

## 2. Overall page & typography

- **Single, centered reading column.** On the web it's a max-width column (~`max-w-3xl`, roughly 720px) centered on a warm off-white page. In LaTeX: a single text column with generous margins, comfortable line length (~65–75 characters).
- **Page background:** very light warm stone/cream (`#fafaf9` / stone-50). Text column sits directly on it.
- **Body font: serif.** The web uses *Source Serif Pro* (fallbacks Georgia / Times). Use a refined serif (e.g. Source Serif Pro, or a LaTeX serif like the `sourceserifpro` package, otherwise a Palatino/Times-like face).
- **Headings: same serif**, but with distinct weights/sizes (see below).
- **Labels (the little uppercase tags on callouts): sans-serif** (web uses Inter). Use a clean sans (e.g. `\sffamily`, ideally Inter/Helvetica-like).
- **Prompt text: monospace** (web uses IBM Plex Mono). Use a mono font (e.g. `\ttfamily`, ideally IBM Plex Mono).
- **Body color:** dark warm gray, *not* pure black — roughly stone-800 (`#292524`). Headings slightly darker, stone-900 (`#1c1917`).
- **Generous vertical rhythm:** body paragraphs are ~18–20pt on web with "loose" leading. Aim for relaxed line spacing (~1.5–1.6) and clear spacing between paragraphs.

### Heading scale
- **H1** (`# `): large serif, medium weight, tight tracking, lots of space above. Used for major part titles. (Web: ~3rem–3.5rem, `font-medium`, color stone-900.)
- **H2** (`## `): serif, normal weight, ~1.75rem–1.9rem, color stone-800. Often the *italic* section titles (see emphasis rules — many H2s in the source are wrapped in `***...***` so they render bold-italic).
- **H3** (`### `): this one is special — it is rendered **small, uppercase, bold, sans-feeling, with wide letter-spacing** (web: `text-sm`, `uppercase`, `tracking-wide`, `font-semibold`). It acts as an eyebrow/kicker label rather than a big heading. Reproduce it as a small uppercase bold lead-in, not a large heading.
- **Horizontal rule** (`---`): rendered as a short, centered, faint divider — a ~24px wide thin line at low opacity, centered, with large vertical margins. Not a full-width rule.

### Inline emphasis (Markdown)
- `***text***` → **bold italic** (slightly softer color, stone-800).
- `**text**` → **bold** (stone-900, the darkest).
- `*text*` → *italic* (slightly lighter, stone-700).
- `[label](href)` → on web it's an underlined link. **In the PDF, render only the label as plain (optionally lightly underlined) text — no clickable buttons, and no raw URLs.** In-page references like "see p.10" should just be plain text.
- Bullet lists (`* ` or `- `): rendered with a small round gray dot marker, comfortable spacing between items.
- Numbered lists (`1.`, `2.`…) appear inside content and should render as normal ordered lists.

## 3. The custom blocks — this is the heart of the design

There are **six** block types. Each is delimited in the source by `:::tagname` … `:::`. Five render as styled boxes; reproduce each precisely. All boxes have **rounded corners** (~12px radius), comfortable internal padding (~16–28px), and avoid being split across a page break.

### 3a. Callout boxes (4 variants)
All four share the same anatomy:
- A **tinted pastel background** (very light).
- A **thin full border** in a slightly stronger tint.
- A **thick (4px) colored left edge/bar** — this is the signature visual cue.
- A **header row** at the top: a small icon + an **uppercase, letter-spaced, sans-serif label** in the accent color.
- Below the header: the inner Markdown content, rendered normally (paragraphs, lists, bold, etc.), with top/bottom margins stripped so it hugs the box.

The four variants (tag → label → color theme → icon):

| Tag | Faroese label (uppercase) | Color theme | Icon (web uses Lucide; pick an equivalent) |
|---|---|---|---|
| `:::scope` | **YVIRLIT** | Sky blue | a compass |
| `:::safety` | **VÍS VARSEMI** | Amber/yellow | a shield-alert |
| `:::principle` | **MEGINREGLA** | Emerald green | a lightbulb |
| `:::scenario` | **STØÐA** | Stone/neutral gray | a speech bubble |

Approximate light-mode colors (Tailwind palette — use these or close equivalents):

- **Scope (sky):** background `#f0f9ff` (sky-50 at ~70% opacity over cream), border `#bae6fd` (sky-200), left bar `#38bdf8` (sky-400), icon/label text `#0284c7`/`#0369a1` (sky-600/700).
- **Safety (amber):** background `#fffbeb` (amber-50 ~70%), border `#fde68a` (amber-200), left bar `#fbbf24` (amber-400), icon/label `#d97706`/`#b45309` (amber-600/700).
- **Principle (emerald):** background `#ecfdf5` (emerald-50 ~70%), border `#a7f3d0` (emerald-200), left bar `#34d399` (emerald-400), icon/label `#059669`/`#047857` (emerald-600/700).
- **Scenario (stone):** background `#f5f5f4` (stone-100 ~80%), border `#e7e5e4` (stone-200), left bar `#a8a29e` (stone-400), icon/label `#78716c`/`#57534e` (stone-500/600).

In LaTeX these are best done with `tcolorbox`: set `colback` (tint), `colframe` (left bar color), use `borderline west={4pt}{0pt}{barcolor}` for the thick left edge, a thin outer rule in the border tint, `rounded corners`, and a custom box title made of the small uppercase sans label (plus an icon glyph if available — `fontawesome5` has compass, shield, lightbulb, comment icons that are close).

### 3b. Prompt card — `:::prompt` ("the stationery note")
This is the most distinctive element. It's a ready-to-copy AI prompt, styled like a note card:
- **Off-white/cream panel** (`#fcfcf9`), slightly lighter than the page.
- **2px DASHED border** in light gray (stone-300, `#d6d3d1`), **rounded corners** (~12px), subtle shadow.
- **Header row:** a small pen icon + the uppercase sans label **"BYRT"** in muted gray on the left. (On the web there's a "Copy" button on the right — **omit it entirely in the PDF**.) A thin divider line separates the header from the body.
- **Body:** the prompt text in **monospace**, with **whitespace and line breaks preserved exactly** (it's a `<pre>` — keep blank lines and bullet structure as written). Comfortable line spacing.
- Larger vertical margin around the card to set it apart.

### 3c. Simple prompt card — `:::prompt-simple`
A condensed prompt card for short follow-up prompts:
- Same cream panel + **2px dashed border** + rounded corners, but **smaller**, **tighter padding**, and **no header, no icon, no label, no button**.
- Just the monospace text hugging the box.
- These often appear in small stacks (2–5 in a row), each its own little dashed box.

> **The dashed border is the unifying motif for both prompt types** — it signals "this is copy-and-paste material." Keep it dashed; callouts use solid borders.

## 4. Document structure (typical flow per guide)

Each guide roughly follows this order — reproduce the sequence faithfully since it's pedagogical:

1. **Title** (H1, bold) + **subtitle** (H2, bold-italic).
2. **`:::scope` box** — "This guide is for you if…" / "Not intended for…".
3. **`:::safety` box** — the privacy rule: never put personal/identifiable data into AI tools.
4. Intro section "AI as a colleague" with a **`:::principle` box** (the core "the clearer you describe, the better the help" rule).
5. A definition aside explaining "Byrt" (the Faroese word for *prompt*).
6. A "golden rules" **`:::principle` box** (numbered list).
7. A `:::scope` box introducing the four "roles" AI can play.
8. **Four role sections**, each typically: an H2 title → narrative paragraphs → a **`:::scenario` box** ("Imagine this situation…") → "Good example prompt" intro → a **`:::prompt` card** → "Follow-up prompts" intro → several **`:::prompt-simple` cards** → more narrative with bold lead-ins.
9. A communication/documentation section with worked examples (numbered "Dømi 1", etc.) and more prompt cards.
10. A final reference section "Skjót byrt" — a numbered collection of example scenarios + prompts.
11. Optional small italic **footer note** at the very bottom, centered, muted, separated by a thin top border.

There is also an **optional hero image** at the top of the web page (a wide photo with the title overlaid). For the LaTeX PDF you can either include a hero image at the top or omit it — the guides read fine as a clean title page. If included, render it as a full-width rounded image with the title beneath or overlaid.

## 5. What to OMIT in the PDF

- The "Copy" / "Kopiera tekst" buttons on prompt cards.
- The "Tak PDF niður" (download PDF) button and "Aftur til yvirlit" (back) navigation.
- Any hover states, links rendered as buttons, dark-mode styles.
- Raw URLs from Markdown links — show only the human label text.

## 6. Print niceties (already used on the web, worth matching)

- Callouts and prompt cards should **never be split across a page break** (`break-inside: avoid` → use `tcolorbox` unbreakable or keep-together).
- Don't strand a heading at the bottom of a page (keep heading with following text).
- Avoid widows/orphans (min 3 lines).
- Backgrounds and the colored left bars **must print** (the whole point of the design is the color-coded boxes).

## 7. Color reference (warm "stone" neutral palette)

The entire design sits on Tailwind's warm **stone** gray scale rather than cool grays:

- Page background: stone-50 `#fafaf9`
- Prompt card panel: `#fcfcf9`
- Body text: stone-800 `#292524`
- Headings / strongest bold: stone-900 `#1c1917`
- Secondary text / italic: stone-700 `#44403c`
- Muted labels, dividers, dots: stone-400/500 `#a8a29e` / `#78716c`
- Borders (neutral): stone-200/300 `#e7e5e4` / `#d6d3d1`

Accent colors are used **only** in the four callout types (sky, amber, emerald, stone) as listed in section 3a.

---

**In one sentence for the AI:** Build an elegant serif reading document on a warm cream page, with four solid-bordered, pastel, color-coded callout boxes (each with a thick colored left bar + small uppercase sans label + icon) and two dashed-bordered cream "prompt" cards in monospace, faithfully following the section flow above — and strip out every interactive/button element.
