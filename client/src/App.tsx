import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useSeo } from "@/lib/use-seo";

const CourseDetails = lazy(() => import("@/pages/course-details"));
const UmOkkum = lazy(() => import("@/pages/um-okkum"));
const OkkaraTaenastur = lazy(() => import("@/pages/okkara-taenastur"));
const Contact = lazy(() => import("@/pages/contact"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const Tilarbeidis = lazy(() => import("@/pages/tilarbeidis"));
const Verkstova = lazy(() => import("@/pages/verkstova"));
const Podcast = lazy(() => import("@/pages/Podcast"));
const AIGuide = lazy(() => import("@/pages/ai-guide"));
const UserGuides = lazy(() => import("@/pages/user-guides"));
const GettingStartedGuide = lazy(() => import("@/pages/getting-started-guide"));
const BestPracticesGuide = lazy(() => import("@/pages/best-practices-guide"));
const AIForCaretakersGuide = lazy(() => import("@/pages/ai-for-caretakers-guide"));
const AIForKindergartenGuide = lazy(() => import("@/pages/ai-for-kindergarten-guide"));
const AIForCoachesGuide = lazy(() => import("@/pages/ai-for-coaches-guide"));
const AIForTeachingGuide = lazy(() => import("@/pages/ai-for-teaching-guide"));
const AIForServiceIndustryGuide = lazy(() => import("@/pages/ai-for-service-industry-guide"));
const AIForCraftsmenGuide = lazy(() => import("@/pages/ai-for-craftsmen-guide"));
const AnnadFraVitlikisstovuni = lazy(() => import("@/pages/annad-fra-vitlikisstovuni"));
const Gemini3FoTest = lazy(() => import("@/pages/gemini3-fo-test"));
const FrontpageV2 = lazy(() => import("@/pages/frontpage-v2"));
const FrontpageV3 = lazy(() => import("@/pages/frontpage-v3"));
const FrontpageV4 = lazy(() => import("@/pages/frontpage-v4"));
const Byrjunarskeidi = lazy(() => import("@/pages/okkara-taenastur/byrjunarskeidi"));
const FimmtanHaettir = lazy(() => import("@/pages/okkara-taenastur/15-haettir"));
const Fyrilestur = lazy(() => import("@/pages/okkara-taenastur/fyrilestur"));
const Vitlikisupplaering = lazy(() => import("@/pages/okkara-taenastur/vitlikisupplaering"));
const Serloysnir = lazy(() => import("@/pages/okkara-taenastur/serloysnir"));
const SkapandiVitliki = lazy(() => import("@/pages/okkara-taenastur/skapandi-vitliki"));
const AIWorkshop = lazy(() => import("@/pages/ai-workshop"));
const VitlikiIVerki = lazy(() => import("@/pages/vitliki-i-verki"));
const Landsnet = lazy(() => import("@/pages/landsnet"));
const LeidsluVerkstova = lazy(() => import("@/pages/leidslu-verkstova"));

function RouteFallback() {
  return (
    <div className="min-h-screen" aria-busy="true" aria-live="polite" />
  );
}

function Router() {
  useSeo();
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/course-details" component={CourseDetails} />
        <Route path="/um-okkum" component={UmOkkum} />
        <Route path="/okkara-taenastur" component={OkkaraTaenastur} />
        <Route path="/okkara-taenastur/byrjunarskeidi" component={Byrjunarskeidi} />
        <Route path="/okkara-taenastur/15-haettir" component={FimmtanHaettir} />
        <Route path="/okkara-taenastur/fyrilestur" component={Fyrilestur} />
        <Route path="/okkara-taenastur/vitlikisupplaering" component={Vitlikisupplaering} />
        <Route path="/okkara-taenastur/serloysnir" component={Serloysnir} />
        <Route path="/okkara-taenastur/skapandi-vitliki" component={SkapandiVitliki} />
        <Route path="/contact" component={Contact} />
        <Route path="/tilarbeidis" component={Tilarbeidis} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/verkstova" component={Verkstova} />
        <Route path="/podcast" component={Podcast} />
        <Route path="/ai-guide" component={AIGuide} />
        <Route path="/user-guides" component={UserGuides} />
        <Route path="/user-guides/ai-for-kindergarten-guide" component={AIForKindergartenGuide} />
        <Route path="/user-guides/ai-for-caretakers-guide" component={AIForCaretakersGuide} />
        <Route path="/user-guides/ai-for-coaches-guide" component={AIForCoachesGuide} />
        <Route path="/user-guides/ai-for-teaching-guide" component={AIForTeachingGuide} />
        <Route path="/user-guides/ai-for-service-industry-guide" component={AIForServiceIndustryGuide} />
        <Route path="/user-guides/ai-for-craftsmen-guide" component={AIForCraftsmenGuide} />
        <Route path="/user-guides/getting-started" component={GettingStartedGuide} />
        <Route path="/user-guides/best-practices" component={BestPracticesGuide} />
        <Route path="/annad-fra-vitlikisstovuni" component={AnnadFraVitlikisstovuni} />
        <Route path="/gemini3-fo-test" component={Gemini3FoTest} />
        <Route path="/frontpage-v2" component={FrontpageV2} />
        <Route path="/frontpage-v3" component={FrontpageV3} />
        <Route path="/frontpage-v4" component={FrontpageV4} />
        <Route path="/ai-workshop" component={AIWorkshop} />
        <Route path="/vitliki-i-verki" component={VitlikiIVerki} />
        <Route path="/landsnet" component={Landsnet} />
        <Route path="/leidslu-verkstova" component={LeidsluVerkstova} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div data-theme="vts" className="min-h-screen">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
