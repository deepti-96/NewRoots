import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { speakText } from "@/lib/voiceUtils";
import { Button } from "@/components/ui/button";
import { Globe, ChevronRight, Volume2, VolumeX, Shield, Clock, Heart, Loader2 } from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const { user, language, setLanguage } = useApp();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [langOpen, setLangOpen] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const introAbortRef = useRef<AbortController | null>(null);

  const lang = language;

  // Auto-redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.profileComplete) navigate("/onboarding");
      else navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  function playIntro() {
    if (introPlaying) {
      introAbortRef.current?.abort();
      introAbortRef.current = null;
      setIntroPlaying(false);
      return;
    }
    introAbortRef.current?.abort();
    const controller = new AbortController();
    introAbortRef.current = controller;
    setIntroPlaying(true);
    speakText(t(lang, "voiceIntro"), lang, () => {
      if (!controller.signal.aborted) setIntroPlaying(false);
    });
  }

  function handleGetStarted() {
    loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });
  }

  function handleSignIn() {
    loginWithRedirect();
  }

  const features = [
    { icon: Clock, title: t(lang, "feature1Title"), sub: t(lang, "feature1Sub") },
    { icon: Globe, title: t(lang, "feature2Title"), sub: t(lang, "feature2Sub") },
    { icon: Heart, title: t(lang, "feature3Title"), sub: t(lang, "feature3Sub") },
    { icon: Shield, title: t(lang, "feature4Title"), sub: t(lang, "feature4Sub") },
  ];

  const selectedLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Show spinner while syncing after Auth0 redirect
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
      {/* Language selector */}
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-lg mx-auto">
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

          <div className="inline-flex items-center gap-2 day-badge rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
            <Clock className="w-4 h-4" />
            {t(lang, "heroBadge")}
          </div>

          <button
            data-testid="btn-voice-intro"
            onClick={playIntro}
            className="flex items-center gap-2 mx-auto mb-6 text-white/80 hover:text-white text-sm border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            {introPlaying ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
            {t(lang, "speakToRead")}
          </button>

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
        <h2 className="text-xl font-bold text-center mb-2">{t(lang, "featuresTitle")}</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">{t(lang, "featuresSub")}</p>
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
          <h2 className="text-xl font-bold text-center mb-2">{t(lang, "journeyTitle")}</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">{t(lang, "journeySub")}</p>
          <div className="space-y-3">
            {[
              { weekKey: "journeyWeek1" as const, itemKeys: ["journeyItem_w1_1", "journeyItem_w1_2", "journeyItem_w1_3"] as const },
              { weekKey: "journeyWeek2" as const, itemKeys: ["journeyItem_w2_1", "journeyItem_w2_2", "journeyItem_w2_3"] as const },
              { weekKey: "journeyWeek34" as const, itemKeys: ["journeyItem_w34_1", "journeyItem_w34_2", "journeyItem_w34_3"] as const },
              { weekKey: "journeyMonth23" as const, itemKeys: ["journeyItem_m23_1", "journeyItem_m23_2", "journeyItem_m23_3"] as const },
            ].map(({ weekKey, itemKeys }) => (
              <div key={weekKey} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-primary/10 text-primary rounded-full px-2.5 py-0.5">{t(lang, weekKey)}</span>
                </div>
                <div className="space-y-1">
                  {itemKeys.map(key => (
                    <div key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      {t(lang, key)}
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
          <h2 className="text-2xl font-bold mb-3">{t(lang, "footerCtaTitle")}</h2>
          <p className="text-white/80 text-sm mb-6">{t(lang, "footerCtaSub")}</p>
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
