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
import { getWorkshopByPassword, Workshop, WorkshopStep, Lab } from "@/data/workshops/index";
import { Copy, ArrowRight, ArrowLeft, Lock, CheckCircle, FileDown, Download, MessageSquare, Bot } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { WorkshopLandingPage } from "@/components/workshop/WorkshopLandingPage";

export default function Verkstova() {
  const [password, setPassword] = useState("");
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
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
      const toastInstance = toast({
        title: "Birt avrita!",
        description: "Birt er nú avrita til tína teldu.",
      });
      // Dismiss after 1 second
      setTimeout(() => {
        toastInstance.dismiss();
      }, 1000);
    } catch (err) {
      toast({
        title: "Avritan miseydnaðist",
        description: "Vinarliga avrita tekstin við hond.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (selectedLab && currentStep < selectedLab.steps.length - 1) {
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
    setSelectedLab(null);
    setPassword("");
    setCurrentStep(0);
    setHasConfirmed(false);
    setShowExitDialog(false);
    window.scrollTo({ top: 0 });
  };

  const handleBackToLabSelection = () => {
    setSelectedLab(null);
    setCurrentStep(0);
    setHasConfirmed(false);
    window.scrollTo({ top: 0 });
  };

  const handleLabSelect = (lab: Lab) => {
    setSelectedLab(lab);
    setCurrentStep(0);
    setHasConfirmed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressPercentage = selectedLab ? ((currentStep + 1) / selectedLab.steps.length) * 100 : 0;

  // Password Entry Screen
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

  // Lab Selection Screen
  if (!selectedLab) {
    return (
      <>
        <Header />
        <WorkshopLandingPage workshop={workshop} onLabSelect={handleLabSelect} />
        <Footer />
      </>
    );
  }

  const currentStepData: WorkshopStep = selectedLab.steps[currentStep];
  const canProceed = !currentStepData.requiresConfirmation || hasConfirmed;

  // Special display for "Next Steps Lab" - show all prompts on one page
  if (selectedLab.id === "next-steps-lab") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Workshop Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-workshop-title">
                {workshop.name} - {selectedLab.name}
              </h1>
              <p className="text-muted-foreground mb-4" data-testid="text-company">
                Verkstova hjá {workshop.company}
              </p>
              <p className="text-lg text-muted-foreground">
                {selectedLab.description}
              </p>
            </div>

            {/* All Prompts Display */}
            <div className="space-y-6">
              {selectedLab.steps.map((step, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`card-idea-${index}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {step.description}
                    </CardDescription>
                    {(step.window || step.model) && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {step.window && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" data-testid={`tag-window-${index}`}>
                            <MessageSquare className="h-3 w-3" aria-hidden="true" />
                            {step.window}
                          </span>
                        )}
                        {step.model && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" data-testid={`tag-model-${index}`}>
                            <Bot className="h-3 w-3" aria-hidden="true" />
                            {step.model}
                          </span>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Birt:</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => step.prompt && handleCopyPrompt(step.prompt)}
                          aria-label={`Avrita birt ${index + 1}`}
                          data-testid={`button-copy-prompt-${index}`}
                        >
                          <Copy className="h-4 w-4 mr-1" aria-hidden="true" />
                          Avrita
                        </Button>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg border max-h-40 overflow-y-auto" data-testid={`text-prompt-${index}`}>
                        <p className="text-xs leading-relaxed whitespace-pre-wrap break-words font-mono">
                          {step.prompt}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handleBackToLabSelection}
                data-testid="button-back-to-labs"
              >
                <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
                Aftur til lab val
              </Button>
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
                      Ert tú viss/ur í, at tú vil fara úr verkstovuni?
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
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Regular Lab Steps Interface
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Workshop Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" data-testid="text-workshop-title">
              {workshop.name} - {selectedLab.name}
            </h1>
            <p className="text-muted-foreground" data-testid="text-company">
              Verkstova hjá {workshop.company}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8" aria-live="polite">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
              <span data-testid="text-progress">
                Stig {currentStep + 1} av {selectedLab.steps.length}
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
              {(currentStepData.window || currentStepData.model) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {currentStepData.window && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" data-testid="tag-window">
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      {currentStepData.window}
                    </span>
                  )}
                  {currentStepData.model && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" data-testid="tag-model">
                      <Bot className="h-4 w-4" aria-hidden="true" />
                      {currentStepData.model}
                    </span>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prompt Section */}
              {currentStepData.prompt && (
                <div className="space-y-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Label className="text-base font-semibold">Birt:</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyPrompt(currentStepData.prompt!)}
                      aria-label="Avrita birt"
                      data-testid={`button-copy-prompt-${currentStep}`}
                      className="sm:self-end"
                    >
                      <Copy className="h-4 w-4 mr-1" aria-hidden="true" />
                      Avrita birt
                    </Button>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg border max-h-80 overflow-y-auto overflow-x-auto" data-testid={`text-prompt-${currentStep}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words font-mono">
                      {currentStepData.prompt}
                    </p>
                  </div>
                </div>
              )}

              {/* Downloadable Files Section */}
              {currentStepData.files && currentStepData.files.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Niðurtøkufílur:</Label>
                  <div className="space-y-2">
                    {currentStepData.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
                        data-testid={`file-download-${currentStep}-${index}`}
                      >
                        <div className="flex items-center gap-3">
                          <FileDown className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                          <div className="min-w-0">
                            <p className="font-medium truncate">{file.name}</p>
                            {file.description && (
                              <p className="text-sm text-muted-foreground">
                                {file.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-shrink-0 ml-3"
                          data-testid={`button-download-${currentStep}-${index}`}
                        >
                          <a
                            href={`/attached_assets/workshop_files/${workshop.company.toLowerCase()}/${selectedLab.id}/${file.filename}`}
                            download={file.filename}
                          >
                            <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                            Tak niður
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

              {currentStep === selectedLab.steps.length - 1 ? (
                <Button
                  onClick={handleBackToLabSelection}
                  className="w-full sm:w-auto sm:ml-auto"
                  data-testid="button-complete"
                >
                  Enda venjingina
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

          {/* Navigation Buttons - Outside the card */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={handleBackToLabSelection}
              data-testid="button-back-to-labs"
            >
              <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
              Aftur til lab val
            </Button>
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
