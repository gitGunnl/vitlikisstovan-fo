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
import {
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
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
      setSubmitted(true);
      form.reset();
    },
  });

  if (submitted) {
    return (
      <div className="text-center py-10 px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border border-green-200 mb-5">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-3">Thanks — your message has been sent</h3>
        <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
          I'll get back to you as soon as I can. We can then quickly see whether this workshop is a good fit for your team.
        </p>
        <p className="text-sm text-slate-500 mt-6">
          If your question is urgent, feel free to contact me directly by{" "}
          <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="text-teal-700 hover:underline">phone</a> or{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-teal-700 hover:underline">email</a>.
        </p>
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
              <FormLabel className="text-slate-700 text-sm">Name *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your name" autoComplete="name" className="bg-white border-slate-200" />
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
              <FormLabel className="text-slate-700 text-sm">Organization *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your organization" autoComplete="organization" className="bg-white border-slate-200" />
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
              <FormLabel className="text-slate-700 text-sm">Work email *</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="you@organization.fo" autoComplete="email" className="bg-white border-slate-200" />
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
              <FormLabel className="text-slate-700 text-sm">Phone</FormLabel>
              <FormControl>
                <Input {...field} type="tel" placeholder="+298..." autoComplete="tel" className="bg-white border-slate-200" />
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
              <FormLabel className="text-slate-700 text-sm">Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  placeholder="Tell me a little about your team or what you want help with"
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
          {mutation.isPending ? "Sending..." : "Ask about a workshop"}
        </Button>
        <p className="text-xs text-slate-400 text-center pt-1">No pressure. Just a simple first conversation.</p>
        {mutation.isError && (
          <p className="text-sm text-red-600 text-center">Something went wrong. Please try again or email me directly.</p>
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
              Practical AI workshop for Faroese organizations
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 leading-tight">
              Give your office staff a practical starting point with AI
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              A hands-on 3-hour workshop that helps people understand what AI is actually useful for in their work, where it is not, and what is safe to share.
            </p>
            <ul className="space-y-2.5 text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Clearer ideas for what to use AI for in daily work</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Better judgment about where AI helps and where it does not</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Safer and more sensible use across the team</span>
              </li>
            </ul>
            <div className="pt-2 lg:hidden">
              <a href="#contact-form" className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors">
                Ask about a workshop <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-7">
            <WorkshopContactFormComponent id="contact-form" />
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 mb-1.5">Or contact me directly by email or phone</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                <a href={`mailto:${siteConfig.contact.email}`} className="text-teal-700 hover:underline flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
                </a>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="text-teal-700 hover:underline flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-3">I'll reply personally and we can quickly see if this fits your team.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const placeholders = [
    "Organization 1",
    "Organization 2",
    "Organization 3",
    "Organization 4",
    "Organization 5",
  ];

  return (
    <section className="border-y border-slate-100 py-8 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-slate-400 mb-6">Trusted by teams and organizations in the Faroe Islands</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {placeholders.map((name) => (
            <div key={name} className="h-9 px-5 bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
              <span className="text-xs text-slate-400">{name}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-300 mt-5 italic">Comments from previous workshop participants will appear here.</p>
      </div>
    </section>
  );
}

function RelevanceSection() {
  const points = [
    "Your staff are curious about AI, but use is still scattered",
    "People have tried it, but results are often weak or inconsistent",
    "There is uncertainty about what it is safe to share",
    "You want a shared starting point that feels practical, not technical",
  ];

  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center leading-snug">
          This is for organizations that want a clearer and more useful start with AI
        </h2>
        <p className="text-slate-600 leading-relaxed text-center mb-8">
          Many teams know AI matters, but day-to-day use is still unclear. Some people have tested tools like ChatGPT. Some are barely using them. Some are unsure what is safe. Most organizations do not need more hype. They need a practical starting point that helps normal staff use these tools better.
        </p>
        <div className="space-y-3">
          {points.map((point) => (
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
  const outcomes = [
    { title: "A practical starting point", text: "People get a clear and useful introduction to AI in everyday office work, without technical overload." },
    { title: "Better judgment about where AI helps", text: "Each person gets a clearer feel for which tasks AI can help with, and which tasks are better handled without it." },
    { title: "Safer use", text: "People learn simple rules for thinking about what is safe to share and what should stay out of these tools." },
    { title: "More useful results", text: "The workshop shows people how to get better output from tools like ChatGPT by giving clearer instructions and using them more thoughtfully." },
    { title: "Real examples from normal work", text: "The focus is on the kinds of tasks office staff already do: writing, planning, summarising, researching, analysing, structuring, and preparing material." },
    { title: "A shared baseline across the team", text: "Instead of random individual testing, the organization gets a more shared understanding of what good use looks like." },
  ];

  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10 text-center">
          What your people get from the workshop
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {outcomes.map((item) => (
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
  const blocks = [
    { title: "What AI is useful for in normal office work", text: "We look at common tasks where AI can genuinely help, and where it tends to be less useful." },
    { title: "How to get better results", text: "People learn how to ask for better output, give better context, and work with AI in a more effective way." },
    { title: "What not to use it for", text: "A key part of the workshop is judgment. Not every task should be handed to AI, and people need a clearer sense of where the limits are." },
    { title: "Safe use and simple data judgment", text: "We cover practical thinking about what is safe to share, what is not, and how to use these tools more responsibly." },
    { title: "Hands-on practice tied to real work", text: "Participants work with examples and exercises that feel relevant to the kinds of tasks they already do." },
    { title: "A clearer next step after the workshop", text: "People leave with a better idea of how they can start using AI more usefully in their own role." },
  ];

  const facts = [
    "3 hours",
    "Hands-on",
    "For office staff and knowledge work teams",
    "Can be adapted to your organization",
  ];

  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 text-center">
          What the workshop covers
        </h2>
        <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
          The workshop is practical and hands-on. It is built to help people use AI more sensibly in their real work, not just understand the topic in theory.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {blocks.map((item) => (
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
            {facts.map((fact, i) => (
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
  const featured = {
    quote: "[Main testimonial placeholder. Ideally something about the workshop being practical, clear, and immediately useful.]",
    name: "Name",
    role: "Role",
    org: "Organization",
  };

  const smaller = [
    { quote: "[Short testimonial placeholder about the practical approach.]", name: "Name", role: "Role", org: "Organization" },
    { quote: "[Short testimonial placeholder about clearer AI understanding.]", name: "Name", role: "Role", org: "Organization" },
    { quote: "[Short testimonial placeholder about safer use of AI tools.]", name: "Name", role: "Role", org: "Organization" },
    { quote: "[Short testimonial placeholder about useful exercises.]", name: "Name", role: "Role", org: "Organization" },
  ];

  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10 text-center">
          What previous participants said
        </h2>
        <Card className="border-slate-200 mb-6">
          <CardContent className="p-6 sm:p-8">
            <p className="text-lg text-slate-600 leading-relaxed mb-5 italic">"{featured.quote}"</p>
            <p className="text-sm text-slate-500">— {featured.name}, {featured.role}, {featured.org}</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {smaller.map((t, i) => (
            <Card key={i} className="border-slate-200">
              <CardContent className="p-4">
                <p className="text-sm text-slate-600 leading-relaxed mb-3 italic">"{t.quote}"</p>
                <p className="text-xs text-slate-400">— {t.name}, {t.role}, {t.org}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Is this only for people who are already good at AI?",
      a: "No. This workshop is especially relevant for people who are still early in their journey and want a practical, understandable starting point.",
    },
    {
      q: "Is this a technical workshop?",
      a: "No. The focus is on real use in normal work, not on how the technology works under the hood.",
    },
    {
      q: "We have already tried ChatGPT a little. Is this still relevant?",
      a: "Yes. Many teams have tried these tools in a shallow way without getting much value. The workshop helps people use them in a more useful and thoughtful way.",
    },
    {
      q: "Does the workshop cover safe use?",
      a: "Yes. A core part of the workshop is helping people think more clearly about what is safe to share and how to use these tools more sensibly.",
    },
    {
      q: "Who is this most relevant for?",
      a: "It is most relevant for office staff, managers, specialists, and teams doing writing, planning, analysis, communication, reporting, research, documentation, and other knowledge work.",
    },
    {
      q: "What happens if we get in touch?",
      a: "We have a simple first conversation about your team, your needs, and whether the workshop is the right fit.",
    },
  ];

  return (
    <section className="py-14 md:py-18 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
          Questions people often have
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
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
          Want to give your staff a clearer and more useful start with AI?
        </h2>
        <p className="text-slate-300 mb-8 leading-relaxed">
          Get in touch and we can quickly see whether this workshop fits your team.
        </p>
        <a
          href="#contact-form"
          className="inline-flex items-center justify-center px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-colors"
        >
          Ask about a workshop
        </a>
        <p className="text-sm text-slate-400 mt-6">Or contact me directly by email or phone</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 text-sm text-slate-400">
          <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
          </a>
          <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-4">Simple first conversation. No obligation.</p>
      </div>
    </section>
  );
}

export default function AIWorkshopLanding() {
  useEffect(() => {
    document.title = "Practical AI Workshop for Faroese Organizations | Vitlíkisstovan";

    const metaEntries: [string, string][] = [
      ["description", "A hands-on 3-hour AI workshop for Faroese office staff. Practical starting point, safer use, and clearer judgment about what AI is actually useful for at work."],
      ["og:title", "Practical AI Workshop for Faroese Organizations | Vitlíkisstovan"],
      ["og:description", "A hands-on 3-hour AI workshop that helps your team understand what AI is useful for, where it is not, and what is safe to share."],
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
      <HeroSection />
      <TrustStrip />
      <RelevanceSection />
      <OutcomesSection />
      <ContentSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}