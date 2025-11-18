import { useEffect, useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Copy, Check, PenTool } from "lucide-react";

// --- Configuration & Content ---

const BLOG_TITLE = "Test av eginleikunum hjá Gemini 3 at skriva føroyskt.";
const BLOG_DESC = "Test av hvussu væl Gemini 3 dugur at skriva føroyskt.";

const blogContent = `
# **Vitlíki á føroyskum: Hvussu lítla landið kann vinna stóra dystin**

Vit hoyra um tað hvønn dag. ChatGPT skrivar stílarnar hjá næmingum, telduforrit gera list, og tøknin gongur so skjótt, at tað er trupult at fylgja við. Vitlíki (gjørt vit) er komið fyri at vera. Men mitt í hesi tøkniligu kollveltingini standa vit – 55.000 fólk á nøkrum klettum í Norðuratlantshavi.

Hvussu hóskar ein so lítil tjóð inn í eina so stóra verð? Svarið er ikki einfalt, tí Føroyar hava nakrar heilt serligar avbjóðingar – men eisini nakrar unikar fyrimunir – tá ið ræður um at fáa gagn av vitlíki.

Her eru fýra veruleikar, vit mugu taka støðu til, um vit ikki skulu enda sum tøkniligir útisetar.

### **1. Vit kunnu ikki gera sum tey stóru**
Fyrsta avbjóðingin er støddin. Google og Microsoft hava fleiri starvsfólk, enn tað búgva fólk í Føroyum. Vit hava ikki ráð til at seta stór toymi av dátuserfrøðingum í hvørt einasta ráðuneyti ella kommunu. Tað ber einfalt ikki til.

Men hetta kann eisini vera okkara styrki. Tí vit eru smá, kunnu vit vera kvik. Vit hava longu "Samleikan", "Vangin" og "Heldina". Hesi talgildu amboðini binda landið saman á ein hátt, sum størri lond bara kunnu droyma um. Í staðin fyri at byggja 20 ymiskar loysnir, kunnu vit byggja eina felags "føroyska vitlíkiskjarnu". Hugsa tær ein talgildan hjálpara á Vanganum, sum tosar føroyskt og kann hjálpa tær við øllum frá skatti til barnsburðarfarloyvi. Tað er gjørligt, júst tí vit eru so fá og væl skipað.

### **2. "Tú kennir øll, og øll kenna teg"**
Í Føroyum er "navnloysi" eitt lutfalsligt hugtak. Hetta er ein stór avbjóðing, tá ið vit tosa um dátur.

Vitlíki krevur nógvar dátur fyri at læra. Men í einum landi, har ættartalvurnar ganga aftur til 1600-talið, og har vit vita, hvør eigur bilin, sum heldur uttan fyri handilin, er torført at gera dátur púra navnleysar. Um ein skipan greinar heilsudátur fyri "kvinnur millum 40 og 50 ár í einari lítlari bygd", so vita bygdarfólkini ofta, hvør talan er um.

Tí mugu vit vera varin. Vit kunnu ikki bara kopiera loysnir úr útlandinum, sum eru gjørdar til milliónbýir. Okkara skipanir mugu taka atlit til, at í Føroyum er persónvernd ikki bara lóg – tað snýr seg um grannar og familju.

### **3. Málið er okkara verja**
Størsta hóttanin er ivaleyst málið. Tøknirisar sum OpenAI og Google menna sínar málmyndir á enskum, sponskum og kinesiskum. Føroyskt er eitt "tilfeingislítið mál" í teirra eygum.

Um vit ikki syrgja fyri, at vitlíki skilur og tosar føroyskt, so endar tað við, at okkara børn og ungu fara at tosa enskt við teldurnar. Og tá teldurnar stýra meira og meira av gerandisdegnum, verður føroyskt trýst út.

Loysnin er "talgilt sjálvræði". Vit mugu sjálvi tryggja, at tað finnast nógvar dátur á føroyskum – tekstur, tala og ljóð – sum teldurnar kunnu læra av. Hetta er ikki bara mentan; tað er ein spurningur um at yvirliva sum tjóð í talgilda heiminum. Vit mugu krevja, at tær skipanir, tað almenna keypir, skilja okkara mál.

### **4. Fiskur, ferðavinna og framtíð**
Hví skulu vit so brúka orku upp á hetta? Tí møguleikarnir eru ovurhonds stórir.

Okkara búskapur hvílir á havinum. Vit hava longu heimsins bestu alarar og fiskimenn. Við vitlíki kunnu vit gerast enn betri. Teldur kunnu greina streymviðurskifti, fylgja fiskastovnum og fínstilla fóðringina í alibrúkum nógv neyvari, enn vit gera í dag.

Í ferðavinnuni kann vitlíki hjálpa okkum at stýra streyminum av ferðafólki, so vit verja náttúruna, samstundis sum vit veita gestunum eina uppliving á teirra egna máli – men við føroyskum innihaldi.

### **Niðurstøða: Vit mugu stýra skútuni sjálvi**
Vit standa við ein vegamót. Vit kunnu velja at lata standa til og brúka tær ensku loysnirnar, sum verða stoyttar niður yvir okkum. Ella vit kunnu taka róðrið.

Føroyar hava eitt álitssamfelag, sterka talgilda innviði og eitt fólk, ið er vant til at laga seg eftir umstøðunum. Um vit brúka vitlíki vitliga – við virðing fyri okkara máli og okkara privatlívi – so kann henda tøknin gerast eitt amboð, sum ger gerandisdagin lættari og samfelagið ríkari.

Vit eru lítil, men í talgilda heiminum er tað ikki støddin á landinum, ið telur, men dýpdin á vitinum.
`;

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
            <li key={i} className="flex items-start text-lg text-stone-700 dark:text-stone-300 leading-8">
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
        <h3 key={idx} className="font-serif text-xl font-semibold text-stone-700 dark:text-stone-200 mt-8 mb-4 uppercase tracking-wide text-sm">
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
        <p key={idx} className="mb-6 text-lg sm:text-xl leading-loose text-stone-700 dark:text-stone-300 font-serif">
          <RenderInlineText text={line} />
        </p>
      );
    }
  });

  flushList(); // Catch any trailing list

  return <>{elements}</>;
};

// ---------------------------------------------------------------------------
// Main Page Layout
// ---------------------------------------------------------------------------

export default function AiForCaretakersGuide() {
  useEffect(() => {
    document.title = BLOG_TITLE;
    const existingMeta = document.querySelector('meta[name="description"]');
    if (existingMeta) {
      existingMeta.setAttribute("content", BLOG_DESC);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = BLOG_DESC;
      document.head.appendChild(meta);
    }
  }, []);

  const contentParts = blogContent.split(/(<prompt>[\s\S]*?<\/prompt>)/g);

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
              if (part.startsWith("<prompt>")) {
                const promptText = part.match(/<prompt>([\s\S]*?)<\/prompt>/)?.[1] || "";
                return <PromptCard key={index} text={promptText} />;
              }
              return <MarkdownBlock key={index} text={part} />;
            })}
          </article>

          {/* Footer Note */}
          <div className="mt-20 pt-10 border-t border-stone-200 dark:border-stone-800 text-center">
            <p className="text-stone-400 italic text-sm">
              Vitlíki hjálpir námsfrøðingum at fokusera uppá tað, sum skapar virði.
            </p>
          </div>

        </div>
      </Section>

      <Footer />
    </div>
  );
}