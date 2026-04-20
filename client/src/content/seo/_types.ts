export interface PageSeo {
  path: string;
  title: string;
  description: string;
  content?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
  sitemap?: {
    priority?: string;
    changefreq?: string;
    lastmod?: string;
  };
}

export type PageSeoModule = PageSeo | PageSeo[];
