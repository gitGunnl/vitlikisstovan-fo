import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ritlingurRequestSchema, type RitlingurRequest } from "@shared/schema";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Compass,
  Lightbulb,
  Mail,
  Phone,
  Presentation,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Palette                                                                   */
/* -------------------------------------------------------------------------- */

const c = {
  bg: "#FFFFFF",
  bgMuted: "#F7F5F0",
  bgHero: "#F4EFE5",
  ink: "#0A1F3D",
  inkBody: "#384B68",
  inkMuted: "#5A6B82",
  accent: "#1F525B",
  accentHover: "#163E45",
  accentSoft: "#E5EEEF",
  border: "#E4E1D8",
  borderStrong: "#CFCCC2",
};

const serif = '"Instrument Serif", Georgia, serif';

/* -------------------------------------------------------------------------- */
/*  Analytics                                                                 */
/* -------------------------------------------------------------------------- */

type AnalyticsEvent =
  | "popup_opened"
  | "popup_closed"
  | "pdf_plus_workshop_clicked"
  | "pdf_only_clicked"
  | "form_submitted_consent_true"
  | "form_submitted_consent_false"
  | "workshop_cta_clicked";

function trackEvent(
  name: AnalyticsEvent,
  props?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  const w = window as any;
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: name, ...(props || {}) });
    if (typeof w.plausible === "function") {
      w.plausible(name, props ? { props } : undefined);
    }
    w.dispatchEvent(new CustomEvent("analytics", { detail: { name, props } }));
  } catch {
    /* analytics must never break the UI */
  }
}

/* -------------------------------------------------------------------------- */
/*  Small primitives                                                          */
/* -------------------------------------------------------------------------- */

