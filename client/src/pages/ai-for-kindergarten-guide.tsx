import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";

// --- Dummy Blog Post Content (replace with your real markdown) ---
const blogContent = `
# **Vitlíki til námsfrøðingar: Minni skriviarbeiði, meira spæl.**

## ***Lættur test-undirtekstur við bæði feitari og kursivari skrift.***

---

**Hendan vegleiðing er ein test:**

* Ein *vanligur* punktur.  
* Ein annar punktur við **feitari** skrift.  
* Triði punktur við ***bæði***.

<prompt>
Eg vil fegin hava hjálp til at gera eina stutta vegleiðing til námsfrøðingar.

- Skriv á føroyskum.
- Halt teg til 3 stuttar punktir.
</prompt>

Eftir prompt-dømi kemur ein vanligur tekstur aftur, við nøkrum *kursivari* og **feitari** tekstformatering.

---

## **Hvussu kann AI hjálpa í dagligi arbeiðinum?**

AI kann vera ein ***stórur hjálpari*** í hvørjum degi í barnagarðinum. Her eru nøkur dømi um hvussu tú kanst brúka tað:

* **Skriva dagbókar og skjøl** - AI kann hjálpa tær at skriva skjót og týdelig dagbókarskrá.
* **Gera uppgávur** - Fáa hugskot til kreativari leikir og læriuppgávur.
* **Samskipan við foreldur** - Hjálp til at skriva stuttligar og greið boð til mammu og pappu.

<prompt>
Eg eri barnagarðslærari í Tórshavn. Í dag høvdu vit eitt gott dagsforløp við malingarmynd og útivist. Børnini vóru virkin og fegin.

Hjálp mær at skriva eina professionella dagbókarskrá (3-4 setningar) sum eg kann brúka í okkara kervi. Brúka føroyskt mál og neutralt tón.
</prompt>

### **Nýtslu viðmerkingar**

Tað er mikilvægt at ***minnas*** um, at AI er eitt hjálpartól - ikki ein útskifting fyri tína fagligan dóm. Alla svar frá AI skulu altíð verða eftirkannað og tillagað til tínar serligu umstøður.

## **Dømi um nýtislig prompt til barnagarðslærarar**

Her eru fleiri dømi um hvussu tú kanst spyrja AI um hjálp:

<prompt>
Eg treng hjálp at skriva ein SMS til allar foreldur um veðurbroytingar í morgin.

- Skriv á føroyskum
- Stuttligt og greitt
- Milda og vinarlig tón
- Nevn at vit halda barnagarðin opinan, men foreldur kunnu koma fyrr um tey vilja
</prompt>

Henda prompt fer at geva tær eitt nýtisligt svar, sum tú kanst brúka beinleiðis ella broyta eftir tínum tørvi.

### **Týdningin av greinum promptum**

Ein góður prompt hevur fleiri deildirnar:

1. **Kontekst** - Hvør ert tú og hvør er støðan?
2. **Uppgáva** - Hvat vilt tú at AI skal gera?
3. **Krav** - Hvussu skal úrslitið vera (mál, longd, stílur)?
4. **Dømi** - Um møguligt, gev eitt dømi um hvat tú vilt.

---

## **Fleiri arbeiðsøki**

AI kann eisini hjálpa við:

* ***Fráboðanar til foreldur*** um serstøk tiltak ella broytingar
* **Uppgávu- og virksemihugskot** til ymisk aldursbólk
* **Íkornbeindir** tekstar til húsklokað ella heimasíður
* ***Stuttar samantektir*** av langar reglugerðum ella leiðbeiningum

<prompt>
Vinarliga ger mær 5 stuttar hugskot til regnveðursvirksemi fyri børn í aldrinum 3-5 ár. 

Øll virksemi skulu:
- Vera inni í barnagarðinum
- Brúka vanlig tilfar sum vit hava
- Taka 15-30 minuttir
- Vera spenandi og læruríkt

Skriv á føroyskum við einføldum máli.
</prompt>

### **Viðvaring um persónligar upplýsingar**

***Mikilvægt:*** Aldri set persónligar upplýsingar um børn, foreldur ella kollegur inn í AI-amboð. Brúka heldur almennar lýsingar sum "Búfólk A" ella "barn í 4 ára aldri".

---

## **Framhaldandi læring**

Arbeiði við AI er ein dugnaður, sum batnar við roynd. Byrja við ***einføldum*** fyrispurningunum og smátt og smátt tak teg at fleiri flóknum uppgávum.

Minst at AI er eitt tól, sum skal ***styrkja*** tínar evnir - ikki úbøta tín fagligan vit ella umsorgisgávu.

<prompt>
Kann tú hjálpa mær at planeggja eina vikuskipan fyri komandi viku?

Tema: "Heyst og innhagging"

Treng:
- Mandag til fríggjadag
- Hvønn dag ein høvuðsvirksemi (30-45 min)
- Stuttar hugskot til frí leik
- Tillagað tilfar

Aldursbólkur: 3-5 ár
Mál: Føroyskt
</prompt>

***Vinarliga royn!*** Meira tú brúkar AI, betri verður tú til at fáa tann rættu hjálp, sum tú tørvar í tínum dagligi arbeiði.
`;

// ---------------------------------------------------------------------------
// Inline markdown parsing: *, **, ***
// ---------------------------------------------------------------------------

interface EmphasisRule {
  marker: string;
  wrap: (children: ReactNode) => ReactNode;
}

