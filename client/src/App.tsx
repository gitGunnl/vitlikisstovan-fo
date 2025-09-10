import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CourseDetails from "@/pages/course-details";
import UmOkkum from "@/pages/um-okkum";
import OkkaraTaenastur from "@/pages/okkara-taenastur";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Tilarbeidis from "@/pages/tilarbeidis";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/course-details" component={CourseDetails} />
      <Route path="/um-okkum" component={UmOkkum} />
      <Route path="/okkara-taenastur" component={OkkaraTaenastur} />
      <Route path="/contact" component={Contact} />
      <Route path="/tilarbeidis" component={Tilarbeidis} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
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