import { Workshop, Lab } from "@/data/workshops";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Users } from "lucide-react";

interface WorkshopLandingPageProps {
  workshop: Workshop;
  onLabSelect: (lab: Lab) => void;
}

export function WorkshopLandingPage({ workshop, onLabSelect }: WorkshopLandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Users className="h-4 w-4" />
            <span>{workshop.company}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Vælkomin til {workshop.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vel tað lab, sum tú vil arbeiða við í dag. Hvørt lab hevur sítt egna fokus og mál.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {workshop.labs.map((lab) => (
            <Card 
              key={lab.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              data-testid={`card-lab-${lab.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-primary mb-3" />
                  <div className="bg-muted px-3 py-1 rounded-full text-sm">
                    {lab.steps.length} stig
                  </div>
                </div>
                <CardTitle className="text-2xl">{lab.name}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {lab.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold mb-2">Innihaldar:</p>
                    <ul className="space-y-1">
                      {lab.steps.slice(0, 3).map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="line-clamp-1">{step.title}</span>
                        </li>
                      ))}
                      {lab.steps.length > 3 && (
                        <li className="flex items-start gap-2 text-muted-foreground/70">
                          <span>•</span>
                          <span>...og {lab.steps.length - 3} fleiri stig</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <Button 
                    className="w-full mt-4"
                    size="lg"
                    onClick={() => onLabSelect(lab)}
                    data-testid={`button-select-lab-${lab.id}`}
                  >
                    Byrja {lab.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Tú kanst altíð koma aftur til hesa síðuna fyri at velja eitt annað lab.
          </p>
        </div>
      </div>
    </div>
  );
}