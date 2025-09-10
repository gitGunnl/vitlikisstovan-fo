import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getWorkshopByPassword, Workshop, WorkshopStep } from "@/data/workshops";
import { Copy, ArrowRight, ArrowLeft, Lock, CheckCircle } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export default function Verkstova() {
  const [password, setPassword] = useState("");
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Set page metadata
    document.title = "Workshop Access | Verkstova Training Solution";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Access your workshop materials and guided prompts for interactive training sessions.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Access your workshop materials and guided prompts for interactive training sessions.';
      document.head.appendChild(meta);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundWorkshop = getWorkshopByPassword(password);
    
    if (foundWorkshop) {
      setWorkshop(foundWorkshop);
      setError("");
      setCurrentStep(0);
      setHasConfirmed(false);
    } else {
      setError("Workshop code not recognized. Please check with your workshop organizer.");
    }
  };

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Prompt copied!",
        description: "The prompt has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentStep < workshop!.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setHasConfirmed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setHasConfirmed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExit = () => {
    setWorkshop(null);
    setPassword("");
    setCurrentStep(0);
    setHasConfirmed(false);
  };

  const progressPercentage = workshop ? ((currentStep + 1) / workshop.steps.length) * 100 : 0;

  if (!workshop) {
    // Password Entry Screen
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-muted/20">
          <Card className="w-full max-w-md" data-testid="card-workshop-login">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Workshop Access</CardTitle>
              <CardDescription>
                Enter your workshop code to access your training materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workshop-code">Workshop Code</Label>
                  <Input
                    id="workshop-code"
                    type="text"
                    placeholder="Enter your workshop code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-center text-lg"
                    data-testid="input-workshop-code"
                  />
                  {error && (
                    <p className="text-sm text-destructive mt-2" data-testid="text-error">
                      {error}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  data-testid="button-access-workshop"
                >
                  Access Workshop
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
              If you don't have a workshop code, please contact your workshop organizer.
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  const currentStepData: WorkshopStep = workshop.steps[currentStep];
  const canProceed = !currentStepData.requiresConfirmation || hasConfirmed;

  // Workshop Interface
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Workshop Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-workshop-title">
              {workshop.name}
            </h1>
            <p className="text-muted-foreground" data-testid="text-company">
              {workshop.company} Workshop
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span data-testid="text-progress">
                Step {currentStep + 1} of {workshop.steps.length}
              </span>
              <span className="text-muted-foreground">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Step Card */}
          <Card className="mb-8" data-testid={`card-step-${currentStep}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                {currentStepData.title}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {currentStepData.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prompt Section */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Prompt:</Label>
                <div className="relative">
                  <div className="bg-muted/50 p-4 rounded-lg border" data-testid={`text-prompt-${currentStep}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {currentStepData.prompt}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopyPrompt(currentStepData.prompt)}
                    data-testid={`button-copy-prompt-${currentStep}`}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Prompt
                  </Button>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              {currentStepData.requiresConfirmation && (
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="confirmation"
                      checked={hasConfirmed}
                      onCheckedChange={(checked) => setHasConfirmed(!!checked)}
                      className="mt-1"
                      data-testid={`checkbox-confirm-${currentStep}`}
                    />
                    <Label 
                      htmlFor="confirmation" 
                      className="text-sm font-medium leading-relaxed cursor-pointer"
                    >
                      {currentStepData.confirmationText}
                    </Label>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                data-testid="button-previous"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <Button
                variant="outline"
                onClick={handleExit}
                data-testid="button-exit"
              >
                Exit Workshop
              </Button>

              {currentStep === workshop.steps.length - 1 ? (
                <Button
                  onClick={handleExit}
                  className="ml-auto"
                  data-testid="button-complete"
                >
                  Complete Workshop
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="ml-auto"
                  data-testid="button-next"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Help Text */}
          <div className="text-center text-sm text-muted-foreground">
            {currentStepData.requiresConfirmation && !hasConfirmed && (
              <p data-testid="text-confirmation-required">
                Please confirm the checkbox above before proceeding to the next step.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}