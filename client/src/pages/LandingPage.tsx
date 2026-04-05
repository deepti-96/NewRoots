import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { speakText } from "@/lib/voiceUtils";
import { Button } from "@/components/ui/button";
import { Globe, ChevronRight, Volume2, Shield, Clock, Heart, Loader2 } from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const { user, language, setLanguage } = useApp();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [langOpen, setLangOpen] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  const lang = language;

  // Auto-redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.profileComplete) navigate("/onboarding");
      else navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  function playIntro() {
    if (!hasSpoken) {
      speakText(t(lang, "voiceIntro"), lang);
      setHasSpoken(true);
    }
  }

  function handleGetStarted() {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  }

  function handleSignIn() {
    loginWithRedirect();
  }

  const features = [
    { icon: Clock, title: "First 90 Days Plan", sub: "Step-by-step milestones tailored to your family" },
    { icon: Globe, title: "10 Languages", sub: "Voice & text in your language" },
    { icon: Heart, title: "Benefits Finder", sub: "Food, health, housing, and employment programs" },
    { icon: Shield, title: "Tax Guidance", sub: "Reminders and free filing help near you" },
  ];

  const selectedLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Show loading spinner while syncing after Auth0 redirect
  if (isAuthenticated && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Setting up your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Language selector strip */}
      <div className="relative">
        <button
          data-testid="btn-lang-select"
          onClick={() => setLangOpen(!langOpen)}
          className="fixed top-4 right-4 z-50 flex items-center gap-1.5 bg-background/90 backdrop-blur border border-border rounded-full px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-muted transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span role="img" aria-label={selectedLang.label}>{selectedLang.flag}</span> {selectedLang.nativeLabel}
        </button>

        {langOpen && (
          <div className="fixed top-14 right-4 z-50 bg-card border border-border rounded-2xl shadow-lg p-2 w-52 grid grid-cols-2 gap-1">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                data-testid={`lang-option-${l.code}`}
                onClick={() => { setLanguage(l.code as Language); setLangOpen(false); }}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${lang === l.code ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"}`}
              >
                {l.flag} {l.nativeLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hero */}
      <section className="hero-gradient text-white min-h-[90vh] flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden">
        {/* Background elements — subtle radial glow only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-lg mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <svg aria-label="NewRoots" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
              <rect width="48" height="48" rx="12" fill="white" fillOpacity="0.15"/>
              <path d="M12 24c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="24" cy="32" r="5" fill="white"/>
            </svg>
            <span className="text-2xl font-bold tracking-tight">NewRoots</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {t(lang, "heroHeadline")}
          </h1>
          <p className="text-base text-white/80 mb-4 max-w-sm mx-auto leading-relaxed">
            {t(lang, "heroSub")}
          </p>

          {/* Day counter badge */}
          <div className="inline-flex items-center gap-2 day-badge rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
            <Clock className="w-4 h-4" />
            First 90 Days — Day by Day
          </div>

          {/* Voice intro button */}
          <button
            data-testid="btn-voice-intro"
            onClick={playIntro}
            className="flex items-center gap-2 mx-auto mb-6 text-white/80 hover:text-white text-sm border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            {t(lang, "speakToRead")}
          </button>

          {/* CTAs — Auth0 Universal Login */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-xs sm:max-w-sm mx-auto">
            <Button
              data-testid="btn-get-started"
              onClick={handleGetStarted}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-5 text-base rounded-xl"
            >
              {t(lang, "getStarted")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              data-testid="btn-sign-in"
              onClick={handleSignIn}
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-6 py-5 text-base rounded-xl"
            >
              {t(lang, "signIn")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-lg mx-auto px-5 py-12">
        <h2 className="text-xl font-bold text-center mb-2">What NewRoots does for you</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">A guided caseworker in your pocket. Not a search engine.</p>

        <div className="grid grid-cols-2 gap-3">
          {features.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-4 card-lift">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey preview */}
      <section className="bg-muted/50 px-5 py-10">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-center mb-2">Your first 90 days, step by step</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">We help you know what to do first, what documents you need, and where to get help.</p>

          <div className="space-y-3">
            {[
              { week: "Week 1", items: ["Get phone/SIM card", "Get mailing address", "Download I-94 record"] },
              { week: "Week 2", items: ["Apply for SSN", "Open bank account", "Get health insurance"] },
              { week: "Week 3–4", items: ["Apply for SNAP food benefits", "Enroll children in school", "Find WIC if applicable"] },
              { week: "Month 2–3", items: ["Get state ID / Driver's license", "Apply for ITIN if needed", "Prepare for tax filing"] },
            ].map(({ week, items }) => (
              <div key={week} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-primary/10 text-primary rounded-full px-2.5 py-0.5">{week}</span>
                </div>
                <div className="space-y-1">
                  {items.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="hero-gradient text-white px-5 py-12">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to start your journey?</h2>
          <p className="text-white/80 text-sm mb-6">Free to use. Available in 10 languages. No documents required to sign up.</p>
          <Button
            data-testid="btn-start-footer"
            onClick={handleGetStarted}
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-5 text-base rounded-xl"
          >
            {t(lang, "getStarted")}
          </Button>
        </div>
      </section>
    </div>
  );
}
