import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { speakText } from "@/lib/voiceUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Globe, ChevronRight, Volume2, Shield, Clock, Heart } from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const { setUser, language, setLanguage } = useApp();
  const { toast } = useToast();

  const [mode, setMode] = useState<"landing" | "login" | "register">("landing");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  const lang = language;

  function playIntro() {
    if (!hasSpoken) {
      speakText(t(lang, "voiceIntro"), lang);
      setHasSpoken(true);
    }
  }

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const data = await apiRequest("POST", endpoint, { username, password });
      const userData = await data.json();
      if (userData.error) {
        toast({ title: "Error", description: userData.error, variant: "destructive" });
        return;
      }
      setUser({ ...userData, language: lang });
      if (!userData.profileComplete) navigate("/onboarding");
      else navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const features = [
    { icon: Clock, title: "First 90 Days Plan", sub: "Step-by-step milestones tailored to your family" },
    { icon: Globe, title: "10 Languages", sub: "Voice & text in your language" },
    { icon: Heart, title: "Benefits Finder", sub: "Food, health, housing, and employment programs" },
    { icon: Shield, title: "Tax Guidance", sub: "Reminders and free filing help near you" },
  ];

  const selectedLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  if (mode !== "landing") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <svg aria-label="NewRoots" viewBox="0 0 40 40" fill="none" className="w-10 h-10">
              <rect width="40" height="40" rx="10" fill="hsl(var(--primary))"/>
              <path d="M10 20c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="20" cy="26" r="4" fill="white"/>
            </svg>
            <span className="font-bold text-xl">NewRoots</span>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-1">
              {mode === "login" ? t(lang, "signIn") : t(lang, "createAccount")}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              {mode === "login" ? t(lang, "alreadyHaveAccount") : t(lang, "dontHaveAccount")}
            </p>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="username">{t(lang, "username")}</Label>
                <Input
                  id="username"
                  data-testid="input-username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder={t(lang, "username")}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">{t(lang, "password")}</Label>
                <Input
                  id="password"
                  data-testid="input-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t(lang, "password")}
                  required
                />
              </div>
              <Button
                data-testid="btn-auth-submit"
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "..." : (mode === "login" ? t(lang, "signIn") : t(lang, "createAccount"))}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              {mode === "login" ? (
                <button onClick={() => setMode("register")} className="text-primary hover:underline">
                  {t(lang, "dontHaveAccount")} {t(lang, "createAccount")}
                </button>
              ) : (
                <button onClick={() => setMode("login")} className="text-primary hover:underline">
                  {t(lang, "alreadyHaveAccount")} {t(lang, "signIn")}
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setMode("landing")}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t(lang, "back")}
          </button>
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

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-xs sm:max-w-sm mx-auto">
            <Button
              data-testid="btn-get-started"
              onClick={() => setMode("register")}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-5 text-base rounded-xl"
            >
              {t(lang, "getStarted")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              data-testid="btn-sign-in"
              onClick={() => setMode("login")}
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
            onClick={() => setMode("register")}
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-5 text-base rounded-xl"
          >
            {t(lang, "getStarted")}
          </Button>
        </div>
      </section>
    </div>
  );
}
