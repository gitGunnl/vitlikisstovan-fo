import { Button } from "@/components/ui/button";

interface CTAButton {
  text: string;
  href: string;
  testId?: string;
}

interface CTAButtonsProps {
  primary: CTAButton;
  secondary?: CTAButton;
  className?: string;
  heroMode?: boolean;
}

export default function CTAButtons({ primary, secondary, className, heroMode = false }: CTAButtonsProps) {
  const primaryButtonClass = heroMode ? "btn-primary" : "";
  const secondaryButtonClass = heroMode ? "btn-secondary" : "";
  
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className || ''}`}>
      <Button 
        asChild 
        size="lg" 
        data-testid={primary.testId}
        className={primaryButtonClass}
      >
        <a href={primary.href}>
          {primary.text}
        </a>
      </Button>
      {secondary && (
        <Button 
          variant="outline" 
          asChild 
          size="lg" 
          data-testid={secondary.testId}
          className={secondaryButtonClass}
        >
          <a href={secondary.href}>
            {secondary.text}
          </a>
        </Button>
      )}
    </div>
  );
}
