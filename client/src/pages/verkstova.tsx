import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  const [showExitDialog, setShowExitDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set page metadata (Faroese)
    document.title = "Atgongd til verkstovu | Verkstova venjingarskipan";

    const content = "Fá atgongd til verkstovuna.";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError("Verkstovu kotan varð ikki funnin. Vinarliga set teg í samband við fyriskiparan á info@ritvit.fo ella tlf. 919444.");
    }
  };

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Birt avrita!",
        description: "Birt er nú avrita til tína teldu.",
      });
    } catch (err) {
      toast({
        title: "Avritan miseydnaðist",
        description: "Vinarliga avrita tekstin við hond.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentStep < workshop!.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setHasConfirmed(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setHasConfirmed(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleExit = () => {
    setWorkshop(null);
    setPassword("");
    setCurrentStep(0);
    setHasConfirmed(false);
    setShowExitDialog(false);
    window.scrollTo({ top: 0 });
  };

  const progressPercentage = workshop ? ((currentStep + 1) / workshop.steps.length) * 100 : 0;

  if (!workshop) {
    // Password Entry Screen
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-12 bg-gradient-to-b from-background to-muted/20">
          <Card className="w-full max-w-md" data-testid="card-workshop-login">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Lock className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">Atgongd til verkstovu</CardTitle>
              <CardDescription className="mt-1">
                Skriva tína verkstovu kotu fyri at fáa atgongd til venjingartilfarið
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="workshop-code">Verkstovu kota</Label>
                  <Input
                    id="workshop-code"
                    type="text"
                    inputMode="text"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="Skriva tína verkstovu kotu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-center text-lg"
                    aria-invalid={!!error}
                    aria-describedby={error ? "workshop-code-error" : undefined}
                    enterKeyHint="go"
                    data-testid="input-workshop-code"
                  />
                  {error && (
                    <p
                      id="workshop-code-error"
                      className="text-sm text-destructive mt-2"
                      role="alert"
                      aria-live="polite"
                      data-testid="text-error"
                    >
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
                  Fá atgongd til verkstovu
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
              Hevur tú ikki eina verkstovu kotu, vinarliga set teg í samband við fyriskiparan á info@ritvit.fo ella tlf. 919444.
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-workshop-title">
              {workshop.name}
            </h1>
            <p className="text-muted-foreground" data-testid="text-company">
              Verkstova hjá {workshop.company}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8" aria-live="polite">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
              <span data-testid="text-progress">
                Stig {currentStep + 1} av {workshop.steps.length}
              </span>
              <span className="text-muted-foreground">
                {Math.round(progressPercentage)}% liðugt
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" aria-label="Framgongd" />
          </div>

          {/* Step Card */}
          <Card className="mb-8" data-testid={`card-step-${currentStep}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                {currentStepData.title}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {currentStepData.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prompt Section */}
              <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Label className="text-base font-semibold">Birt:</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyPrompt(currentStepData.prompt)}
                    aria-label="Avrita birt"
                    data-testid={`button-copy-prompt-${currentStep}`}
                    className="sm:self-end"
                  >
                    <Copy className="h-4 w-4 mr-1" aria-hidden="true" />
                    Avrita birt
                  </Button>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg border overflow-x-auto" data-testid={`text-prompt-${currentStep}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words font-mono">
                    {currentStepData.prompt}
                  </p>
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

            {/* Navigation Buttons */}
            <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="w-full sm:w-auto"
                data-testid="button-previous"
              >
                <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
                Aftur
              </Button>

              {currentStep === workshop.steps.length - 1 ? (
                <Button
                  onClick={handleExit}
                  className="w-full sm:w-auto sm:ml-auto"
                  data-testid="button-complete"
                >
                  Ger verkstovuna liðuga
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="w-full sm:w-auto sm:ml-auto"
                  data-testid="button-next"
                >
                  Næsta stig
                  <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Exit Button - Outside the card */}
          <div className="flex justify-center mb-6">
            <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  data-testid="button-exit"
                >
                  Far úr verkstovuni
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Far úr verkstovuni?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Ert tú viss/ur í, at tú vil fara úr verkstovuni? Framgongdin verður ikki goymd.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Halt fram við verkstovuni</AlertDialogCancel>
                  <AlertDialogAction onClick={handleExit} className="bg-red-600 hover:bg-red-700">
                    Far úr verkstovuni
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Help Text */}
          <div className="text-center text-sm text-muted-foreground" aria-live="polite">
            {currentStepData.requiresConfirmation && !hasConfirmed && (
              <p data-testid="text-confirmation-required">
                Vinarliga vátta kassan omanfyri, áðrenn tú heldur fram til næsta stig.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
