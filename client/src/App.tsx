import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Example1 from "@/pages/example1";
import Example2 from "@/pages/example2";
import Example3 from "@/pages/example3";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/example1" component={Example1} />
      <Route path="/example2" component={Example2} />
      <Route path="/example3" component={Example3} />
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
