export type FormFailureSource =
  | "contact-section"
  | "inline-contact"
  | "workshop-landing"
  | "landsnet-ritlingur";

async function fetchMonitoringToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/monitoring/client-token");
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data?.token === "string") return data.token;
  } catch {
    // ignore
  }
  return null;
}

export function reportFormFailure(
  source: FormFailureSource,
  err: unknown
): void {
  fetchMonitoringToken()
    .then((monitoringToken) => {
      try {
        const error = err as { name?: string; message?: string } | undefined;
        const payload = JSON.stringify({
          source,
          errorName: error?.name,
          errorMessage: error?.message,
          monitoringToken,
        });
        const url = "/api/monitoring/client-failure";
        if (typeof navigator !== "undefined" && navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          const accepted = navigator.sendBeacon(url, blob);
          if (accepted) return;
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
    })
    .catch(() => {});
}
