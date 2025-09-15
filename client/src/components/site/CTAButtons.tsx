import { Button } from "@/components/ui/button";

interface CTAButton {
  text: string;
  href: string;
}

interface CTAButtonsProps {
  primary: CTAButton;
  secondary?: CTAButton;
  className?: string;
}

export default function CTAButtons({ primary, secondary, className }: CTAButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in ${className || ''}`}>
      {primary && (
        <Button asChild className="group h-auto py-2.5 px-5 sm:py-3 sm:px-6 text-sm sm:text-base">
          <a href={primary.href} data-testid="button-primary-cta">
            <span className="relative">
              {primary.text}
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {primary.text}
              </span>
            </span>
          </a>
        </Button>
      )}
      {secondary && (
        <Button asChild variant="outline" className="group bg-white/10 border-white/30 text-white hover:bg-white/20 h-auto py-2.5 px-5 sm:py-3 sm:px-6 text-sm sm:text-base">
          <a href={secondary.href} data-testid="button-secondary-cta">
            <span className="relative">
              {secondary.text}
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {secondary.text}
              </span>
            </span>
          </a>
        </Button>
      )}
    </div>
  );
}
