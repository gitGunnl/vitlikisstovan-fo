import type { PageSeo } from "./_types";

const SITE_URL = "https://vitlikisstovan.fo";
const ORG_REF = `${SITE_URL}/#organization`;
const PATH = "/landsnet";

const page: PageSeo = {
  path: PATH,
  title:
    "Vitlíki á arbeiðsplássinum: Haldið røttu kósina | Vitlíkisstovan",
  description:
    "Praktiskur ritlingur til leiðarar, KT-ábyrgdarfólk og lyklabrúkarar í føroyskum almennum stovnum — um trygga, tilætlaða og skipaða nýtslu av vitlíki á arbeiðsplássinum.",
  ogType: "article",
  content: `
    <h1>Vitlíki á arbeiðsplássinum: Haldið røttu kósina</h1>
    <p>Starvsfólk á almennum arbeiðsplássum í Føroyum brúka longu vitlíki hvønn einasta dag — gjøgnum telefonir, arbeiðisteldur og skipanir, sum tey longu hava atgongd til. Spurningurin er ikki, um vitlíki verður brúkt, men um nýtslan verður tilætlað, trygg og skipað — ella duld, tilvildarlig og váðamikil.</p>
    <h2>Hvat er skugga-vitlíki (Shadow AI)?</h2>
    <p>Skugga-vitlíki hendir, tá ið starvsfólk — oftast í góðari trúgv fyri at loysa eina uppgávu skjótari — líma tekstir inn í ókeypis, almenn vitlíkistól á telefonini ella telduni. Tólini eru ikki góðkend, og starvsfólk vita ofta ikki, hvar dátur enda.</p>
    <h2>Tríkanturin: Leiðsla, starvsfólk og KT</h2>
    <ul>
      <li><strong>Leiðslan eigur málið</strong> — setur kós, mørk og ábyrgd.</li>
      <li><strong>KT tryggjar karmarnar</strong> — trygd, GDPR, loyvi, skipanir.</li>
      <li><strong>Starvsfólkini finna virðið</strong> í gerandisarbeiðnum.</li>
    </ul>
    <h2>Sjey stig til trygga og skipaða nýtslu</h2>
    <ol>
      <li>Set leiðsluna í ábyrgd.</li>
      <li>Finn út úr, hvat longu fer fram.</li>
      <li>Gerið einföld trygdarmørk — grønt/gult/reytt.</li>
      <li>Áset eitt positivt mál.</li>
      <li>Gevið fólki góðkend, trygg amboð.</li>
      <li>Venjið tey viljugu fyrst.</li>
      <li>Gerið eina læringarskipan.</li>
    </ol>
    <h2>Fá ritlingin</h2>
    <p>Ritlingurin verður sendur beinanvegin til tín tann telduposti, tú gevur. Vitlíkisstovan hjálpir føroyskum almennum stovnum við praktiskari og tryggari innføring av vitlíki — leiðslusparring, greiðum reglum, arbeiðsstovum og deilingargrunnum.</p>
  `,
  jsonLd: [
    {
      "@type": "Article",
      headline: "Vitlíki á arbeiðsplássinum: Haldið røttu kósina",
      description:
        "Praktiskur ritlingur til leiðarar, KT-ábyrgdarfólk og lyklabrúkarar í føroyskum almennum stovnum.",
      inLanguage: "fo",
      author: { "@id": ORG_REF },
      publisher: { "@id": ORG_REF },
      url: `${SITE_URL}${PATH}`,
      mainEntityOfPage: `${SITE_URL}${PATH}`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        ["Heim", "/"],
        ["Vitlíki á arbeiðsplássinum", PATH],
      ].map(([name, p], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item: `${SITE_URL}${p}`,
      })),
    },
  ],
};

export default page;
