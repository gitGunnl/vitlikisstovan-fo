export type FormFailureSource =
  | "contact-section"
  | "inline-contact"
  | "workshop-landing";

export function reportFormFailure(
  source: FormFailureSource,
  err: unknown
): void {
  try {
    const error = err as { name?: string; message?: string } | undefined;
    const payload = JSON.stringify({
      source,
      errorName: error?.name,
      errorMessage: error?.message,
    });
    const url = "/api/monitoring/client-failure";
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never let reporting throw
  }
}
