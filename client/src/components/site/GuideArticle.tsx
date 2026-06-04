import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Copy,
  Check,
  PenTool,
  ShieldAlert,
  Compass,
  Lightbulb,
  MessageSquareText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getInteractiveGuide, interactiveGuidePdfPath } from "@/content/guides";

// ---------------------------------------------------------------------------
// Inline Markdown Logic (Tasteful & Robust)
// ---------------------------------------------------------------------------

interface EmphasisRule {
  marker: string;
  wrap: (children: ReactNode) => ReactNode;
}

const emphasisRules: EmphasisRule[] = [
  {
    marker: "***",
    wrap: (children) => (
      <span className="font-bold italic text-stone-800 dark:text-stone-100">
        {children}
      </span>
    ),
  },
  {
    marker: "**",
    wrap: (children) => (
      <span className="font-bold text-stone-900 dark:text-white">
        {children}
      </span>
    ),
  },
  {
    marker: "*",
    wrap: (children) => (
      <span className="italic text-stone-700 dark:text-stone-300">
        {children}
      </span>
    ),
  },
];

function parseEmphasis(text: string, rules: EmphasisRule[]): ReactNode[] {
  if (rules.length === 0) return [text];
  const [rule, ...rest] = rules;
  const { marker, wrap } = rule;

  const parts = text.split(marker);
  if (parts.length === 1) return parseEmphasis(text, rest);

  const result: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    // Even indices are outside markers, odd are inside
    if (i % 2 === 0) {
      if (parts[i]) result.push(...parseEmphasis(parts[i], rest));
    } else {
      result.push(wrap(parseEmphasis(parts[i], rest)));
    }
  }
  return result;
}

// Parses Markdown links `[label](href)` into real anchors, applying emphasis
// rules to the surrounding text and the link label. External links open in a new
// tab; in-page anchors (`#id`) and relative links use default navigation.
function parseInline(text: string, rules: EmphasisRule[]): ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const result: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(...parseEmphasis(text.slice(lastIndex, match.index), rules));
    }
    const [, label, href] = match;
    const isExternal = /^https?:\/\//.test(href);
    result.push(
      <a
        key={`lnk-${key++}`}
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-stone-900 dark:text-stone-100 underline decoration-stone-400 underline-offset-2 hover:decoration-stone-800 dark:hover:decoration-stone-200 transition-colors"
      >
        {parseEmphasis(label, rules)}
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push(...parseEmphasis(text.slice(lastIndex), rules));
  }

  return result;
}

const RenderInlineText = ({ text }: { text: string }) => (
  <>{parseInline(text, emphasisRules)}</>
);

// ---------------------------------------------------------------------------
// Component: Prompt Card (The "Stationery Note")
// ---------------------------------------------------------------------------