function Section({
  id,
  children,
  bg,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-20 sm:py-28 ${className}`}
      style={{ background: bg ?? c.bg }}
    >
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-[0.22em]"
      style={{ color: c.accent }}
    >
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-4 text-3xl sm:text-[2.5rem] leading-[1.15] tracking-tight"
      style={{ color: c.ink, fontFamily: serif, fontWeight: 400 }}
    >
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-5 text-lg leading-relaxed"
      style={{ color: c.inkBody }}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form (used inside Dialog and shown standalone after submit)               */
/* -------------------------------------------------------------------------- */

function RitlingurForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();

  const [nudge, setNudge] = useState(false);

  const form = useForm<RitlingurRequest>({
    resolver: zodResolver(ritlingurRequestSchema),
    defaultValues: {
      email: "",
      consent: false,
      website: "",
    },
  });

  const consentValue = form.watch("consent");
  useEffect(() => {
    if (consentValue && nudge) setNudge(false);
  }, [consentValue, nudge]);

  const mutation = useMutation({
    mutationFn: async (data: RitlingurRequest) => {
      const res = await fetch("/api/ritlingur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed (${res.status})`);
      }
      return res.json();
    },
    onSuccess: () => {
      form.reset();
      onSuccess();
    },
    onError: (err: Error) => {
      toast({
        title: "Okkurt fór skeivt",
        description:
          err.message === "Too many requests"
            ? "Ov nógvar umbønir á stuttari tíð. Royn aftur eftir eitt sindur."
            : "Vit kundu ikki taka ímóti umbønini júst nú. Royn aftur ella send teldupost til info@vitlikisstovan.fo.",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (!data.consent && !nudge) {
            setNudge(true);
            return;
          }
          trackEvent(
            data.consent
              ? "form_submitted_consent_true"
              : "form_submitted_consent_false",
          );
          mutation.mutate(data);
        })}
        className="space-y-5"
        noValidate
      >
        {/* Honeypot */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <label>
            Vevsíða
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("website")}
            />
          </label>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="text-sm font-medium"
                style={{ color: c.ink }}
              >
                Teldupostur
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="navn@stovnur.fo"
                  className="h-12 text-base"
                  style={{ borderColor: c.borderStrong }}
                  data-testid="input-email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <div
                className="flex items-start gap-3 pt-1 rounded-md transition-colors"
                style={
                  nudge && !field.value
                    ? {
                        background: "#FBF4E6",
                        padding: "12px",
                        border: `1px solid #E5C97B`,
                      }
                    : undefined
                }
              >
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                    data-testid="checkbox-consent"
                  />
                </FormControl>
                <FormLabel
                  className="text-sm font-normal leading-relaxed cursor-pointer"
                  style={{ color: c.inkBody }}
                >
                  Eg vátti at eg vil hava hendan ritlingin og hoyra meira um hvussu Vitlíkisstovan kann hjálpa mínum stovni.
                </FormLabel>
              </div>
              {nudge && !field.value && (
                <p
                  className="mt-2 text-sm"
                  style={{ color: "#8A5A00" }}
                  data-testid="consent-nudge"
                >
                  Vátta um tú vil hava ritlingin og vita meira um hvussu
                  Vitlíkisstovan kann hjálpa tykkum.
                </p>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="h-12 w-full rounded-md text-base font-medium"
          style={{ background: c.ink, color: "#fff" }}
          data-testid="button-submit"
        >
          {mutation.isPending ? "Sendi…" : "Send mær ritlingin"}
        </Button>
        <p
          className="text-center text-xs"
          style={{ color: c.inkMuted }}
        >
          Vit deila ongantíð tín teldupost við triðjapart.
        </p>
      </form>
    </Form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ritlingur Dialog                                                          */
/* -------------------------------------------------------------------------- */

function RitlingurDialog({
  trigger,
  source,
  triggerEvent,
}: {
  trigger: React.ReactNode;
  source: "hero" | "footer";
  triggerEvent: "pdf_plus_workshop_clicked" | "pdf_only_clicked";
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) {
          trackEvent(triggerEvent, { source });
          trackEvent("popup_opened", { source });
        } else {
          trackEvent("popup_closed", { source });
        }
        setOpen(o);
        if (!o) setTimeout(() => setSubmitted(false), 200);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="max-w-md sm:max-w-lg p-0 overflow-hidden"
        style={{ background: c.bg, borderColor: c.border }}
      >
        {!submitted ? (
          <div className="p-6 sm:p-8">
            <DialogHeader className="text-left mb-5">
              <DialogTitle
                className="text-2xl sm:text-3xl leading-tight"
                style={{ color: c.ink, fontFamily: serif, fontWeight: 400 }}
              >
                Fá hendan ritlingin sendan til tín
              </DialogTitle>
              <DialogDescription
                className="text-base mt-2"
                style={{ color: c.inkBody }}
              >
                Skriva tín teldupost — so senda vit ritlingin beinanvegin.
              </DialogDescription>
            </DialogHeader>
            <RitlingurForm onSuccess={() => setSubmitted(true)} />
          </div>
        ) : (
          <div
            className="p-8 sm:p-10 text-center"
            data-testid="ritlingur-success"
          >
            <div
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: c.accentSoft, color: c.accent }}
            >
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <DialogTitle
              className="text-2xl sm:text-3xl leading-tight"
              style={{ color: c.ink, fontFamily: serif, fontWeight: 400 }}
            >
              Takk — ritlingurin er á veg
            </DialogTitle>
            <p
              className="mt-3 text-base"
              style={{ color: c.inkBody }}
            >
              Hygg eftir í tínum innbakka. Hann kemur um fáar minuttir.
            </p>
            <a
              href="/leidslu-verkstova"
              onClick={() =>
                trackEvent("workshop_cta_clicked", { location: "success_dialog" })
              }
              className="group relative mt-8 block overflow-hidden rounded-2xl text-left transition-transform hover:-translate-y-0.5"
              style={{
                background: c.ink,
                color: "#fff",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 40px -20px rgba(10,31,61,0.45)",
              }}
              data-testid="cta-leidsluverkstova"
              data-analytics-event="workshop_cta_clicked"
            >
              {/* decorative serif date watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-6 select-none text-[8rem] leading-none"
                style={{
                  fontFamily: serif,
                  color: "rgba(255,255,255,0.06)",
                  fontWeight: 400,
                }}
              >
                19
              </span>

              <div className="relative flex items-center gap-4 p-5 sm:p-6">
                <div
                  className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center rounded-xl"
                  style={{
                    background: c.accent,
                    color: "#fff",
                    fontFamily: serif,
                  }}
                >
                  <span className="text-[2rem] leading-none">19</span>
                  <span
                    className="mt-1 text-[9px] font-semibold uppercase"
                    style={{
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      letterSpacing: "0.2em",
                    }}
                  >
                    August
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: "#9EC2C8" }}
                  >
                    Næsta verkstova
                  </div>
                  <div
                    className="mt-2 text-2xl leading-[1.15]"
                    style={{
                      color: "#fff",
                      fontFamily: serif,
                      fontWeight: 400,
                    }}
                  >
                    Leiðsluverkstova
                  </div>
                  <div
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap"
                    style={{ color: "#fff" }}
                  >
                    Melda teg til
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 block mx-auto text-sm underline"
              style={{ color: c.inkMuted }}
            >
              Lat aftur
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function Landsnet() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: c.bg,
        color: c.ink,
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      {/* =============================================================== */}
      {/*  HERO                                                           */}
      {/* =============================================================== */}
      <header
        style={{
          background: c.bgHero,
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <div className="mx-auto max-w-4xl px-6 pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: c.accent }}
          >
            <Compass className="h-4 w-4" />
            <span>Vitlíkisstovan · Ritlingur: 6 stig til betri vitlíkisnýtslu</span>
          </div>
          <h1
            className="mt-7 leading-[1.05] tracking-tight"
            style={{
              color: c.ink,
              fontFamily: serif,
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)",
            }}
            data-testid="hero-title"
          >
            Vitlíki á arbeiðsplássinum:
            <br />
            <span style={{ fontStyle: "italic", color: c.accent }}>
              Hvat er best hjá stovnum at gera nú?
            </span>
          </h1>
          <p
            className="mt-7 text-lg sm:text-xl leading-relaxed max-w-2xl"
            style={{ color: c.inkBody }}
          >
            Starvsfólk á føroyskum almennum arbeiðsplássum brúka longu vitlíki
            hvønn dag. Spurningurin er ikki, <em>um</em> tað verður brúkt, men
            um nýtslan verður{" "}
            <strong style={{ color: c.ink }}>tilætlað, trygg og skipað</strong>
            {" "}— ella duld og váðamikil.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <RitlingurDialog
              source="hero"
              triggerEvent="pdf_plus_workshop_clicked"
              trigger={
                <Button
                  className="h-12 px-7 rounded-md text-base font-medium"
                  style={{ background: c.ink, color: "#fff" }}
                  data-testid="hero-cta-ritlingur"
                  data-analytics-event="pdf_plus_workshop_clicked"
                >
                  Fá hendan ritlingin sendan til tín<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
            <Button
              asChild
              variant="outline"
              className="min-h-12 h-auto py-3 px-6 rounded-md text-sm sm:text-base font-medium whitespace-normal text-center leading-snug"
              style={{
                borderColor: c.ink,
                color: c.ink,
                background: "transparent",
              }}
              data-testid="hero-cta-verkstova"
              data-analytics-event="workshop_cta_clicked"
            >
              <a
                href="/leidslu-verkstova"
                onClick={() =>
                  trackEvent("workshop_cta_clicked", { location: "hero" })
                }
              >
                Kom á leiðsluverkstovu
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* =============================================================== */}
      {/*  SHADOW AI                                                      */}
      {/* =============================================================== */}
      <Section id="skugga-vitliki">
        <Eyebrow>Hvat tú eigur at vita</Eyebrow>
        <H2>Skugga-vitlíki — tað, sum longu hendir</H2>
        <Lead>
          Skuggavitlíki hendir, tá ið starvsfólk, oftast í góðari trúgv fyri
          at loysa eina uppgávu skjótari, líma tekstir inn í almenn
          vitlíkistól sum ChatGPT ella Gemini á telefonini ella telduni.
        </Lead>
        <Lead>
          Trupuleikin er at dáturnar sum oftast
          enda í ørðum londum og um hettar eru viðkvæmar dátur, so kemur hetta undir lógarbrot.
        </Lead>

        <div
          className="mt-10 flex gap-4 rounded-lg border p-5 sm:p-6"
          style={{
            background: c.bgMuted,
            borderColor: c.border,
          }}
        >
          <AlertTriangle
            className="h-5 w-5 mt-0.5 shrink-0"
            style={{ color: c.accent }}
          />
          <p
            className="text-[15px] sm:text-base leading-relaxed"
            style={{ color: c.inkBody }}
          >
            At bíða steðgar ikki nýtsluni — tað ger hana bara ósjónliga.
          </p>
        </div>
      </Section>

      {/* =============================================================== */}
      {/*  WHY ACT NOW                                                    */}
      {/* =============================================================== */}
      <Section bg={c.bgMuted}>
        <Eyebrow>Hví nú</Eyebrow>
        <H2>Hví eigur tú at gera okkurt nú?</H2>
        <Lead>
          Nýtslan flytur seg nógv skjótari enn stovnsreglur og leiðsla
          megna at fylgja við. Og almennir stovnar arbeiða ofta við tilfari, sum krevur
          serliga umsorgan:
        </Lead>

        <ul className="mt-8 space-y-3">
          {[
            "Persónsdátur um borgarar",
            "Borgaramál og fyrispurningar",
            "Heilsudátur og viðkvæmar upplýsingar",
            "Innanhýsis samskifti og trúnaðarmál",
          ].map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 text-[16px] leading-relaxed"
              style={{ color: c.ink }}
            >
              <span
                className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: c.accent }}
                aria-hidden="true"
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* =============================================================== */}
      {/*  TRIANGLE                                                       */}
      {/* =============================================================== */}
      <Section>
        <Eyebrow>Tríggir leiklutir</Eyebrow>
        <H2>Leiðsla, KT og starvsfólk — saman</H2>
        <Lead>
          Fyri at fáa virði úr vitlíki, mugu tríggir
          leiklutir samstarva rætt.
        </Lead>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Compass,
              role: "Leiðslan",
              body: "Setur kós, tekur ábyrgd og vísur áhuge. Um leiðsla slett ikki skilur vitlíki, so er ringt at vinna tað veruliga virið",
            },
            {
              icon: ShieldCheck,
              role: "KT",
              body: "Tryggjar karmarnar — trygg amboð, dátuvernd og yvurlit yvur vitlíki á tykkara stovni.",
            },
            {
              icon: Users,
              role: "Starvsfólkini",
              body: "Kenna gerandisarbeiðið, hava serfrøðina og finna, hvar tól veruliga lætta um byrðuna.",
            },
          ].map(({ icon: Icon, role, body }) => (
            <div
              key={role}
              className="rounded-lg border p-6"
              style={{ background: c.bg, borderColor: c.border }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md"
                style={{ background: c.accentSoft, color: c.accent }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3
                className="mt-5 text-xl"
                style={{
                  color: c.ink,
                  fontFamily: serif,
                  fontWeight: 400,
                }}
              >
                {role}
              </h3>
              <p
                className="mt-2 text-[15px] leading-relaxed"
                style={{ color: c.inkBody }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* =============================================================== */}
      {/*  SEVEN STEPS                                                    */}
      {/* =============================================================== */}
      <Section bg={c.bgMuted}>
        <Eyebrow>Vegurin framm</Eyebrow>
        <H2>6 stig til trygga og skipaða nýtslu</H2>
        <Lead>
          Leiðslan kann fylgja hesum seks stigum fyri at fáa eina
          skipaða byrjan.
        </Lead>

        <ol className="mt-10 space-y-3">
          {[
            {
              t: "Gerið vitlíki til eina leiðsluábyrgd",
              b: "Leiðslan má taka eigaraskap. Hetta kann ikki bara latast í hendurnar á KT-deildini ella verða tilvildarligar royndir hjá einstøkum starvsfólkum.",
            },
            {
              t: "Kanni hvat longu hendir",
              b: "Fáið eina veruliga mynd av, hvussu fólk longu brúka vitlíki í arbeiðinum.",
            },
            {
              t: "Setið tryggar og gagnligar karmar",
              b: "Sigið ikki bara, hvat fólk ikki mugu gera. Setið eisini eitt mál fyri hvat skal gerast.",
            },
            {
              t: "Gevið fólki góð amboð",
              b: "Ikki bara trygg, men eisini nóg góð amboð til at tey eru hjálpsam fyri starvsfólki.",
            },
            {
              t: "Skapið rúm fyri regluligari læring",
              b: "Fólk hava tørv á at vita, at tey sleppa at royna seg fram við vitlíki, og at tað er í lagi at nýta vitlíki til veruligt arbeiði.",
            },
            {
              t: "Skiljið vitlíki nóg væl til at leiða",
              b: "Leiðarar skulu ikki gerast tøkniligir serfrøðingar. Men teir mugu skilja nóg mikið um vitlíki til at kunna seta teir rættu spurningarnar, síggja møguleikar og mørk, og taka betri avgerðir.",
            },
          ].map((s, i) => (
            <li
              key={i}
              className="flex gap-5 rounded-lg border bg-white p-5 sm:p-6"
              style={{ borderColor: c.border }}
            >
              <span
                className="shrink-0 text-2xl tabular-nums leading-none pt-1"
                style={{
                  color: c.accent,
                  fontFamily: serif,
                  fontWeight: 400,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className="text-lg sm:text-xl"
                  style={{
                    color: c.ink,
                    fontFamily: serif,
                    fontWeight: 400,
                  }}
                >
                  {s.t}
                </h3>
                <p
                  className="mt-1.5 text-[15px] leading-relaxed"
                  style={{ color: c.inkBody }}
                >
                  {s.b}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* =============================================================== */}
      {/*  LEADERSHIP LITERACY                                            */}
      {/* =============================================================== */}
      <Section bg={c.ink}>
        <div
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: "#9EC2C8" }}
        >
          <Lightbulb className="h-4 w-4" />
          Til leiðsluna
        </div>
        <h2
          className="mt-4 text-3xl sm:text-[2.5rem] leading-[1.15] tracking-tight"
          style={{ color: "#fff", fontFamily: serif, fontWeight: 400 }}
        >
          Hví leiðarar eiga skilja vitlíki
        </h2>

        <ul className="mt-7 space-y-3.5">
          {[
            "Vitlíki kann ljóða sannførandi, hóast tað tekur feil. Leiðslan má skilja, hví menniskjalig eftirkanning altíð er krav.",
            "Fólk hava ymiskan hugburðar til vitlíki, tað er umráðandi at duga at rúma hendan ymiskleikan.",
      "test",
          ].map((t, i) => (
            <li
              key={i}
              className="flex gap-3 text-base leading-relaxed"
              style={{ color: "#E3EAF2" }}
            >
              <CheckCircle2
                className="h-5 w-5 mt-0.5 shrink-0"
                style={{ color: "#9EC2C8" }}
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* =============================================================== */}
      {/*  SERVICES                                                       */}
      {/* =============================================================== */}
      <Section bg={c.bgMuted}>
        <Eyebrow>Hjálp til at koma í gongd</Eyebrow>
        <H2>Hvussu Vitlíkisstovan kann hjálpa tykkum</H2>
        <Lead>
          Vit hjálpa føroyskar stovnum við praktiskari og tryggari
          nýtslu av vitlíki — uttan óneyðugar fløkjutar forkláringar.
        </Lead>

        <div className="mt-10 grid gap-5 sm:grid-cols-3 items-stretch">
          {[
            {
              num: "01",
              title: "Verkstovur",
              body: "Handaligar verkstovur til leiðslur og starvsfólk — tryggari nýtsla og meira virið.",
            },
            {
              num: "02",
              title: "Ráðgeving",
              body: "Strategisk sparring um kós, ábyrgdarbýti, dátuvernd og trygdarmørk.",
            },
            {
              num: "03",
              title: "Framløgur",
              body: "Hugkveikjandi framløgur um vitlíki á arbeiðsplássinum.",
            },
          ].map(({ num, title, body }) => (
            <div
              key={title}
              className="relative flex flex-col rounded-2xl border bg-white p-7 pt-8 overflow-hidden"
              style={{ borderColor: c.borderStrong }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-2 -right-2 text-[7rem] leading-none select-none pointer-events-none"
                style={{
                  color: c.accentSoft,
                  fontFamily: serif,
                  fontWeight: 400,
                }}
              >
                {num}
              </span>
              <h3
                className="relative text-3xl leading-tight"
                style={{ color: c.ink, fontFamily: serif, fontWeight: 400 }}
              >
                {title}
              </h3>
              <p
                className="relative mt-3 text-[15px] leading-relaxed"
                style={{ color: c.inkBody }}
              >
                {body}
              </p>
              <div className="relative mt-auto pt-6">
                <a
                  href="#samband"
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: c.accent }}
                >
                  Les meira <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* =============================================================== */}
      {/*  FINAL CTA                                                      */}
      {/* =============================================================== */}
      <Section id="samband" bg={c.bgHero} className="border-t" >
        <div className="text-center">
          <Eyebrow>Næsta stig</Eyebrow>
          <h2
            className="mt-4 text-3xl sm:text-[2.5rem] leading-[1.15] mx-auto max-w-2xl"
            style={{ color: c.ink, fontFamily: serif, fontWeight: 400 }}
          >
            Tilreiðar at taka fyrsta stigið?
          </h2>
          <p
            className="mt-5 text-lg leading-relaxed mx-auto max-w-xl"
            style={{ color: c.inkBody }}
          >
            Lesið ritlingin, ella bókið pláss á leiðsluverkstovuni, har vit hjálpa
            tykkum at finna fram til tykkara egnu kós.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <RitlingurDialog
              source="footer"
              triggerEvent="pdf_only_clicked"
              trigger={
                <Button
                  className="h-12 px-7 rounded-md text-base font-medium"
                  style={{ background: c.ink, color: "#fff" }}
                  data-testid="footer-cta-ritlingur"
                  data-analytics-event="pdf_only_clicked"
                >
                  Fá hendan ritlingin sendan til tín teldupost<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
            <Button
              asChild
              variant="outline"
              className="h-12 px-7 rounded-md text-base font-medium"
              style={{
                borderColor: c.ink,
                color: c.ink,
                background: "transparent",
              }}
              data-testid="footer-cta-verkstova"
              data-analytics-event="workshop_cta_clicked"
            >
              <a
                href="/leidslu-verkstova"
                onClick={() =>
                  trackEvent("workshop_cta_clicked", { location: "footer" })
                }
              >
                Bóka pláss á leiðsluverkstovu
              </a>
            </Button>
          </div>

          <div
            className="mt-10 pt-8 border-t flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm"
            style={{ borderColor: c.border, color: c.inkBody }}
          >
            <a
              href="mailto:info@vitlikisstovan.fo"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <Mail className="h-4 w-4" style={{ color: c.accent }} />
              info@vitlikisstovan.fo
            </a>
            <a
              href="tel:+298919444"
              className="inline-flex items-center gap-2 hover:underline"
            >
              <Phone className="h-4 w-4" style={{ color: c.accent }} />
              +298 919 444
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}