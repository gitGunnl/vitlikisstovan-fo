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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { guideFeedbackSchema, type GuideFeedbackRequest } from "@shared/schema";
import { siteConfig } from "@/content/site";
import { reportFormFailure } from "@/lib/reportFormFailure";
import { getInteractiveGuide } from "@/content/guides";
import { CheckCircle2, Flag, Send, X } from "lucide-react";

const DISMISS_KEY = "guideFeedbackDismissed";

// While any config value still contains "PLACEHOLDER", the feedback Google Form
// has not been wired up yet. In that case we throw on submit (showing an error
// toast) rather than silently dropping the reader's report — mirroring the
// workshop registration form's behavior.
function isFeedbackFormConfigured(): boolean {
  const cfg = siteConfig.guideFeedbackForm;
  return ![
    cfg.formResponseUrl,
    cfg.entryMessage,
    cfg.entryEmail,
    cfg.entryGuide,
  ].some((v) => v.includes("PLACEHOLDER"));
}

function GuideFeedbackForm({
  guideLabel,
  onSuccess,
}: {
  guideLabel: string;
  onSuccess: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<GuideFeedbackRequest>({
    resolver: zodResolver(guideFeedbackSchema),
    defaultValues: {
      message: "",
      email: "",
      guide: guideLabel,
      website: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: GuideFeedbackRequest) => {
      // Honeypot — silently no-op for bots so we don't leak junk to the form.
      if (data.website && data.website.length > 0) {
        return { success: true };
      }

      if (!isFeedbackFormConfigured()) {
        throw new Error(
          "Afturmeldingarforminum er ikki sett upp enn. Send heldur teldupost til " +
            siteConfig.contact.email,
        );
      }

      const cfg = siteConfig.guideFeedbackForm;
      const formData = new FormData();
      formData.append(cfg.entryMessage, data.message);
      if (data.email) formData.append(cfg.entryEmail, data.email);
      formData.append(cfg.entryGuide, guideLabel);

      try {
        await fetch(cfg.formResponseUrl, {
          method: "POST",
          body: formData,
          mode: "no-cors",
          signal: AbortSignal.timeout(10000),
        });
      } catch (err) {
        reportFormFailure("guide-feedback", err);
        throw err;
      }

      // no-cors → opaque response. Treat a non-thrown fetch as success.
      return { success: true };
    },
    onSuccess: () => {
      form.reset();
      onSuccess();
      toast({
        title: "Takk fyri!",
        description: "Vit hava fingið tína afturmelding.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Okkurt fór skeivt",
        description:
          error.message ||
          "Vit kundu ikki taka ímóti afturmeldingini júst nú. Royn aftur.",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-sm font-medium text-stone-700 dark:text-stone-300">
                Hvat er feilurin?
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder="T.d. ein skrivivilla, ein byrt sum ikki riggar, ella okkurt sum kann gerast betur…"
                  className="resize-none"
                  data-testid="textarea-feedback-message"
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
              <FormLabel className="font-sans text-sm font-medium text-stone-700 dark:text-stone-300">
                Teldupostur{" "}
                <span className="font-normal text-stone-400">
                  (valfrítt — um tú vil hava svar)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="tín.teldupostur@dømi.fo"
                  autoComplete="email"
                  data-testid="input-feedback-email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full font-sans"
          data-testid="button-feedback-submit"
        >
          <Send className="mr-2 h-4 w-4" />
          {mutation.isPending ? "Sendir…" : "Send afturmelding"}
        </Button>
      </form>
    </Form>
  );
}

export default function GuideFeedback({ guideId }: { guideId: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const guide = getInteractiveGuide(guideId);
  // Identifies which guide the report is about, even without a live lookup.
  const guideLabel = guide ? `${guide.title} (${guide.route})` : guideId;

  // Remember dismissal for the session so the widget doesn't nag on every guide.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      /* sessionStorage unavailable — keep showing the widget */
    }
  }, []);

  // Open the dialog when the user follows a "#feedback" link (e.g. the mention
  // inside the "Um hesa vegleiðingina" section).
  useEffect(() => {
    const openIfHash = () => {
      if (window.location.hash === "#feedback") setOpen(true);
    };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* Anchor target so "#feedback" links land near the bottom of the guide. */}
      <span id="feedback" aria-hidden="true" className="block scroll-mt-24" />

      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            setTimeout(() => setSubmitted(false), 200);
            // Clear the hash so the dialog can be re-opened via the link again.
            if (window.location.hash === "#feedback") {
              history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search,
              );
            }
          }
        }}
      >
        <DialogContent className="max-w-md sm:max-w-lg">
          {!submitted ? (
            <>
              <DialogHeader className="text-left">
                <DialogTitle>Funni ein feil?</DialogTitle>
                <DialogDescription>
                  Tú hjálpir okkum at halda vegleiðingunum rættar. Sig okkum
                  frá, hvat tú fanst.
                </DialogDescription>
              </DialogHeader>
              <GuideFeedbackForm
                guideLabel={guideLabel}
                onSuccess={() => setSubmitted(true)}
              />
            </>
          ) : (
            <div className="py-6 text-center" data-testid="feedback-success">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <DialogTitle className="text-xl">Takk fyri!</DialogTitle>
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                Vit hyggja eftir tí, tú hevur sent, og rætta vegleiðingina.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating pill, dismissable with the X. */}
      {!dismissed && (
        <div className="no-print fixed bottom-4 right-4 z-40 flex items-center rounded-full bg-stone-900 text-stone-50 shadow-lg ring-1 ring-black/5 dark:bg-stone-100 dark:text-stone-900 dark:ring-white/10">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-l-full py-2.5 pl-4 pr-3 font-sans text-sm font-medium transition-colors hover:bg-stone-800 dark:hover:bg-stone-200"
            data-testid="button-open-feedback"
          >
            <Flag className="h-4 w-4" />
            Funni ein feil?
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Lat afturmeldingar-knappin aftur"
            className="rounded-r-full border-l border-white/15 py-2.5 pl-2 pr-3 text-stone-400 transition-colors hover:text-stone-50 dark:border-black/10 dark:text-stone-500 dark:hover:text-stone-900"
            data-testid="button-dismiss-feedback"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
