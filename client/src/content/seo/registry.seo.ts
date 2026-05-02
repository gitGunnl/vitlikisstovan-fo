import type { PageSeo } from "./_types";

const SITE_NAME = "Vitlíkisstovan";
const SITE_URL = "https://vitlikisstovan.fo";
const ORG_REF = `${SITE_URL}/#organization`;

/**
 * Helper: build a BreadcrumbList JSON-LD object for a route.
 *
 * Pass `crumbs` as [label, path] tuples in display order. The path is the
 * site-relative URL; the absolute URL is derived from SITE_URL.
 */
function breadcrumbs(crumbs: Array<[string, string]>): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

/**
 * Helper: build a Service JSON-LD object backed by the Vitlíkisstovan
 * organisation, in Faroese, served in the Faroe Islands.
 */
function service(opts: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
}): object {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: `${SITE_URL}${opts.url}`,
    provider: { "@id": ORG_REF },
    areaServed: { "@type": "Country", name: "Faroe Islands" },
    availableLanguage: "fo",
  };
}

/**
 * Tiny helper to wrap a long Faroese paragraph as a content block. Keeps
 * registry entries readable without `+`-stitching string concat.
 */
function block(html: string): string {
  return html.trim();
}

const pages: PageSeo[] = [
  // ---------------------------------------------------------------------
  // Um okkum
  // ---------------------------------------------------------------------
  {
    path: "/um-okkum",
    title: "Um okkum - Vitlíkisstovan",
    description:
      "Vitlíkisstovan er fyrsta vitlíkisfyritøkan í Føroyum. Vit hjálpa skrivstovum og stovnum at taka vitlíki í nýtslu á einum trygt og munagóðum hátti — við skeiðum, ráðgeving og menning av amboðum.",
    content: block(`
      <h1>Um Vitlíkisstovuna</h1>
      <p>Vitlíkisstovan var stovnað sum fyrsta vitlíkisfyritøkan í Føroyum. Endamálið er einfalt: at gera vitlíki tøkt og brúkligt fyri føroyskar fyritøkur, stovnar og almennan sektor — uttan at tað krevur tekniska forkunnu.</p>
      <h2>Hvat vit gera</h2>
      <ul>
        <li><strong>Vitlíkisupplæring</strong> til heil toymi og einstaklingar.</li>
        <li><strong>Ráðgeving</strong> um vitlíkistrategi, leiðreglur og verkætlanir.</li>
        <li><strong>Skapandi vitlíki</strong> — myndir, video, ljóð og tilfar gjørt við vitlíki.</li>
        <li><strong>Sniðgjørdar loysnir</strong> — sjálvvirking og integratión av vitlíkisamboðum.</li>
      </ul>
      <h2>Hví Vitlíkisstovan</h2>
      <p>Vit kenna teir føroysku karmarnar — málið, smáu fyritøkurnar, tann offentliga sektorin og tær avbjóðingar, sum koma við at innføra nýggja tøkni. Vit tosa føroyskt, arbeiða lokalt og stuðla bæði nýbyrjarum og tey, sum longu eru komin væl ígongd.</p>
      <h2>Set teg í samband</h2>
      <p>Teldupostur: <a href="mailto:info@vitlikisstovan.fo">info@vitlikisstovan.fo</a> · Telefon: <a href="tel:+298919444">+298 919444</a></p>
    `),
    jsonLd: {
      "@type": "AboutPage",
      name: "Um Vitlíkisstovuna",
      url: `${SITE_URL}/um-okkum`,
      inLanguage: "fo",
      mainEntity: { "@id": ORG_REF },
    },
  },

  // ---------------------------------------------------------------------
  // Okkara tænastur (hub)
  // ---------------------------------------------------------------------
  {
    path: "/okkara-taenastur",
    title: "Tænastur — vitlíkisskeið, ráðgeving og loysnir | Vitlíkisstovan",
    description:
      "Skeið, fyrilestrar, ráðgeving og sniðgjørdar vitlíkisloysnir til føroyskar fyritøkur og stovnar. Frá byrjunarskeiðum í ChatGPT til toyma-upplæring og sjálvvirking.",
    content: block(`
      <h1>Tænastur</h1>
      <p>Eg hjálpi føroyskum fyritøkum og stovnum at taka vitlíkistøkni til sín — við praktiskum amboðum, sniðgjørdari upplæring og ráðgeving, ið passar til tykkara dagliga arbeiði.</p>
      <h2>Skeið og verkstovur</h2>
      <ul>
        <li><a href="/okkara-taenastur/byrjunarskeidi">Byrjunarskeið í ChatGPT</a> — handalig kunning til nýbyrjarar og yrkisfólk.</li>
        <li><a href="/okkara-taenastur/15-haettir">15 hættir at brúka KjattGPT</a> — sniðgjørdar mátar at brúka KjattGPT í tínum arbeiði.</li>
        <li><a href="/okkara-taenastur/vitlikisupplaering">Vitlíkisupplæring</a> — innarbeiðing av ChatGPT ella Copilot í arbeiðsgongdina.</li>
        <li><a href="/ai-workshop">Verkstova til skrivstovur</a> — heildarupplæring av einum toymi á tykkara skrivstovu.</li>
      </ul>
      <h2>Ráðgeving og loysnir</h2>
      <ul>
        <li><a href="/okkara-taenastur/fyrilestur">Fyrilestur: Frá óvissu til møguleikar</a> — greið innleiðing fyri leiðslu og toymi.</li>
        <li><a href="/okkara-taenastur/serloysnir">Serloysnir til sjálvirkan</a> — sjálvvirking, integratión og ráðgeving.</li>
        <li><a href="/okkara-taenastur/skapandi-vitliki">Skapandi vitlíki</a> — video, myndir, grafikkur og kreativt arbeiði.</li>
      </ul>
      <p>Ert tú ivasamur um, hvar tit eiga at byrja? <a href="/contact">Bíleg eina ókeypis samrøðu</a>, so finna vit røttu fyrstu stigini saman.</p>
    `),
    jsonLd: {
      "@type": "ItemList",
      name: "Tænastur — Vitlíkisstovan",
      itemListElement: [
        ["Byrjunarskeið í ChatGPT", "/okkara-taenastur/byrjunarskeidi"],
        ["15 hættir at brúka KjattGPT", "/okkara-taenastur/15-haettir"],
        ["Vitlíkisupplæring", "/okkara-taenastur/vitlikisupplaering"],
        ["Fyrilestur um vitlíki", "/okkara-taenastur/fyrilestur"],
        ["Serloysnir til sjálvirkan", "/okkara-taenastur/serloysnir"],
        ["Skapandi vitlíki", "/okkara-taenastur/skapandi-vitliki"],
      ].map(([name, url], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        url: `${SITE_URL}${url}`,
      })),
    },
  },

  // ---------------------------------------------------------------------
  // Service subpages
  // ---------------------------------------------------------------------
  {
    path: "/okkara-taenastur/byrjunarskeidi",
    title: "Byrjunarskeið í ChatGPT — fyri føroysk skrivstovufólk | Vitlíkisstovan",
    description:
      "Lær at brúka ChatGPT effektivt í gerandisarbeiði. Hóskar bæði til nýbyrjarar og yrkisfólk — uttan tekniska forkunnu. Hetta er besta fyrsta stigið fyri tey, ið vilja koma rætt í gongd við vitlíki.",
    content: block(`
      <h1>Byrjunarskeið í ChatGPT</h1>
      <p>Lær at brúka ChatGPT effektivt í tínum arbeiði. Skeiðið gevur tær handaliga vitan, sum tú straks kanst brúka — uttan at tú tørvar nakra forkunnu.</p>
      <h2>Hvat tú lærir</h2>
      <ul>
        <li>Hvat ChatGPT er, og hvat tað kann (og hvat tað ikki kann).</li>
        <li>Hvussu tú skrivar góð prompt og fær brúkliga svar fyrstu ferð.</li>
        <li>Hvussu vitlíki kann sparað tær tíð í e-postum, frágreiðingum, samanumtøkum og leiting.</li>
        <li>Trygd, privatlív og hvat tú ikki eigur at lata vitlíki síggja.</li>
      </ul>
      <p><strong>Hóskar til:</strong> skrivstovufólk, leiðarar og øll, sum vilja koma rætt í gongd við vitlíki.</p>
      <p><a href="/contact">Set teg í samband</a> fyri at bíleggja skeið ella spyrja okkum nærri spurningar.</p>
    `),
    jsonLd: [
      {
        "@type": "Course",
        name: "Byrjunarskeið í ChatGPT",
        description:
          "Handalig innleiðing til ChatGPT fyri føroysk skrivstovufólk og yrkisfólk. Eingin forkunna er kravd.",
        provider: { "@id": ORG_REF },
        inLanguage: "fo",
        educationalLevel: "Beginner",
        url: `${SITE_URL}/okkara-taenastur/byrjunarskeidi`,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Onsite",
          location: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressCountry: "FO" },
          },
        },
      },
      breadcrumbs([
        ["Heim", "/"],
        ["Tænastur", "/okkara-taenastur"],
        ["Byrjunarskeið í ChatGPT", "/okkara-taenastur/byrjunarskeidi"],
      ]),
    ],
  },
  {
    path: "/okkara-taenastur/15-haettir",
    title: "15 hættir at brúka KjattGPT í arbeiðinum | Vitlíkisstovan",
    description:
      "Fá 15 sniðgjørdar mátar at brúka KjattGPT í tínum arbeiði — frá svørum á e-postum til samanumtøkur av longum tekstum. Spar vikur av leitan og royndum.",
    content: block(`
      <h1>15 hættir at brúka KjattGPT</h1>
      <p>Eitt sniðgjørt yvirlit av 15 raunveruligum mátum at brúka KjattGPT í gerandisarbeiði. Útvalt fyri føroysk skrivstovufólk, ið longu hava roynt KjattGPT og vilja fáa meir burtur úr tí.</p>
      <h2>Dømi um, hvat tú fært</h2>
      <ul>
        <li>Skjótar samanumtøkur av longum tekstum og fundarreferatum.</li>
        <li>Útkast til e-post og brøv á føroyskum, donskum og enskum.</li>
        <li>Hjálp at orða torskild evni einfalt og greitt.</li>
        <li>Hugskot, oppløsing og prompt-mynstur, ið virka aftur og aftur.</li>
      </ul>
      <p>Skeiðið er hugsað sum eitt skjótt næsta stig fyri tey, sum longu hava verið á byrjunarskeiði ella longu nýta KjattGPT í gerandisdegnum.</p>
    `),
    jsonLd: [
      service({
        name: "15 hættir at brúka KjattGPT",
        description:
          "Sniðgjørt skeið við 15 praktiskum mátum at brúka KjattGPT í gerandisarbeiði.",
        serviceType: "AI training course",
        url: "/okkara-taenastur/15-haettir",
      }),
      breadcrumbs([
        ["Heim", "/"],
        ["Tænastur", "/okkara-taenastur"],
        ["15 hættir at brúka KjattGPT", "/okkara-taenastur/15-haettir"],
      ]),
    ],
  },
  {
    path: "/okkara-taenastur/fyrilestur",
    title: "Fyrilestur: Vitlíki — Frá óvissu til møguleikar | Vitlíkisstovan",
    description:
      "Ein fyrilestur, sum gevur títt toymi og leiðslu greiða fatan av vitlíki — uttan torskilt tekniskt mál. Fær fólkini at síggja møguleikarnar í staðin fyri at vera ræðd.",
    content: block(`
      <h1>Fyrilestur: Vitlíki — Frá óvissu til møguleikar</h1>
      <p>Ein klárur og inspirerandi fyrilestur, sum gevur tykkara toymi og leiðslu greiða fatan av, hvat vitlíki er, hvat tað kann og hvat tað ikki kann — uttan torskilt tekniskt mál.</p>
      <h2>Hvat vit fara ígjøgnum</h2>
      <ul>
        <li>Hvat vitlíki er í dag, og hvar tað fer.</li>
        <li>Hvar vitlíki longu hjálpir føroyskum fyritøkum.</li>
        <li>Møguleikar og avmarkingar — og hvussu tit byrja.</li>
        <li>Spurningar og svar, sniðgjørd til tykkara samanheng.</li>
      </ul>
      <p>Hóskar væl sum fyrsta stig hjá leiðsluni ella til personalafundir.</p>
    `),
    jsonLd: [
      service({
        name: "Fyrilestur: Vitlíki — Frá óvissu til møguleikar",
        description:
          "Innleiðandi fyrilestur um vitlíki fyri føroyskar fyritøkur og stovnar.",
        serviceType: "Educational lecture",
        url: "/okkara-taenastur/fyrilestur",
      }),
      breadcrumbs([
        ["Heim", "/"],
        ["Tænastur", "/okkara-taenastur"],
        ["Fyrilestur um vitlíki", "/okkara-taenastur/fyrilestur"],
      ]),
    ],
  },
  {
    path: "/okkara-taenastur/vitlikisupplaering",
    title: "Vitlíkisupplæring — innarbeiðing av ChatGPT og Copilot | Vitlíkisstovan",
    description:
      "Handalig hjálp til at innarbeiða ChatGPT ella Copilot í tykkara arbeiðsgongd. Vit fyrireika, læra og fylgja eftir, til vitlíki er natúrligur partur av gerandinum.",
    content: block(`
      <h1>Vitlíkisupplæring</h1>
      <p>Heildarupplæring fyri tey toymi, sum vilja gera vitlíki til ein natúrligan part av arbeiðsgongdini — antin tit nýta ChatGPT, Copilot ella eitt annað amboð.</p>
      <h2>Hvussu tað gongur fyri seg</h2>
      <ol>
        <li><strong>Samrøða (1 tími)</strong> — vit tosa um arbeiðið og finna møguleikarnar.</li>
        <li><strong>Uppseting</strong> — vit gera leiðreglur, velja amboð og fyrireika verkstovur.</li>
        <li><strong>Læra og brúka</strong> — verkstovur á tykkara skrivstovu og eftirfylging eftir 2–3 vikur.</li>
      </ol>
      <p>Tú fær eisini eitt skriviligt yvirlit av tí, tit kunnu loysa við vitlíki — og hvussu.</p>
    `),
    jsonLd: [
      service({
        name: "Vitlíkisupplæring",
        description:
          "Heildarupplæring og innarbeiðing av ChatGPT ella Copilot í toymið hjá føroyskum skrivstovum.",
        serviceType: "AI workplace training",
        url: "/okkara-taenastur/vitlikisupplaering",
      }),
      breadcrumbs([
        ["Heim", "/"],
        ["Tænastur", "/okkara-taenastur"],
        ["Vitlíkisupplæring", "/okkara-taenastur/vitlikisupplaering"],
      ]),
    ],
  },
  {
    path: "/okkara-taenastur/serloysnir",
    title: "Serloysnir til sjálvirkan — vitlíki sniðgivið til tín | Vitlíkisstovan",
    description:
      "Sniðgjørdar vitlíkisloysnir, ið hóska til tín tørv. Sjálvvirking av endurtoknum uppgávum, integratión við tykkara skipanir og ráðgeving alla vegin.",
    content: block(`
      <h1>Serloysnir til sjálvirkan</h1>
      <p>Hava tit endurtoknar uppgávur, sum stjala tíð? Skulu data úr fleiri skipanum samlast? Vit byggja sniðgjørdar vitlíkisloysnir, ið hóska til akkurát tykkara arbeiði.</p>
      <h2>Dømi um loysnir</h2>
      <ul>
        <li>Sjálvvirking av e-postsvarum og innkomandi spurningum.</li>
        <li>Samanumtøka og bólking av longum skjølum.</li>
        <li>Integratión av vitlíki við Microsoft 365, Google Workspace og aðrar skipanir.</li>
        <li>Spælingarvinir <em>chatbots</em> og innanhýsis vitlíkis-amboð.</li>
      </ul>
      <p>Vit byrja altíð við einari samrøðu, har vit greina, hvar mest tíð er at spara — og hvussu loysnin best skal síggja út.</p>
    `),
    jsonLd: [
      service({
        name: "Serloysnir til sjálvirkan við vitlíki",
        description:
          "Sniðgjørdar vitlíkisloysnir, sjálvvirking og integratión til føroyskar fyritøkur.",
        serviceType: "Custom AI development",
        url: "/okkara-taenastur/serloysnir",
      }),
      breadcrumbs([
        ["Heim", "/"],
        ["Tænastur", "/okkara-taenastur"],
        ["Serloysnir til sjálvirkan", "/okkara-taenastur/serloysnir"],
      ]),
    ],
  },
  {
    path: "/okkara-taenastur/skapandi-vitliki",
    title: "Skapandi vitlíki — myndir, video og tilfar | Vitlíkisstovan",
    description:
      "Eg skapi tilfar við vitlíki og haldi kreativar verkstovur. Video, myndir, grafikkur, ljóð og hugskot til marknaðarføring, kunning og innanhýsis brúk.",
    content: block(`
      <h1>Skapandi vitlíki</h1>
      <p>Vitlíki kann gera bæði myndir, video, ljóð og tekst — skjótt og á góðum standardi. Eg hjálpi tykkum at finna røttu amboðini og brúka tey praktiskt í tykkara arbeiði.</p>
      <h2>Hvat tit kunnu fáa</h2>
      <ul>
        <li>Sniðgjørdar myndir til marknaðarføring, vevsíður og sosialar miðlar.</li>
        <li>Stutt video og animatiónir.</li>
        <li>Ljóð, music og talu — eisini á føroyskum.</li>
        <li>Verkstovur, har tykkara fólk læra at gera tað sjálv.</li>
      </ul>
      <p>Tit ráða, um vit gera tilfarið fyri tykkum ella læra tykkara fólk at gera tað sjálv.</p>
    `),
    jsonLd: [
      service({
        name: "Skapandi vitlíki — myndir, video og tilfar",
        description:
          "Tænastur og verkstovur í skapandi vitlíki: myndir, video, ljóð og tekst.",
        serviceType: "Creative AI services",
        url: "/okkara-taenastur/skapandi-vitliki",
      }),
      breadcrumbs([
        ["Heim", "/"],
        ["Tænastur", "/okkara-taenastur"],
        ["Skapandi vitlíki", "/okkara-taenastur/skapandi-vitliki"],
      ]),
    ],
  },

  // ---------------------------------------------------------------------
  // Contact
  // ---------------------------------------------------------------------
  {
    path: "/contact",
    title: "Samband — bíleg eina ókeypis samrøðu | Vitlíkisstovan",
    description:
      "Set teg í samband við Vitlíkisstovuna. Antin tú ert áhugaður í skeiðum, ráðgeving, einari kreativari verkætlan ella einum øðrum — so svari eg tær áðrenn næsti gerandisdagur er lokin.",
    content: block(`
      <h1>Samband</h1>
      <p>Set teg í samband við Vitlíkisstovuna fyri at tosa um vitlíki í tínari fyritøku. Sig mær hvat tú hugsar, so sigi eg tær, hvussu vitlíki kann hjálpa.</p>
      <ul>
        <li>Teldupostur: <a href="mailto:info@vitlikisstovan.fo">info@vitlikisstovan.fo</a></li>
        <li>Telefon: <a href="tel:+298919444">+298 919444</a></li>
      </ul>
      <p>Vit svara altíð áðrenn næsti gerandisdagur er lokin.</p>
    `),
    jsonLd: {
      "@type": "ContactPage",
      name: "Samband — Vitlíkisstovan",
      url: `${SITE_URL}/contact`,
      inLanguage: "fo",
      mainEntity: { "@id": ORG_REF },
    },
  },

  // ---------------------------------------------------------------------
  // Tilarbeiðis (project page)
  // ---------------------------------------------------------------------
  {
    path: "/tilarbeidis",
    title: "Vitlíki til arbeiðis — vegleiðingar og tilfar | Vitlíkisstovan",
    description:
      "Verkætlanin \"Vitlíki til arbeiðis\" — vegleiðingar, frágreiðingar og tilfar, ið hjálpa bólkum og fyritøkum at koma gott ígongd við vitlíki á arbeiðsplássinum.",
    content: block(`
      <h1>Vitlíki til arbeiðis</h1>
      <p>Verkætlanin <em>Vitlíki til arbeiðis</em> samlar vegleiðingar, frágreiðingar og praktiskt tilfar, ið hjálpa føroyskum bólkum og fyritøkum at koma gott ígongd við vitlíki á arbeiðsplássinum.</p>
      <p>Tilfarið er gjørt soleiðis, at tað kann brúkast bæði til sjálvlestur og sum grundarlag fyri verkstovur og innanhýsis upplæring.</p>
    `),
  },

  // ---------------------------------------------------------------------
  // Verkstova (private — kept noindex)
  // ---------------------------------------------------------------------
  {
    path: "/verkstova",
    title: "Verkstova - Vitlíkisstovan",
    description:
      "Handalig vitlíkisverkstova. Lær at brúka ChatGPT og onnur vitlíki-amboð í veruligum arbeiðsuppgávum.",
    noindex: true,
  },

  // ---------------------------------------------------------------------
  // Podcast
  // ---------------------------------------------------------------------
  {
    path: "/podcast",
    title: "Podkast — søgur og evni úr Føroyum við vitlíki | Vitlíkisstovan",
    description:
      "Hoyr podkastir frá Vitlíkisstovuni — søgur, evni og samrøður um Føroyar og vitlíki, framleiddar saman við vitlíkisamboðum.",
    content: block(`
      <h1>Podkast</h1>
      <p>Vitlíkisstovan ger podkastir, sum kanna søguligar persónar, hendingar og evni úr Føroyum — framleiddar saman við vitlíkisamboðum til ljóð, talu og tilfar.</p>
      <p>Nýggjar útgávur koma reglulukt. Lurta gjøgnum tann innbygda spælaran ella á tínari vanligu podkast-tænastu.</p>
    `),
    jsonLd: {
      "@type": "PodcastSeries",
      name: "Vitlíkisstovan Podkast",
      url: `${SITE_URL}/podcast`,
      inLanguage: ["fo", "en"],
      author: { "@id": ORG_REF },
      publisher: { "@id": ORG_REF },
    },
  },

  // ---------------------------------------------------------------------
  // AI guide / user guides
  // ---------------------------------------------------------------------
  {
    path: "/ai-guide",
    title: "AI for Pedagogues — practical AI guide | Vitlíkisstovan",
    description:
      "A practical guide for teachers and pedagogues on using AI safely to cut daily admin work, plan activities and communicate with parents — so you spend more time with the children.",
    content: block(`
      <h1>AI for Pedagogues</h1>
      <p>A practical guide for teachers and pedagogues on safely using AI to reduce daily administrative work — planning activities, drafting parent communication and summarising notes — so you can spend more time with the children.</p>
      <p>Includes safe-use tips, prompt examples and concrete classroom scenarios.</p>
    `),
  },
  {
    path: "/user-guides",
    title: "Brúkaravegleiðingar í vitlíki | Vitlíkisstovan",
    description:
      "Frí vegleiðingar í vitlíki á føroyskum — fyri dagstovnar, umsorgarfólk, skrivstovur og øll, sum vilja koma rætt í gongd við vitlíki í gerandisdegnum.",
    content: block(`
      <h1>Brúkaravegleiðingar</h1>
      <p>Vit hava savnað eina røð av fríum vegleiðingum, ið hjálpa teg at koma gott ígongd við vitlíki í tínum arbeiði.</p>
      <ul>
        <li><a href="/user-guides/getting-started">At koma ígongd við vitlíki</a></li>
        <li><a href="/user-guides/best-practices">Bestu mannagongdir við vitlíki</a></li>
        <li><a href="/user-guides/ai-for-kindergarten-guide">Vitlíki til dagstovnar</a></li>
        <li><a href="/user-guides/ai-for-caretakers-guide">Vitlíki til umsorgarfólk</a></li>
      </ul>
    `),
  },
  {
    path: "/user-guides/getting-started",
    title: "At koma ígongd við vitlíki — fyrstu stigini | Vitlíkisstovan",
    description:
      "Stig-fyri-stig vegleiðing til at koma ígongd við vitlíki: hvat tú skalt velja, hvussu tú skrivar fyrstu prompt og hvussu tú trygt kanst royna nýggj amboð.",
    content: block(`
      <h1>At koma ígongd við vitlíki</h1>
      <p>Ein einfald vegleiðing fyri tey, sum eru ný innan vitlíki. Vit fara ígjøgnum hvat amboð tú kanst velja, hvussu tú skrivar fyrstu prompt og hvussu tú trygt kanst royna nýggj amboð uttan at vága upplýsingar tínar.</p>
    `),
    jsonLd: {
      "@type": "HowTo",
      name: "At koma ígongd við vitlíki",
      inLanguage: "fo",
      author: { "@id": ORG_REF },
    },
  },
  {
    path: "/user-guides/best-practices",
    title: "Bestu mannagongdir við vitlíki | Vitlíkisstovan",
    description:
      "Bestu mannagongdir fyri at brúka vitlíki á einum trygt og munagóðum hátti — góðar prompt, trygd, persónsupplýsingar og hvussu tú metir um svar frá vitlíki.",
    content: block(`
      <h1>Bestu mannagongdir við vitlíki</h1>
      <p>Eitt yvirlit av reglum og mannagongdum, ið hjálpa teg at brúka vitlíki effektivt og trygt: hvussu tú metir um svar, hvat tú ikki eigur at lata vitlíki síggja, og hvussu tú heldur kvalitetinum høgum.</p>
    `),
  },
  {
    path: "/user-guides/ai-for-kindergarten-guide",
    title: "Vitlíki til dagstovnar — minni skriviarbeiði, meira spæl | Vitlíkisstovan",
    description:
      "Lættir og tryggir hættir at minka um dagligu umsitingina við vitlíki, so tú kanst nýta meira tíð saman við børnunum á dagstovninum.",
    content: block(`
      <h1>Vitlíki til dagstovnar</h1>
      <p>Eitt skjótt yvirlit av lættum og tryggum hættum at brúka vitlíki á dagstovninum: roknskaparyvirlit, fundarreferat, kunning til foreldur og fyrireiking av virksemi — alt sniðgivið til dagliga arbeiðið.</p>
    `),
  },
  {
    path: "/user-guides/ai-for-caretakers-guide",
    title: "Vitlíki til umsorgarfólk | Vitlíkisstovan",
    description:
      "Vegleiðing til umsorgarfólk um, hvussu vitlíki trygt kann hjálpa við skriviarbeiði, samskifti og fyrireiking — uttan at koma uppí vandi við persónsupplýsingar.",
    content: block(`
      <h1>Vitlíki til umsorgarfólk</h1>
      <p>Praktisk vegleiðing til umsorgarfólk um, hvussu vitlíki kann hjálpa í gerandisdegnum — samanumtøkur, kunning til avvarðandi, fyrireiking — og hvar mørkini ganga, tá tað kemur til persónsupplýsingar og trygd.</p>
    `),
  },

  // ---------------------------------------------------------------------
  // Other
  // ---------------------------------------------------------------------
  {
    path: "/annad-fra-vitlikisstovuni",
    title: "Annað frá Vitlíkisstovuni — tilfar og tíðindi | Vitlíkisstovan",
    description:
      "Ymiskt tilfar og tíðindi frá Vitlíkisstovuni — frágreiðingar, vegleiðingar, fyrilestrar og útvalt tilfar, ið ikki sløgur inn undir okkara fastu tænastur.",
    content: block(`
      <h1>Annað frá Vitlíkisstovuni</h1>
      <p>Hetta er savnstaður fyri tilfar, frágreiðingar og tíðindi frá Vitlíkisstovuni, ið ikki passa undir okkara fastu tænastusíður.</p>
    `),
  },
  {
    path: "/vitliki-i-verki",
    title: "Vitlíki í verki — útvalt arbeiði og dømi | Vitlíkisstovan",
    description:
      "Útvalt vitlíkis-genererað arbeiði frá Vitlíkisstovuni — myndir, filmar, ljóð, eksperiment og verkætlanir, ið vísa hvat vitlíki kann í dag.",
    content: block(`
      <h1>Vitlíki í verki</h1>
      <p>Útvalt vitlíkis-genererað arbeiði frá Vitlíkisstovuni: myndir, filmar, ljóð, eksperiment og verkætlanir. Hvør tabban vísir hvussu vitlíki verður brúkt í einum ávísum samanhangi — frá marknaðarføring til kreativ eksperiment.</p>
    `),
    jsonLd: {
      "@type": "CollectionPage",
      name: "Vitlíki í verki",
      inLanguage: "fo",
      url: `${SITE_URL}/vitliki-i-verki`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
  },
  {
    path: "/course-details",
    title: "Skeiðsupplýsingar — vitlíkisskeið hjá Vitlíkisstovuni",
    description:
      "Nærri upplýsingar um vitlíkisskeið hjá Vitlíkisstovuni — innihald, tíðarætlan og hvussu tú fært stuðul til at útbúgva tín starvsfólk.",
    content: block(`
      <h1>Skeiðsupplýsingar</h1>
      <p>Nærri upplýsingar um okkara vitlíkisskeið — hvat innihaldið er, hvussu skeiðini eru lagd til rættis og hvussu tú fært stuðul til at útbúgva tín starvsfólk.</p>
    `),
  },

  // ---------------------------------------------------------------------
  // Internal / experimental routes (kept out of sitemap)
  // ---------------------------------------------------------------------
  {
    path: "/gemini3-fo-test",
    title: "Gemini 3 FO test",
    description: "Internal test page.",
    noindex: true,
  },
  {
    path: "/frontpage-v2",
    title: "Frontpage v2",
    description: "Internal frontpage variant.",
    noindex: true,
  },
  {
    path: "/frontpage-v3",
    title: "Frontpage v3",
    description: "Internal frontpage variant.",
    noindex: true,
  },
  {
    path: "/frontpage-v4",
    title: "Frontpage v4",
    description: "Internal frontpage variant.",
    noindex: true,
  },
];

export default pages;
