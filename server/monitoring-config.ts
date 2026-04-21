export interface MonitoredForm {
  id: string;
  label: string;
  formActionUrl: string;
  formViewUrl: string;
  expectedEntryIds: string[];
  healthcheckPayload: Record<string, string>;
}

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
  },
];

export const CLIENT_FORM_SOURCES = [
  "contact-section",
  "inline-contact",
  "workshop-landing",
] as const;

export type ClientFormSource = (typeof CLIENT_FORM_SOURCES)[number];

export function getMonitoredForm(id: string): MonitoredForm | undefined {
  return MONITORED_FORMS.find((f) => f.id === id);
}

export const CHECK_INTERVAL_MS = (() => {
  const minutes = parseInt(process.env.FORM_MONITOR_INTERVAL_MIN || "60", 10);
  return Math.max(5, isNaN(minutes) ? 60 : minutes) * 60 * 1000;
})();

export const FAILURE_THRESHOLD = 2;
export const MAX_HISTORY_PER_FORM = 50;
export const MAX_CLIENT_FAILURES = 100;
