import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertTriangle,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Users,
  Building2,
  Lightbulb,
  Calendar,
  BookOpenCheck,
} from "lucide-react";
import { resourceRequestSchema, type ResourceRequest } from "@shared/schema";
import heroImage from "@assets/1deae3d4-746e-4f49-89e6-9df0a822dfa6_1779649086676.png";

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

function SignupForm({ id = "signup" }: { id?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [showConsentNudge, setShowConsentNudge] = useState(false);

  const form = useForm<ResourceRequest>({
    resolver: zodResolver(resourceRequestSchema),
    defaultValues: {
      name: "",
      institution: "",
      email: "",
      newsletterConsent: false,
      website: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ResourceRequest) => {
      const res = await fetch("/api/resource-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Okkurt fór skeivt. Royn aftur.");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  const onSubmit = (data: ResourceRequest) => {
    // Gentle nudge if they haven't opted in — ask once, then send anyway.
    if (!data.newsletterConsent && !showConsentNudge) {
      setShowConsentNudge(true);
      return;
    }
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div
        id={id}
        className="rounded-2xl border border-primary/30 bg-white p-8 shadow-sm"
        data-testid="signup-success"
      >
        <div className="flex items-start gap-4">
          <CheckCircle2 className="h-7 w-7 flex-shrink-0 text-primary" />
          <div>
            <h3 className="text-2xl font-semibold text-[#0f2a44]">
              Takk! Ritlingurin er á veg.
            </h3>
            <p className="mt-2 text-[#0f2a44]/75">
              Tú fært ein teldupost við niðurtøku-leinkju til ritlingin. Tjekka
              eisini ruskpostin, um hann ikki er komin innan fáar minuttir.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#0f2a44]/10 pt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[#0f2a44]/60">
            Trý næstu stig
          </h4>
          <ol className="mt-4 space-y-4">
            {[
              {
                icon: Calendar,
                title: "Bóka eina verkstovu fyri leiðslu",
                text: "Lat leiðsluna fáa eina handaliga innleiðing — so kunnu tit taka avgerðir á upplýstum grundarlagi.",
                href: "/ai-workshop",
                cta: "Sí verkstovuna",
              },
              {
                icon: ShieldCheck,
                title: "Avgerið fyribils, hvat ongantíð má leggjast inn",
                text: "Skrivið niður tey trý ella fýra evnini — t.d. persónsdátur, heilsudátur, trúnaðarmál — sum starvsfólk ongantíð mugu líma inn í vanlig vitlíki-amboð.",
              },
              {
                icon: Users,
                title: "Veljið nøkur forvitin lyklabrúkarar",
                text: "Tey verða tey fyrstu at læra og royna trygt — og bera royndirnar víðari til restina av stovninum.",
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-primary" />
                    <h5 className="font-semibold text-[#0f2a44]">{step.title}</h5>
                  </div>
                  <p className="mt-1 text-sm text-[#0f2a44]/75">{step.text}</p>
                  {step.href && (
                    <a
                      href={step.href}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      {step.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-2xl border border-[#0f2a44]/10 bg-white p-6 shadow-sm sm:p-8"
        noValidate
      >
        <div className="flex items-start gap-3">
          <Mail className="mt-1 h-5 w-5 text-primary" />
          <div>
            <h3 className="text-xl font-semibold text-[#0f2a44] sm:text-2xl">
              Fá byrjanarpakkan tilsendan
            </h3>
            <p className="mt-1 text-sm text-[#0f2a44]/70">
              Vit senda tær ritlingin sum PDF — beinanvegin.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {/* Honeypot — hidden from real users */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
          >
            <label>
              Website
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0f2a44]">Navn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Títt navn"
                    autoComplete="name"
                    className="h-12 bg-[#fbf9f3] text-base"
                    data-testid="input-name"
                    {...field}
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
                <FormLabel className="text-[#0f2a44]">Stovnur</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Navnið á stovninum"
                    autoComplete="organization"
                    className="h-12 bg-[#fbf9f3] text-base"
                    data-testid="input-institution"
                    {...field}
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
                <FormLabel className="text-[#0f2a44]">Teldupostur</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    placeholder="navn@stovnur.fo"
                    autoComplete="email"
                    className="h-12 bg-[#fbf9f3] text-base"
                    data-testid="input-email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newsletterConsent"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3 rounded-xl border border-[#0f2a44]/10 bg-[#fbf9f3] p-4">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={(v) => {
                        field.onChange(!!v);
                        if (v) setShowConsentNudge(false);
                      }}
                      className="mt-0.5 h-5 w-5"
                      data-testid="checkbox-consent"
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer text-sm font-normal leading-relaxed text-[#0f2a44]/85">
                    Vil tú hava ritlingin tilsendan á teldupost umframt at hoyra
                    meira um, hvussu Vitlíkisstovan kann hjálpa tær?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {showConsentNudge && !form.watch("newsletterConsent") && (
            <div
              className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
              role="alert"
            >
              <p className="font-medium">Ert tú vís/ur?</p>
              <p className="mt-1 text-amber-900/85">
                Tú hevur ikki valt at hoyra meira frá okkum. Tú fært framvegis
                ritlingin tilsendan. Trýst aftur á knøttin fyri at halda fram —
                ella set kross í kassan omanfyri.
              </p>
            </div>
          )}

          {mutation.error && (
            <div
              className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
              role="alert"
            >
              {(mutation.error as Error).message}
            </div>
          )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="h-12 w-full bg-[#0f2a44] text-base font-semibold text-white hover:bg-[#0f2a44]/90"
            data-testid="button-submit"
          >
            {mutation.isPending ? (
              "Sendi…"
            ) : (
              <>
                Send mær byrjanarpakkan <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-[#0f2a44]/55">
            Vit goyma upplýsingarnar trygt og deila tær ikki við triðjapart.
          </p>
        </div>
      </form>
    </Form>
  );
}

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

function SectionTitle({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#0f2a44] sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-[#0f2a44]/75 sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landsnet() {
  const steps = [
    {
      title: "Set leiðsluna í ábyrgd",
      text: "Vitlíki snýr seg um arbeiðspláss- og fakliga menning — ikki bara um tøkni.",
    },
    {
      title: "Finn út úr, hvat longu fer fram",
      text: "Spyr starvsfólkini opið og við forvitni (ikki sum eina rannsókn), hvørji tól tey brúka í dag, og til hvat.",
    },
    {
      title: "Gerið einföld trygdarmørk",
      text: "Brúkið ein einfaldan grønan, gulan og reyðan myndil. Sí omanfyri.",
    },
    {
      title: "Áset eitt positivt mál",
      text: "Skilmarkið, hvat tit vilja betra — t.d. styttri bíðitíð ella greiðari borgarasamskifti.",
    },
    {
      title: "Gevið fólki góðkend, trygg amboð",
      text: "Atgongd til tól við røttu dátuverndar-setningunum, so privatar, ótryggar kontur ikki verða nýttar.",
    },
    {
      title: "Venjið tey viljugu fyrst",
      text: "Byrjið við lyklabrúkarum og teimum forvitnu. Gevið teimum eitt grundleggjandi vitlíkis-koyrikort.",
    },
    {
      title: "Gerið eina læringarskipan",
      text: "Samlið royndir, góðar byrtir (prompts) og mistøk innanhýsis, so allur stovnurin fær gagn av felags læring.",
    },
  ];

  const triangle = [
    {
      icon: Building2,
      title: "Leiðslan eigur málið",
      text: "Setir kósina, ásetur mørkini og avger, hvat vitlíki skal betra um. Má ikki skumpa ábyrgdina yvir á KT-deildina.",
    },
    {
      icon: ShieldCheck,
      title: "KT tryggjar karmarnar",
      text: "Trygd, dátuvernd (GDPR), loyvi og tøkniligar verjur. KT veit, hvar girðingin skal standa.",
    },
    {
      icon: Lightbulb,
      title: "Starvsfólkini finna virðið",
      text: "Tey kenna trupulleikarnar í gerandisdegnum og finna, hvar tól veruliga lætta um arbeiðsbyrðuna.",
    },
  ];

  const services = [
    {
      title: "Leiðslusparring",
      text: "Ráðgeving um strategiska kós, ábyrgdarbýti, dátuvernd og váðametingar.",
    },
    {
      title: "Greiðar reglur",
      text: "Sniðgeving av stovnsbundnum trygdarmørkum og grønum/gulum/reyðum myndlum, ið passa til tykkara stovn.",
    },
    {
      title: "Praktiskar arbeiðsstovur",
      text: "Skeið fyri leiðslur, KT-starvsfólk og lyklabrúkarar í tryggari nýtslu, keldutekning og prompting.",
    },
    {
      title: "Deilingargrunnar",
      text: "Handhægir leistir til at savna innanhýsis læring, so royndirnar verða verandi og mennast.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3e8] text-[#0f2a44]">
      <Header />

      <main>
        {/* ----------------------------------------------------------- */}
        {/* Hero                                                         */}
        {/* ----------------------------------------------------------- */}
        <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Byrjanarpakki til almennar stovnar
              </p>
              <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Vitlíki á arbeiðsplássinum:{" "}
                <span className="italic font-normal text-[#0f2a44]/80">
                  Haldið røttu kósina
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[#0f2a44]/80 sm:text-xl">
                Starvsfólk brúka longu vitlíki hvønn einasta dag. Spurningurin
                er ikki <em>um</em> — men hvørt nýtslan skal vera{" "}
                <strong>tilætlað, trygg og skipað</strong> ella{" "}
                <strong>duld, tilvildarlig og váðamikil</strong>.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#signup"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0f2a44] px-6 text-base font-semibold text-white shadow-sm transition hover:bg-[#0f2a44]/90"
                  data-testid="link-hero-cta"
                >
                  Fá byrjanarpakkan <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#sjey-stig"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#0f2a44]/20 bg-white/60 px-6 text-base font-semibold text-[#0f2a44] transition hover:bg-white"
                >
                  Sí sjey stigini
                </a>
              </div>

              <p className="mt-5 text-sm text-[#0f2a44]/60">
                Ætlað leiðarum, KT-ábyrgdarfólkum og lyklabrúkarum.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-[#0f2a44]/10 bg-white/40 shadow-sm">
                <img
                  src={heroImage}
                  alt="Vatnlitar-mynd av vita á føroyskari strond — at halda røttu kósina"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Signup — early, right after hero                              */}
        {/* ----------------------------------------------------------- */}
        <section className="px-4 pb-14 sm:px-6 lg:px-8" id="signup-section">
          <div className="mx-auto max-w-2xl">
            <SignupForm id="signup" />
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Shadow AI info box                                            */}
        {/* ----------------------------------------------------------- */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-amber-300/70 bg-amber-50/80 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-amber-200/70 text-amber-800">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                    Skugga-vitlíki
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-[#0f2a44] sm:text-3xl">
                    Hvat er skugga-vitlíki (Shadow AI)?
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#0f2a44]/80">
                    Skugga-vitlíki hendir, tá ið starvsfólk — oftast í góðari
                    trúgv fyri at loysa eina uppgávu skjótari — líma tekstir inn
                    í ókeypis, almenn vitlíkistól (t.d. ókeypis útgávur av
                    ChatGPT ella Gemini) á telefonini ella telduni.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[#0f2a44]/80">
                    Tólini eru ikki góðkend, og starvsfólk vita ofta ikki, hvar
                    dáturnar enda, ella um innskrivaða tilfarið verður brúkt
                    til at venja tólini eftir hetta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Why act now                                                  */}
        {/* ----------------------------------------------------------- */}
        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <SectionTitle
              eyebrow="Hví nú"
              title="Hví tú eigur at bregðast við rættari atgerð nú"
            />
            <div className="space-y-5 text-base leading-relaxed text-[#0f2a44]/80 sm:text-lg">
              <p>
                Nýtslan flytur seg nógv skjótari enn stovnsreglur og sýnlig
                leiðsla megna at fylgja við.
              </p>

              <blockquote className="my-8 rounded-2xl border-l-4 border-primary bg-white/60 p-6 text-xl font-medium leading-snug text-[#0f2a44] sm:text-2xl">
                “At bíða steðgar ikki nýtsluni — tað ger hana bara ósjónliga.”
              </blockquote>

              <p>
                Almennir stovnar sita við persónsupplýsingum, borgaramálum,
                heilsudátum og innanhýsis samskifti. Vandin fyri{" "}
                <strong>dátuleka (data leakage)</strong> er álvarsamur, tí
                fleiri og fleiri starvsfólk brúka tólini regluliga — og til
                alsamt flóknari uppgávur undir tíðartrýsti.
              </p>
              <p>
                Um stovnurin ikki vísir teimum ein upplýstan og tryggan veg,
                finna starvsfólk sín egna veg í myrkrinum.
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Triangle                                                     */}
        {/* ----------------------------------------------------------- */}
        <section className="bg-white/50 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Tríkanturin"
              title="Leiðsla, starvsfólk og KT"
              intro="Fyri at fáa virði úr vitlíki uttan at skapa glundatros, mugu tríggir leiklutir samstarva rætt."
            />
            <div className="grid gap-5 sm:grid-cols-3">
              {triangle.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col rounded-2xl border border-[#0f2a44]/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0f2a44]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0f2a44]/75">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Seven steps                                                  */}
        {/* ----------------------------------------------------------- */}
        <section
          id="sjey-stig"
          className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              eyebrow="Sjey stig"
              title="Sjey stig til trygga og skipaða nýtslu"
              intro="Leiðslan eigur at fylgja hesum sjey stigum fyri at fáa rættstýrda byrjan."
            />
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-2xl border border-[#0f2a44]/10 bg-white p-5 sm:p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-white sm:h-12 sm:w-12 sm:text-lg">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#0f2a44] sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#0f2a44]/75 sm:text-base">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Green / Yellow / Red                                         */}
        {/* ----------------------------------------------------------- */}
        <section className="bg-white/50 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Trygdarmyndilin"
              title="Grønt / Gult / Reytt"
              intro="Ein einfaldur myndil, sum øll á stovninum kunnu skilja og brúka beinanvegin."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                    Grønt
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#0f2a44]">
                  Loyvt at brúka
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0f2a44]/75">
                  Óviðkvæmar uppgávur og almennur tekstur — t.d. samanumtøkur av
                  almennum dokumentum ella hugskot.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
                    Gult
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#0f2a44]">
                  Brúka við varsemi
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0f2a44]/75">
                  Innanhýsis tilfar — bara í góðkendum, tryggum tólum og
                  uttan persónsupplýsingar.
                </p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-3 w-3 rounded-full bg-rose-500" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-rose-800">
                    Reytt
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#0f2a44]">
                  Ongantíð
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0f2a44]/75">
                  Persónsdátur og trúnaðarmál mega ongantíð sleppa út í
                  ókeypis ella ógóðkend tól.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Leadership literacy info box                                  */}
        {/* ----------------------------------------------------------- */}
        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-primary/20 bg-white p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Til leiðarar
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#0f2a44] sm:text-3xl">
                Hví leiðarar eiga at læra at brúka vitlíki
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#0f2a44]/80">
                Sum leiðari tørvar tær ikki at vera KT-samskipari. Men tú mást
                hava grundleggjandi vitlíkisfatan — annars ber tað ikki til at
                seta røttu mørkini.
              </p>

              <blockquote className="my-7 rounded-xl border-l-4 border-primary bg-[#fbf9f3] p-6 text-lg font-medium italic leading-snug text-[#0f2a44] sm:text-xl">
                “Tú kanst ikki seta ferðslureglur fyri ein veg, tú ongantíð
                hevur koyrt á.”
              </blockquote>

              <ul className="space-y-3 text-base text-[#0f2a44]/80">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>
                    Vitlíki kann ljóða sannførandi, hóast tað tekur feil — tí
                    má menniskjalig eftirkanning altíð vera krav.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>
                    Tað ávirkar tíðarbrúk, málsliga dygd og starvsfólkaorku —
                    altso eitt klárt leiðsluamboð.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>
                    Hevur tú sjálv/ur ongantíð roynt tólini, sær tú ikki mun á
                    skilagóðari nýtslu og váða.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Services                                                     */}
        {/* ----------------------------------------------------------- */}
        <section className="bg-white/50 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Hjálp tilreiðar"
              title="Hvussu Vitlíkisstovan kann hjálpa tykkum"
              intro="Vit syrgja fyri, at tit koma skjótt og rætt til verka uttan óneyðugt fløkjasemi."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#0f2a44]/10 bg-white p-6"
                >
                  <div className="flex items-center gap-2">
                    <BookOpenCheck className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-[#0f2a44]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#0f2a44]/75">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- */}
        {/* Final CTA                                                    */}
        {/* ----------------------------------------------------------- */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#0f2a44]/10 bg-[#0f2a44] p-8 text-white sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Set teg í samband
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Skal hetta gerast til praksis á tykkara stovni?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Skriva ella ring — vit hjálpa tykkum at gera hetta til eina
              skipaða og trygga byrjan á tykkara arbeiðsplássi.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:info@vitlikisstovan.fo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-base font-semibold text-[#0f2a44] hover:bg-white/90"
              >
                <Mail className="h-4 w-4" /> info@vitlikisstovan.fo
              </a>
              <a
                href="tel:+298919444"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-base font-semibold text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> +298 919444
              </a>
              <a
                href="#signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-base font-semibold text-white hover:bg-white/10"
              >
                <Download className="h-4 w-4" /> Fá ritlingin
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
