import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { createContext, useContext, useState, useEffect } from "react";
import type { Language } from "@/lib/translations";

import LandingPage from "@/pages/LandingPage";
import OnboardingPage from "@/pages/OnboardingPage";
import DashboardPage from "@/pages/DashboardPage";
import BenefitsPage from "@/pages/BenefitsPage";
import TaxPage from "@/pages/TaxPage";
import DocumentsPage from "@/pages/DocumentsPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/app-layout";

// App Context
interface AppUser {
  id: number;
  username: string;
  language: Language;
  profileComplete: boolean;
}

interface AppContextType {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  largeText: boolean;
  setLargeText: (v: boolean) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (v: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  language: "en",
  setLanguage: () => {},
  largeText: false,
  setLargeText: () => {},
  voiceEnabled: false,
  setVoiceEnabled: () => {},
});

export const useApp = () => useContext(AppContext);

function AppContent() {
  const { user } = useApp();

  return (
    <Router hook={useHashLocation}>
      <AppLayout>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/onboarding" component={OnboardingPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/benefits" component={BenefitsPage} />
          <Route path="/taxes" component={TaxPage} />
          <Route path="/documents" component={DocumentsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </AppLayout>
    </Router>
  );
}

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [largeText, setLargeText] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  useEffect(() => {
    // Apply dark mode from system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) document.documentElement.classList.add("dark");
    // Large text
    if (largeText) document.documentElement.style.fontSize = "18px";
    else document.documentElement.style.fontSize = "";
  }, [largeText]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ user, setUser, language, setLanguage, largeText, setLargeText, voiceEnabled, setVoiceEnabled }}>
        <AppContent />
        <Toaster />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
