import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Providers from "./pages/Providers";
import ProviderDetail from "./pages/ProviderDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import WorkerProfile from "./pages/WorkerProfile";
import EmployerProfile from "./pages/EmployerProfile";
import WorkerOnboarding from "./pages/WorkerOnboarding";
import EmployerOnboarding from "./pages/EmployerOnboarding";
import AdminDashboard from "./pages/AdminDashboard";
import PendingApproval from "./pages/PendingApproval";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/provider/:id" element={<ProviderDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding/worker" element={<WorkerOnboarding />} />
            <Route path="/onboarding/employer" element={<EmployerOnboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/worker" element={<WorkerProfile />} />
            <Route path="/profile/employer" element={<EmployerProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/pending-approval" element={<PendingApproval />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
