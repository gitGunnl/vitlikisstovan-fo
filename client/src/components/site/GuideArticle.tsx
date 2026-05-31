import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Copy, Check, PenTool } from "lucide-react";

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

const RenderInlineText = ({ text }: { text: string }) => (
  <>{parseEmphasis(text, emphasisRules)}</>
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
    <div className="my-10 group">
      {/* The Card Design */}
      <div className="relative bg-[#fcfcf9] dark:bg-stone-900 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-md hover:border-stone-400">

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
            className="h-8 text-stone-500 hover:text-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Copy prompt to clipboard"
          >
            {copied ? (
              <span className="flex items-center text-green-600 dark:text-green-400 text-xs font-medium">
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Kopierað
              </span>
            ) : (
              <span className="flex items-center text-xs font-medium">
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Kopiera tekst
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
// Component: Markdown Block Renderer
// ---------------------------------------------------------------------------

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

    if (cleanLine.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={idx} className="font-serif text-4xl sm:text-5xl font-medium text-stone-900 dark:text-stone-50 mt-16 mb-8 tracking-tight">
          <RenderInlineText text={cleanLine.substring(2)} />
        </h1>
      );
    } else if (cleanLine.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-normal text-stone-800 dark:text-stone-100 mt-12 mb-6">
          <RenderInlineText text={cleanLine.substring(3)} />
        </h2>
      );
    } else if (cleanLine.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={idx} className="font-serif text-xl font-semibold text-stone-800 dark:text-stone-200 mt-8 mb-4 uppercase tracking-wide text-sm">
          <RenderInlineText text={cleanLine.substring(4)} />
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
}

export default function GuideArticle({ content, footerNote }: GuideArticleProps) {
  const contentParts = content.split(/(:::prompt[\s\S]*?:::)/g);

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 font-serif">
      <Header />

      <Section className="flex-grow pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">

          {/* Navigation / Tools */}
          <nav className="flex justify-between items-center mb-16 font-sans">
            <Link href="/user-guides">
              <a className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors group">
                <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Aftur til yvirlit
              </a>
            </Link>
            <Button
              variant="ghost"
              className="text-stone-500 hover:bg-stone-200/50 hover:text-stone-800"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4 mr-2" />
              Prenta
            </Button>
          </nav>

          {/* Article Body */}
          <article className="selection:bg-stone-200 selection:text-stone-900 dark:selection:bg-stone-700 dark:selection:text-stone-50">
            {contentParts.map((part, index) => {
              if (part.startsWith(":::prompt")) {
                const promptText = part.replace(/^:::prompt/, "").replace(/:::$/, "").trim();
                return <PromptCard key={index} text={promptText} />;
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
