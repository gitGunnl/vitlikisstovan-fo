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
}

export default function CTAButtons({ primary, secondary, className }: CTAButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className || ''}`}>
      <Button asChild size="lg" data-testid={primary.testId}>
        <a href={primary.href}>
          {primary.text}
        </a>
      </Button>
      {secondary && (
        <Button variant="outline" asChild size="lg" data-testid={secondary.testId}>
          <a href={secondary.href}>
            {secondary.text}
          </a>
        </Button>
      )}
    </div>
  );
}
