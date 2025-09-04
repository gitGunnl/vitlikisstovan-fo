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
    <div className={`flex flex-col sm:flex-row gap-4 justify-center animate-fade-in ${className || ''}`}>
      <Button asChild size="lg" className="group">
        <a href={primary.href} data-testid="button-primary-cta">
          <span className="relative">
            {primary.text}
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {primary.text}
            </span>
          </span>
        </a>
      </Button>
      
    </div>
  );
}
