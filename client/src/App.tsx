import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiRequest } from "@/lib/queryClient";
import type { Language } from "@/lib/translations";

import LandingPage from "@/pages/LandingPage";
import OnboardingPage from "@/pages/OnboardingPage";
import DashboardPage from "@/pages/DashboardPage";
import BenefitsPage from "@/pages/BenefitsPage";
import TaxPage from "@/pages/TaxPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/not-found";

// App Context
interface AppUser {
  id: number;
  username: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
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
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/onboarding" component={OnboardingPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/benefits" component={BenefitsPage} />
        <Route path="/taxes" component={TaxPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [largeText, setLargeText] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const { isAuthenticated, isLoading, user: auth0User } = useAuth0();

  const syncAuth0User = useCallback(async () => {
    if (!auth0User || syncing || user) return;
    setSyncing(true);
    try {
      const res = await apiRequest("POST", "/api/auth/sync", {
        auth0Sub: auth0User.sub,
        email: auth0User.email || null,
        displayName: auth0User.name || auth0User.nickname || null,
        avatarUrl: auth0User.picture || null,
      });
      const dbUser = await res.json();
      setUser({
        id: dbUser.id,
        username: dbUser.displayName || dbUser.username,
        email: dbUser.email,
        displayName: dbUser.displayName,
        avatarUrl: dbUser.avatarUrl,
        language: (dbUser.language as Language) || "en",
        profileComplete: dbUser.profileComplete,
      });
      if (dbUser.language && dbUser.language !== "en") {
        setLanguage(dbUser.language as Language);
      }
    } catch (err) {
      console.error("Failed to sync Auth0 user:", err);
    } finally {
      setSyncing(false);
    }
  }, [auth0User, syncing, user]);

  useEffect(() => {
    if (isAuthenticated && auth0User && !user && !syncing) {
      syncAuth0User();
    }
  }, [isAuthenticated, auth0User, user, syncing, syncAuth0User]);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) document.documentElement.classList.add("dark");
    if (largeText) document.documentElement.style.fontSize = "18px";
    else document.documentElement.style.fontSize = "";
  }, [largeText]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <svg aria-label="NewRoots" viewBox="0 0 48 48" fill="none" className="w-12 h-12 animate-pulse">
            <rect width="48" height="48" rx="12" fill="hsl(215 72% 38%)" />
            <path d="M12 24c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="32" r="5" fill="white" />
          </svg>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ user, setUser, language, setLanguage, largeText, setLargeText, voiceEnabled, setVoiceEnabled }}>
        <AppContent />
        <Toaster />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
