import type { PageSeo } from "./_types";

const pages: PageSeo[] = [
  {
    path: "/um-okkum",
    title: "Um okkum - Vitlíkisstovan",
    description:
      "Lær meira um Vitlíkisstovuna og okkara uppgávu at vegleiða føroyskar fyritøkur í vitlíki.",
  },
  {
    path: "/okkara-taenastur",
    title: "Tænastur - Vitlíkisstovan",
    description:
      "Skeið, fyrilestrar, ráðgeving og serloysnir í vitlíki – alt bygt til føroyskar fyritøkur og stovnar.",
  },
  {
    path: "/okkara-taenastur/byrjunarskeidi",
    title: "Byrjunarskeið í ChatGPT - Vitlíkisstovan",
    description:
      "Lær at brúka ChatGPT effektivt í gerandisarbeiði. Hóskar til bæði nýbyrjarar og yrkisfólk.",
  },
  {
    path: "/okkara-taenastur/15-haettir",
    title: "15 hættir at brúka KjattGPT - Vitlíkisstovan",
    description:
      "Fá 15 tillagaðar mátar at brúka KjattGPT í tínum arbeiði. Spar vikur av leitan og feilum.",
  },
  {
    path: "/okkara-taenastur/fyrilestur",
    title: "Fyrilestur: Vitlíki - Frá Óvissu til Møguleikar - Vitlíkisstovan",
    description:
      "Ein fyrilestur, sum gevur títt toymi greiða fatan av vitlíki – uttan torskilt tekniskt mál.",
  },
  {
    path: "/okkara-taenastur/vitlikisupplaering",
    title: "Vitlíkisupplæring - Vitlíkisstovan",
    description:
      "Handalig hjálp til at innarbeiða KjattGPT ella Copilot í tykkara arbeiðsgongd.",
  },
  {
    path: "/okkara-taenastur/serloysnir",
    title: "Serloysnir til sjálvirkan - Vitlíkisstovan",
    description:
      "Sniðgjørdar vitlíkisloysnir, ið hóska til tín tørv. Sjálvvirking, integratión og ráðgeving.",
  },
  {
    path: "/okkara-taenastur/skapandi-vitliki",
    title: "Skapandi vitlíki - Vitlíkisstovan",
    description:
      "Eg skapi tilfar við vitlíki og haldi kreativar verkstovur. Video, myndir, grafikkur og meira.",
  },
  {
    path: "/contact",
    title: "Samband - Vitlíkisstovan",
    description:
      "Set teg í samband við Vitlíkisstovuna. Teldupostur: info@vitlikisstovan.fo. Telefon: +298 919444.",
    content:
      `<h1>Samband - Vitlíkisstovan</h1>` +
      `<p>Set teg í samband við Vitlíkisstovuna fyri at tosa um vitlíki í tínari fyritøku.</p>` +
      `<ul>` +
      `<li>Teldupostur: <a href="mailto:info@vitlikisstovan.fo">info@vitlikisstovan.fo</a></li>` +
      `<li>Telefon: <a href="tel:+298919444">+298 919444</a></li>` +
      `</ul>`,
  },
  {
    path: "/tilarbeidis",
    title: "Vitlíki til arbeiðis - Vitlíkisstovan",
    description:
      'Verkætlanin "Vitlíki til arbeiðis" - vegleiðingar og tilfar til at hjálpa bólkum at koma gott ígongd við vitlíki.',
  },
  // /blog is owned by blog-posts.seo.ts (so it can include the post list).
  {
    path: "/verkstova",
    title: "Verkstova - Vitlíkisstovan",
    description:
      "Handalig vitlíkisverkstova. Lær at brúka ChatGPT og onnur vitlíki-amboð í veruligum arbeiðsuppgávum.",
    noindex: true,
  },
  {
    path: "/podcast",
    title: "Podkast - Vitlíkisstovan",
    description: "Hoyr podkast um vitlíki í Føroyum.",
  },
  {
    path: "/ai-guide",
    title: "Vitlíki vegleiðing - Vitlíkisstovan",
    description: "Vegleiðing í vitlíki.",
  },
  {
    path: "/user-guides",
    title: "Brúkaravegleiðingar - Vitlíkisstovan",
    description: "Vegleiðingar og tilfar.",
  },
  {
    path: "/user-guides/getting-started",
    title: "At koma ígongd við vitlíki - Vitlíkisstovan",
    description: "Vegleiðing til at koma ígongd.",
  },
  {
    path: "/user-guides/best-practices",
    title: "Bestu mannagongdir við vitlíki - Vitlíkisstovan",
    description: "Bestu mannagongdir fyri at brúka vitlíki.",
  },
  {
    path: "/user-guides/ai-for-kindergarten-guide",
    title: "Vitlíki fyri barnagrunnar - Vitlíkisstovan",
    description: "Vegleiðing til barnagrunnsfólk.",
  },
  {
    path: "/user-guides/ai-for-caretakers-guide",
    title: "Vitlíki fyri umsorgarfólk - Vitlíkisstovan",
    description: "Vegleiðing til umsorgarfólk.",
  },
  {
    path: "/annad-fra-vitlikisstovuni",
    title: "Annað frá Vitlíkisstovuni",
    description: "Ymiskt tilfar og tíðindi.",
  },
  {
    path: "/course-details",
    title: "Skeiðsupplýsingar - Vitlíkisstovan",
    description: "Nærri upplýsingar um vitlíkisskeið.",
  },
  // --- Internal / experimental routes (kept out of sitemap) ---
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
  {
    path: "/val",
    title: "Val",
    description: "Internal page.",
    noindex: true,
  },
  {
    path: "/val/svara",
    title: "Val - Svara",
    description: "Internal page.",
    noindex: true,
  },
  {
    path: "/val/admin",
    title: "Val - Admin",
    description: "Internal page.",
    noindex: true,
  },
];

export default pages;
