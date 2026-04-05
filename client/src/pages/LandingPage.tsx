import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { speakText } from "@/lib/voiceUtils";
import { Button } from "@/components/ui/button";
import {
  Globe, ChevronRight, Volume2, VolumeX, Shield, Clock, Heart,
  Loader2, ArrowRight, CheckCircle, FileText, Users, Mic, Layout, Map, ListChecks, CheckCircle2, HeartHandshake
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
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 lg:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-lg ring-4 ring-emerald-50">
            N
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-slate-900">NewRoots</span>
        </div>

        <div className="flex items-center gap-6">
          {/* Language picker */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold text-sm transition-all px-4 py-2 rounded-xl hover:bg-slate-50 active:scale-95"
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLang.nativeLabel}</span>
            </button>
            {langOpen && (
              <div className="absolute top-12 right-0 z-50 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 w-56 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code as Language); setLangOpen(false); }}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all text-left ${lang === l.code ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-slate-50 text-slate-600"}`}
                  >
                    <span>{l.flag} {l.nativeLabel}</span>
                    {lang === l.code && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            onClick={handleSignIn}
            className="text-slate-900 font-bold px-6 py-3 rounded-xl h-auto border border-slate-200 hover:border-slate-300 hover:bg-white shadow-sm active:scale-95 transition-all"
          >
            Sign In
          </Button>
          <Button
            onClick={handleGetStarted}
            className="bg-emerald-800 text-white hover:bg-emerald-900 font-bold px-8 py-3 rounded-xl h-auto shadow-xl shadow-emerald-900/10 active:scale-95 transition-all"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-5 py-2 text-sm font-bold border border-emerald-100/50 shadow-sm">
            <Shield className="w-4 h-4" />
            TRUSTED BY 10,000+ FAMILIES
          </div>

          <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900">
            Your algorithmic caseworker for arriving in the U.S.
          </h1>

          <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
            NewRoots cuts through bureaucratic deadlock. Track your first 90 days, manage essential documents, and unlock health and food benefits without confusion.
          </p>

          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-black px-10 py-5 rounded-2xl h-auto text-xl shadow-2xl shadow-emerald-900/20 active:scale-95 transition-all flex items-center gap-3"
          >
            Start Your Journey
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Right Content: Family Setup Map Illustration */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-full blur-[100px] opacity-100 -z-10 animate-pulse"></div>
          
          <div className="w-full max-w-[520px] bg-white rounded-[2.5rem] p-10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] border border-slate-50 ring-1 ring-slate-100 relative group overflow-hidden">
             {/* Header */}
             <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Family Setup Map</h3>
                  <p className="text-slate-500 font-medium">Clear your blockers step-by-step.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-emerald-100">
                  50% READY
                </div>
             </div>

             {/* Checklist Items */}
             <div className="space-y-4">
                {[
                  { label: "Download Your I-94 Record", sub: "Required for state IDs and work auth.", done: true },
                  { label: "Apply for a Social Security Number", sub: "Essential for employment and taxes.", done: true },
                  { label: "Register for Medicaid", sub: "Health coverage for your family.", done: false },
                  { label: "Apply for SNAP (Food Stamps)", sub: "Monthly food assistance.", done: false },
                ].map((item, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border transition-all duration-300 ${item.done ? "bg-slate-50/50 border-slate-100 opacity-80" : "bg-white border-slate-200 shadow-sm"}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.done ? "bg-emerald-600 text-white" : "border-2 border-slate-200"}`}>
                        {item.done && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm leading-tight ${item.done ? "text-slate-600" : "text-slate-900"}`}>{item.label}</h4>
                        <p className="text-xs text-slate-400 mt-1 font-medium">{item.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </div>

             {/* Right side slider handle hint */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-slate-100 rounded-l-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 overflow-hidden border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
           
           {/* Left Illustration: My Benefits */}
           <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-emerald-50 rounded-full blur-[80px] opacity-100 -z-10 rotate-12"></div>
              
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.06)] border border-slate-50 flex flex-col gap-6 relative">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 transition-transform group-hover:scale-110">
                     <Heart className="w-5 h-5 fill-emerald-600" />
                   </div>
                   <h3 className="text-xl font-black text-slate-900 tracking-tight">My Benefits</h3>
                 </div>

                 <div className="space-y-3">
                    {[
                      { label: "Medicaid", sub: "Full family health coverage.", status: "ACTIVE", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                      { label: "SNAP (Food)", sub: "Monthly grocery assistance.", status: "ACTIVE", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                      { label: "Housing Voucher", sub: "Eligibility opens in 30 days.", status: "PENDING", color: "text-slate-400 bg-white border-slate-200 border-dashed" },
                    ].map((benefit, idx) => (
                      <div key={idx} className={`p-5 rounded-2xl border flex items-center justify-between ${benefit.status === "ACTIVE" ? "bg-emerald-50/20 border-emerald-100/50" : "border-slate-100 bg-white border-dashed shadow-sm"}`}>
                        <div className="flex items-center gap-4">
                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${benefit.status === "ACTIVE" ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-200"}`}>
                             {benefit.status === "ACTIVE" && <CheckCircle2 className="w-3.5 h-3.5" />}
                           </div>
                           <div>
                             <h4 className="font-bold text-sm text-slate-900">{benefit.label}</h4>
                             <p className="text-xs text-slate-400 font-medium mt-0.5">{benefit.sub}</p>
                           </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${benefit.color} border`}>
                          {benefit.status}
                        </span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Content */}
           <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 rounded-full px-5 py-2 text-xs font-black tracking-widest uppercase border border-emerald-100">
                <HeartHandshake className="w-4 h-4" />
                BUILT WITH COMPASSION
              </div>
              
              <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                What NewRoots does for you
              </h2>

              <p className="text-xl text-slate-500 leading-relaxed">
                A guided caseworker in your pocket. Not a search engine. We provide clarity when you need it most.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                {[
                  { icon: Clock, title: "First 90 Days Plan", sub: "Step-by-step milestones tailored to your family.", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { icon: Globe, title: "10 Languages", sub: "Voice & text in your native language.", color: "text-teal-600", bg: "bg-teal-50" },
                  { icon: Heart, title: "Benefits Finder", sub: "Food, health, housing, and employment programs.", color: "text-rose-600", bg: "bg-rose-50" },
                  { icon: Shield, title: "Tax Guidance", sub: "Reminders and free filing help near you.", color: "text-blue-600", bg: "bg-blue-50" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.sub}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
           
           {/* Left Content: Timeline */}
           <div className="lg:col-span-12 mb-12">
              <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
                Your first 90 days, step by step
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                We help you know what to do first, what documents you need, and where to get help. Clear blockers sequentially and build your foundation.
              </p>
           </div>

           {/* Actual Timeline Content */}
           <div className="lg:col-span-7 relative flex gap-12">
              {/* Vertical Progress Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-emerald-100 -z-10"></div>

              <div className="space-y-12 w-full">
                {[
                  { week: "Week 1", title: "Immediate Setup", items: ["Get phone/SIM card", "Get mailing address", "Download I-94 record"] },
                  { week: "Week 2", title: "Identity & Finance", items: ["Apply for SSN", "Open bank account", "Get health insurance"] },
                  { week: "Week 3-4", title: "Benefits & School", items: ["Apply for SNAP food benefits", "Enroll children in school", "Find WIC if applicable"] },
                  { week: "Month 2-3", title: "Long-term Stability", items: ["Get state ID / Driver's license", "Apply for ITIN if needed", "Prepare for tax filing"] },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-10 items-start relative group">
                    {/* Bullet */}
                    <div className="w-8 h-8 rounded-full bg-white border-[3px] border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)] flex-shrink-0 z-10 transition-transform group-hover:scale-125"></div>
                    
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all flex-1">
                      <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-4 border border-emerald-100">
                        {item.week}
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-6">{item.title}</h4>
                      <div className="space-y-3">
                         {item.items.map((sub, i) => (
                           <div key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                             <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0">
                               <CheckCircle2 className="w-3.5 h-3.5 text-slate-200" />
                             </div>
                             <span className="text-sm">{sub}</span>
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Right Column Illustration: Action Items */}
           <div className="lg:col-span-5 sticky top-32">
              <div className="absolute inset-0 bg-slate-50/50 rounded-full blur-[80px] -z-10 translate-x-12 translate-y-24"></div>
              
              <div className="bg-white rounded-[2rem] p-10 shadow-[0_32px_120px_-24px_rgba(0,0,0,0.1)] border border-slate-50 relative">
                 <div className="flex items-center justify-between mb-10">
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">ACTION ITEMS</h3>
                   <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest">5/7 Complete</span>
                 </div>

                 <div className="space-y-6">
                    {[
                      { label: "Identity Verification", time: "Completed yesterday", done: true },
                      { label: "Link Primary Bank", time: "Completed 4:45 PM", done: true },
                      { label: "Set Up Automated Savings", time: "Pending your review.", active: true },
                      { label: "Security Settings", time: "Locked", faded: true },
                    ].map((item, idx) => (
                      <div key={idx} className={`relative flex items-start gap-4 ${item.faded ? "opacity-30" : "opacity-100"}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0 ${item.done ? "bg-emerald-600 text-white" : item.active ? "ring-2 ring-emerald-600 ring-offset-2" : "border-2 border-slate-200"}`}>
                           {item.done && <CheckCircle2 className="w-4 h-4" />}
                           {item.active && <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>}
                        </div>
                        <div className="flex-1">
                           <h4 className="font-bold text-slate-900 leading-tight">{item.label}</h4>
                           <p className="text-xs text-slate-400 font-medium mt-1 mb-2">{item.time}</p>
                           {item.active && (
                             <button className="text-xs font-black text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1 group/btn">
                               Review Settings <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                             </button>
                           )}
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final Footer CTA Section */}
      <section className="bg-emerald-900 text-white py-24 relative overflow-hidden text-center">
        {/* Subtle background texture/gradient */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center">
          {/* Shield Icon in Rounded Box */}
          <div className="w-16 h-16 bg-emerald-800/50 backdrop-blur-md rounded-2xl border border-emerald-700/50 flex items-center justify-center mb-10 shadow-xl ring-1 ring-emerald-500/20">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black mb-6 tracking-tight text-white">
            Ready to start your journey?
          </h2>

          <p className="text-lg text-emerald-100/80 mb-12 max-w-sm mx-auto font-medium leading-relaxed">
            Free to use. Available in 10 languages. No documents required to sign up.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Button
              data-testid="btn-get-started-footer"
              onClick={handleGetStarted}
              className="bg-white text-emerald-900 hover:bg-emerald-50 font-black px-10 py-6 rounded-2xl h-auto text-lg shadow-2xl transition-all active:scale-95"
            >
              Get Started — It's Free
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-emerald-700 text-white hover:bg-emerald-800 font-bold px-10 py-6 rounded-2xl h-auto text-lg transition-all active:scale-95"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Very minimal bottom bar */}
      <footer className="bg-emerald-950 py-10 text-center border-t border-emerald-900/30">
        <p className="text-xs text-emerald-100/40 font-medium tracking-wider uppercase">
          © 2026 NewRoots, Inc. • Compassionate FinTech
        </p>
      </footer>
    </div>
  );
}
