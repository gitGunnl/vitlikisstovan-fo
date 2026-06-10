/**
 * Single source of truth for the user guides.
 *
 * Two kinds of guides exist:
 *
 *  1. Interactive guides — rendered in the app from Markdown (most via
 *     `GuideArticle`). At build time `scripts/generate-guide-pdfs.ts` renders
 *     each `route` with a headless browser and saves a real, selectable PDF to
 *     the site root (`/<pdfFilename>`), so it deploys with the static site.
 *
 *  2. Legacy PDF guides — ship as static PDF files in `client/public/` and are
 *     only ever read/downloaded; they have no in-app route.
 *
 * The PDF build step derives the list of guide routes from `interactiveGuides`
 * and cross-checks it against the `/user-guides/...` routes in `App.tsx`, so a
 * new guide route can't silently ship without a generated PDF (the build fails,
 * mirroring how SEO route coverage is enforced today).
 *
 * This module is intentionally framework-free (pure data) so it can be imported
 * both by the frontend and by the Node build script.
 */

export interface InteractiveGuide {
  /** Stable id, also used by `GuideArticle` to find its own PDF. */
  id: string;
  /** Display title (used on the listing card and in the download filename). */
  title: string;
  /** Short description for the listing card. */
  description: string;
  /** In-app route, e.g. "/user-guides/ai-for-kindergarten-guide". */
  route: string;
  /**
   * Descriptive, URL-safe PDF filename served from the site root. The build
   * step writes the generated PDF to `dist/public/<pdfFilename>`.
   */
  pdfFilename: string;
  /** Whether this guide appears as a card on the `/user-guides` listing. */
  listed: boolean;
  /**
   * Optional decorative image served from the site root, e.g.
   * "/images/guides/vitliki-til-dagstovnar.webp".
   */
  image?: string;
  /**
   * When true, a real, professionally designed PDF already ships as a static
   * file in `client/public/<pdfFilename>`. The build-time PDF generator
   * (`scripts/generate-guide-pdfs.ts`) skips these so it never overwrites the
   * designed file with a headless-Chromium render of the in-app page.
   */
  prebuiltPdf?: boolean;
}

export interface LegacyPdfGuide {
  id: string;
  title: string;
  description: string;
  /** Site-root path to the pre-existing static PDF, e.g. "/foo.pdf". */
  pdfPath: string;
  pdfFilename: string;
}

