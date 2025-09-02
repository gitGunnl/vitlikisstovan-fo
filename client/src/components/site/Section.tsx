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
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
