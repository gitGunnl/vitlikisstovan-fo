import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { workshopContactFormSchema, type WorkshopContactForm } from "@shared/schema";
import { siteConfig } from "@/content/site";
import { workshopStrings as t } from "@/content/ai-workshop-strings";
import {
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  Quote,
} from "lucide-react";

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
      formData.append("entry.240567695", `[Workshop LP] Org: ${data.organization} | Phone: ${data.phone || "N/A"} | ${data.message || ""}`);

      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSf8FFci-J91suIjxY2xh4GD-DQ-UfZftUNxq3dUdXkgJAjB1Q/formResponse",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
          signal: AbortSignal.timeout(10000),
        }
      );

      return { success: true };
    },
    onSuccess: () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'AI Workshop Contact Form',
          content_category: 'workshop',
        });
      }
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
          <h3 className="text-xl font-semibold text-slate-900 mb-3">{t.formSuccess.heading}</h3>
          <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
            {t.formSuccess.body}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-5 mb-6">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">{t.formSuccess.whatHappensNext}</h4>
          <ol className="space-y-2.5">
            {t.formSuccess.steps.map((step, i) => (
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
            {t.formSuccess.urgentPrefix}{" "}
            <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="text-teal-700 hover:underline">{t.formSuccess.phone}</a> {t.formSuccess.or}{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-teal-700 hover:underline">{t.formSuccess.email}</a>.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <p className="text-sm font-medium text-slate-700 text-center mb-4">{t.formSuccess.exploreHeading}</p>
          <div className="flex flex-col gap-2.5">
            {t.formSuccess.exploreLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-4 py-3.5 rounded-lg border border-teal-200 bg-teal-50 hover:bg-teal-100 hover:border-teal-300 transition-colors group"
              >
                <span className="text-sm font-semibold text-teal-800">{link.label}</span>
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
      <form id={id} onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 text-sm">{t.form.nameLabel}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t.form.namePlaceholder} autoComplete="name" className="bg-white border-slate-200" />
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
              <FormLabel className="text-slate-700 text-sm">{t.form.organizationLabel}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t.form.organizationPlaceholder} autoComplete="organization" className="bg-white border-slate-200" />
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
              <FormLabel className="text-slate-700 text-sm">{t.form.workEmailLabel}</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder={t.form.workEmailPlaceholder} autoComplete="email" className="bg-white border-slate-200" />
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
              <FormLabel className="text-slate-700 text-sm">{t.form.phoneLabel}</FormLabel>
              <FormControl>
                <Input {...field} type="tel" placeholder={t.form.phonePlaceholder} autoComplete="tel" className="bg-white border-slate-200" />
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
              <FormLabel className="text-slate-700 text-sm">{t.form.messageLabel}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  placeholder={t.form.messagePlaceholder}
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
          {mutation.isPending ? t.form.submitting : t.form.submitButton}
        </Button>
        <p className="text-xs text-slate-400 text-center pt-1">{t.form.reassurance}</p>
        {mutation.isError && (
          <p className="text-sm text-red-600 text-center">{t.form.errorMessage}</p>
        )}
      </form>
    </Form>
  );
}

function HeroSection() {
  return (
    <section className="bg-slate-50 pt-10 pb-14 md:pt-16 md:pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="space-y-5">
            <p className="text-sm font-medium text-teal-700 tracking-wide">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 leading-tight">
              {t.hero.heading}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.hero.subheading}
            </p>
            <ul className="space-y-2.5 text-slate-700">
              {t.hero.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 lg:hidden">
              <a href="#contact-form" className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors">
                {t.hero.ctaButton} <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-7">
            <WorkshopContactFormComponent id="contact-form" />
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 mb-1.5">{t.hero.directContact}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                <a href={`mailto:${siteConfig.contact.email}`} className="text-teal-700 hover:underline flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
                </a>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="text-teal-700 hover:underline flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-3">{t.hero.replyNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="bg-white py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-slate-400 mb-5 text-center tracking-wide uppercase">
          {t.trustStrip.heading}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {t.trustStrip.quotes.map((item, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col"
            >
              <Quote className="w-4 h-4 text-teal-500/40 mb-2 rotate-180" />
              <p className="text-[13px] text-slate-700 leading-relaxed flex-1 mb-3">
                {item.quote}
              </p>
              <div className="border-t border-slate-200 pt-2">
                <p className="text-xs font-semibold text-slate-800">{item.name}</p>
                <p className="text-[11px] text-slate-400">
                  {item.role} · {item.org}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelevanceSection() {
  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center leading-snug">
          {t.relevance.heading}
        </h2>
        <p className="text-slate-600 leading-relaxed text-center mb-8">
          {t.relevance.body}
        </p>
        <div className="space-y-3">
          {t.relevance.points.map((point) => (
            <div key={point} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">{point}</span>
            </div>
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
          {t.outcomes.heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.outcomes.items.map((item) => (
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
          {t.content.heading}
        </h2>
        <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.content.subheading}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {t.content.blocks.map((item) => (
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
            {t.content.facts.map((fact, i) => (
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

function SocialProofSection() {
  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("");
  const accentColors = [
    "bg-teal-600 text-white",
    "bg-slate-700 text-white",
    "bg-teal-500 text-white",
  ];

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-12 text-center">
          {t.socialProof.heading}
        </h2>
        <Card className="border-teal-100 bg-white shadow-md mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
          <CardContent className="p-6 sm:p-10">
            <span className="text-5xl leading-none text-teal-300 font-serif select-none" aria-hidden="true">"</span>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-6 italic -mt-4 pl-2">
              {t.socialProof.featured.quote}
            </p>
            <div className="flex items-center gap-3 pl-2">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                {getInitials(t.socialProof.featured.name)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{t.socialProof.featured.name}</p>
                <p className="text-xs text-slate-500">{t.socialProof.featured.role} · {t.socialProof.featured.org}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {t.socialProof.smaller.map((item, i) => (
            <Card key={i} className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200" />
              <CardContent className="p-5">
                <span className="text-3xl leading-none text-slate-200 font-serif select-none" aria-hidden="true">"</span>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 italic -mt-2">
                  {item.quote}
                </p>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs shrink-0 ${accentColors[i % accentColors.length]}`}>
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.role} · {item.org}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
          {t.faq.heading}
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {t.faq.items.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-white border border-slate-200 rounded-lg px-5 data-[state=open]:shadow-sm">
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

function FinalCTASection() {
  return (
    <section className="bg-slate-900 text-white py-14 md:py-18 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
          {t.finalCta.heading}
        </h2>
        <p className="text-slate-300 mb-8 leading-relaxed">
          {t.finalCta.body}
        </p>
        <a
          href="#contact-form"
          className="inline-flex items-center justify-center px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors"
        >
          {t.finalCta.ctaButton}
        </a>
        <p className="text-sm text-slate-400 mt-6">{t.finalCta.directContact}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 text-sm text-slate-400">
          <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
          </a>
          <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-4">{t.finalCta.reassurance}</p>
      </div>
    </section>
  );
}

function MinimalHeader() {
  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="max-w-5xl mx-auto flex items-center h-14 px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img
            src="/logo-header.png"
            alt={siteConfig.siteName}
            className="h-7 w-7 object-contain"
          />
          <span className="font-semibold text-slate-900">{siteConfig.siteName}</span>
        </a>
      </div>
    </header>
  );
}

export default function AIWorkshopLanding() {
  useEffect(() => {
    document.title = t.meta.pageTitle;

    const metaEntries: [string, string][] = [
      ["description", t.meta.description],
      ["og:title", t.meta.ogTitle],
      ["og:description", t.meta.ogDescription],
      ["og:type", "website"],
      ["og:site_name", "Vitlíkisstovan"],
      ["og:url", "https://vitlikisstovan.fo/ai-workshop"],
    ];

    const previousValues: [string, string | null][] = [];

    metaEntries.forEach(([name, content]) => {
      const selector = name.startsWith("og:")
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      previousValues.push([name, el ? el.getAttribute("content") : null]);
      if (!el) {
        el = document.createElement("meta");
        if (name.startsWith("og:")) {
          el.setAttribute("property", name);
        } else {
          el.setAttribute("name", name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });

    return () => {
      document.title = "Vitlíkisstovan";
      previousValues.forEach(([name, prev]) => {
        const selector = name.startsWith("og:")
          ? `meta[property="${name}"]`
          : `meta[name="${name}"]`;
        const el = document.querySelector(selector);
        if (el) {
          if (prev !== null) {
            el.setAttribute("content", prev);
          } else {
            el.remove();
          }
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <MinimalHeader />
      <TrustStrip />
      <HeroSection />
      <RelevanceSection />
      <OutcomesSection />
      <ContentSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
