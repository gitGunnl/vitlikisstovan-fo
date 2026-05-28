import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import {
  AlignmentType,
  Document,
  Footer,
  Header,
  HeadingLevel,
  LevelFormat,
  PageNumber,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

const OUTPUT = resolve("docs/ritlingur/vitliki-a-arbeidsplassinum.docx");

const FONT_BODY = "Calibri";
const FONT_HEAD = "Georgia";

function p(opts: {
  text?: string;
  runs?: TextRun[];
  style?: string;
  heading?: (typeof HeadingLevel)[keyof typeof HeadingLevel];
  alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
  numbering?: { reference: string; level: number };
  bullet?: { level: number };
  spacingBefore?: number;
  spacingAfter?: number;
}) {
  return new Paragraph({
    children: opts.runs ?? (opts.text ? [new TextRun({ text: opts.text })] : []),
    style: opts.style,
    heading: opts.heading,
    alignment: opts.alignment,
    numbering: opts.numbering,
    bullet: opts.bullet,
    spacing: {
      before: opts.spacingBefore,
      after: opts.spacingAfter,
    },
  });
}

function eyebrow(text: string) {
  return p({
    runs: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 18,
        characterSpacing: 60,
        color: "1F525B",
      }),
    ],
    spacingBefore: 240,
    spacingAfter: 80,
  });
}

function h1(text: string) {
  return p({ text, heading: HeadingLevel.HEADING_1, spacingBefore: 120, spacingAfter: 160 });
}

function h2(text: string) {
  return p({ text, heading: HeadingLevel.HEADING_2, spacingBefore: 80, spacingAfter: 160 });
}

function body(text: string, opts: { italic?: boolean } = {}) {
  return p({
    runs: [new TextRun({ text, italics: opts.italic })],
    style: "BodyText",
    spacingAfter: 160,
  });
}

function bodyRich(parts: Array<string | { text: string; bold?: boolean; italic?: boolean }>) {
  return p({
    runs: parts.map((piece) =>
      typeof piece === "string"
        ? new TextRun({ text: piece })
        : new TextRun({ text: piece.text, bold: piece.bold, italics: piece.italic }),
    ),
    style: "BodyText",
    spacingAfter: 160,
  });
}

function bullet(text: string) {
  return p({
    runs: [new TextRun({ text })],
    style: "BodyText",
    bullet: { level: 0 },
  });
}

function numberedStep(idx: number, title: string, bodyText: string) {
  return [
    p({
      runs: [
        new TextRun({
          text: `${String(idx).padStart(2, "0")}. ${title}`,
          bold: true,
          font: FONT_HEAD,
          size: 28,
          color: "0A1F3D",
        }),
      ],
      spacingBefore: 200,
      spacingAfter: 80,
    }),
    body(bodyText),
  ];
}

function callout(text: string) {
  return p({
    runs: [new TextRun({ text, italics: true })],
    style: "Callout",
    spacingBefore: 120,
    spacingAfter: 200,
  });
}

