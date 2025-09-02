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
    <Card className={className}>
      <CardContent className="p-8">
        {icon && (
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
