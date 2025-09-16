import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CardFeatureProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function CardFeature({ icon, title, description, className }: CardFeatureProps) {
  return (
    <Card className={`group hover:bg-accent/5 ${className || ''}`}>
      <CardContent className="p-4">
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
