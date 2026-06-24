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
