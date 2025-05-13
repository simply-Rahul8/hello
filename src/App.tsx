
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import JobPosting from "./pages/JobPosting";
import ProjectDeadline from "./pages/ProjectDeadline";
import Requirement from "./pages/Requirement"; // Renamed from JobRequirements
import Dashboard from "./pages/Dashboard";
import Announcement from "./pages/Announcement"; // Renamed from TalentAnnouncement

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Outsourcing routes - renamed */}
          <Route path="/outsourcing/announcement" element={<Announcement />} />
          <Route path="/outsourcing/job-posting" element={<JobPosting />} />
          <Route path="/outsourcing/project-deadline" element={<ProjectDeadline />} />
          <Route path="/outsourcing/requirement" element={<Requirement />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
