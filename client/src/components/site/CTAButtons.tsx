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
  // Check if primary button text is long (more than 30 characters)
  const isPrimaryLong = primary && primary.text.length > 30;
  
  return (
    <div className={`flex flex-col gap-3 sm:gap-4 justify-center items-center animate-fade-in ${className || ''}`}>
      {primary && (
        <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
          {isPrimaryLong && (
            <p className="text-white/95 text-xs sm:text-base text-center leading-relaxed max-w-md px-2 sm:px-4">
              {primary.text}
            </p>
          )}
          {(isPrimaryLong || primary.text === "Les meira") ? (
            <Button 
              onClick={() => {
                const element = document.querySelector('#program');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group h-auto py-2.5 px-5 sm:py-3 sm:px-6 text-xs sm:text-base whitespace-normal text-center leading-tight min-h-[40px] sm:min-h-[48px] flex items-center justify-center"
              data-testid="button-primary-cta"
            >
              <span className="relative block leading-tight">
                Les meira
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Les meira
                </span>
              </span>
            </Button>
          ) : (
            <Button asChild className="group h-auto py-2.5 px-5 sm:py-3 sm:px-6 text-xs sm:text-base whitespace-normal text-center leading-tight min-h-[40px] sm:min-h-[48px] flex items-center justify-center">
              <a href={primary.href} data-testid="button-primary-cta" className="flex items-center justify-center text-center">
                <span className="relative block leading-tight">
                  {primary.text}
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {primary.text}
                  </span>
                </span>
              </a>
            </Button>
          )}
        </div>
      )}
      {secondary && (
        <Button asChild variant="outline" className="group bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/25 hover:border-white/60 h-auto py-2.5 px-5 sm:py-4 sm:px-8 text-xs sm:text-base whitespace-normal text-center leading-tight min-h-[40px] sm:min-h-[48px] flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium">
          <a href={secondary.href} data-testid="button-secondary-cta" className="flex items-center justify-center text-center">
            <span className="relative block leading-tight">
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
