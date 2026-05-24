import type { PageSeo } from "./_types";

const SITE_URL = "https://vitlikisstovan.fo";
const ORG_REF = `${SITE_URL}/#organization`;

const page: PageSeo = {
  path: "/landsnet",
  title:
    "Vitlíki á arbeiðsplássinum: Haldið røttu kósina | Vitlíkisstovan",
  description:
    "Byrjanarpakki til almennar stovnar um trygga og skipaða nýtslu av vitlíki. Sjey stig, grønt/gult/reytt trygdarmyndilin og fríur ritlingur til niðurtøku.",
  ogType: "article",
  content: `
    <header>
      <p>Byrjanarpakki til almennar stovnar</p>
      <h1>Vitlíki á arbeiðsplássinum: Haldið røttu kósina</h1>
      <p>Starvsfólk á almennum arbeiðsplássum í Føroyum brúka longu vitlíki hvønn einasta dag. Spurningurin er ikki um, men hvørt nýtslan skal vera tilætlað, trygg og skipað — ella duld, tilvildarlig og váðamikil.</p>
    </header>

    <section>
      <h2>Hvat er skugga-vitlíki (Shadow AI)?</h2>
      <p>Skugga-vitlíki hendir, tá ið starvsfólk líma tekstir inn í ókeypis, almenn vitlíkistól. Tólini eru ikki góðkend, og starvsfólk vita ofta ikki, hvar dáturnar enda.</p>
    </section>

    <section>
      <h2>Hví tú eigur at bregðast við nú</h2>
      <p>At bíða steðgar ikki nýtsluni — tað ger hana bara ósjónliga. Almennir stovnar sita við persónsupplýsingum, borgaramálum og heilsudátum, og vandin fyri dátuleka veksur við hvørjum degi.</p>
    </section>

    <section>
      <h2>Tríkanturin: Leiðsla, starvsfólk og KT</h2>
      <ul>
        <li><strong>Leiðslan eigur málið</strong> — setir kósina og mørkini.</li>
        <li><strong>KT tryggjar karmarnar</strong> — trygd, GDPR og loyvi.</li>
        <li><strong>Starvsfólkini finna virðið</strong> — í gerandisarbeiðnum.</li>
      </ul>
    </section>

    <section>
      <h2>Sjey stig til trygga og skipaða nýtslu</h2>
      <ol>
        <li>Set leiðsluna í ábyrgd.</li>
        <li>Finn út úr, hvat longu fer fram.</li>
        <li>Gerið einföld trygdarmørk (grønt/gult/reytt).</li>
        <li>Áset eitt positivt mál.</li>
        <li>Gevið fólki góðkend, trygg amboð.</li>
        <li>Venjið tey viljugu fyrst.</li>
        <li>Gerið eina læringarskipan.</li>
      </ol>
    </section>

    <section>
      <h2>Grønt / Gult / Reytt</h2>
      <ul>
        <li><strong>Grønt:</strong> óviðkvæmar uppgávur og almennur tekstur.</li>
        <li><strong>Gult:</strong> innanhýsis tilfar við varsemi.</li>
        <li><strong>Reytt:</strong> persónsdátur og trúnaðarmál, sum ongantíð mega sleppa út.</li>
      </ul>
    </section>

    <section>
      <h2>Hví leiðarar eiga at læra at brúka vitlíki</h2>
      <p>Tú kanst ikki seta ferðslureglur fyri ein veg, tú ongantíð hevur koyrt á. Leiðarar tørva ikki at vera KT-samskiparar, men tey mugu hava grundleggjandi vitlíkisfatan til at seta røttu mørkini.</p>
    </section>

    <section>
      <h2>Hvussu Vitlíkisstovan kann hjálpa tykkum</h2>
      <ul>
        <li>Leiðslusparring</li>
        <li>Greiðar reglur og trygdarmyndlar</li>
        <li>Praktiskar arbeiðsstovur</li>
        <li>Deilingargrunnar fyri innanhýsis læring</li>
      </ul>
      <p>Teldupostur: <a href="mailto:info@vitlikisstovan.fo">info@vitlikisstovan.fo</a> · Telefon: <a href="tel:+298919444">+298 919444</a></p>
    </section>
  `,
  jsonLd: [
    {
      "@type": "Article",
      headline: "Vitlíki á arbeiðsplássinum: Haldið røttu kósina",
      description:
        "Byrjanarpakki til almennar stovnar um trygga og skipaða nýtslu av vitlíki — sjey stig og grønt/gult/reytt myndilin.",
      inLanguage: "fo",
      author: { "@id": ORG_REF },
      publisher: { "@id": ORG_REF },
      url: `${SITE_URL}/landsnet`,
      mainEntityOfPage: `${SITE_URL}/landsnet`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Heim", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Vitlíki á arbeiðsplássinum",
          item: `${SITE_URL}/landsnet`,
        },
      ],
    },
  ],
};

export default page;
