import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CourseDetails from "@/pages/course-details";
import UmOkkum from "@/pages/um-okkum";
import UmOkkum1 from "@/pages/um-okkum1";
import UmOkkum2 from "@/pages/um-okkum2";
import UmOkkum3 from "@/pages/um-okkum3";
import OkkaraTaenastur from "@/pages/okkara-taenastur";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/course-details" component={CourseDetails} />
      <Route path="/um-okkum" component={UmOkkum} />
      <Route path="/um-okkum1" component={UmOkkum1} />
      <Route path="/um-okkum2" component={UmOkkum2} />
      <Route path="/um-okkum3" component={UmOkkum3} />
      <Route path="/okkara-taenastur" component={OkkaraTaenastur} />
      <Route component={NotFound} />
    </Switch>
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