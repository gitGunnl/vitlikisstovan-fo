import type { PageSeo } from "./_types";
import { workshopStrings as t } from "../ai-workshop-strings";

function esc(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildContent(): string {
  let html = "";

  // Hero
  html += `<header>`;
  html += `<p>${esc(t.hero.eyebrow)}</p>`;
  html += `<h1>${esc(t.hero.heading)}</h1>`;
  html += `<p>${esc(t.hero.subheading)}</p>`;
  html += `<ul>`;
  for (const b of t.hero.bullets) html += `<li>${esc(b)}</li>`;
  html += `</ul>`;
  html += `</header>`;

  // Relevance
  html += `<section><h2>${esc(t.relevance.heading)}</h2>`;
  html += `<p>${esc(t.relevance.body)}</p><ul>`;
  for (const p of t.relevance.points) html += `<li>${esc(p)}</li>`;
  html += `</ul></section>`;

  // Outcomes
  html += `<section><h2>${esc(t.outcomes.heading)}</h2><ul>`;
  for (const o of t.outcomes.items) {
    html += `<li><strong>${esc(o.title)}</strong> — ${esc(o.text)}</li>`;
  }
  html += `</ul></section>`;

  // Social proof
  html += `<section><h2>${esc(t.socialProof.heading)}</h2>`;
  const f = t.socialProof.featured;
  html += `<blockquote>${esc(f.quote)}<footer>— ${esc(f.name)}, ${esc(f.role)}, ${esc(f.org)}</footer></blockquote>`;
  for (const q of t.socialProof.smaller) {
    html += `<blockquote>${esc(q.quote)}<footer>— ${esc(q.name)}, ${esc(q.role)}, ${esc(q.org)}</footer></blockquote>`;
  }
  html += `</section>`;

  // Content / agenda
  html += `<section><h2>${esc(t.content.heading)}</h2>`;
  html += `<p>${esc(t.content.subheading)}</p><ul>`;
  for (const block of t.content.blocks) {
    html += `<li><strong>${esc(block.title)}</strong> — ${esc(block.text)}</li>`;
  }
  html += `</ul>`;
  html += `<p><strong>${t.content.facts.map(esc).join(" · ")}</strong></p>`;
  html += `</section>`;

  // FAQ
  html += `<section><h2>${esc(t.faq.heading)}</h2><dl>`;
  for (const item of t.faq.items) {
    html += `<dt>${esc(item.q)}</dt><dd>${esc(item.a)}</dd>`;
  }
  html += `</dl></section>`;

  // Final CTA
  html += `<section><h2>${esc(t.finalCta.heading)}</h2>`;
  html += `<p>${esc(t.finalCta.body)}</p>`;
  html += `<p>${esc(t.finalCta.directContact)}: <a href="mailto:info@vitlikisstovan.fo">info@vitlikisstovan.fo</a> · <a href="tel:+298919444">+298 919444</a></p>`;
  html += `</section>`;

  return html;
}

const page: PageSeo = {
  path: "/ai-workshop",
  title: t.meta.pageTitle,
  description: t.meta.description,
  content: buildContent(),
  jsonLd: [
    {
      "@type": "Course",
      name: t.meta.pageTitle,
      description: t.meta.description,
      provider: {
        "@type": "Organization",
        name: "Vitlíkisstovan",
        sameAs: "https://vitlikisstovan.fo",
      },
      inLanguage: "fo",
      educationalLevel: "Beginner to Intermediate",
      teaches: t.outcomes.items.map((o) => o.title),
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        courseWorkload: "PT3H",
        location: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: "FO",
          },
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default page;
