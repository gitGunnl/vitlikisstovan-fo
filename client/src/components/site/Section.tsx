import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("w-full", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative">
        {/* Subtle decorative elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] rounded-2xl" />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: '4rem 4rem'
            }}
          />
        </div>
        
        {/* Content wrapper with improved spacing */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Optional decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/10 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/10 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/10 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/10 rounded-br-lg pointer-events-none" />
      </div>
    </section>
  );
}
