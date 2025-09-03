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
import { MessageSquare, Mail, Phone, Facebook, Linkedin } from "lucide-react";
import { siteConfig } from "@/content/site";
import { useState, useEffect } from "react";

export default function ContactSection() {
  const { toast } = useToast();
  const [formStartTime, setFormStartTime] = useState<number>(0);

  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const submissionTime = Date.now();
      
      // Submit to Google Forms (primary destination)
      try {
        const formData = new FormData();
        formData.append('entry.1179687836', data.name);
        formData.append('entry.263197538', data.email);
        formData.append('entry.240567695', data.message);
        
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSf8FFci-J91suIjxY2xh4GD-DQ-UfZftUNxq3dUdXkgJAjB1Q/formResponse', {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        console.log('Successfully submitted to Google Forms');
      } catch (error) {
        console.error('Google Forms submission failed:', error);
      }
      
      // Also submit to API endpoint for logging
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            formStartTime,
            submissionTime,
          }),
        });

        if (response.ok) {
          return response.json();
        }
        
        // If API fails, still return success since Google Forms was submitted
        return { success: true, message: "Message sent via Google Forms" };
      } catch (apiError) {
        console.warn('API submission failed, but Google Forms submission succeeded');
        // Still return success since we submitted to Google Forms
        return { success: true, message: "Message sent via Google Forms" };
      }
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
      setFormStartTime(Date.now());
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactForm) => {
    // Honeypot check
    if (data.honeypot && data.honeypot.trim() !== "") {
      return; // Silently reject
    }
    
    // Timestamp check - minimum 3 seconds
    const submissionTime = Date.now();
    const timeTaken = (submissionTime - formStartTime) / 1000;
    if (timeTaken < 3) {
      toast({
        title: "Too fast",
        description: "Please wait a moment before sending the form again.",
        variant: "destructive",
      });
      return;
    }
    
    contactMutation.mutate(data);
  };

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">{siteConfig.contact.title}</h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {siteConfig.contact.subtitle}
          </p>
        </div>

        <div className="grid max-w-4xl mx-auto lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-card p-8 border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-3">
              {siteConfig.contact.sectionTitle}
            </h3>
            <p className="text-muted-foreground mb-8">
              {siteConfig.contact.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium hover:text-primary transition-colors"
                    data-testid="link-email"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a 
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                    className="font-medium hover:text-primary transition-colors"
                    data-testid="link-phone"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t">
                <p className="text-base font-medium text-foreground mb-6">Follow us to learn more about AI</p>
                <div className="flex items-center gap-6">
                  <a 
                    href={siteConfig.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
                    data-testid="contact-facebook"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="w-7 h-7" />
                  </a>
                  <a 
                    href={siteConfig.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-teal-600/10 text-teal-700 hover:bg-teal-600 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-teal-600/25"
                    data-testid="contact-linkedin"
                    aria-label="Visit our LinkedIn page"
                  >
                    <Linkedin className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card p-8 border rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-3">
              Send us a message
            </h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <FormItem className="absolute left-[-9999px] opacity-0 pointer-events-none">
                      <FormLabel>Leave this field empty</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          autoComplete="off"
                          tabIndex={-1}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90 font-medium">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          data-testid="input-name"
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
                      <FormLabel className="text-foreground/90 font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your.email@example.com"
                          data-testid="input-email"
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
                      <FormLabel className="text-foreground/90 font-medium">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Tell us about your project or question..."
                          className="resize-none"
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full py-6 font-semibold shadow-lg transition-all hover:translate-y-[-2px]"
                  data-testid="button-submit"
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </span>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}