const PromptCard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="my-6 sm:my-10 group">
      {/* The Card Design */}
      <div className="guide-print-exact relative bg-[#fcfcf9] dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl p-4 sm:p-8 shadow-sm transition-all hover:shadow-md hover:border-stone-400">

        {/* Header / Label */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center space-x-2 text-stone-500 dark:text-stone-400">
            <PenTool className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider font-sans">
              Byrt
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="no-print h-8 text-stone-500 hover:text-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Copy prompt to clipboard"
          >
            {copied ? (
              <span className="flex items-center text-green-600 dark:text-green-400 text-xs font-medium">
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Avritað
              </span>
            ) : (
              <span className="flex items-center text-xs font-medium">
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Avrita tekst
              </span>
            )}
          </Button>
        </div>

        {/* Content */}
        <pre className="whitespace-pre-wrap font-mono text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
          {text.trim()}
        </pre>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Component: Simple Prompt Card (for follow-up prompts)
// ---------------------------------------------------------------------------
// A stripped-down variant of PromptCard for short follow-up prompts: same
// stationery look (dashed border, off-white panel, mono text) but no "Byrt"
// header, no icon, and no copy button — it hugs the text tightly.

const SimplePromptCard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="my-3 sm:my-4">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Avrita byrt"
        className="guide-print-exact group relative block w-full text-left bg-[#fcfcf9] dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2.5 sm:px-5 sm:py-3.5 shadow-sm cursor-pointer transition-all hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-600"
      >
        <pre className="whitespace-pre-wrap font-mono text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed pr-16">
          {text.trim()}
        </pre>
        <span className="no-print absolute top-2 right-3 flex items-center text-xs font-medium font-sans">
          {copied ? (
            <span className="flex items-center text-green-600 dark:text-green-400">
              <Check className="mr-1 h-3.5 w-3.5" />
              Avritað
            </span>
          ) : (
            <span className="flex items-center text-stone-400 dark:text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Copy className="mr-1 h-3.5 w-3.5" />
              Avrita
            </span>
          )}
        </span>
      </button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Component: Markdown Block Renderer
// ---------------------------------------------------------------------------

// Extracts an optional trailing custom heading id (Markdown "{#my-id}" syntax)
// from a heading line so the raw marker never leaks onto the page, and so the id
// can be applied as a real anchor for in-page links.
const extractHeadingId = (text: string): { text: string; id?: string } => {
  const match = text.match(/^(.*?)\s*\{#([^}]+)\}\s*$/);
  if (match) {
    return { text: match[1].trim(), id: match[2].trim() };
  }
  return { text: text.trim() };
};

const MarkdownBlock = ({ text }: { text: string }) => {
  // Basic logic to separate lists from paragraphs for cleaner rendering
  const lines = useMemo(() => text.replace(/\r\n/g, "\n").split("\n"), [text]);
  const elements: JSX.Element[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-6 space-y-3 ml-2">
          {listBuffer.map((item, i) => (
            <li key={i} className="flex items-start text-lg text-stone-800 dark:text-stone-300 leading-8">
              <span className="mr-3 mt-2.5 block h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0" />
              <span><RenderInlineText text={item} /></span>
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    const cleanLine = line.trim();

    // Skip empty heading markers (e.g. a bare "##" with no text) so the raw
    // marker never leaks into the page as a literal paragraph.
    if (/^#{1,6}\s*$/.test(cleanLine)) {
      flushList();
      return;
    }

    if (cleanLine.startsWith("# ")) {
      flushList();
      const { text: headingText, id } = extractHeadingId(cleanLine.substring(2));
      elements.push(
        <h1 key={idx} id={id} className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 dark:text-stone-50 mt-16 mb-8 tracking-tight scroll-mt-24">
          <RenderInlineText text={headingText} />
        </h1>
      );
    } else if (cleanLine.startsWith("## ")) {
      flushList();
      const { text: headingText, id } = extractHeadingId(cleanLine.substring(3));
      elements.push(
        <h2 key={idx} id={id} className="font-serif text-2xl sm:text-3xl font-normal text-stone-800 dark:text-stone-100 mt-12 mb-6 scroll-mt-24">
          <RenderInlineText text={headingText} />
        </h2>
      );
    } else if (cleanLine.startsWith("### ")) {
      flushList();
      const { text: headingText, id } = extractHeadingId(cleanLine.substring(4));
      elements.push(
        <h3 key={idx} id={id} className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200 mt-8 mb-4 uppercase tracking-wide text-sm scroll-mt-24">
          <RenderInlineText text={headingText} />
        </h3>
      );
    } else if (/^---+$/.test(cleanLine)) {
      flushList();
      elements.push(
        <div key={idx} className="flex justify-center my-12 opacity-40">
          <div className="w-24 h-px bg-stone-400" />
        </div>
      );
    } else if (line.startsWith("* ") || line.startsWith("- ")) {
      listBuffer.push(line.substring(2));
    } else if (cleanLine === "") {
      flushList();
    } else {
      flushList();
      // Styling for standard paragraphs: Serif, larger size, relaxed leading
      elements.push(
        <p key={idx} className="mb-6 text-lg sm:text-xl leading-loose text-stone-800 dark:text-stone-300 font-serif">
          <RenderInlineText text={line} />
        </p>
      );
    }
  });

  flushList(); // Catch any trailing list

  return <>{elements}</>;
};

// ---------------------------------------------------------------------------
// Component: Semantic Callout Blocks (:::safety / :::scope / :::principle / :::scenario)
// ---------------------------------------------------------------------------
// Each custom block tag maps to a visually distinct callout that stays within
// the guides' stone/serif aesthetic: a tinted panel with a coloured left edge,
// an icon + Faroese label header, and the inner markdown rendered normally.

interface CalloutConfig {
  label: string;
  Icon: LucideIcon;
  container: string;
  icon: string;
  labelText: string;
}

const calloutConfig: Record<string, CalloutConfig> = {
  safety: {
    label: "Vís varsemi",
    Icon: ShieldAlert,
    container:
      "bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 border-l-4 border-l-amber-400 dark:border-l-amber-500",
    icon: "text-amber-600 dark:text-amber-400",
    labelText: "text-amber-700 dark:text-amber-300",
  },
  scope: {
    label: "Yvirlit",
    Icon: Compass,
    container:
      "bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/60 border-l-4 border-l-sky-400 dark:border-l-sky-500",
    icon: "text-sky-600 dark:text-sky-400",
    labelText: "text-sky-700 dark:text-sky-300",
  },
  principle: {
    label: "Meginregla",
    Icon: Lightbulb,
    container:
      "bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 border-l-4 border-l-emerald-400 dark:border-l-emerald-500",
    icon: "text-emerald-600 dark:text-emerald-400",
    labelText: "text-emerald-700 dark:text-emerald-300",
  },
  scenario: {
    label: "Støða",
    Icon: MessageSquareText,
    container:
      "bg-stone-100/80 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 border-l-4 border-l-stone-400 dark:border-l-stone-600",
    icon: "text-stone-500 dark:text-stone-400",
    labelText: "text-stone-600 dark:text-stone-400",
  },
};

const Callout = ({ type, text }: { type: string; text: string }) => {
  const config = calloutConfig[type];
  // Unknown tag: fall back to plain markdown so nothing leaks as literal text.
  if (!config) return <MarkdownBlock text={text} />;

  const { label, Icon, container, icon, labelText } = config;

  return (
    <div className={`guide-print-exact my-6 rounded-xl px-4 py-4 sm:my-8 sm:px-7 sm:py-6 ${container}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Icon className={`w-4 h-4 flex-shrink-0 ${icon}`} />
        <span className={`text-xs font-semibold uppercase tracking-wider font-sans ${labelText}`}>
          {label}
        </span>
      </div>
      {/* Strip the outer margins of the first/last child so the panel hugs its content */}
      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        <MarkdownBlock text={text} />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Guide Article Layout
// ---------------------------------------------------------------------------
// Renders a full user-guide page from a markdown string. The markdown supports
// headings (#, ##, ###), bullet lists (*, -), horizontal rules (---), inline
// emphasis (*, **, ***) and copyable prompt blocks delimited by:
//
//   :::prompt
//   ... prompt text ...
//   :::
//
// Page title and meta description are owned by the prerender step
// (scripts/prerender-seo.ts via client/src/content/seo/registry.seo.ts).

interface GuideArticleProps {
  content: string;
  footerNote?: string;
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  /**
   * Id of this guide in `client/src/content/guides.ts`. When set, a "download
   * PDF" action linking to the build-time generated PDF is shown in the toolbar.
   */
  guideId?: string;
}

// Matches any supported block tag and captures up to its closing `:::`.
// Blocks never nest, so the non-greedy match always stops at the right fence.
// Note: `prompt-simple` MUST precede `prompt` in the alternation so the longer
// tag matches first (otherwise `:::prompt-simple` would match `:::prompt` and
// leak `-simple` as text).
const BLOCK_SPLIT = /(:::(?:prompt-simple|prompt|safety|scope|principle|scenario)[\s\S]*?:::)/g;
const BLOCK_TAG = /^:::(prompt-simple|prompt|safety|scope|principle|scenario)/;

export default function GuideArticle({
  content,
  footerNote,
  heroImage,
  heroTitle,
  heroSubtitle,
  guideId,
}: GuideArticleProps) {
  const contentParts = content.split(BLOCK_SPLIT);
  const guide = guideId ? getInteractiveGuide(guideId) : undefined;
  const pdfPath = guide ? interactiveGuidePdfPath(guide) : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 font-serif">
      <Header />

      <Section className="guide-article-section flex-grow pt-12 pb-24">
        <div className="guide-article-shell max-w-3xl mx-auto px-6 sm:px-8">

          {/* Navigation / Tools */}
          <nav className="no-print flex justify-between items-center mb-16 font-sans">
            <Link href="/user-guides">
              <a className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors group">
                <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Aftur til yvirlit
              </a>
            </Link>
            {pdfPath && (
              <a href={pdfPath} download={guide?.pdfFilename}>
                <Button
                  variant="ghost"
                  className="text-stone-500 hover:bg-stone-200/50 hover:text-stone-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tak PDF niður
                </Button>
              </a>
            )}
          </nav>

          {/* Hero Section with Image (optional) */}
          {heroImage && (
            <div className="mb-12 sm:mb-16">
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={heroImage}
                  alt={heroTitle ?? ""}
                  className="w-full h-48 sm:h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent" />
                {(heroTitle || heroSubtitle) && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                    {heroTitle && (
                      <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight tracking-tight drop-shadow-lg">
                        {heroTitle}
                      </h1>
                    )}
                    {heroSubtitle && (
                      <p className="mt-2 text-sm sm:text-base text-stone-100/90 font-serif max-w-xl drop-shadow-md">
                        {heroSubtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Article Body */}
          <article className="selection:bg-stone-200 selection:text-stone-900 dark:selection:bg-stone-700 dark:selection:text-stone-50">
            {contentParts.map((part, index) => {
              const match = part.match(BLOCK_TAG);
              if (match) {
                const type = match[1];
                const inner = part.replace(/^:::[\w-]+/, "").replace(/:::$/, "").trim();
                if (type === "prompt") {
                  return <PromptCard key={index} text={inner} />;
                }
                if (type === "prompt-simple") {
                  return <SimplePromptCard key={index} text={inner} />;
                }
                return <Callout key={index} type={type} text={inner} />;
              }
              return <MarkdownBlock key={index} text={part} />;
            })}
          </article>

          {/* Footer Note */}
          {footerNote && (
            <div className="mt-20 pt-10 border-t border-stone-200 dark:border-stone-800 text-center">
              <p className="text-stone-400 italic text-sm">
                {footerNote}
              </p>
            </div>
          )}

        </div>
      </Section>

      <Footer />
    </div>
  );
}
