import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactFormSchema, type ContactForm } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface InlineContactFormProps {
  serviceName: string;
}

export default function InlineContactForm({ serviceName }: InlineContactFormProps) {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const formData = new FormData();
      formData.append("entry.1179687836", data.name);
      formData.append("entry.263197538", data.email);
      formData.append("entry.240567695", `[${serviceName}] ${data.message}`);

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
      toast({
        title: "Boðið er sent!",
        description: "Takk fyri títt boð. Vit svara tær skjótt.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Villa",
        description: error.message || "Miseydnaðist at senda boðið. Royn aftur.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="rounded-2xl border bg-card p-6 sm:p-8">
      <h2 className="text-xl font-semibold mb-1">Áhugað/ur?</h2>
      <p className="text-muted-foreground mb-6 text-sm">
        Skriva okkum, so taka vit samband skjótt.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/90 font-medium">Navn</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Títt navn" autoComplete="name" />
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
                <FormLabel className="text-foreground/90 font-medium">Teldupostur</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="tín.teldupostur@dømi.fo"
                    autoComplete="email"
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
                <FormLabel className="text-foreground/90 font-medium">Boð</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    placeholder="Hvat kunnu vit hjálpa tær við?"
                    className="resize-none"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={contactMutation.isPending}
            className="w-full py-5 font-semibold shadow-sm"
          >
            <span className="flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {contactMutation.isPending ? "Sendir..." : "Send boð"}
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
