import type { PageSeo } from "./_types";
import { blogPosts } from "../blog";

const SITE_NAME = "Vitlíkisstovan";

const pages: PageSeo[] = [];

// Blog index gets richer content with the post list
pages.push({
  path: "/blog",
  title: "Bloggur - Vitlíkisstovan",
  description:
    "Les greinir um vitlíki (AI) í Føroyum. Vitlíkistíðindi, ráð og gransking.",
  content:
    `<h1>Bloggur</h1>` +
    `<ul>` +
    blogPosts
      .map(
        (p) =>
          `<li><a href="/blog/${p.slug}"><strong>${p.title}</strong></a><p>${p.excerpt}</p></li>`,
      )
      .join("") +
    `</ul>`,
});

// One entry per blog post
for (const post of blogPosts) {
  pages.push({
    path: `/blog/${post.slug}`,
    title: `${post.title} - ${SITE_NAME}`,
    description: post.description ?? post.excerpt,
    content: `<h1>${post.title}</h1>${post.content}`,
    jsonLd: {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description ?? post.excerpt,
      author: {
        "@type": "Person",
        name: post.author ?? SITE_NAME,
      },
      publisher: { "@id": "https://vitlikisstovan.fo/#organization" },
      datePublished: post.date,
      inLanguage: "fo",
    },
    sitemap: { priority: "0.7", changefreq: "monthly", lastmod: post.date },
  });
}

export default pages;
