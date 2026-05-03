export interface PageSeo {
  path: string;
  title: string;
  description: string;
  content?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
  ogType?: string;
  ogImage?: string;
  sitemap?: {
    priority?: string;
    changefreq?: string;
    lastmod?: string;
  };
}

export type PageSeoModule = PageSeo | PageSeo[];