const doc = new Document({
  creator: "Vitlíkisstovan",
  title: "Vitlíki á arbeiðsplássinum",
  description: "Ritlingur: 6 stig til betri vitlíkisnýtslu",
  styles: {
    default: {
      document: {
        run: { font: FONT_BODY, size: 22 },
        paragraph: { spacing: { line: 320 } },
      },
      heading1: {
        run: { font: FONT_HEAD, size: 56, color: "0A1F3D", bold: false },
        paragraph: { spacing: { before: 240, after: 200 } },
      },
      heading2: {
        run: { font: FONT_HEAD, size: 36, color: "0A1F3D", bold: false },
        paragraph: { spacing: { before: 320, after: 160 } },
      },
      title: {
        run: { font: FONT_HEAD, size: 88, color: "0A1F3D", bold: false },
        paragraph: { alignment: AlignmentType.LEFT, spacing: { after: 300 } },
      },
    },
    paragraphStyles: [
      {
        id: "BodyText",
        name: "Body Text",
        basedOn: "Normal",
        next: "BodyText",
        quickFormat: true,
        run: { font: FONT_BODY, size: 22, color: "1F2937" },
        paragraph: { spacing: { line: 320, after: 160 } },
      },
      {
        id: "Callout",
        name: "Callout",
        basedOn: "Normal",
        next: "BodyText",
        quickFormat: true,
        run: { font: FONT_BODY, size: 22, italics: true, color: "1F525B" },
        paragraph: {
          spacing: { before: 200, after: 200, line: 320 },
          indent: { left: 360, right: 360 },
        },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "steps",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.START,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: "Vitlíkisstovan · Ritlingur",
                  size: 18,
                  color: "5A6B82",
                  characterSpacing: 40,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Síða ", size: 18, color: "5A6B82" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "5A6B82" }),
                new TextRun({ text: " av ", size: 18, color: "5A6B82" }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "5A6B82" }),
              ],
            }),
          ],
        }),
      },
      children: [
        // ===== COVER =====
        p({ spacingBefore: 2400 }),
        eyebrow("Vitlíkisstovan · Ritlingur: 6 stig til betri vitlíkisnýtslu"),
        p({
          runs: [
            new TextRun({
              text: "Vitlíki á arbeiðsplássinum:",
              font: FONT_HEAD,
              size: 88,
              color: "0A1F3D",
            }),
          ],
          spacingAfter: 100,
        }),
        p({
          runs: [
            new TextRun({
              text: "Hvat er best hjá stovnum at gera nú?",
              font: FONT_HEAD,
              size: 72,
              italics: true,
              color: "1F525B",
            }),
          ],
          spacingAfter: 600,
        }),
        bodyRich([
          "Starvsfólk á føroyskum almennum arbeiðsplássum brúka longu vitlíki hvønn dag. Spurningurin er ikki, ",
          { text: "um", italic: true },
          " tað verður brúkt, men um nýtslan verður ",
          { text: "tilætlað, trygg og skipað", bold: true },
          " — ella duld og váðamikil.",
        ]),

        // ===== SHADOW AI =====
        p({ spacingBefore: 600 }),
        eyebrow("Hvat tú eigur at vita"),
        h2("Skugga-vitlíki — tað, sum longu hendir"),
        body(
          "Skuggavitlíki hendir, tá ið starvsfólk, oftast í góðari trúgv fyri at loysa eina uppgávu skjótari, líma tekstir inn í almenn vitlíkistól sum ChatGPT ella Gemini á telefonini ella telduni.",
        ),
        body(
          "Trupuleikin er at dáturnar sum oftast enda í ørðum londum og um hettar eru viðkvæmar dátur, so kemur hetta undir lógarbrot.",
        ),
        callout("At bíða steðgar ikki nýtsluni — tað ger hana bara ósjónliga."),

        // ===== WHY NOW =====
        eyebrow("Hví nú"),
        h2("Hví eigur tú at gera okkurt nú?"),
        body(
          "Nýtslan flytur seg nógv skjótari enn stovnsreglur og leiðsla megna at fylgja við. Og almennir stovnar arbeiða ofta við tilfari, sum krevur serliga umsorgan:",
        ),
        bullet("Persónsdátur um borgarar"),
        bullet("Borgaramál og fyrispurningar"),
        bullet("Heilsudátur og viðkvæmar upplýsingar"),
        bullet("Innanhýsis samskifti og trúnaðarmál"),

        // ===== TRIANGLE =====
        eyebrow("Tríggir leiklutir"),
        h2("Leiðsla, KT og starvsfólk — saman"),
        body("Fyri at fáa virði úr vitlíki, mugu tríggir leiklutir samstarva rætt."),
        p({
          runs: [
            new TextRun({ text: "Leiðslan", bold: true, font: FONT_HEAD, size: 26, color: "0A1F3D" }),
          ],
          spacingBefore: 160,
          spacingAfter: 60,
        }),
        body(
          "Setur kós, tekur ábyrgd og vísur áhuge. Um leiðsla slett ikki skilur vitlíki, so er ringt at vinna tað veruliga virið.",
        ),
        p({
          runs: [
            new TextRun({ text: "KT", bold: true, font: FONT_HEAD, size: 26, color: "0A1F3D" }),
          ],
          spacingBefore: 160,
          spacingAfter: 60,
        }),
        body(
          "Tryggjar karmarnar — trygg amboð, dátuvernd og yvurlit yvur vitlíki á tykkara stovni.",
        ),
        p({
          runs: [
            new TextRun({ text: "Starvsfólkini", bold: true, font: FONT_HEAD, size: 26, color: "0A1F3D" }),
          ],
          spacingBefore: 160,
          spacingAfter: 60,
        }),
        body(
          "Kenna gerandisarbeiðið, hava serfrøðina og finna, hvar tól veruliga lætta um byrðuna.",
        ),

        // ===== SEVEN STEPS =====
        eyebrow("Vegurin framm"),
        h2("6 stig til trygga og skipaða nýtslu"),
        body("Leiðslan kann fylgja hesum seks stigum fyri at fáa eina skipaða byrjan."),
        ...numberedStep(
          1,
          "Gerið vitlíki til eina leiðsluábyrgd",
          "Leiðslan má taka eigaraskap. Hetta kann ikki bara latast í hendurnar á KT-deildini ella verða tilvildarligar royndir hjá einstøkum starvsfólkum.",
        ),
        ...numberedStep(
          2,
          "Kanni hvat longu hendir",
          "Fáið eina veruliga mynd av, hvussu fólk longu brúka vitlíki í arbeiðinum.",
        ),
        ...numberedStep(
          3,
          "Setið tryggar og gagnligar karmar",
          "Sigið ikki bara, hvat fólk ikki mugu gera. Setið eisini eitt mál fyri hvat skal gerast.",
        ),
        ...numberedStep(
          4,
          "Gevið fólki góð amboð",
          "Ikki bara trygg, men eisini nóg góð amboð til at tey eru hjálpsam fyri starvsfólki.",
        ),
        ...numberedStep(
          5,
          "Skapið rúm fyri regluligari læring",
          "Fólk hava tørv á at vita, at tey sleppa at royna seg fram við vitlíki, og at tað er í lagi at nýta vitlíki til veruligt arbeiði.",
        ),
        ...numberedStep(
          6,
          "Skiljið vitlíki nóg væl til at leiða",
          "Leiðarar skulu ikki gerast tøkniligir serfrøðingar. Men teir mugu skilja nóg mikið um vitlíki til at kunna seta teir rættu spurningarnar, síggja møguleikar og mørk, og taka betri avgerðir.",
        ),

        // ===== LEADERSHIP LITERACY =====
        eyebrow("Til leiðsluna"),
        h2("Hví leiðarar eiga skilja vitlíki"),
        bullet(
          "Vitlíki kann ljóða sannførandi, hóast tað tekur feil. Leiðslan má skilja, hví menniskjalig eftirkanning altíð er krav.",
        ),
        bullet(
          "Fólk hava ymiskan hugburðar til vitlíki, tað er umráðandi at duga at rúma hendan ymiskleikan.",
        ),

        // ===== SERVICES =====
        eyebrow("Hjálp til at koma í gongd"),
        h2("Hvussu Vitlíkisstovan kann hjálpa tykkum"),
        body(
          "Vit hjálpa føroyskar stovnum við praktiskari og tryggari nýtslu av vitlíki — uttan óneyðugar fløkjutar forkláringar.",
        ),
        p({
          runs: [
            new TextRun({ text: "01  Verkstovur", bold: true, font: FONT_HEAD, size: 28, color: "0A1F3D" }),
          ],
          spacingBefore: 200,
          spacingAfter: 60,
        }),
        body(
          "Handaligar verkstovur til leiðslur og starvsfólk — tryggari nýtsla og meira virið.",
        ),
        p({
          runs: [
            new TextRun({ text: "02  Ráðgeving", bold: true, font: FONT_HEAD, size: 28, color: "0A1F3D" }),
          ],
          spacingBefore: 160,
          spacingAfter: 60,
        }),
        body("Strategisk sparring um kós, ábyrgdarbýti, dátuvernd og trygdarmørk."),
        p({
          runs: [
            new TextRun({ text: "03  Framløgur", bold: true, font: FONT_HEAD, size: 28, color: "0A1F3D" }),
          ],
          spacingBefore: 160,
          spacingAfter: 60,
        }),
        body("Hugkveikjandi framløgur um vitlíki á arbeiðsplássinum."),

        // ===== FINAL =====
        eyebrow("Næsta stig"),
        h2("Tilreiðar at taka fyrsta stigið?"),
        body(
          "Lesið ritlingin, ella bókið pláss á leiðsluverkstovuni, har vit hjálpa tykkum at finna fram til tykkara egnu kós.",
        ),
        p({
          runs: [
            new TextRun({ text: "info@vitlikisstovan.fo", color: "1F525B" }),
            new TextRun({ text: "    ·    ", color: "5A6B82" }),
            new TextRun({ text: "+298 919 444", color: "1F525B" }),
          ],
          spacingBefore: 240,
        }),
      ],
    },
  ],
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, buffer);
  console.log(`Wrote ${OUTPUT} (${buffer.length.toLocaleString()} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
