import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiRequest, setTokenGetter } from "@/lib/queryClient";
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
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem("newroots_lang") as Language) || "en"
  );
  const setLanguage = (lang: Language) => {
    localStorage.setItem("newroots_lang", lang);
    setLanguageState(lang);
  };
  const [largeText, setLargeText] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const { isAuthenticated, isLoading, user: auth0User, getAccessTokenSilently } = useAuth0();

  // Wire Auth0 token into apiRequest as soon as the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setTokenGetter(() => getAccessTokenSilently().catch(() => null));
    }
  }, [isAuthenticated, getAccessTokenSilently]);

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
      // DB language is the source of truth. Always apply it on sign-in
      // so the user's saved profile preference takes effect.
      if (dbUser.language) {
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
            <rect width="48" height="48" rx="12" fill="#059669" />
            <g transform="translate(8, 8) scale(1.333)" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
              <path d="m18 15-2-2" />
              <path d="m15 18-2-2" />
            </g>
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
