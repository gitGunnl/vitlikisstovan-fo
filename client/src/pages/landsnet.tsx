import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { ritlingurRequestSchema, type RitlingurRequest } from "@shared/schema";
import {
  AlertTriangle,
  Compass,
  Mail,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
  CheckCircle2,
  ArrowDown,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Palette & primitives                                                       */
/* -------------------------------------------------------------------------- */

const palette = {
  paper: "#F8F3E8",
  paperDeep: "#F1EADB",
  ink: "#0F2540",
  inkSoft: "#2A3F5A",
  teal: "#2C6E7A",
  tealDeep: "#1F525B",
  tealSoft: "#E2EEEF",
  border: "#D9E2EA",
  borderSoft: "#E7EDF2",
  sand: "#F7E9C2",
  sandBorder: "#E2C97A",
  sandInk: "#5A4514",
  moss: "#E1ECD7",
  mossBorder: "#A6C292",
  mossInk: "#2F4A22",
  clay: "#F1D7CC",
  clayBorder: "#C9836F",
  clayInk: "#5C2614",
};

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`px-5 sm:px-8 py-16 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em]"
      style={{ color: palette.teal }}
    >
      <span
        className="inline-block h-px w-8"
        style={{ background: palette.teal }}
      />
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif text-3xl sm:text-4xl leading-[1.15] tracking-tight mt-4"
      style={{ color: palette.ink, fontFamily: '"Instrument Serif", serif' }}
    >
      {children}
    </h2>
  );
}

/* -------------------------------------------------------------------------- */
/*  Decorative inline SVGs                                                     */
/* -------------------------------------------------------------------------- */

function LighthouseScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* sky tint */}
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#EAF0F2" />
          <stop offset="100%" stopColor="#F8F3E8" />
        </linearGradient>
        <linearGradient id="beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#F7E9C2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#F7E9C2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#sky)" />
      {/* distant cliffs */}
      <path
        d="M0 150 L60 130 L110 150 L160 120 L210 145 L260 125 L320 150 L400 130 L400 220 L0 220 Z"
        fill="#C9D3CC"
        opacity="0.55"
      />
      {/* nearer hills */}
      <path
        d="M0 175 L40 155 L100 175 L150 158 L210 178 L270 160 L330 178 L400 165 L400 220 L0 220 Z"
        fill="#A9BAB0"
        opacity="0.7"
      />
      {/* sea suggestion */}
      <path
        d="M0 195 L400 195 L400 220 L0 220 Z"
        fill="#7A99A2"
        opacity="0.45"
      />
      {/* light beam */}
      <path d="M260 90 L400 60 L400 140 L260 110 Z" fill="url(#beam)" />
      {/* lighthouse */}
      <g transform="translate(244 75)">
        <rect x="6" y="30" width="20" height="90" fill="#F8F3E8" stroke="#0F2540" strokeWidth="1.5" />
        <rect x="6" y="55" width="20" height="6" fill="#C9836F" />
        <rect x="6" y="85" width="20" height="6" fill="#C9836F" />
        <rect x="2" y="22" width="28" height="10" fill="#0F2540" />
        <rect x="10" y="6" width="12" height="18" fill="#F7E9C2" stroke="#0F2540" strokeWidth="1.5" />
        <path d="M8 6 L24 6 L20 0 L12 0 Z" fill="#0F2540" />
        <circle cx="16" cy="15" r="2.2" fill="#C9836F" />
      </g>
      {/* small cairn */}
      <g transform="translate(70 168)">
        <ellipse cx="0" cy="10" rx="14" ry="3" fill="#0F2540" opacity="0.12" />
        <ellipse cx="0" cy="6" rx="10" ry="6" fill="#9CA9B1" />
        <ellipse cx="0" cy="-2" rx="7" ry="5" fill="#B8C2C9" />
        <ellipse cx="0" cy="-9" rx="4" ry="3.5" fill="#8C99A1" />
      </g>
    </svg>
  );
}

function PathCairns({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 70" className={className} aria-hidden="true">
      <path
        d="M0 55 C 60 30, 120 65, 180 40 S 300 35, 320 50"
        fill="none"
        stroke={palette.teal}
        strokeWidth="1.4"
        strokeDasharray="3 5"
        opacity="0.6"
      />
      {[60, 140, 220, 290].map((x, i) => (
        <g key={i} transform={`translate(${x} ${i % 2 === 0 ? 36 : 44})`}>
          <ellipse cx="0" cy="4" rx="7" ry="2" fill="#0F2540" opacity="0.1" />
          <ellipse cx="0" cy="0" rx="5" ry="3" fill="#9CA9B1" />
          <ellipse cx="0" cy="-4" rx="3.5" ry="2.5" fill="#B8C2C9" />
        </g>
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form                                                                       */
/* -------------------------------------------------------------------------- */

function RitlingurForm() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<RitlingurRequest>({
    resolver: zodResolver(ritlingurRequestSchema),
    defaultValues: {
      name: "",
      institution: "",
      email: "",
      consent: false,
      website: "",
    },
  });

  const consentValue = form.watch("consent");

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
      setSubmitted(true);
      form.reset();
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

  if (submitted) {
    return (
      <div
        className="rounded-2xl border p-6 sm:p-10 text-center"
        style={{
          background: palette.paper,
          borderColor: palette.border,
          boxShadow: `0 1px 0 ${palette.borderSoft}, 0 20px 40px -30px rgba(15,37,64,0.25)`,
        }}
        data-testid="ritlingur-success"
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: palette.tealSoft, color: palette.teal }}
        >
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3
          className="font-serif text-2xl sm:text-3xl"
          style={{ color: palette.ink, fontFamily: '"Instrument Serif", serif' }}
        >
          Takk — ritlingurin er á veg til tín.
        </h3>
        <p
          className="mt-3 text-base"
          style={{ color: palette.inkSoft }}
        >
          Hygg eftir í tínari innbakka (og kanska í ruskini, fyrstu ferð).
        </p>
        <div className="mt-8 text-left">
          <p
            className="text-[11px] uppercase tracking-[0.18em] font-medium mb-3"
            style={{ color: palette.teal }}
          >
            Trý ráð til næsta stig
          </p>
          <ol className="space-y-3">
            {[
              "Bóka eina arbeiðsstovu um vitlíki fyri leiðarar.",
              "Avgerið fyribils, hvørjar upplýsingar ongantíð mugu leggjast inn í vanlig vitlíki-amboð.",
              "Veljið nøkur forvitin starvsfólk ella lyklabrúkarar, sum kunnu vera tey fyrstu at læra og royna trygt.",
            ].map((step, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border p-4"
                style={{
                  background: "#fff",
                  borderColor: palette.borderSoft,
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  style={{ background: palette.tealSoft, color: palette.tealDeep }}
                >
                  {i + 1}
                </span>
                <span style={{ color: palette.ink }} className="text-[15px] leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8">
          <Button
            asChild
            className="h-12 px-6 rounded-full text-base"
            style={{ background: palette.teal, color: "#fff" }}
            data-testid="success-contact-button"
          >
            <a href="#samband">
              Set teg í samband <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="rounded-2xl border p-6 sm:p-8"
        style={{
          background: "#fff",
          borderColor: palette.border,
          boxShadow: `0 1px 0 ${palette.borderSoft}, 0 30px 60px -40px rgba(15,37,64,0.25)`,
        }}
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

        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: palette.ink }}
                >
                  Navn
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Títt navn"
                    className="h-12 rounded-xl text-base"
                    style={{ borderColor: palette.border, background: palette.paper }}
                    data-testid="input-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: palette.ink }}
                >
                  Stovnur
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Navnið á stovninum"
                    className="h-12 rounded-xl text-base"
                    style={{ borderColor: palette.border, background: palette.paper }}
                    data-testid="input-institution"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: palette.ink }}
                >
                  Teldupostur
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="navn@stovnur.fo"
                    className="h-12 rounded-xl text-base"
                    style={{ borderColor: palette.border, background: palette.paper }}
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
                  className="flex items-start gap-3 rounded-xl border p-4"
                  style={{
                    background: palette.paper,
                    borderColor: palette.borderSoft,
                  }}
                >
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                      data-testid="checkbox-consent"
                    />
                  </FormControl>
                  <FormLabel
                    className="text-sm font-normal leading-relaxed cursor-pointer"
                    style={{ color: palette.ink }}
                  >
                    Eg vil eisini hoyra meira frá Vitlíkisstovuni um vitlíki,
                    skeið, arbeiðsstovur og ráðgeving.
                  </FormLabel>
                </div>
                {!consentValue && (
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: palette.inkSoft }}
                  >
                    Tú fært framvegis ritlingin sendan. Tú verður bara ikki
                    skrivað/ur upp til seinni kunning.
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-13 mt-2 w-full rounded-full text-base font-medium"
            style={{
              background: palette.teal,
              color: "#fff",
              minHeight: "52px",
            }}
            data-testid="button-submit"
          >
            {mutation.isPending ? "Sendi…" : "Send mær ritlingin"}
          </Button>
          <p
            className="text-center text-xs"
            style={{ color: palette.inkSoft }}
          >
            Vit deila ongantíð tín teldupost við triðja part.
          </p>
        </div>
      </form>
    </Form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function Landsnet() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: palette.paper,
        color: palette.ink,
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      {/* ----------------------------------------------------------------- */}
      {/*  HERO                                                              */}
      {/* ----------------------------------------------------------------- */}
      <header
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${palette.paperDeep} 0%, ${palette.paper} 100%)`,
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em]"
               style={{ color: palette.teal }}>
            <Compass className="h-4 w-4" />
            <span>Vitlíkisstovan · ritlingur</span>
          </div>
          <h1
            className="mt-6 font-serif leading-[1.05] tracking-tight"
            style={{
              color: palette.ink,
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(2.25rem, 6vw, 4rem)",
            }}
            data-testid="hero-title"
          >
            Vitlíki á arbeiðsplássinum:{" "}
            <span style={{ color: palette.teal, fontStyle: "italic" }}>
              Haldið røttu kósina
            </span>
          </h1>
          <p
            className="mt-6 text-lg sm:text-xl leading-relaxed max-w-2xl"
            style={{ color: palette.inkSoft }}
          >
            Starvsfólk á føroyskum almennum arbeiðsplássum brúka longu vitlíki
            hvønn dag — gjøgnum telefonir, arbeiðisteldur og skipanir, sum tey
            longu hava atgongd til. Valið er ikki,{" "}
            <em>um</em> vitlíki verður brúkt, men{" "}
            <strong style={{ color: palette.ink }}>
              um nýtslan verður tilætlað, trygg og skipað — ella duld,
              tilvildarlig og váðamikil.
            </strong>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="h-13 px-7 rounded-full text-base font-medium"
              style={{
                background: palette.ink,
                color: palette.paper,
                minHeight: "52px",
              }}
              data-testid="hero-cta"
            >
              <a href="#fa-ritlingin">
                Fá ritlingin
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-13 px-6 rounded-full text-base font-medium"
              style={{ color: palette.teal, minHeight: "52px" }}
            >
              <a href="#tilfar">Síggj, hvat tilfarið inniheldur</a>
            </Button>
          </div>

          <div className="mt-10 sm:mt-14">
            <LighthouseScene className="w-full max-w-xl mx-auto h-auto" />
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/*  SHADOW AI INFO BOX                                                */}
      {/* ----------------------------------------------------------------- */}
      <Section id="tilfar">
        <div
          className="rounded-2xl border-l-4 p-6 sm:p-8"
          style={{
            background: palette.sand,
            borderLeftColor: palette.sandBorder,
            border: `1px solid ${palette.sandBorder}`,
            borderLeft: `5px solid ${palette.sandBorder}`,
          }}
        >
          <div
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: palette.sandInk }}
          >
            <AlertTriangle className="h-4 w-4" />
            Hvat tú eigur at vita
          </div>
          <h2
            className="mt-3 font-serif text-2xl sm:text-3xl leading-tight"
            style={{ color: palette.ink, fontFamily: '"Instrument Serif", serif' }}
          >
            Hvat er skugga-vitlíki (Shadow AI)?
          </h2>
          <p
            className="mt-4 text-[16px] sm:text-lg leading-relaxed"
            style={{ color: palette.inkSoft }}
          >
            Skugga-vitlíki hendir, tá ið starvsfólk — oftast í góðari trúgv
            fyri at loysa eina uppgávu skjótari — líma tekstir inn í ókeypis,
            almenn vitlíkistól (t.d. ókeypis útgávur av ChatGPT ella Gemini) á
            telefonini ella telduni.
          </p>
          <p
            className="mt-3 text-[16px] sm:text-lg leading-relaxed"
            style={{ color: palette.inkSoft }}
          >
            Tólini eru ikki góðkend, og starvsfólk vita ofta ikki, hvar dátur
            enda, ella um innskrivaða tilfarið verður brúkt til at venja tólini
            eftir hetta.
          </p>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/*  WHY ACT NOW                                                       */}
      {/* ----------------------------------------------------------------- */}
      <Section className="pt-0">
        <Eyebrow>Hví nú</Eyebrow>
        <H2>Hví eigur tú at gera okkurt nú?</H2>
        <p
          className="mt-5 text-[17px] sm:text-lg leading-relaxed"
          style={{ color: palette.inkSoft }}
        >
          Nýtslan flytur seg nógv skjótari enn stovnsreglur og sýnlig leiðsla
          megna at fylgja við. Almennir stovnar sita við persónsupplýsingum,
          borgaramálum, heilsudátum og innanhýsis samskifti.
        </p>
        <ul className="mt-5 grid sm:grid-cols-2 gap-3">
          {[
            "persónsdátur",
            "borgaramál",
            "heilsudátur",
            "innanhýsis samskifti",
            "trúnaðarmál",
            "dátulekar",
          ].map((tag) => (
            <li
              key={tag}
              className="rounded-lg border px-4 py-3 text-sm"
              style={{
                background: "#fff",
                borderColor: palette.borderSoft,
                color: palette.ink,
              }}
            >
              {tag}
            </li>
          ))}
        </ul>

        <figure
          className="mt-10 rounded-2xl border p-7 sm:p-10 relative"
          style={{
            background: "#fff",
            borderColor: palette.border,
          }}
        >
          <div
            className="absolute -top-3 left-7 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{
              background: palette.teal,
              color: "#fff",
            }}
          >
            Pull quote
          </div>
          <blockquote
            className="font-serif italic text-2xl sm:text-3xl leading-[1.3]"
            style={{ color: palette.ink, fontFamily: '"Instrument Serif", serif' }}
          >
            “At bíða steðgar ikki nýtsluni — tað ger hana bara ósjónliga.”
          </blockquote>
        </figure>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/*  TRIANGLE                                                          */}
      {/* ----------------------------------------------------------------- */}
      <Section
        className="pt-0"
      >
        <Eyebrow>Trír leiklutir</Eyebrow>
        <H2>Tríkanturin: Leiðsla, starvsfólk og KT</H2>
        <p
          className="mt-5 text-[17px] leading-relaxed"
          style={{ color: palette.inkSoft }}
        >
          Fyri at fáa virði úr vitlíki uttan at skapa glundatros, mugu tríggir
          leiklutir samstarva rætt.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 relative">
          {/* connecting lines on desktop */}
          <svg
            className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <line x1="20%" y1="50%" x2="50%" y2="50%" stroke={palette.border} strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="80%" y2="50%" stroke={palette.border} strokeDasharray="4 4" />
          </svg>
          {[
            {
              icon: Compass,
              role: "Leiðsla",
              body: "Setur kósina, ásetur mørkini og avger, hvat vitlíki skal betra um. Má ikki skumpa ábyrgdina yvir á KT.",
            },
            {
              icon: ShieldCheck,
              role: "KT",
              body: "Stendur fyri trygd, dátuvernd (GDPR), loyvum, skipanum og tøkniligum verjum. KT veit, hvar girðingin skal standa.",
            },
            {
              icon: Users,
              role: "Starvsfólk",
              body: "Kenna trupulleikarnar í gerandisdegnum og finna út úr, hvar málslig tól veruliga lætta um arbeiðsbyrðuna.",
            },
          ].map(({ icon: Icon, role, body }) => (
            <div
              key={role}
              className="rounded-2xl border p-6 relative z-10"
              style={{
                background: "#fff",
                borderColor: palette.border,
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: palette.tealSoft, color: palette.teal }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3
                className="mt-4 font-serif text-xl"
                style={{
                  color: palette.ink,
                  fontFamily: '"Instrument Serif", serif',
                }}
              >
                {role}
              </h3>
              <p
                className="mt-2 text-[15px] leading-relaxed"
                style={{ color: palette.inkSoft }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/*  SEVEN STEPS                                                       */}
      {/* ----------------------------------------------------------------- */}
      <Section className="pt-0">
        <Eyebrow>Praktiskur vegur</Eyebrow>
        <H2>Sjey stig til trygga og skipaða nýtslu</H2>
        <p
          className="mt-5 text-[17px] leading-relaxed"
          style={{ color: palette.inkSoft }}
        >
          Leiðslan eigur at fylgja hesum sjey stigum fyri at fáa rættstýrda
          byrjan.
        </p>

        <div className="mt-6 flex justify-center">
          <PathCairns className="w-full max-w-md h-auto" />
        </div>

        <ol className="mt-8 space-y-3">
          {[
            {
              t: "Set leiðsluna í ábyrgd",
              b: "Vitlíki snýr seg um arbeiðspláss- og fakliga menning, ikki bara um tøkni.",
            },
            {
              t: "Finn út úr, hvat longu fer fram",
              b: "Spyr starvsfólkini opið og við forvitni (ikki sum eina rannsókn), hvørji tól tey brúka í dag, og til hvat.",
            },
            {
              t: "Gerið einföld trygdarmørk",
              b: "Brúkið ein einfaldan grønan, gulan og reyðan myndil (síggj niðanfyri).",
            },
            {
              t: "Áset eitt positivt mál",
              b: "Skilmarkið, hvat tit vilja betra — t.d. styttri bíðitíð, greiðari borgarasamskifti ella minni endurtakandi skriviarbeiði.",
            },
            {
              t: "Gevið fólki góðkend, trygg amboð",
              b: "Gevið starvsfólkum atgongd til tól við røttu dátuverndar-setningunum, so tey ikki brúka privatar, ótryggar kontur.",
            },
            {
              t: "Venjið tey viljugu fyrst",
              b: "Byrjið við lykilbrúkarum og teimum forvitnu. Gevið teimum eitt grundleggjandi “vitlíkis-koyrikort” um dátuvernd, keldutekning og villur (hillingar).",
            },
            {
              t: "Gerið eina læringarskipan",
              b: "Samlið royndir, góðar byrtir (prompts) og mistøk innanhýsis, so allur stovnurin fær gagn av felags læring.",
            },
          ].map((s, i) => (
            <li
              key={i}
              className="rounded-2xl border p-5 sm:p-6 flex gap-4"
              style={{
                background: "#fff",
                borderColor: palette.border,
              }}
            >
              <span
                className="font-serif text-3xl shrink-0 leading-none w-10"
                style={{
                  color: palette.teal,
                  fontFamily: '"Instrument Serif", serif',
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className="font-serif text-xl"
                  style={{
                    color: palette.ink,
                    fontFamily: '"Instrument Serif", serif',
                  }}
                >
                  {s.t}
                </h3>
                <p
                  className="mt-1.5 text-[15px] leading-relaxed"
                  style={{ color: palette.inkSoft }}
                >
                  {s.b}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/*  GREEN / YELLOW / RED                                              */}
      {/* ----------------------------------------------------------------- */}
      <Section className="pt-0">
        <Eyebrow>Trygdarmørk</Eyebrow>
        <H2>Grønt · Gult · Reytt</H2>
        <p
          className="mt-5 text-[17px] leading-relaxed"
          style={{ color: palette.inkSoft }}
        >
          Ein einfaldur myndil, ið alt starvsfólk kann skilja og brúka strax —
          uttan tørv á tekniskari forkunnu.
        </p>

        <div className="mt-8 grid gap-4">
          {[
            {
              label: "Grønt",
              tone: "Óviðkvæmar uppgávur",
              body: "Almennur tekstur, opin tilfar og uppgávur, sum ikki hava persónsupplýsingar.",
              bg: palette.moss,
              border: palette.mossBorder,
              ink: palette.mossInk,
              dot: "#5C8345",
            },
            {
              label: "Gult",
              tone: "Innanhýsis tilfar við varsemi",
              body: "Skjøl, sum hoyra stovninum til. Lat KT meta um, hvør tól mega brúkast og hvussu.",
              bg: palette.sand,
              border: palette.sandBorder,
              ink: palette.sandInk,
              dot: "#C99A20",
            },
            {
              label: "Reytt",
              tone: "Persónsdátur og trúnaðarmál",
              body: "Mega ongantíð sleppa út í ókeypis ella óvarin vitlíki-amboð. Aldri.",
              bg: palette.clay,
              border: palette.clayBorder,
              ink: palette.clayInk,
              dot: "#B0432B",
            },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-2xl p-5 sm:p-6 flex gap-4 items-start"
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
              }}
            >
              <span
                className="mt-1 inline-block h-4 w-4 rounded-full shrink-0"
                style={{ background: c.dot, boxShadow: `0 0 0 4px ${c.bg}` }}
                aria-hidden="true"
              />
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span
                    className="font-serif text-2xl"
                    style={{
                      color: c.ink,
                      fontFamily: '"Instrument Serif", serif',
                    }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: c.ink, opacity: 0.85 }}
                  >
                    {c.tone}
                  </span>
                </div>
                <p
                  className="mt-2 text-[15px] leading-relaxed"
                  style={{ color: c.ink, opacity: 0.95 }}
                >
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/*  LEADERSHIP LITERACY                                               */}
      {/* ----------------------------------------------------------------- */}
      <Section className="pt-0">
        <div
          className="rounded-2xl border p-7 sm:p-10"
          style={{
            background: palette.tealSoft,
            borderColor: "#BCD7DA",
          }}
        >
          <div
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: palette.tealDeep }}
          >
            <Lightbulb className="h-4 w-4" />
            Til leiðsluna
          </div>
          <h2
            className="mt-3 font-serif text-2xl sm:text-3xl leading-tight"
            style={{ color: palette.ink, fontFamily: '"Instrument Serif", serif' }}
          >
            Hví leiðarar eiga at læra at brúka vitlíki
          </h2>
          <p
            className="mt-4 text-[16px] sm:text-lg leading-relaxed"
            style={{ color: palette.inkSoft }}
          >
            Sum leiðari tørvar tær ikki at vera KT-samskipari, men tú mást hava
            grundleggjandi vitlíkisfatan (literacy) — nóg mikið til at avgera
            við visku og at orða mørkini, sum starvsfólkið skal arbeiða
            innanfyri.
          </p>

          <blockquote
            className="mt-6 font-serif italic text-xl sm:text-2xl leading-snug border-l-4 pl-5"
            style={{
              color: palette.ink,
              borderLeftColor: palette.teal,
              fontFamily: '"Instrument Serif", serif',
            }}
          >
            “Tú kanst ikki seta ferðslureglur fyri ein veg, tú ongantíð hevur
            koyrt á.”
          </blockquote>

          <ul className="mt-6 space-y-3">
            {[
              "Vitlíki kann ljóða sannførandi, hóast tað tekur feil — leiðslan má skilja, hví menniskjalig eftirkanning altíð er krav.",
              "Vitlíki er skipanar- og leiðsluamboð — tað ávirkar tíðarbrúk, málsliga dygd og starvsfólkaorku.",
            ].map((t, i) => (
              <li
                key={i}
                className="flex gap-3 text-[15px] leading-relaxed"
                style={{ color: palette.ink }}
              >
                <CheckCircle2
                  className="h-5 w-5 mt-0.5 shrink-0"
                  style={{ color: palette.teal }}
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/*  HOW VITLÍKISSTOVAN CAN HELP                                       */}
      {/* ----------------------------------------------------------------- */}
      <Section className="pt-0">
        <Eyebrow>Hjálp til at koma ígongd</Eyebrow>
        <H2>Hvussu Vitlíkisstovan kann hjálpa tykkum</H2>
        <p
          className="mt-5 text-[17px] leading-relaxed"
          style={{ color: palette.inkSoft }}
        >
          Vit hjálpa føroyskum almennum stovnum við praktiskari og tryggari
          innføring av vitlíki — uttan óneyðugt fløkjasemi.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Compass,
              title: "Leiðslusparring",
              body:
                "Ráðgeving um strategiska kós, ábyrgdarbýti, dátuvernd og váðametingar.",
            },
            {
              icon: ShieldCheck,
              title: "Greiðar reglur",
              body:
                "Sniðgeving av stovnsbundnum trygdarmørkum og grønum/gulum/reyðum myndlum.",
            },
            {
              icon: Wrench,
              title: "Praktiskar arbeiðsstovur",
              body:
                "Skeið fyri leiðslur, KT og lykilbrúkarar í tryggari nýtslu, keldutekning og prompting.",
            },
            {
              icon: Users,
              title: "Deilingargrunnar",
              body:
                "Handhægir leistir til at savna innanhýsis læring, so royndirnar verða verandi á stovninum.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border p-6"
              style={{
                background: "#fff",
                borderColor: palette.border,
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: palette.tealSoft, color: palette.teal }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3
                className="mt-4 font-serif text-xl"
                style={{
                  color: palette.ink,
                  fontFamily: '"Instrument Serif", serif',
                }}
              >
                {title}
              </h3>
              <p
                className="mt-2 text-[15px] leading-relaxed"
                style={{ color: palette.inkSoft }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/*  EMAIL SIGNUP                                                      */}
      {/* ----------------------------------------------------------------- */}
      <Section id="fa-ritlingin">
        <div className="text-center mb-8">
          <Eyebrow>Fá ritlingin</Eyebrow>
          <h2
            className="mt-3 font-serif text-3xl sm:text-4xl leading-tight"
            style={{ color: palette.ink, fontFamily: '"Instrument Serif", serif' }}
          >
            Send mær ritlingin
          </h2>
          <p
            className="mt-3 text-[16px] sm:text-lg leading-relaxed mx-auto max-w-xl"
            style={{ color: palette.inkSoft }}
          >
            Skriva navn, stovn og teldupost — so sendi vit ritlingin beinanvegin.
            Eingin atgongdskoda. Einki ynski um at selja tær okkurt.
          </p>
        </div>
        <RitlingurForm />
      </Section>

      {/* ----------------------------------------------------------------- */}
      {/*  CONTACT CTA                                                       */}
      {/* ----------------------------------------------------------------- */}
      <Section id="samband" className="pt-0 pb-24">
        <div
          className="rounded-2xl border p-7 sm:p-10 text-center"
          style={{
            background: palette.ink,
            color: palette.paper,
            borderColor: palette.ink,
          }}
        >
          <h2
            className="font-serif text-3xl sm:text-4xl leading-tight"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Set teg í samband
          </h2>
          <p
            className="mt-3 text-[16px] sm:text-lg leading-relaxed mx-auto max-w-xl"
            style={{ color: "#C9D5E3" }}
          >
            Vit eru vælkomin at hjálpa tínum stovni at gera hetta praktiskt —
            tilrættalagt eftir tykkara dagliga arbeiði.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="h-13 px-6 rounded-full text-base font-medium"
              style={{
                background: palette.paper,
                color: palette.ink,
                minHeight: "52px",
              }}
            >
              <a href="mailto:info@vitlikisstovan.fo">
                <Mail className="mr-2 h-4 w-4" />
                Skriva til Vitlíkisstovuna
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-13 px-6 rounded-full text-base font-medium border"
              style={{
                color: palette.paper,
                borderColor: "rgba(248,243,232,0.3)",
                minHeight: "52px",
              }}
            >
              <a href="/contact">
                <ArrowRight className="mr-2 h-4 w-4" />
                Send fyrispurning
              </a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
               style={{ color: "#C9D5E3" }}>
            <a href="mailto:info@vitlikisstovan.fo" className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" /> info@vitlikisstovan.fo
            </a>
            <a href="tel:+298919444" className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" /> +298 919 444
            </a>
          </div>
        </div>
        <p
          className="mt-8 text-center text-xs"
          style={{ color: palette.inkSoft }}
        >
          © {new Date().getFullYear()} Vitlíkisstovan · vitlikisstovan.fo
        </p>
      </Section>
    </main>
  );
}
