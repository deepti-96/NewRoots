import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { speakText } from "@/lib/voiceUtils";
import { Button } from "@/components/ui/button";
import {
  Globe, ChevronRight, Volume2, VolumeX, Shield, Clock, Heart,
  Loader2, ArrowRight, CheckCircle, FileText, Users, Mic
} from "lucide-react";

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

  const selectedLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Spinner while syncing after Auth0 redirect
  if (isAuthenticated && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
          </div>
          <p className="text-slate-600 font-medium">Setting up your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans text-slate-900">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            N
          </div>
          <span className="font-bold text-xl tracking-tight">NewRoots</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language picker */}
          <div className="relative">
            <button
              data-testid="btn-lang-select"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors px-3 py-2 rounded-xl hover:bg-slate-100"
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLang.flag} {selectedLang.nativeLabel}</span>
            </button>
            {langOpen && (
              <div className="absolute top-12 right-0 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 w-52 grid grid-cols-2 gap-1">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    data-testid={`lang-option-${l.code}`}
                    onClick={() => { setLanguage(l.code as Language); setLangOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors text-left ${lang === l.code ? "bg-emerald-50 text-emerald-800 font-semibold" : "hover:bg-slate-50 text-slate-700"}`}
                  >
                    {l.flag} {l.nativeLabel}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            onClick={handleSignIn}
            className="border border-slate-300 text-slate-800 bg-transparent hover:bg-slate-100 font-semibold px-5 py-2.5 rounded-xl h-auto hidden sm:flex"
          >
            Sign In
          </Button>
          <Button
            data-testid="btn-get-started"
            onClick={handleGetStarted}
            className="bg-emerald-800 text-white hover:bg-emerald-900 font-semibold px-6 py-2.5 rounded-xl h-auto shadow-sm"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 rounded-full px-4 py-2 text-sm font-semibold border border-emerald-100">
            <Clock className="w-4 h-4" />
            First 90 Days Guide for Immigrant Families
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
            {t(lang, "heroHeadline")}
          </h1>

          <p className="text-xl text-slate-500 leading-relaxed">
            {t(lang, "heroSub")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              data-testid="btn-get-started-hero"
              onClick={handleGetStarted}
              size="lg"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-8 py-4 rounded-2xl h-auto text-lg shadow-lg shadow-emerald-900/20"
            >
              {t(lang, "getStarted")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <button
              data-testid="btn-voice-intro"
              onClick={playIntro}
              className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 text-base border border-slate-200 rounded-2xl px-6 py-4 hover:bg-white transition-all font-medium shadow-sm"
            >
              {introPlaying ? <VolumeX className="w-5 h-5 animate-pulse text-emerald-600" /> : <Volume2 className="w-5 h-5" />}
              {t(lang, "speakToRead")}
            </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            {["Free to use", "10 Languages", "Voice-enabled", "No documents needed to sign up"].map(item => (
              <span key={item} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right Visual: UI Illustration */}
        <div className="relative hidden lg:block">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[3rem] -rotate-1"></div>

          {/* Dashboard preview cards */}
          <div className="relative z-10 p-8 space-y-4">
            {/* Progress card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Your Journey</p>
                  <h3 className="text-lg font-bold text-slate-900">Week 1 of 13</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-700 font-black text-sm">8%</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>

            {/* Milestone cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📱", label: "Get a SIM Card", done: true },
                { icon: "🏛️", label: "Apply for SSN", done: false },
                { icon: "🏦", label: "Open Bank Account", done: false },
                { icon: "🍎", label: "SNAP Benefits", done: false },
              ].map(({ icon, label, done }) => (
                <div key={label} className={`rounded-xl p-3.5 border flex items-start gap-3 ${done ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-100"}`}>
                  <span className="text-xl grayscale opacity-70">{icon}</span>
                  <div>
                    <p className={`text-xs font-bold leading-tight ${done ? "text-emerald-800 line-through opacity-60" : "text-slate-800"}`}>{label}</p>
                    <p className={`text-xs mt-0.5 ${done ? "text-emerald-600" : "text-slate-400"}`}>{done ? "Done ✓" : "Pending"}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI chat bubble */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold mb-1">AI Navigator</p>
                <p className="text-sm text-slate-700 leading-relaxed">"Your SSN application requires your I-94 and passport. Want me to guide you through it?"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Everything you need in one place</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">A guided caseworker in your pocket — not a search engine.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: "First 90 Days Plan", sub: "Step-by-step milestones tailored to your family's needs and timeline.", color: "bg-amber-50 text-amber-700" },
              { icon: Globe, title: "10 Languages", sub: "Voice & text support in your native language, including Arabic, Hindi, and more.", color: "bg-blue-50 text-blue-700" },
              { icon: Heart, title: "Benefits Finder", sub: "Discover food, health, housing, and employment programs you qualify for.", color: "bg-rose-50 text-rose-700" },
              { icon: Shield, title: "Tax Guidance", sub: "Filing reminders, VITA info, EITC eligibility, and free tax help near you.", color: "bg-emerald-50 text-emerald-700" },
            ].map(({ icon: Icon, title, sub, color }) => (
              <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:bg-white transition-all group">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Your first 90 days,<br />step by step</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">We help you know what to do first, what documents you need, and where to find help — in plain language.</p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl h-auto"
            >
              Start My Plan
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { week: "Week 1", color: "bg-emerald-500", items: ["Get phone/SIM card", "Get mailing address", "Download I-94 record"] },
              { week: "Week 2", color: "bg-teal-500", items: ["Apply for SSN", "Open bank account", "Get health insurance"] },
              { week: "Weeks 3–4", color: "bg-blue-500", items: ["Apply for SNAP food benefits", "Enroll children in school", "Find WIC if applicable"] },
              { week: "Month 2–3", color: "bg-slate-400", items: ["Get state ID / Driver's license", "Apply for ITIN if needed", "Prepare for tax filing"] },
            ].map(({ week, color, items }) => (
              <div key={week} className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${color} mt-1`}></div>
                  <div className="w-px flex-1 bg-slate-100 min-h-[2rem]"></div>
                </div>
                <div>
                  <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full ${color} bg-opacity-10 text-slate-700`}>{week}</span>
                  <div className="space-y-1.5">
                    {items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400 rounded-full mix-blend-overlay blur-[80px] opacity-30"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-400 rounded-full mix-blend-overlay blur-[80px] opacity-20"></div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-extrabold mb-4">Ready to start your journey?</h2>
          <p className="text-white/70 text-lg mb-10">Free to use. Available in 10 languages. No documents required to sign up.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              data-testid="btn-start-footer"
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-emerald-900 hover:bg-white/90 font-bold px-10 py-4 rounded-2xl h-auto text-base shadow-xl"
            >
              {t(lang, "getStarted")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              data-testid="btn-sign-in-footer"
              onClick={handleSignIn}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-2xl h-auto text-base"
            >
              {t(lang, "signIn")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