export const interactiveGuides: InteractiveGuide[] = [
  {
    id: "ai-for-kindergarten",
    title: "Vitlíki til dagstovnar: Minni skriviarbeiði, meira spæl.",
    description:
      "Lættir og tryggir hættir at minka um dagligu umsitingina, so tú kanst nýta meira tíð saman við børnunum.",
    route: "/user-guides/ai-for-kindergarten-guide",
    pdfFilename: "vitliki-til-dagstovnar.pdf",
    listed: true,
    prebuiltPdf: true,
    image: "/images/guides/vitliki-til-dagstovnar.webp",
  },
  {
    id: "ai-for-caretakers",
    title:
      "Hvussu tú kann nýta vitlíki sum røktarstarvsfólk: Meira tíð til tær heitu hendurnar.",
    description:
      "Ein handalig vegleiðing, sum ger røktarstarvsfólk før fyri at brúka vitlíki trygt til skjalfesting og tilrættislegging, so meira tíð verður til sjálva umsorganina.",
    route: "/user-guides/ai-for-caretakers-guide",
    pdfFilename: "vitliki-til-roktarstarvsfolk.pdf",
    listed: true,
    prebuiltPdf: true,
    image: "/images/guides/vitliki-til-roktarstarvsfolk.webp",
  },
  {
    id: "ai-for-coaches",
    title: "Vitlíki í venjaraarbeiði",
    description:
      "Ein handalig vegleiðing fyri venjarar um, hvussu vitlíki kann stuðla við venjing, fyrireiking og samskifti.",
    route: "/user-guides/ai-for-coaches-guide",
    pdfFilename: "vitliki-til-venjarar.pdf",
    listed: true,
    prebuiltPdf: true,
    image: "/images/guides/vitliki-til-venjarar.webp",
  },
  {
    id: "ai-for-teaching",
    title: "Vitlíki til undirvísing",
    description:
      "Ein handalig vegleiðing um, hvussu vitlíki kann nýtast í undirvísing og at fyrireika tímar.",
    route: "/user-guides/ai-for-teaching-guide",
    pdfFilename: "vitliki-til-undirvising.pdf",
    listed: true,
    prebuiltPdf: true,
    image: "/images/guides/vitliki-til-undirvising.webp",
  },
  {
    id: "ai-for-service-industry",
    title: "Vegleiðing til tænastuvinnuna",
    description:
      "Ein handalig vegleiðing fyri tænastuvinnuna um, hvussu vitlíki kann stuðla við dagligum uppgávum og kundasamskifti.",
    route: "/user-guides/ai-for-service-industry-guide",
    pdfFilename: "vitliki-til-taenastuvinnuna.pdf",
    listed: true,
    prebuiltPdf: true,
    image: "/images/guides/vitliki-til-taenastuvinnuna.webp",
  },
  {
    id: "ai-for-craftsmen",
    title: "Vitlíki til handverkarar",
    description:
      "Ein handalig vegleiðing fyri handverkarar um, hvussu vitlíki kann stuðla við tilboðum, skjalfesting og skipaning.",
    route: "/user-guides/ai-for-craftsmen-guide",
    pdfFilename: "vitliki-til-handverkarar.pdf",
    listed: true,
    prebuiltPdf: true,
    image: "/images/guides/vitliki-til-handverkarar.webp",
  },
  {
    id: "getting-started",
    title: "At koma ígongd við vitlíki",
    description:
      "Stig-fyri-stig vegleiðing til at koma ígongd við vitlíki: hvat tú skalt velja, hvussu tú skrivar fyrstu prompt og hvussu tú trygt kanst royna nýggj amboð.",
    route: "/user-guides/getting-started",
    pdfFilename: "at-koma-igongd-vid-vitliki.pdf",
    listed: false,
  },
  {
    id: "best-practices",
    title: "Bestu mannagongdir við vitlíki",
    description:
      "Bestu mannagongdir fyri at brúka vitlíki á einum trygt og munagóðum hátti — góðar prompt, trygd, persónsupplýsingar og hvussu tú metir um svar frá vitlíki.",
    route: "/user-guides/best-practices",
    pdfFilename: "bestu-mannagongdir-vid-vitliki.pdf",
    listed: false,
  },
];

export const legacyPdfGuides: LegacyPdfGuide[] = [
  {
    id: "ai-for-politicians",
    title: "Vitlíki til politikarir",
    description:
      "Ein handalig vegleiðing fyri politikarar um hvussu vitlíki kann stuðla við politiskari virksemi og átaksgerð.",
    pdfPath: "/Ein_handalig_vegleiding_til_politikarir.pdf",
    pdfFilename: "Ein_handalig_vegleiding_til_politikarir.pdf",
  },
  {
    id: "ai-for-teachers",
    title: "Vitlíki til lærarir",
    description:
      "Vegleiðing fyri undirvísarar um hvussu vitlíki kann nýtast í skúlanum og í undirvísingararbeiðinum.",
    pdfPath: "/vegleiding_undirvisarir.pdf",
    pdfFilename: "vegleiding_undirvisarir.pdf",
  },
];

/** Site-root path the generated PDF for an interactive guide is served from. */
export function interactiveGuidePdfPath(guide: InteractiveGuide): string {
  return `/${guide.pdfFilename}`;
}

/** Look up an interactive guide by its id. */
export function getInteractiveGuide(id: string): InteractiveGuide | undefined {
  return interactiveGuides.find((g) => g.id === id);
}
