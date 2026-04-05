import { Link, useLocation } from "wouter";
import { useApp } from "@/App";
import { t } from "@/lib/translations";
import { Home, Gift, FileText, User, Mic, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { speakText, stopSpeaking } from "@/lib/voiceUtils";

export default function AppNav() {
  const { language, voiceEnabled, setVoiceEnabled, largeText, setLargeText } = useApp();
  const [location] = useLocation();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleDark() {
    const newDark = !dark;
    setDark(newDark);
    if (newDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  const navItems = [
    { path: "/dashboard", icon: Home, label: t(language, "dashboard") },
    { path: "/benefits", icon: Gift, label: t(language, "benefits") },
    { path: "/taxes", icon: FileText, label: t(language, "taxes") },
    { path: "/profile", icon: User, label: t(language, "profile") },
  ];

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard">
            <a className="flex items-center gap-2">
              <svg aria-label="NewRoots" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                <rect width="32" height="32" rx="8" fill="hsl(var(--primary))"/>
                <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="16" cy="21" r="3.5" fill="white"/>
              </svg>
              <span className="font-bold text-sm text-foreground">NewRoots</span>
            </a>
          </Link>
          <div className="flex items-center gap-2">
            <button
              data-testid="btn-voice-toggle"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-1.5 rounded-lg transition-colors ${voiceEnabled ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
              title={voiceEnabled ? "Disable voice" : "Enable voice"}
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              data-testid="btn-theme-toggle"
              onClick={toggleDark}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border">
        <div className="max-w-2xl mx-auto grid grid-cols-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link key={path} href={path}>
              <a
                data-testid={`nav-${path.replace("/", "")}`}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                  location === path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${location === path ? "stroke-[2.5]" : "stroke-2"}`} />
                <span>{label}</span>
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
