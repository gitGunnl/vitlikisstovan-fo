import fraVitlikisottanTilVitlikisdirvi from "./fra-vitlikisottan-til-vitlikisdirvi";
import vitlikiIForoyum from "./vitliki-i-foroyum";

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  date: string;
  readTime: string;
  author?: string;
  ogImage?: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  vitlikiIForoyum as BlogPost,
  fraVitlikisottanTilVitlikisdirvi as BlogPost,
];

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