const emphasisRules: EmphasisRule[] = [
  {
    marker: "***",
    wrap: (children) => (
      <strong>
        <em>{children}</em>
      </strong>
    ),
  },
  {
    marker: "**",
    wrap: (children) => <strong>{children}</strong>,
  },
  {
    marker: "*",
    wrap: (children) => <em>{children}</em>,
  },
];

function parseEmphasis(text: string, rules: EmphasisRule[]): ReactNode[] {
  if (rules.length === 0) return [text];

  const [rule, ...rest] = rules;
  const { marker, wrap } = rule;
  const result: ReactNode[] = [];

  let index = 0;

  while (index < text.length) {
    const start = text.indexOf(marker, index);

    if (start === -1) {
      const plain = text.slice(index);
      if (plain) result.push(...parseEmphasis(plain, rest));
      break;
    }

    const end = text.indexOf(marker, start + marker.length);
    if (end === -1) {
      const plain = text.slice(index);
      if (plain) result.push(...parseEmphasis(plain, rest));
      break;
    }

    // Text before the marker
    const before = text.slice(index, start);
    if (before) result.push(...parseEmphasis(before, rest));

    // Text inside the markers
    const inner = text.slice(start + marker.length, end);
    if (inner) {
      const children = parseEmphasis(inner, rest);
      result.push(wrap(children));
    }

    index = end + marker.length;
  }

  return result;
}

/**
 * Helper component to render inline text with *, **, *** formatting.
 */
const RenderInlineText = ({ text }: { text: string }) => {
  return <>{parseEmphasis(text, emphasisRules)}</>;
};

// ---------------------------------------------------------------------------
// Block-level markdown rendering
// ---------------------------------------------------------------------------

/**
 * Renders a block of markdown-like text into styled HTML elements.
 */
const MarkdownRenderer = ({ text }: { text: string }) => {
  // Normalize line endings
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const elements: JSX.Element[] = [];
  let listItems: string[] = [];

  // Helper to push collected list items into the elements array as a <ul>
  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="list-disc pl-8 my-4 space-y-2 text-lg leading-relaxed"
        >
          {listItems.map((item, i) => (
            <li key={i}>
              <RenderInlineText text={item} />
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.replace(/\r$/, "");

    if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h1
          key={index}
          className="text-4xl font-bold mt-10 mb-5 text-gray-900 dark:text-gray-100"
        >
          <RenderInlineText text={line.substring(2).trim()} />
        </h1>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={index}
          className="text-3xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100"
        >
          <RenderInlineText text={line.substring(3).trim()} />
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={index}
          className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100"
        >
          <RenderInlineText text={line.substring(4).trim()} />
        </h3>
      );
    } else if (/^---+$/.test(line.trim())) {
      flushList();
      elements.push(
        <hr
          key={index}
          className="my-8 border-gray-300 dark:border-gray-700"
        />
      );
    } else if (line.startsWith("* ")) {
      // unordered list item
      listItems.push(line.substring(2));
    } else if (line.trim() === "") {
      // paragraph break
      flushList();
      if (
        elements.length > 0 &&
        !String(elements[elements.length - 1].key).includes("spacer")
      ) {
        elements.push(<div key={`spacer-${index}`} className="h-4" />);
      }
    } else {
      // normal paragraph
      flushList();
      elements.push(
        <p key={index} className="text-lg leading-relaxed mb-4">
          <RenderInlineText text={line} />
        </p>
      );
    }
  });

  flushList(); // Flush any remaining list items at the end

  return <>{elements}</>;
};

// ---------------------------------------------------------------------------
// Prompt block (for <prompt>...</prompt> sections)
// ---------------------------------------------------------------------------

/**
 * Renders a styled block for <prompt> tags with a copy button.
 */
const PromptBlock = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const value = text.trim();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
      return;
    }

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="bg-blue-50/70 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg my-6 font-mono text-sm relative group">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-9 w-9 text-blue-700 dark:text-blue-300 opacity-50 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
        aria-label="Copy prompt"
      >
        {copied ? (
          <Check className="h-5 w-5" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </Button>
      <pre className="whitespace-pre-wrap break-words p-4 pt-12 sm:p-6">
        {text.trim()}
      </pre>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function AiForCaretakersGuide() {
  // Set SEO tags on component mount
  useEffect(() => {
    document.title = "AI for Caretakers Guide (Test)";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Test AI guide for caretakers - practical prompts and examples for daily tasks"
    );
  }, []);

  // Split the blog content by the <prompt> tags, keeping the tags as delimiters
  const contentParts = blogContent.split(/(<prompt>[\s\S]*?<\/prompt>)/g);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <Section className="flex-grow py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Navigation Bar */}
          <div className="flex justify-between items-center mb-8">
            <Button
              asChild
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              <Link href="/user-guides">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Guides
              </Link>
            </Button>
            <Button
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
              onClick={() => window.print()} // "Download PDF" triggers print dialog
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Article Content */}
          <article className="font-serif text-gray-800 dark:text-gray-200">
            {contentParts.map((part, index) => {
              if (part.startsWith("<prompt>")) {
                const promptText =
                  part.match(/<prompt>([\s\S]*?)<\/prompt>/)?.[1] || "";
                return <PromptBlock key={index} text={promptText} />;
              }
              return <MarkdownRenderer key={index} text={part} />;
            })}
          </article>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
