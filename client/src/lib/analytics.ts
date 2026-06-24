declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

let initialized = false;
let scriptRequested = false;

function injectScript() {
  if (scriptRequested || !GA_MEASUREMENT_ID) return;
  scriptRequested = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Initialize Google Analytics 4.
 *
 * The gtag queue (window.gtag + dataLayer) is set up synchronously so page_view
 * events are never lost, but the network request for the gtag library is
 * deferred until after first paint / first interaction so it doesn't block
 * initial render — mirroring how the Meta Pixel is loaded. Automatic page views
 * are disabled (send_page_view: false) so SPA navigations are counted manually
 * via trackPageView, avoiding a double-count of the first load.
 *
 * No-ops when VITE_GA_MEASUREMENT_ID is not configured.
 */
export function initAnalytics() {
  if (initialized || typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const schedule = () => window.setTimeout(injectScript, 1500);
  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }
  ["scroll", "mousemove", "touchstart", "keydown"].forEach((ev) => {
    window.addEventListener(ev, injectScript, { once: true, passive: true });
  });
}

/**
 * Record a page view for the given in-app path. Safe to call before the gtag
 * library has finished loading — calls are queued in dataLayer. No-ops when
 * analytics is not configured.
 */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || !window.gtag)
    return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/**
 * Record a custom GA4 event. Safe to call before the gtag library has finished
 * loading — calls are queued in dataLayer. No-ops when analytics is not
 * configured.
 */
export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || !window.gtag)
    return;
  window.gtag("event", name, params);
}

/**
 * Record a click on a key call-to-action button. `label` is the human-readable
 * button text (or a stable identifier) and `location` says where on the site it
 * was clicked (e.g. "header", "footer", "hero"). No-ops when analytics is not
 * configured.
 */
export function trackCtaClick(label: string, location: string) {
  trackEvent("cta_click", { cta_label: label, cta_location: location });
}

/**
 * Record a click on a social media link. `platform` is e.g. "facebook" /
 * "linkedin" and `location` says where the link lives (e.g. "footer",
 * "contact_section"). No-ops when analytics is not configured.
 */
export function trackSocialClick(platform: string, location: string) {
  trackEvent("social_click", { platform, social_location: location });
}

/**
 * Record how far a reader scrolled through a guide article. `percent` is the
 * milestone reached (e.g. 25 / 50 / 75 / 100) and should be fired at most once
 * per page visit by the caller. `guideId` / `guideTitle` identify which guide
 * the engagement belongs to. No-ops when analytics is not configured.
 */
export function trackGuideScrollDepth(
  guideId: string | undefined,
  guideTitle: string | undefined,
  percent: number,
) {
  trackEvent("guide_scroll_depth", {
    guide_id: guideId,
    guide_title: guideTitle,
    percent,
  });
}
