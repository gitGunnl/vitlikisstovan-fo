export const CLIENT_FORM_SOURCES = [
  "contact-section",
  "inline-contact",
  "workshop-landing",
] as const;

export type ClientFormSource = (typeof CLIENT_FORM_SOURCES)[number];

export function isClientFormSource(value: unknown): value is ClientFormSource {
  return (
    typeof value === "string" &&
    (CLIENT_FORM_SOURCES as readonly string[]).includes(value)
  );
}

export interface MonitoredForm {
  id: string;
  label: string;
  formActionUrl: string;
  formViewUrl: string;
  expectedEntryIds: string[];
  healthcheckPayload: Record<string, string>;
  clientSources: ClientFormSource[];
}

// NOTE: The contact form, the inline contact form, and the AI workshop
// landing form all post to the SAME underlying Google Form (same
// formActionUrl + same entry IDs in the client code), so they are
// monitored as a single MonitoredForm with three associated
// clientSources. If a future form starts posting to a different Google
// Form, add a second MonitoredForm entry here.
export const MONITORED_FORMS: MonitoredForm[] = [
  {
    id: "vts-contact-google-form",
    label: "Contact & AI Workshop Google Form",
    formActionUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSf8FFci-J91suIjxY2xh4GD-DQ-UfZftUNxq3dUdXkgJAjB1Q/formResponse",
    formViewUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSf8FFci-J91suIjxY2xh4GD-DQ-UfZftUNxq3dUdXkgJAjB1Q/viewform",
    expectedEntryIds: ["1179687836", "263197538", "240567695"],
    healthcheckPayload: {
      "entry.1179687836": "__healthcheck__",
      "entry.263197538": "[email protected]",
      "entry.240567695":
        "[__healthcheck__] Automated monitoring ping from vitlikisstovan.fo. Safe to ignore or delete.",
    },
    clientSources: ["contact-section", "inline-contact", "workshop-landing"],
  },
];

export function getMonitoredForm(id: string): MonitoredForm | undefined {
  return MONITORED_FORMS.find((f) => f.id === id);
}

export function getFormForClientSource(
  source: ClientFormSource
): MonitoredForm | undefined {
  return MONITORED_FORMS.find((f) => f.clientSources.includes(source));
}

export const CHECK_INTERVAL_MS = (() => {
  const minutes = parseInt(process.env.FORM_MONITOR_INTERVAL_MIN || "30", 10);
  return Math.max(5, isNaN(minutes) ? 30 : minutes) * 60 * 1000;
})();

export const FAILURE_THRESHOLD = 2;
export const MAX_HISTORY_PER_FORM = 50;
export const MAX_CLIENT_FAILURES = 100;

// Client beacon → alert pipeline thresholds:
// If we receive >= CLIENT_FAILURE_ALERT_THRESHOLD beacons for the same form
// within CLIENT_FAILURE_WINDOW_MS, raise an alert immediately (don't wait
// for the next scheduled health check).
export const CLIENT_FAILURE_ALERT_THRESHOLD = 3;
export const CLIENT_FAILURE_WINDOW_MS = 30 * 60 * 1000;
