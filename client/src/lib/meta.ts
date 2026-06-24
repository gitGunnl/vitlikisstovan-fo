
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    /**
     * Lazily-initialized Meta Pixel loader exposed by the inline snippet in
     * `client/index.html`. Calling it is idempotent — it only loads/initializes
     * the pixel once and fires the PageView for the current page.
     */
    __loadMetaPixel?: () => void;
  }
}

export interface ViewContentParams {
  content_name: string;
  content_ids: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}

/**
 * Fire a Meta (Facebook) Pixel `PageView` for an in-app navigation.
 *
 * Queue-safe in every load state:
 * - If the pixel is already loaded (`fbq` exists), it tracks a `PageView`. The
 *   `fbq` stub itself queues the call if the network script is still in flight.
 * - If the deferred loader hasn't run yet (`fbq` undefined), it triggers the
 *   loader (`__loadMetaPixel`), which loads/initializes the pixel and fires the
 *   PageView for the current page. The loader is idempotent, so we don't fire a
 *   second PageView here — that would double-count this navigation.
 *
 * Used for SPA route changes; the very first page view is owned by index.html.
 */
export function trackMetaPageView() {
  if (typeof window === 'undefined') return;
  if (window.fbq) {
    window.fbq('track', 'PageView');
  } else if (window.__loadMetaPixel) {
    window.__loadMetaPixel();
  }
}

export function trackViewContent(params: ViewContentParams) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: params.content_name,
      content_ids: params.content_ids,
      content_type: params.content_type || 'service',
      ...(params.value !== undefined && { value: params.value }),
      ...(params.currency && { currency: params.currency }),
    });
  }
}

export interface MetaConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  siteName?: string;
}

export function updateMetaTags(config: MetaConfig) {
  const { title, description, image, url, type = 'website', publishedTime, author, siteName } = config;
  
  // Update page title
  document.title = title;
  
  // Helper function to set or create meta tag
  const setMetaTag = (property: string, content: string, isProperty = true) => {
    const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      if (isProperty) {
        meta.setAttribute('property', property);
      } else {
        meta.setAttribute('name', property);
      }
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  };

  // Basic meta tags
  setMetaTag('description', description, false);
  
  // Open Graph tags
  setMetaTag('og:title', title);
  setMetaTag('og:description', description);
  setMetaTag('og:type', type);
  
  if (siteName) {
    setMetaTag('og:site_name', siteName);
  }
  
  if (url) {
    setMetaTag('og:url', url);
    
    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = url;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = url;
      document.head.appendChild(canonical);
    }
  }
  
  if (image) {
    const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
    setMetaTag('og:image', fullImageUrl);
    setMetaTag('og:image:width', '1200');
    setMetaTag('og:image:height', '630');
    setMetaTag('og:image:type', 'image/jpeg');
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:title', title, false);
    setMetaTag('twitter:description', description, false);
    setMetaTag('twitter:image', fullImageUrl, false);
  }
  
  // Article-specific tags
  if (type === 'article') {
    if (publishedTime) {
      setMetaTag('article:published_time', publishedTime);
    }
    if (author) {
      setMetaTag('article:author', author);
    }
  }
}
