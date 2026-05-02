import type { PageSeo } from "./_types";
import { blogPosts } from "../blog";

const SITE_NAME = "Vitlíkisstovan";
const SITE_URL = "https://vitlikisstovan.fo";
const ORG_REF = `${SITE_URL}/#organization`;

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

const pages: PageSeo[] = [];

// Blog index gets richer content with the post list
pages.push({
  path: "/blog",
  title: "Bloggur — greinar um vitlíki í Føroyum | Vitlíkisstovan",
  description:
    "Les greinar um vitlíki (AI) í Føroyum — føroysk dømi, ráð og gransking. Tíðindi og útdráttir frá Vitlíkisstovuni um, hvussu vitlíki broytir arbeiðið her heima.",
  content:
    `<h1>Bloggur</h1>` +
    `<p>Greinar úr Vitlíkisstovuni um vitlíki í føroyskum samanhangi — føroysk dømi, ráð og gransking.</p>` +
    `<ul>` +
    blogPosts
      .map(
        (p) =>
          `<li><a href="/blog/${p.slug}"><strong>${p.title}</strong></a><p>${p.excerpt}</p></li>`,
      )
      .join("") +
    `</ul>`,
  jsonLd: [
    {
      "@type": "Blog",
      name: "Vitlíkisstovan Bloggur",
      url: `${SITE_URL}/blog`,
      inLanguage: "fo",
      publisher: { "@id": ORG_REF },
      blogPost: blogPosts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
        author: { "@type": "Person", name: p.author ?? SITE_NAME },
      })),
    },
    breadcrumbs([
      ["Heim", "/"],
      ["Bloggur", "/blog"],
    ]),
  ],
});

// One entry per blog post
for (const post of blogPosts) {
  pages.push({
    path: `/blog/${post.slug}`,
    title: `${post.title} - ${SITE_NAME}`,
    description: post.description ?? post.excerpt,
    content: `<h1>${post.title}</h1>${post.content}`,
    jsonLd: [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description ?? post.excerpt,
        author: {
          "@type": "Person",
          name: post.author ?? SITE_NAME,
        },
        publisher: { "@id": ORG_REF },
        datePublished: post.date,
        inLanguage: "fo",
        url: `${SITE_URL}/blog/${post.slug}`,
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      },
      breadcrumbs([
        ["Heim", "/"],
        ["Bloggur", "/blog"],
        [post.title, `/blog/${post.slug}`],
      ]),
    ],
    sitemap: { priority: "0.7", changefreq: "monthly", lastmod: post.date },
  });
}

export default pages;
