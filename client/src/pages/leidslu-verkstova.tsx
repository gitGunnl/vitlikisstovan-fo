import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  workshopContactFormSchema,
  type WorkshopContactForm,
  workshopRegistrationSchema,
  type WorkshopRegistration,
  WORKSHOP_REGISTRATION_PRICE_DKK,
} from "@shared/schema";
import { reportFormFailure } from "@/lib/reportFormFailure";
import { siteConfig } from "@/content/site";
import { leidsluStrings as L } from "@/content/leidslu-verkstova-strings";
import {
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  ShieldCheck,
  Calendar as CalendarIcon,
  Minus,
  Plus,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const page = {
  header: {
    callNow: "Ring",
    numberCopied: "Telefonnummarið er avritað",
  },
  cta: {
    book: "Tekna teg til verkstovuna",
    write: "Spyr um verkstovuna",
  },
  form: {
    nameLabel: "Navn",
    namePlaceholder: "Títt navn",
    organizationLabel: "Arbeiðspláss ella stovnur",
    organizationPlaceholder: "T.d. kommuna, skúli, fyritøka ella stovnur",
    workEmailLabel: "Teldupostur",
    workEmailPlaceholder: "navn@arbeidsplass.fo",
    phoneLabel: "Telefon",
    phonePlaceholder: "+298 …",
    messageLabel: "Hvat vilt tú vita?",
    messagePlaceholder:
      "T.d. um pláss, dagfestingar, prís ella eina leiðsluverkstovu til okkara egna stovn.",
    submitting: "Sendi…",
    submitButton: "Send fyrispurning",
    errorMessage:
      "Okkurt gekk galið. Royn aftur, ella skriva beinleiðis til info@vitlikisstovan.fo.",
  },
  formSuccess: {
    heading: "Takk fyri — eg havi móttikið tín fyrispurning",
    body:
      "Eg vendi aftur sum skjótast við svari um leiðsluverkstovuna og um, hvussu hon kann hóska til tørvin hjá tykkum.",
    whatHappensNext: "Hvat hendir nú?",
    steps: [
      "Eg lesi tín fyrispurning og kanni, hvat ið er mest viðkomandi fyri teg ella tykkara leiðslu.",
      "Tú fært svar við praktiskari kunning um dagfesting, pláss, prís ella møguleikan fyri eini innanhýsis verkstovu.",
      "Um tað er viðkomandi, kunnu vit taka eitt stutt prát um, hvar tit eru í vitlíkisarbeiðinum í dag.",
    ],
    urgentPrefix: "Hevur tú tørv á skjótum svari, kanst tú",
    phone: "ringja",
    or: "ella",
    email: "skriva beinleiðis",
    exploreHeading: "Meðan tú bíðar",
    exploreLinks: [
      { label: "Vitja forsíðuna hjá Vitlíkisstovuni", href: "/" },
      { label: "Skriva beinleiðis við telduposti", href: `mailto:${siteConfig.contact.email}` },
    ],
  },
  registration: {
    title: "Tekna teg til leiðsluverkstovuna",
    subtitle:
      "Vel dagfesting, tal av luttakarum og skriva sambandsupplýsingar. Tekningin verður avgreidd við rokningi.",
    dateLabel: "Vel dagfesting",
    dateOptions: L.registration.dateOptions,
    seatsLabel: "Tal av luttakarum",
    seatsMinus: "Fækka luttakaratalið",
    seatsPlus: "Legg luttakara afturat",
    seatsHelp: "Í mesta lagi 20 í hvørjari tekning",
    nameLabel: "Navn",
    namePlaceholder: "Títt navn",
    organizationLabel: "Arbeiðspláss ella stovnur",
    organizationPlaceholder: "Navn á arbeiðsplássi, stovni ella fyritøku",
    emailLabel: "Teldupostur",
    emailPlaceholder: "navn@arbeidsplass.fo",
    phoneLabel: "Telefon",
    phonePlaceholder: "+298 …",
    totalLabel: "Samlaður prísur",
    invoiceNote:
      "Prísurin verður roknaður fyri hvønn luttakara. Rokning verður send eftir tekningina.",
    acknowledgeLabel:
      "Eg vátti, at tekningin kann avgreiðast við rokningi til upplýsta arbeiðsplássið ella stovnin.",
    submit: "Send tekningina",
    submitting: "Sendir tekningina…",
    error:
      "Tekningin kundi ikki sendast. Royn aftur, ella skriva til info@vitlikisstovan.fo.",
    successTitle: "Tín tekning er móttikin",
    successBody:
      "Takk fyri. Tú fært váttan og praktiskar upplýsingar sendar við telduposti.",
    close: "Lat aftur",
  },
  hero: {
    eyebrow: "Leiðsluverkstova um vitlíki",
    heading: "Lær at leiða vitlíkisskiftið — trygt, praktiskt og við greiðari kós",
    subheading:
      "Ein verkstova fyri leiðarar og avgerðartakarar, sum vilja skilja vitlíki, brúka vitlíki í sínum egna leiðsluarbeiði og seta eina tryggari og gagnligari kós fyri sín stovn ella sína fyritøku.",
    bullets: [
      "Skil, hvat vitlíki longu broytir í arbeiðsgongdum, ábyrgd og nýtslu av arbeiðsorku.",
      "Lær at brúka vitlíki sum sparringsfelaga til at kanna møguleikar, vandar, leiðreglur og samskifti.",
      "Far heim við einum 6-stiga leisti og einum praktiskum byrjanarpunkti til tykkara arbeiðspláss.",
    ],
    featureCards: [
      { title: "Fyri leiðarar", subtitle: "eingin tøkniligur førleiki krevst" },
      { title: "Praktisk vitlíkisnýtsla", subtitle: "royndir í verki" },
      { title: "Trygg innleiðsla", subtitle: "vandar, amboð og ábyrgd" },
    ],
    contactTitle: "Hevur tú spurningar?",
    contactBody:
      "Skriva, um tú vilt vita meira um verkstovuna, pláss, dagfestingar ella eina útgávu til tykkara egna leiðslubólk.",
    directContact: "Tú kanst eisini seta teg í samband beinleiðis",
  },
  fit: {
    eyebrow: "Fyri leiðslur, sum vilja fara frá spjaddari nýtslu til eina greiða kós",
    heading: "Vitlíki skal ikki bara henda av sær sjálvum",
    body:
      "Nógv arbeiðspláss eru longu farin at royna vitlíki. Summi hava amboð, summi hava leiðreglur, og summi hava eldhugað starvsfólk. Avbjóðingin er at fáa hetta at hanga saman, so nýtslan verður trygg, gagnlig og knýtt at tí, sum stovnurin ella fyritøkan veruliga vil røkka.",
    cards: [
      {
        title: "Vitlíki er longu í gongd",
        text: "Starvsfólk royna amboð, skriva tekst, gera samandráttir og leita eftir nýggjum arbeiðshættum.",
      },
      {
        title: "Leiðslan má seta kós",
        text: "AI-skiftið kann ikki bara liggja hjá IT ella einstøkum eldsálum. Leiðslan má skilja nóg mikið til at taka ábyrgd.",
      },
      {
        title: "Trygg nýtsla krevur val",
        text: "Tað má vera greitt, hvørji amboð kunnu brúkast, hvørjar upplýsingar ikki skulu latast inn, og hvussu góðska verður tryggjað.",
      },
      {
        title: "Føroyski veruleikin telur",
        text: "Smá toymi, føroyskt mál, almenn ábyrgd og avmarkað tilfeingi krevja praktiskar loysnir heldur enn stór orð.",
      },
    ],
  },
  relevance: {
    heading: "Hetta er fyrst og fremst ikki eitt tøkniligt mál. Tað er eitt leiðslumál.",
    body:
      "Vitlíki kann geva betri yvirlit, skjótari fyrireiking, betri tænastu og nýggjar arbeiðshættir. Men tað krevur, at leiðslan dugir at seta karmar, velja eina trygga kós og fáa læringina inn í gerandisarbeiðið.",
    points: [
      "Hvørji vitlíkisamboð eru trygg at brúka hjá okkum, og hvar skulu vit vera varin?",
      "Hvørjar uppgávur og avgerðir kann vitlíki hjálpa við — og hvar skal menniskjaliga metingin altíð vera fremst?",
      "Hvussu brúka vit vitlíki til at styrkja arbeiðið heldur enn bara at spara tíð?",
      "Hvussu fáa vit starvsfólk, IT, HR og leiðslu at arbeiða eftir somu kós?",
    ],
  },
  steps: {
    eyebrow: "6 stig til skipaða vitlíkisnýtslu",
    heading: "Ein greiður leistur fyri leiðslur, sum vilja koma víðari",
    subheading:
      "Verkstovan byggir á ein praktiskan leist, sum hjálpir leiðsluni at flyta vitlíkisnýtsluna frá spjaddum royndum til meira tilvitaða og ábyrgdarfulla nýtslu.",
    items: [
      {
        title: "Leiðslan tekur ábyrgd",
        text: "Skil, hví vitlíki ikki bara er eitt IT-mál, og hvat leiðslan má duga fyri at seta kós.",
      },
      {
        title: "Kortlegg núverandi nýtslu",
        text: "Fá greiðu á, hvar vitlíki longu verður brúkt, hvørjar royndir eru góðar, og hvar óvissan er størst.",
      },
      {
        title: "Set karmar og mál",
        text: "Arbeið við reglum, málum og orðingum, sum gera tað lættari hjá fólki at brúka vitlíki rætt.",
      },
      {
        title: "Gev fólki trygg amboð",
        text: "Skil munin á amboðum, vandum og góðum arbeiðshættum, so nýtslan ikki verður tilvildarlig.",
      },
      {
        title: "Flyt læring inn í gerandisarbeiðið",
        text: "Ger vitlíki til nakað, sum fólk læra saman í dagliga arbeiðinum — ikki bara á einum einstøkum skeiði.",
      },
      {
        title: "Skil nóg mikið til at leiða",
        text: "Lær at brúka vitlíki sum sparringsfelaga, so tú kanst spyrja betri spurningar og taka betri avgerðir.",
      },
    ],
  },
  outcomes: {
    heading: "Eftir verkstovuna hevur tú eitt greiðari grundarlag at leiða út frá",
    items: [
      {
        title: "Ein greiðari mynd av vitlíki",
        text: "Tú skilir, hvat vitlíki kann, hvat tað ikki kann, og hvat tað merkir fyri arbeiði, ábyrgd og góðsku.",
      },
      {
        title: "Praktisk roynd við vitlíki",
        text: "Tú roynir at brúka vitlíki til leiðsluarbeiði: spurningar, greining, samskifti, leiðreglur og næstu stig.",
      },
      {
        title: "Betri spurningar til IT og ráðgevar",
        text: "Tú fært betri førleika til at skilja amboð, dátuvernd, trygd og hvørjar avgerðir krevja ábyrgd frá leiðsluni.",
      },
      {
        title: "Yvirlit yvir møguleikar og vandar",
        text: "Tú fært orð at seta á bæði virðisskapan og vandar, t.d. skugga-AI, góðsku, trúnað og ógreiðar mannagongdir.",
      },
      {
        title: "Ein praktisk byrjanarætlan",
        text: "Tú fert heim við einum einfaldum leisti, sum kann brúkast til at taka næstu stigini í tínum egna stovni.",
      },
      {
        title: "Orð til innanhýsis samskifti",
        text: "Tú fært hjálp til at tosa um vitlíki á ein hátt, sum skapar ábyrgd, forvitni og minni óvissu.",
      },
    ],
  },
  content: {
    heading: "Hvat arbeiða vit við á verkstovuni?",
    subheading:
      "Vit blanda stuttar frágreiðingar, praktiskar vitlíkisroyndir og leiðsluspurningar, so tú bæði skilir evnið og kanst brúka tað í tínum egna arbeiði.",
    blocks: [
      {
        title: "Hvat er vitlíki í verki?",
        text: "Ein greið frágreiðing um, hvat nýggj vitlíkisamboð gera, hvar tey eru sterkast, og hvar leiðslan skal vera varin.",
      },
      {
        title: "Vitlíki sum sparringsfelagi hjá leiðsluni",
        text: "Vit royna vitlíki sum hjálp til at hugsa, orða, kanna avleiðingar og fyrireika leiðsluuppgávur.",
      },
      {
        title: "Skuggavitlíki og trygg amboð",
        text: "Hvussu kann vitlíkisnýtsla gerast tryggari, so starvsfólk ikki verða noydd at finna sínar egnu loysnir í loyndum?",
      },
      {
        title: "Møguleikar á føroyskum arbeiðsplássum",
        text: "Vit hyggja at smáum, realistiskum fyrstu stigum, sum hóska til føroyskar stovnar og fyritøkur.",
      },
      {
        title: "Karmar, leiðreglur og ábyrgd",
        text: "Hvør eigur at gera hvat? Hvat hoyrir til leiðslu, IT, HR og starvsfólkini?",
      },
      {
        title: "Fyrstu 30–90 dagarnir",
        text: "Vit arbeiða við, hvat eitt gott næsta stig kann vera, so vitlíkisarbeiðið ikki steðgar eftir verkstovuna.",
      },
    ],
    facts: [
      "Føroyskt høpi",
      "Eingin tøkniligur førleiki krevst",
      "Fyri leiðarar og avgerðartakarar",
      "Praktisk vitlíkisnýtsla undir vegleiðing",
    ],
  },
  faq: {
    heading: "Vanligir spurningar",
    items: [
      {
        q: "Er hetta eitt tøkniligt skeið?",
        a: "Nei. Hetta er ein leiðsluverkstova. Vit brúka vitlíki praktiskt, men endamálið er ikki at gera teg til tøkniligan serfrøðing. Endamálið er, at tú skalt skilja nóg mikið til at leiða arbeiðið væl.",
      },
      {
        q: "Skal eg duga at brúka vitlíki frammanundan?",
        a: "Nei. Tú kanst koma við lítlari ella ongari roynd. Verkstovan er løgd til rættis, so leiðarar kunnu fáa eina trygga og praktiska byrjan uttan at kenna tøkniliga málið frammanundan.",
      },
      {
        q: "Hvat, um okkara stovnur longu hevur vitlíkisamboð ella leiðreglur?",
        a: "So er verkstovan framvegis viðkomandi. Tá arbeiða vit við at gera kósina greiðari, fáa nýtsluna betur skipaða og knýta amboð, reglur, læring og leiðsluábyrgd betri saman.",
      },
      {
        q: "Er verkstovan eisini viðkomandi fyri IT, HR ella menningarfólk?",
        a: "Ja. Hon er fyrst og fremst fyri leiðslu og avgerðartakarar, men IT, HR og lyklafólk fáa nógv burturúr, tí vitlíkisskiftið krevur samstarv millum fleiri partar.",
      },
      {
        q: "Kunnu tit halda eina innanhýsis verkstovu fyri okkara leiðslu?",
        a: "Ja. Skriva eina stutta frágreiðing um tykkara tørv í oyðublaðnum, so kunnu vit tosa um eina útgávu, sum hóskar til tykkara stovn, leiðslubólk og støðu.",
      },
      {
        q: "Hvat fáa vit við heim?",
        a: "Tú fært eina greiðari mynd av vitlíki, praktiska roynd við amboðunum, eitt 6-stiga leiðsluyvirlit og eitt byrjanarpunkt, sum kann brúkast á tínum egna arbeiðsplássi.",
      },
    ],
  },
  finalCta: {
    heading: "Tak næsta stigið í vitlíkisarbeiðinum",
    body:
      "AI-skiftið verður ikki tryggari av at bíða. Við røttu vitanini, røttu spurningunum og einum greiðum leisti kann leiðslan skapa eina nógv betri byrjan.",
    ctaButton: "Tekna teg til leiðsluverkstovuna",
    directContact: "Vilt tú heldur spyrja fyrst?",
    reassurance: "Eingin tøkniligur førleiki krevst — bara ábyrgd og forvitni.",
  },
  stickyBanner: {
    title: "Leiðsluverkstova um vitlíki",
    subtitle:
      "Fá ein 6-stiga leist, venjing í vitlíki og eina greiðari kós fyri tykkara stovn.",
    bookButton: "Tekna teg",
    writeButton: "Spyr fyrst",
    callButton: "Ring",
    dismiss: "Lat fráboðanina aftur",
  },
};

function WorkshopContactFormComponent({ id }: { id?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<WorkshopContactForm>({
    resolver: zodResolver(workshopContactFormSchema),
    defaultValues: {
      name: "",
      organization: "",
      workEmail: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: WorkshopContactForm) => {
      const formData = new FormData();
      formData.append("entry.1179687836", data.name);
      formData.append("entry.263197538", data.workEmail);
      formData.append(
        "entry.240567695",
        `[Leadership Workshop LP] Org: ${data.organization} | Phone: ${data.phone || "N/A"} | ${data.message || ""}`
      );

      try {
        await fetch(
          "https://docs.google.com/forms/d/e/1FAIpQLSf8FFci-J91suIjxY2xh4GD-DQ-UfZftUNxq3dUdXkgJAjB1Q/formResponse",
          {
            method: "POST",
            body: formData,
            mode: "no-cors",
            signal: AbortSignal.timeout(10000),
          }
        );
      } catch (err) {
        reportFormFailure("leadership-workshop-landing", err);
        throw err;
      }

      return { success: true };
    },
    onSuccess: () => {
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Leadership Workshop Contact Form",
          content_category: "leadership-workshop",
        });
      }
      trackEvent("workshop_booking", { workshop: "leadership_workshop" });
      setSubmitted(true);
      form.reset();
    },
  });

  if (submitted) {
    return (
      <div className="py-8 px-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border border-green-200 mb-5">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            {page.formSuccess.heading}
          </h3>
          <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
            {page.formSuccess.body}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-5 mb-6">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">
            {page.formSuccess.whatHappensNext}
          </h4>
          <ol className="space-y-2.5">
            {page.formSuccess.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-slate-500">
            {page.formSuccess.urgentPrefix}{" "}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="text-teal-700 hover:underline"
            >
              {page.formSuccess.phone}
            </a>{" "}
            {page.formSuccess.or}{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-teal-700 hover:underline"
            >
              {page.formSuccess.email}
            </a>
            .
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <p className="text-sm font-medium text-slate-700 text-center mb-4">
            {page.formSuccess.exploreHeading}
          </p>
          <div className="flex flex-col gap-2.5">
            {page.formSuccess.exploreLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-4 py-3.5 rounded-lg border border-teal-200 bg-teal-50 hover:bg-teal-100 hover:border-teal-300 transition-colors group"
              >
                <span className="text-sm font-semibold text-teal-800">
                  {link.label}
                </span>
                <ArrowRight className="w-4 h-4 text-teal-500 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-sm">
                {page.form.nameLabel}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={page.form.namePlaceholder}
                  autoComplete="name"
                  className="bg-white border-slate-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-sm">
                {page.form.organizationLabel}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={page.form.organizationPlaceholder}
                  autoComplete="organization"
                  className="bg-white border-slate-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-sm">
                {page.form.workEmailLabel}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={page.form.workEmailPlaceholder}
                  autoComplete="email"
                  className="bg-white border-slate-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-sm">
                {page.form.phoneLabel}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder={page.form.phonePlaceholder}
                  autoComplete="tel"
                  className="bg-white border-slate-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-sm">
                {page.form.messageLabel}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  placeholder={page.form.messagePlaceholder}
                  className="resize-none bg-white border-slate-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-5 text-base font-medium bg-teal-700 hover:bg-teal-800 text-white"
        >
          {mutation.isPending ? page.form.submitting : page.form.submitButton}
        </Button>
        {mutation.isError && (
          <p className="text-sm text-red-600 text-center">
            {page.form.errorMessage}
          </p>
        )}
      </form>
    </Form>
  );
}

function formatDkk(n: number): string {
  return n.toLocaleString("da-DK") + " kr.";
}

function RegistrationDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const form = useForm<WorkshopRegistration>({
    resolver: zodResolver(workshopRegistrationSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      phone: "",
      date: page.registration.dateOptions[0].value,
      seats: 1,
      acknowledgedInvoice: false as unknown as true,
      website: "",
    },
    mode: "onChange",
  });

  const [submitted, setSubmitted] = useState(false);
  const watched = form.watch();
  const seats = watched.seats ?? 1;
  const total = seats * WORKSHOP_REGISTRATION_PRICE_DKK;
  const isValid = workshopRegistrationSchema.safeParse(watched).success;

  const mutation = useMutation({
    mutationFn: async (data: WorkshopRegistration) => {
      const cfg = siteConfig.workshopRegistrationForm;
      const notConfigured = [
        cfg.formResponseUrl,
        cfg.entryName,
        cfg.entryOrganization,
        cfg.entryEmail,
        cfg.entryPhone,
        cfg.entryDate,
        cfg.entrySeats,
      ].some((v) => v.includes("PLACEHOLDER"));
      if (notConfigured) {
        const err = new Error("Registration form is not configured yet");
        reportFormFailure("leadership-workshop-landing", err);
        throw err;
      }

      const dateLabel =
        page.registration.dateOptions.find((o) => o.value === data.date)
          ?.label ?? data.date;
      const total = data.seats * WORKSHOP_REGISTRATION_PRICE_DKK;

      const formData = new FormData();
      formData.append(cfg.entryName, data.name);
      formData.append(cfg.entryOrganization, data.organization);
      formData.append(cfg.entryEmail, data.email);
      formData.append(cfg.entryPhone, data.phone);
      formData.append(cfg.entryDate, dateLabel);
      formData.append(
        cfg.entrySeats,
        `${data.seats} (${total.toLocaleString("da-DK")} kr.)`,
      );

      try {
        await fetch(cfg.formResponseUrl, {
          method: "POST",
          body: formData,
          mode: "no-cors",
          signal: AbortSignal.timeout(10000),
        });
      } catch (err) {
        reportFormFailure("leadership-workshop-landing", err);
        throw err;
      }

      return { success: true };
    },
    onSuccess: () => setSubmitted(true),
  });

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      setTimeout(() => {
        setSubmitted(false);
        form.reset();
        mutation.reset();
      }, 200);
    }
    onOpenChange(v);
  };

  const onSubmit = (values: WorkshopRegistration) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-testid="dialog-registration"
      >
        {submitted ? (
          <div className="py-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border border-green-200 mb-5">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {page.registration.successTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
              {page.registration.successBody}
            </p>
            <Button
              onClick={() => handleOpenChange(false)}
              className="bg-teal-700 hover:bg-teal-800 text-white"
              data-testid="button-registration-close"
            >
              {page.registration.close}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-slate-900">
                {page.registration.title}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {page.registration.subtitle}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        {page.registration.dateLabel}
                      </FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {page.registration.dateOptions.map((opt) => {
                          const active = field.value === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => field.onChange(opt.value)}
                              className={`text-left px-4 py-3 rounded-lg border transition-colors ${
                                active
                                  ? "bg-teal-700 text-white border-teal-700"
                                  : "bg-white text-slate-700 border-slate-200 hover:border-teal-400"
                              }`}
                              data-testid={`button-date-${opt.value}`}
                              aria-pressed={active}
                            >
                              <div className="font-semibold text-sm">{opt.label}</div>
                              <div
                                className={`text-xs ${
                                  active ? "text-white/85" : "text-slate-500"
                                }`}
                              >
                                {opt.weekday}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        {page.registration.seatsLabel}
                      </FormLabel>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label={page.registration.seatsMinus}
                          onClick={() =>
                            field.onChange(Math.max(1, (field.value ?? 1) - 1))
                          }
                          className="w-10 h-10 rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-teal-400 flex items-center justify-center disabled:opacity-40 disabled:hover:border-slate-200"
                          disabled={(field.value ?? 1) <= 1}
                          data-testid="button-seats-minus"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <Input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          max={20}
                          value={field.value ?? 1}
                          onChange={(e) => {
                            const n = parseInt(e.target.value, 10);
                            field.onChange(
                              Number.isNaN(n) ? 1 : Math.min(20, Math.max(1, n))
                            );
                          }}
                          className="w-20 text-center bg-white border-slate-200"
                          data-testid="input-seats"
                        />
                        <button
                          type="button"
                          aria-label={page.registration.seatsPlus}
                          onClick={() =>
                            field.onChange(Math.min(20, (field.value ?? 1) + 1))
                          }
                          className="w-10 h-10 rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-teal-400 flex items-center justify-center disabled:opacity-40 disabled:hover:border-slate-200"
                          disabled={(field.value ?? 1) >= 20}
                          data-testid="button-seats-plus"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-slate-500 ml-1">
                          {page.registration.seatsHelp}
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          {page.registration.nameLabel}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={page.registration.namePlaceholder}
                            className="bg-white border-slate-200"
                            autoComplete="name"
                            data-testid="input-registration-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          {page.registration.organizationLabel}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={page.registration.organizationPlaceholder}
                            className="bg-white border-slate-200"
                            autoComplete="organization"
                            data-testid="input-registration-organization"
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
                        <FormLabel className="text-sm font-medium text-slate-700">
                          {page.registration.emailLabel}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder={page.registration.emailPlaceholder}
                            className="bg-white border-slate-200"
                            autoComplete="email"
                            data-testid="input-registration-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          {page.registration.phoneLabel}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder={page.registration.phonePlaceholder}
                            className="bg-white border-slate-200"
                            autoComplete="tel"
                            data-testid="input-registration-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* honeypot */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                      {...field}
                    />
                  )}
                />

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500">
                      {page.registration.totalLabel}
                    </div>
                    <div
                      className="text-2xl font-bold text-slate-900"
                      data-testid="text-registration-total"
                    >
                      {formatDkk(total)}
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500 max-w-[55%]">
                    {page.registration.invoiceNote}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="acknowledgedInvoice"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value === true}
                            onCheckedChange={(v) => field.onChange(v === true)}
                            className="mt-0.5"
                            data-testid="checkbox-acknowledge-invoice"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-slate-700 leading-snug !mt-0 cursor-pointer">
                          {page.registration.acknowledgeLabel}
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={mutation.isPending || !isValid}
                  className="w-full py-5 text-base font-medium bg-teal-700 hover:bg-teal-800 text-white"
                  data-testid="button-registration-submit"
                >
                  {mutation.isPending
                    ? page.registration.submitting
                    : page.registration.submit}
                </Button>
                {mutation.isError && (
                  <p className="text-sm text-red-600 text-center">
                    {page.registration.error}
                  </p>
                )}
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function HeroSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section className="bg-slate-50 pt-10 pb-14 md:pt-16 md:pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-14 lg:gap-y-12 items-start">
          <div className="space-y-5 lg:col-start-1 lg:row-start-1">
            <p className="text-sm font-medium text-teal-700 tracking-wide">
              {page.hero.eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 leading-tight">
              {page.hero.heading}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {page.hero.subheading}
            </p>
            <ul className="space-y-2.5 text-slate-700">
              {page.hero.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              {[
                { icon: Clock, ...page.hero.featureCards[0] },
                { icon: Users, ...page.hero.featureCards[1] },
                { icon: ShieldCheck, ...page.hero.featureCards[2] },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-lg p-2.5 sm:p-3"
                    data-testid={`card-feature-${i}`}
                  >
                    <Icon className="w-4 h-4 text-teal-700 mb-1.5" strokeWidth={2} />
                    <div className="text-[13px] sm:text-sm font-semibold text-slate-900 leading-tight">
                      {card.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5">
                      {card.subtitle}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors text-sm"
                data-testid="button-primary-cta"
              >
                {page.cta.book} <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-5 py-3 bg-white border border-slate-300 hover:border-teal-600 hover:text-teal-700 text-slate-700 font-medium rounded-lg transition-colors text-sm"
                data-testid="button-write-inquiry"
              >
                {page.cta.write} <Mail className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
          <WorkshopFitInline />
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-7 lg:col-start-2 lg:row-start-1">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                {page.hero.contactTitle}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {page.hero.contactBody}
              </p>
            </div>
            <WorkshopContactFormComponent id="contact-form" />
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 mb-1.5">
                {page.hero.directContact}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-teal-700 hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="text-teal-700 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkshopFitInline() {
  return (
    <div className="lg:col-span-2 lg:row-start-2">
      <div className="text-center mb-6">
        <span className="inline-block bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
          {page.fit.eyebrow}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-3">
          {page.fit.heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {page.fit.body}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {page.fit.cards.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-slate-200 rounded-lg p-4"
          >
            <h3 className="font-semibold text-slate-900 text-sm mb-1.5">
              {item.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelevanceSection() {
  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center leading-snug">
          {page.relevance.heading}
        </h2>
        <p className="text-slate-600 leading-relaxed text-center mb-8">
          {page.relevance.body}
        </p>
        <div className="space-y-3">
          {page.relevance.points.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 bg-white rounded-lg p-4 border border-slate-200"
            >
              <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SixStepSection() {
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
            {page.steps.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-snug">
            {page.steps.heading}
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {page.steps.subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {page.steps.items.map((item, i) => (
            <Card key={item.title} className="border-slate-200 bg-white">
              <CardContent className="p-5">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-sm flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10 text-center">
          {page.outcomes.heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {page.outcomes.items.map((item) => (
            <Card key={item.title} className="border-slate-200">
              <CardContent className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContentSection() {
  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center">
          {page.content.heading}
        </h2>
        <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
          {page.content.subheading}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {page.content.blocks.map((item) => (
            <Card key={item.title} className="border-slate-200 bg-white">
              <CardContent className="p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
            {page.content.facts.map((fact, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          {page.faq.heading}
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {page.faq.items.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white border border-slate-200 rounded-lg px-5 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="text-left text-sm font-medium text-slate-900 hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600 leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTASection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section className="bg-slate-900 text-white py-14 md:py-18 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
          {page.finalCta.heading}
        </h2>
        <p className="text-slate-300 mb-8 leading-relaxed">
          {page.finalCta.body}
        </p>
        <button
          type="button"
          onClick={onOpenBooking}
          className="inline-flex items-center justify-center px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors"
          data-testid="button-final-cta"
        >
          {page.finalCta.ctaButton}
        </button>
        <p className="text-sm text-slate-400 mt-6">
          {page.finalCta.directContact}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 text-sm text-slate-400">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
          </a>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          {page.finalCta.reassurance}
        </p>
      </div>
    </section>
  );
}

function StickyBanner({
  onOpenBooking,
  onWrite,
}: {
  onOpenBooking: () => void;
  onWrite: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const tel = siteConfig.contact.phone.replace(/\s+/g, "");

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setVisible(scrolled / max >= 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-6 pointer-events-none transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div
        className="pointer-events-auto relative mx-auto max-w-5xl rounded-2xl bg-teal-700 text-white shadow-2xl ring-1 ring-black/5"
        data-testid="sticky-banner"
        role="region"
        aria-label={page.stickyBanner.title}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 p-4 sm:p-5">
          <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
            <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full bg-white/15 items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-base sm:text-lg leading-tight">
                {page.stickyBanner.title}
              </p>
              <p className="hidden sm:block text-sm text-white/85 mt-0.5">
                {page.stickyBanner.subtitle}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:flex-shrink-0">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-teal-800 hover:bg-teal-50 font-medium text-sm transition-colors"
              data-testid="button-banner-book"
            >
              {page.stickyBanner.bookButton}
              <CalendarIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onWrite}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/70 text-white hover:bg-white/10 font-medium text-sm transition-colors"
              data-testid="button-banner-write"
            >
              <Mail className="w-4 h-4" />
              {page.stickyBanner.writeButton}
            </button>
            <a
              href={`tel:${tel}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/70 text-white hover:bg-white/10 font-medium text-sm transition-colors"
              data-testid="link-banner-call"
            >
              <Phone className="w-4 h-4" />
              {page.stickyBanner.callButton} {siteConfig.contact.phone}
            </a>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 sm:static sm:ml-1 flex-shrink-0 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={page.stickyBanner.dismiss}
            data-testid="button-banner-dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MinimalHeader() {
  const { toast } = useToast();
  const digits = siteConfig.contact.phone.replace(/\D+/g, "").replace(/^298/, "");
  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(digits);
      } else {
        const ta = document.createElement("textarea");
        ta.value = digits;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast({ title: page.header.numberCopied });
    } catch {
      toast({ title: page.header.numberCopied });
    }
  };
  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img
            src="/logo-header.png"
            alt={siteConfig.siteName}
            className="h-7 w-7 object-contain"
          />
          <span className="font-semibold text-slate-900">{siteConfig.siteName}</span>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-teal-600 text-teal-700 hover:bg-teal-50 text-sm font-medium transition-colors"
          data-testid="button-copy-number"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{page.header.callNow} </span>
          <span>{siteConfig.contact.phone}</span>
        </button>
      </div>
    </header>
  );
}

export default function AIWorkshopLanding() {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  // Title and meta description are owned by the prerender step
  // (scripts/prerender-seo.ts via client/src/content/seo/registry.seo.ts).

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <MinimalHeader />
      <HeroSection onOpenBooking={() => setRegistrationOpen(true)} />
      <RegistrationDialog open={registrationOpen} onOpenChange={setRegistrationOpen} />
      <RelevanceSection />
      <SixStepSection />
      <OutcomesSection />
      <ContentSection />
      <FAQSection />
      <FinalCTASection onOpenBooking={() => setRegistrationOpen(true)} />
      <StickyBanner
        onOpenBooking={() => setRegistrationOpen(true)}
        onWrite={() => {
          const form = document.getElementById("contact-form");
          if (form) {
            form.scrollIntoView({ behavior: "smooth", block: "start" });
            window.setTimeout(() => {
              const input = form.querySelector<HTMLInputElement>('input[name="name"]');
              if (input) {
                input.focus({ preventScroll: true });
              }
            }, 600);
          }
        }}
      />
    </div>
  );
}