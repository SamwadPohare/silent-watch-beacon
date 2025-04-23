
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuthPage from "@/pages/AuthPage";
import ActivityPatterns from "@/pages/ActivityPatterns";
import SleepQuality from "@/pages/SleepQuality";
import SocialEngagement from "@/pages/SocialEngagement";
import AcademicEngagement from "@/pages/AcademicEngagement";
import MessageResponseTime from "@/pages/MessageResponseTime";
import ScreenTime from "@/pages/ScreenTime";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const queryClient = new QueryClient();

// AuthGuard must be used inside Router context
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session && location.pathname !== "/auth") {
      navigate("/auth", { replace: true });
    }
    if (!loading && session && location.pathname === "/auth") {
      navigate("/", { replace: true });
    }
  }, [session, loading, location.pathname, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>;
};

// App wrapper without router dependencies
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Routes component that uses AuthGuard inside Router context
const AppRoutes = () => {
  const { loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      }>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/activity-patterns" element={<ActivityPatterns />} />
        <Route path="/sleep-quality" element={<SleepQuality />} />
        <Route path="/social-engagement" element={<SocialEngagement />} />
        <Route path="/academic-engagement" element={<AcademicEngagement />} />
        <Route path="/message-response-time" element={<MessageResponseTime />} />
        <Route path="/screen-time" element={<ScreenTime />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
