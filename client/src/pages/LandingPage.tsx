import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { speakText } from "@/lib/voiceUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Globe, ChevronRight, Volume2, VolumeX, Shield, Clock, Heart, Check } from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const { setUser, language, setLanguage } = useApp();
  const { toast } = useToast();

  const [mode, setMode] = useState<"landing" | "login" | "register">("landing");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const introAbortRef = useRef<AbortController | null>(null);

  const lang = language;

  function playIntro() {
    // If already playing or loading, stop and reset
    if (introPlaying) {
      introAbortRef.current?.abort();
      introAbortRef.current = null;
      setIntroPlaying(false);
      return;
    }
    // Abort any in-flight previous request before starting a new one
    introAbortRef.current?.abort();
    const controller = new AbortController();
    introAbortRef.current = controller;
    setIntroPlaying(true);
    speakText(t(lang, "voiceIntro"), lang, () => {
      if (!controller.signal.aborted) setIntroPlaying(false);
    });
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
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans text-slate-900">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg">
            N
          </div>
          <span className="font-bold text-xl tracking-tight">NewRoots</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors mr-4"
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLang.nativeLabel}</span>
            </button>
            {langOpen && (
              <div className="absolute top-10 right-4 z-50 bg-card border border-border rounded-xl shadow-lg p-2 w-48 grid grid-cols-1 gap-1">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code as Language); setLangOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left ${lang === l.code ? "bg-emerald-50 text-emerald-800 font-medium" : "hover:bg-slate-50 text-slate-700"}`}
                  >
                    {l.flag} {l.nativeLabel}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setMode("login")}
            className="border border-slate-300 text-slate-800 bg-transparent hover:bg-slate-100 font-semibold px-5 py-2.5 rounded-xl h-auto"
          >
            Sign In
          </Button>
          <Button
            onClick={() => setMode("register")}
            className="bg-emerald-800 text-white hover:bg-emerald-900 font-semibold px-6 py-2.5 rounded-xl h-auto"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-emerald-100/50 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <Shield className="w-3.5 h-3.5" />
            TRUSTED BY 10,000+ FAMILIES
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Your algorithmic caseworker for arriving in the U.S.
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-md">
            NewRoots cuts through bureaucratic deadlock. Track your first 90 days, manage essential documents, and unlock health and food benefits without confusion.
          </p>

          <Button
            onClick={() => setMode("register")}
            className="bg-emerald-800 text-white hover:bg-emerald-900 font-semibold px-8 py-6 text-lg rounded-xl h-auto shadow-sm inline-flex items-center gap-2"
          >
            Start Your Journey <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Right Content - Setup Map Card */}
        <div className="relative w-full max-w-lg mx-auto lg:ml-auto">
          {/* Decorative background blob */}
          <div className="absolute top-4 -left-4 w-full h-full bg-slate-200/60 rounded-[2rem] transform -rotate-3 -z-10" />
          <div className="absolute top-8 left-4 w-full h-full bg-emerald-50 rounded-[2rem] transform rotate-1 -z-10" />
          
          <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative z-10 w-full overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-1">Family Setup Map</h3>
                <p className="text-slate-500 text-sm">Clear your blockers step-by-step.</p>
              </div>
              <div className="bg-emerald-100/50 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">
                50% READY
              </div>
            </div>

            <div className="h-[1px] w-full bg-slate-100 mb-6" />

            <div className="space-y-3">
              {/* Completed Task 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                <div className="mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-500 line-through">Download Your I-94 Record</p>
                  <p className="text-xs text-slate-400 mt-1">Required for state IDs and work auth.</p>
                </div>
              </div>

              {/* Completed Task 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                <div className="mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-500 line-through">Apply for a Social Security Number</p>
                  <p className="text-xs text-slate-400 mt-1">Essential for employment and taxes.</p>
                </div>
              </div>

              {/* Pending Task 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="mt-0.5">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Register for Medicaid</p>
                  <p className="text-xs text-slate-500 mt-1">Health coverage for your family.</p>
                </div>
              </div>

              {/* Pending Task 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="mt-0.5">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Apply for SNAP (Food Stamps)</p>
                  <p className="text-xs text-slate-500 mt-1">Monthly food assistance.</p>
                </div>
              </div>
            </div>
            
            {/* Arrow decoration */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center p-2 rounded-l-2xl bg-slate-50 border border-r-0 border-slate-200 text-slate-400">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Premium Graphic & Grid */}
      <section className="bg-white py-32 px-6 relative w-full border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: UI Component as Illustration */}
          <div className="relative w-full max-w-sm mx-auto lg:mx-0 flex justify-center lg:justify-start">
            <div className="absolute inset-0 bg-emerald-100/50 rounded-[2.5rem] transform -rotate-3 scale-105 -z-10" />
            
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 w-full hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/50 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-emerald-800" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">My Benefits</h4>
              </div>

              <div className="space-y-4">
                {/* Benefit 1 */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                       <Shield className="w-4 h-4 text-emerald-600" />
                       <span className="font-bold text-sm text-emerald-950">Medicaid</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <p className="text-xs text-emerald-800/70">Full family health coverage.</p>
                </div>

                {/* Benefit 2 */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                       <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v1.5M3 21v-1.5M4.5 3h15M4.5 21h15M6 3v15M18 3v15M9 7.5h6" /></svg>
                       <span className="font-bold text-sm text-emerald-950">SNAP (Food)</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <p className="text-xs text-emerald-800/70">Monthly grocery assistance.</p>
                </div>

                {/* Unlocked Benefit */}
                <div className="p-4 rounded-2xl bg-white border border-dashed border-slate-200">
                  <div className="flex items-center gap-2 mb-1">
                     <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                     <span className="font-bold text-sm text-slate-500">Housing Voucher</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-6">Eligibility opens in 30 days.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Content */}
          <div>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6">
                <Heart className="w-3.5 h-3.5" />
                BUILT WITH COMPASSION
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight">What NewRoots does for you</h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                A guided caseworker in your pocket. Not a search engine. We provide clarity when you need it most.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map(({ icon: Icon, title, sub }) => (
                <div 
                  key={title} 
                  className="group relative bg-white border border-slate-100 rounded-3xl p-6 hover:border-emerald-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Step-by-Step Timeline Section & Graphic */}
      <section className="bg-slate-50 py-32 px-6 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Timeline Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight">Your first 90 days, step by step</h2>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                We help you know what to do first, what documents you need, and where to get help. Clear blockers sequentially and build your foundation.
              </p>
            </div>

            <div className="space-y-6 relative border-l-2 border-emerald-100 pl-8 ml-4">
              {[
                { week: "Week 1", title: "Immediate Setup", items: ["Get phone/SIM card", "Get mailing address", "Download I-94 record"] },
                { week: "Week 2", title: "Identity & Finance", items: ["Apply for SSN", "Open bank account", "Get health insurance"] },
                { week: "Week 3–4", title: "Benefits & School", items: ["Apply for SNAP food benefits", "Enroll children in school", "Find WIC if applicable"] },
                { week: "Month 2–3", title: "Long-term Stability", items: ["Get state ID / Driver's license", "Apply for ITIN if needed", "Prepare for tax filing"] },
              ].map(({ week, title, items }) => (
                <div key={week} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[2.6rem] top-6 w-5 h-5 rounded-full bg-white border-4 border-emerald-500 shadow-sm" />
                  
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm group-hover:shadow-md group-hover:border-emerald-200 transition-all duration-300">
                    <div className="bg-emerald-100/80 text-emerald-800 text-xs font-bold tracking-wide px-3 py-1 rounded-full inline-block mb-4">
                      {week}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
                    <div className="space-y-3">
                      {items.map(item => (
                        <div key={item} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-sm text-slate-600 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: UI Component as Illustration */}
          <div className="order-1 lg:order-2 relative w-full max-w-sm mx-auto lg:ml-auto flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-slate-200/50 rounded-[2.5rem] transform rotate-3 scale-105 -z-10" />
            
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 w-full hover:-translate-y-1 transition-transform duration-500">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Action Items</h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">5/7 Complete</span>
              </div>

              <div className="space-y-0 relative">
                <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-slate-100" />
                
                <div className="relative pl-8 py-3">
                  <div className="absolute left-0 top-3.5 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="font-bold text-sm text-slate-900 line-through">Identity Verification</p>
                  <p className="text-[11px] text-slate-500">Completed yesterday</p>
                </div>
                
                <div className="relative pl-8 py-3">
                  <div className="absolute left-0 top-3.5 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="font-bold text-sm text-slate-900 line-through">Link Primary Bank</p>
                  <p className="text-[11px] text-slate-500">Completed 4:45 PM</p>
                </div>

                <div className="relative pl-8 py-3 bg-emerald-50/30 -mx-4 px-4 rounded-xl border border-emerald-100/50 mt-1 mb-1">
                  <div className="absolute left-4 top-3.5 w-6 h-6 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  </div>
                  <div className="pl-4">
                    <p className="font-bold text-sm text-emerald-950">Set Up Automated Savings</p>
                    <p className="text-xs text-emerald-800/70 mt-1">Pending your review.</p>
                    <div className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer">
                      Review Settings →
                    </div>
                  </div>
                </div>

                <div className="relative pl-8 py-3 opacity-60">
                  <div className="absolute left-0 top-3.5 w-6 h-6 rounded-full border-2 border-slate-300 bg-white" />
                  <p className="font-bold text-sm text-slate-700">Security Settings</p>
                  <p className="text-[11px] text-slate-400">Locked</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Premium Footer CTA */}
      <section className="bg-emerald-900 py-32 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute w-[800px] h-[800px] bg-emerald-800/50 rounded-full blur-3xl -top-48 -right-48 pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] bg-emerald-800/30 rounded-full blur-3xl -bottom-48 -left-48 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-emerald-800 rounded-3xl mx-auto flex items-center justify-center mb-8 border border-emerald-700 shadow-xl">
             <Shield className="w-10 h-10 text-emerald-300" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Ready to start your journey?
          </h2>
          <p className="text-emerald-100 text-xl mb-12 max-w-xl mx-auto font-medium">
            Free to use. Available in 10 languages. No documents required to sign up.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              onClick={() => setMode("register")}
              className="bg-white text-emerald-900 hover:bg-slate-50 hover:scale-105 transition-all duration-300 font-bold px-10 py-7 text-lg rounded-2xl w-full sm:w-auto shadow-xl"
            >
              {t(lang, "getStarted")}
            </Button>
            <Button
              variant="outline"
              onClick={() => setMode("login")}
              className="border-emerald-700 text-emerald-50 hover:bg-emerald-800 font-bold px-10 py-7 text-lg rounded-2xl w-full sm:w-auto transition-all bg-transparent"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
