import type { PageSeo } from "./_types";
import { siteConfig as c } from "../site";

function buildContent(): string {
  const heroSlide = c.hero.slides[0];
  let html = `<h1>${c.siteName} - ${c.tagline}</h1>`;
  html += `<p>${heroSlide.title} ${heroSlide.subtitle}</p>`;

  html += `<section><h2>${c.program.title}</h2><p>${c.program.subtitle}</p>`;

  html += `<h3>${c.program.whatWeDeliver.title}</h3><ul>`;
  for (const item of c.program.whatWeDeliver.items) {
    html += `<li><strong>${item.title}</strong> - ${item.description}</li>`;
  }
  html += `</ul>`;

  html += `<h3>${c.program.howItWorks.title}</h3><ol>`;
  for (const step of c.program.howItWorks.steps) {
    html += `<li><strong>${step.title}</strong> - ${step.description}</li>`;
  }
  html += `</ol>`;

  html += `<h3>${c.program.delivery.title}</h3><ul>`;
  for (const item of c.program.delivery.items) {
    html += `<li><strong>${item.title}</strong> - ${item.description}</li>`;
  }
  html += `</ul></section>`;

  html += `<section><h2>${c.consulting.title}</h2><p>${c.consulting.subtitle}</p><ul>`;
  for (const svc of c.consulting.services) {
    html += `<li><strong>${svc.title}</strong> - ${svc.description}</li>`;
  }
  html += `</ul></section>`;

  html += `<section><h2>${c.why.title}</h2><p>${c.why.subtitle}</p><ul>`;
  for (const feat of c.why.features) {
    html += `<li><strong>${feat.title}</strong> - ${feat.description}</li>`;
  }
  html += `</ul>`;
  html += `<h3>${c.why.founder.heading}</h3>`;
  html += `<p><strong>${c.why.founder.name}</strong> - ${c.why.founder.role}. ${c.why.founder.summary}</p>`;
  html += `</section>`;

  html += `<section><h2>${c.cases.title}</h2><ul>`;
  for (const h of c.cases.highlights) {
    html += `<li><strong>${h.title}</strong> - ${h.description}</li>`;
  }
  html += `</ul></section>`;

  html += `<section><h2>${c.contact.title}</h2><p>${c.contact.subtitle}</p>`;
  html += `<p>Teldupostur: <a href="mailto:${c.contact.email}">${c.contact.email}</a></p>`;
  html += `<p>Telefon: <a href="tel:${c.contact.phone.replace(/\s/g, "")}">${c.contact.phone}</a></p>`;
  html += `</section>`;

  return html;
}

const page: PageSeo = {
  path: "/",
  title: "Vitlíkisstovan - Vitlíki til alt slag arbeiði í Føroyum",
  description:
    "Vitlíki upplæring til øll á skrivstovuni og uttanfyri. Vitlíki ráðgeving og menning av vitlíki amboðum. Fyrsta vitlíkisfyritøkan í Føroyum.",
  content: buildContent(),
};

export default page;
