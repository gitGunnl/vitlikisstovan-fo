import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface HealthCheckResult {
  formId: string;
  checkedAt: string;
  ok: boolean;
  postOk: boolean;
  postStatus: number | null;
  schemaOk: boolean;
  missingEntryIds: string[];
  durationMs: number;
  error?: string;
  trigger: string;
}

interface FormState {
  consecutiveFailures: number;
  alertActive: boolean;
  lastAlertAt?: string;
  lastRecoveryAt?: string;
  lastOkAt?: string;
  lastFailAt?: string;
  history: HealthCheckResult[];
}

interface FormStatus {
  id: string;
  label: string;
  formViewUrl: string;
  expectedEntryIds: string[];
  state: FormState;
}

interface ClientFailure {
  source: string;
  reportedAt: string;
  errorName?: string;
  errorMessage?: string;
  userAgent?: string;
}

interface MailerStatus {
  configured: boolean;
  missing: string[];
  to?: string;
  from?: string;
}

interface StatusResponse {
  forms: FormStatus[];
  clientFailures: ClientFailure[];
  mailer: MailerStatus;
}

const STORAGE_KEY = "vts-admin-key";

function fmtDate(s?: string) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleString();
  } catch {
    return s;
  }
}

export default function AdminHealth() {
  const { toast } = useToast();
  const [adminKey, setAdminKey] = useState<string>("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      setAdminKey(stored);
      setAuthed(true);
    }
  }, []);

  async function refresh(key = adminKey) {
    if (!key) return;
    setLoading(true);
    try {
      const res = await fetch("/api/monitoring/status", {
        headers: { "x-admin-key": key },
      });
      if (res.status === 401) {
        toast({ title: "Wrong admin key", variant: "destructive" });
        setAuthed(false);
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as StatusResponse;
      setData(json);
      setAuthed(true);
      localStorage.setItem(STORAGE_KEY, key);
    } catch (err: any) {
      toast({ title: "Load failed", description: err?.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  async function runChecks(formId?: string) {
    setRunning(true);
    try {
      const res = await fetch("/api/monitoring/run", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify(formId ? { formId } : {}),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast({ title: "Check complete" });
      await refresh();
    } catch (err: any) {
      toast({ title: "Check failed", description: err?.message, variant: "destructive" });
    } finally {
      setRunning(false);
    }
  }

  async function sendTest() {
    try {
      const res = await fetch("/api/monitoring/test-email", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
      });
      const json = await res.json();
      if (json.sent) {
        toast({ title: "Test email sent", description: `To: ${json.to}` });
      } else {
        toast({
          title: "Email not configured",
          description: `Missing: ${(json.missing || []).join(", ") || "—"}`,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({ title: "Test failed", description: err?.message, variant: "destructive" });
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-xl font-semibold">Admin · Form Health</h1>
            <p className="text-sm text-slate-600">Enter the admin key to view form monitoring.</p>
            <Input
              type="password"
              placeholder="Admin key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") refresh(adminKey);
              }}
            />
            <Button onClick={() => refresh(adminKey)} disabled={!adminKey || loading} className="w-full">
              {loading ? "Checking…" : "Sign in"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <h1 className="text-2xl font-bold">Form Health</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refresh()} disabled={loading}>
              {loading ? "Refreshing…" : "Refresh"}
            </Button>
            <Button onClick={() => runChecks()} disabled={running}>
              {running ? "Running…" : "Run check now"}
            </Button>
            <Button variant="outline" onClick={sendTest}>
              Send test email
            </Button>
          </div>
        </div>

        {data && (
          <Card>
            <CardContent className="p-4 text-sm">
              <div className="font-medium mb-1">Email alerts</div>
              {data.mailer.configured ? (
                <div className="text-green-700">
                  Configured. Alerts will be sent to <strong>{data.mailer.to}</strong> from{" "}
                  <strong>{data.mailer.from}</strong>.
                </div>
              ) : (
                <div className="text-amber-700">
                  Email not configured. Set: <code>{data.mailer.missing.join(", ")}</code>.
                  Health checks still run; you just won't get email alerts.
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {data?.forms.map((f) => {
          const latest = f.state.history[0];
          const statusColor = !latest
            ? "bg-slate-100 text-slate-700"
            : latest.ok
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";
          return (
            <Card key={f.id}>
              <CardContent className="p-5 space-y-4">
                <div className="flex flex-wrap justify-between gap-3 items-start">
                  <div>
                    <h2 className="text-lg font-semibold">{f.label}</h2>
                    <a
                      href={f.formViewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-teal-700 hover:underline break-all"
                    >
                      {f.formViewUrl}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium ${statusColor}`}>
                      {!latest ? "no checks yet" : latest.ok ? "OK" : "FAILING"}
                    </span>
                    {f.state.alertActive && (
                      <span className="px-2.5 py-1 rounded text-xs font-medium bg-red-600 text-white">
                        ALERT ACTIVE
                      </span>
                    )}
                    <Button size="sm" variant="outline" onClick={() => runChecks(f.id)} disabled={running}>
                      Check
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500">Last OK</div>
                    <div className="font-medium">{fmtDate(f.state.lastOkAt)}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Last failure</div>
                    <div className="font-medium">{fmtDate(f.state.lastFailAt)}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Consecutive failures</div>
                    <div className="font-medium">{f.state.consecutiveFailures}</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Last alert sent</div>
                    <div className="font-medium">{fmtDate(f.state.lastAlertAt)}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Recent checks</div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="text-left text-slate-500">
                        <tr>
                          <th className="py-1.5 pr-3">When</th>
                          <th className="py-1.5 pr-3">Trigger</th>
                          <th className="py-1.5 pr-3">POST</th>
                          <th className="py-1.5 pr-3">Schema</th>
                          <th className="py-1.5 pr-3">Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {f.state.history.slice(0, 20).map((h, i) => (
                          <tr key={i} className="border-t border-slate-100">
                            <td className="py-1.5 pr-3">{fmtDate(h.checkedAt)}</td>
                            <td className="py-1.5 pr-3">{h.trigger}</td>
                            <td className={`py-1.5 pr-3 ${h.postOk ? "text-green-700" : "text-red-700"}`}>
                              {h.postOk ? `OK (${h.postStatus ?? "?"})` : `FAIL (${h.postStatus ?? "no response"})`}
                            </td>
                            <td className={`py-1.5 pr-3 ${h.schemaOk ? "text-green-700" : "text-red-700"}`}>
                              {h.schemaOk ? "OK" : `missing: ${h.missingEntryIds.join(", ") || "—"}`}
                            </td>
                            <td className="py-1.5 pr-3 text-slate-600">{h.error || "—"}</td>
                          </tr>
                        ))}
                        {f.state.history.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-3 text-slate-500">
                              No checks recorded yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {data && (
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold mb-3">Recent client-side failures</h2>
              <p className="text-xs text-slate-500 mb-3">
                Submissions where the visitor's browser threw an error contacting Google Forms (the only
                failure mode the browser can detect with no-cors mode). Most recent first.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="text-left text-slate-500">
                    <tr>
                      <th className="py-1.5 pr-3">When</th>
                      <th className="py-1.5 pr-3">Source</th>
                      <th className="py-1.5 pr-3">Error</th>
                      <th className="py-1.5 pr-3">User agent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.clientFailures.slice(0, 30).map((c, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="py-1.5 pr-3">{fmtDate(c.reportedAt)}</td>
                        <td className="py-1.5 pr-3">{c.source}</td>
                        <td className="py-1.5 pr-3">
                          {c.errorName ? `${c.errorName}: ` : ""}
                          {c.errorMessage || "—"}
                        </td>
                        <td className="py-1.5 pr-3 text-slate-500 truncate max-w-[200px]">
                          {c.userAgent || "—"}
                        </td>
                      </tr>
                    ))}
                    {data.clientFailures.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-3 text-slate-500">
                          No client-side failures recorded. (This is a good thing.)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
