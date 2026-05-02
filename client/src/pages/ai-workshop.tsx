import { useState, useEffect, useRef } from "react";
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
import { reportFormFailure } from "@/lib/reportFormFailure";
import { siteConfig } from "@/content/site";
import { workshopStrings as t } from "@/content/ai-workshop-strings";
import {
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  Quote,
  Star,
  Clock,
  Users,
  ShieldCheck,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { bookingRequestSchema, type BookingRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

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
        reportFormFailure("workshop-landing", err);
        throw err;
      }

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
        {mutation.isError && (
          <p className="text-sm text-red-600 text-center">{t.form.errorMessage}</p>
        )}
      </form>
    </Form>
  );
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getNextWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(d));
  }
  return days;
}

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const BOOKING_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
];

function getTakenSlots(dateIso: string): Set<string> {
  const taken = new Set<string>();
  BOOKING_SLOTS.forEach((slot, i) => {
    const h = hashString(`${dateIso}-${slot}-vitliki`);
    if (h % 2 === 0) taken.add(slot);
  });
  return taken;
}

function BookingDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const days = getNextWeekdays(14);
  const [selectedDate, setSelectedDate] = useState<string>(isoDate(days[0]));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string; time?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const taken = getTakenSlots(selectedDate);

  const mutation = useMutation({
    mutationFn: async (data: BookingRequest) => {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    },
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; time?: string } = {};
    if (!selectedTime) newErrors.time = t.booking.selectSlotFirst;
    const parsedEmail = bookingRequestSchema.shape.email.safeParse(email);
    if (!parsedEmail.success) newErrors.email = parsedEmail.error.issues[0]?.message;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    mutation.mutate({ email, date: selectedDate, time: selectedTime! });
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      setTimeout(() => {
        setSubmitted(false);
        setSelectedTime(null);
        setEmail("");
        setErrors({});
        mutation.reset();
      }, 200);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-booking">
        {submitted ? (
          <div className="py-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border border-green-200 mb-5">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {t.booking.successTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
              {t.booking.successBody}
            </p>
            <Button
              onClick={() => handleOpenChange(false)}
              className="bg-teal-700 hover:bg-teal-800 text-white"
              data-testid="button-booking-close"
            >
              {t.booking.close}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-slate-900">{t.booking.title}</DialogTitle>
              <DialogDescription className="text-slate-600">
                {t.booking.subtitle}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.booking.dateLabel}
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {days.map((d) => {
                    const iso = isoDate(d);
                    const active = iso === selectedDate;
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => {
                          setSelectedDate(iso);
                          setSelectedTime(null);
                          setErrors((e) => ({ ...e, time: undefined }));
                        }}
                        className={`flex-shrink-0 px-3 py-2 rounded-lg border text-sm transition-colors ${
                          active
                            ? "bg-teal-700 text-white border-teal-700"
                            : "bg-white text-slate-700 border-slate-200 hover:border-teal-400"
                        }`}
                        data-testid={`button-date-${iso}`}
                      >
                        <div className="font-semibold">{t.booking.weekdays[d.getDay()]}</div>
                        <div className="text-xs opacity-90">
                          {d.getDate()}. {t.booking.months[d.getMonth()].slice(0, 3)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.booking.timeLabel}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {BOOKING_SLOTS.map((slot) => {
                    const isTaken = taken.has(slot);
                    const active = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isTaken}
                        onClick={() => {
                          setSelectedTime(slot);
                          setErrors((e) => ({ ...e, time: undefined }));
                        }}
                        className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                          isTaken
                            ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed line-through"
                            : active
                            ? "bg-teal-700 text-white border-teal-700"
                            : "bg-white text-slate-700 border-slate-200 hover:border-teal-400"
                        }`}
                        data-testid={`button-time-${slot}`}
                      >
                        {slot}
                        {isTaken && (
                          <div className="text-[10px] text-slate-400 mt-0.5 no-underline">
                            {t.booking.taken}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {errors.time && (
                  <p className="text-sm text-red-600 mt-2">{errors.time}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.booking.emailLabel}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((er) => ({ ...er, email: undefined }));
                  }}
                  placeholder={t.booking.emailPlaceholder}
                  className="bg-white border-slate-200"
                  data-testid="input-booking-email"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1.5">{errors.email}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-5 text-base font-medium bg-teal-700 hover:bg-teal-800 text-white"
                data-testid="button-booking-submit"
              >
                {mutation.isPending ? t.booking.submitting : t.booking.submit}
              </Button>
              {mutation.isError && (
                <p className="text-sm text-red-600 text-center">{t.booking.error}</p>
              )}
            </form>
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
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              {[
                { icon: Clock, ...t.featureCards[0] },
                { icon: Users, ...t.featureCards[1] },
                { icon: ShieldCheck, ...t.featureCards[2] },
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
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors text-sm"
                data-testid="button-primary-cta"
              >
                {t.ctaButtons.primary} <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center px-5 py-3 bg-white border border-slate-300 hover:border-teal-600 hover:text-teal-700 text-slate-700 font-medium rounded-lg transition-colors text-sm"
                data-testid="button-open-booking"
              >
                {t.ctaButtons.secondary} <CalendarIcon className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
          <TrustStripInline />
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-7 lg:col-start-2 lg:row-start-1">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                Skriva til mín her
              </h3>
              <p>ella skriva til: info@vitlikisstovan.fo</p>
            </div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type TestimonialQuote = {
  quote: string;
  name: string;
  role: string;
  org: string;
};

function TestimonialMarquee({ quotes }: { quotes: readonly TestimonialQuote[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let third = 0;
    let offset = 0;

    const apply = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const measure = () => {
      const newThird = track.scrollWidth / 3;
      if (newThird <= 0) return;
      if (third === 0) {
        offset = newThird;
      } else {
        const ratio = newThird / third;
        offset *= ratio;
        if (isDragging) dragStartOffset *= ratio;
      }
      third = newThird;
      apply();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const speed = 14;
    const pauseAfterInteraction = 3500;
    let pausedUntil = 0;
    let lastTime = performance.now();
    let raf = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let activePointerId: number | null = null;

    const wrapOffset = () => {
      if (third <= 0) return;
      if (offset >= third * 2) offset -= third;
      else if (offset < 0) offset += third;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!reduceMotion && !isDragging && now >= pausedUntil && third > 0) {
        offset += speed * dt;
        wrapOffset();
        apply();
      }
      raf = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDragging = true;
      activePointerId = e.pointerId;
      dragStartX = e.clientX;
      dragStartOffset = offset;
      pausedUntil = performance.now() + pauseAfterInteraction;
      try { wrap.setPointerCapture(e.pointerId); } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || e.pointerId !== activePointerId) return;
      const dx = e.clientX - dragStartX;
      offset = dragStartOffset - dx;
      if (third > 0) {
        if (offset >= third * 2) {
          offset -= third;
          dragStartOffset -= third;
        } else if (offset < 0) {
          offset += third;
          dragStartOffset += third;
        }
      }
      apply();
    };

    const endDrag = (e: PointerEvent) => {
      if (e.pointerId !== activePointerId) return;
      isDragging = false;
      activePointerId = null;
      pausedUntil = performance.now() + pauseAfterInteraction;
      try { wrap.releasePointerCapture(e.pointerId); } catch {}
    };

    const onWheel = (e: WheelEvent) => {
      if (isDragging) return;
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (dx === 0) return;
      e.preventDefault();
      offset += dx;
      wrapOffset();
      apply();
      pausedUntil = performance.now() + pauseAfterInteraction;
    };

    const onVisibility = () => {
      lastTime = performance.now();
    };

    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerup", endDrag);
    wrap.addEventListener("pointercancel", endDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    wrap.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerup", endDrag);
      wrap.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      wrap.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
    };
  }, [quotes]);

  return (
    <div className="md:hidden -mx-4 sm:-mx-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        ref={wrapRef}
        className="overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1, 2].map((copy) => (
            <div
              key={copy}
              className="flex gap-3 pr-3 shrink-0"
              aria-hidden={copy !== 0 ? true : undefined}
            >
              {quotes.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-lg p-3 w-[80vw] sm:w-[55vw] shrink-0"
                >
                  <p className="text-[13px] text-slate-700 leading-snug mb-1.5">
                    "{item.quote}"
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800">{item.name}</span>, {item.role} · {item.org}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustStripInline() {
  return (
    <div className="lg:col-span-2 lg:row-start-2">
      <div className="text-center mb-5">
        <span className="inline-block bg-teal-100 text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
          Kunda viðmerkingar
        </span>
        <h2 className="text-xl font-bold text-slate-900 leading-tight mb-3">
          {t.trustStrip.heading}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px bg-slate-300 w-10" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 text-amber-400" strokeWidth={1.5} fill="none" />
          ))}
          <div className="h-px bg-slate-300 w-10" />
        </div>
      </div>
      <TestimonialMarquee quotes={t.trustStrip.quotes} />
      <div className="hidden md:grid md:grid-cols-2 gap-2">
        {t.trustStrip.quotes.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-lg p-3"
          >
            <p className="text-[13px] text-slate-700 leading-snug mb-1.5">
              "{item.quote}"
            </p>
            <p className="text-[11px] text-slate-500">
              <span className="font-semibold text-slate-800">{item.name}</span>, {item.role} · {item.org}
            </p>
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

function StickyBanner({ onOpenBooking, onWrite }: { onOpenBooking: () => void; onWrite: () => void }) {
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
        aria-label={t.stickyBanner.title}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 p-4 sm:p-5">
          <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
            <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full bg-white/15 items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-base sm:text-lg leading-tight">
                {t.stickyBanner.title}
              </p>
              <p className="hidden sm:block text-sm text-white/85 mt-0.5">
                {t.stickyBanner.subtitle}
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
              {t.stickyBanner.bookButton}
              <CalendarIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onWrite}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/70 text-white hover:bg-white/10 font-medium text-sm transition-colors"
              data-testid="button-banner-write"
            >
              <Mail className="w-4 h-4" />
              {t.stickyBanner.writeButton}
            </button>
            <a
              href={`tel:${tel}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/70 text-white hover:bg-white/10 font-medium text-sm transition-colors"
              data-testid="link-banner-call"
            >
              <Phone className="w-4 h-4" />
              {t.stickyBanner.callButton} {siteConfig.contact.phone}
            </a>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 sm:static sm:ml-1 flex-shrink-0 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t.stickyBanner.dismiss}
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
      toast({ title: t.header.numberCopied });
    } catch {
      toast({ title: t.header.numberCopied });
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
          <span className="hidden sm:inline">{t.header.callNow} </span>
          <span>{siteConfig.contact.phone}</span>
        </button>
      </div>
    </header>
  );
}

export default function AIWorkshopLanding() {
  const [bookingOpen, setBookingOpen] = useState(false);
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
      <HeroSection onOpenBooking={() => setBookingOpen(true)} />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      <RelevanceSection />
      <SocialProofSection />
      <OutcomesSection />
      <ContentSection />
      <FAQSection />
      <FinalCTASection />
      <StickyBanner
        onOpenBooking={() => setBookingOpen(true)}
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
