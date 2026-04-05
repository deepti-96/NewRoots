import { useState } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { speakText } from "@/lib/voiceUtils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Check, ChevronRight, ChevronLeft, Volume2 } from "lucide-react";
import VoiceButton from "@/components/VoiceButton";

const DOCS = ["passport", "visa", "i94", "leaseProof", "payStubs", "schoolDocs", "ssnDoc", "birthCert"] as const;
const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

export default function OnboardingPage() {
  const [, navigate] = useLocation();
  const { user, language, setLanguage, setLargeText, setVoiceEnabled } = useApp();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [familySize, setFamilySize] = useState(1);
  const [hasChildren, setHasChildren] = useState(false);
  const [hasJob, setHasJob] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().split("T")[0]);
  const [state, setState] = useState("California");
  const [largeTextLocal, setLargeTextLocal] = useState(false);
  const [voiceLocal, setVoiceLocal] = useState(false);

  const lang = language;
  const totalSteps = 4;

  function toggleDoc(doc: string) {
    setSelectedDocs(prev => prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]);
  }

  async function finishOnboarding() {
    if (!user) {
      navigate("/");
      return;
    }
    try {
      await apiRequest("PATCH", `/api/user/${user.id}`, {
          language: lang,
          arrivalDate,
          familySize,
          hasChildren,
          employmentStatus: hasJob ? "employed" : "none",
          hasInsurance,
          documents: JSON.stringify(selectedDocs),
          state,
          profileComplete: true,
      });

      // Seed milestones for this user
      const milestoneKeys = ["sim_card", "address", "i94", "ssn", "bank_account", "health_insurance",
        "snap", "school_enrollment", "drivers_license", "itin", "vita_tax", "wic", "medicaid"];
      for (const key of milestoneKeys) {
        await apiRequest("POST", "/api/milestones", { userId: user.id, key, completed: false });
      }

      setLargeText(largeTextLocal);
      setVoiceEnabled(voiceLocal);
      navigate("/dashboard");
    } catch (err) {
      toast({ title: "Error saving profile", variant: "destructive" });
    }
  }

  const steps = [
    // Step 0: Language & Accessibility
    <div key="0" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">{t(lang, "chooseLanguage")}</h2>
        <p className="text-sm text-muted-foreground">Select the language most comfortable for you.</p>
        <VoiceButton text={t(lang, "chooseLanguage")} lang={lang} className="mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            data-testid={`lang-btn-${l.code}`}
            onClick={() => setLanguage(l.code as Language)}
            className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm font-medium transition-all ${lang === l.code ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}
          >
            <span className="text-lg">{l.flag}</span>
            <div className="text-left">
              <div className="font-semibold">{l.nativeLabel}</div>
              <div className="text-xs text-muted-foreground">{l.label}</div>
            </div>
            {lang === l.code && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
          </button>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t(lang, "comfortMode")}</h3>
        <div className="space-y-2">
          {[
            { key: "voice", label: t(lang, "voiceReadout"), desc: "Have text read aloud", state: voiceLocal, set: setVoiceLocal },
            { key: "large", label: t(lang, "largeText"), desc: "Bigger font size for easier reading", state: largeTextLocal, set: setLargeTextLocal },
          ].map(({ key, label, desc, state: s, set }) => (
            <button
              key={key}
              data-testid={`btn-mode-${key}`}
              onClick={() => set(!s)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${s ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"}`}
            >
              <div className="text-left">
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors ${s ? "bg-primary" : "bg-muted"} relative`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${s ? "right-0.5" : "left-0.5"}`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Step 1: Family info
    <div key="1" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">{t(lang, "familySetup")}</h2>
        <p className="text-sm text-muted-foreground">Tell us about your family so we can personalize your plan.</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t(lang, "howManyPeople")}</label>
        <div className="flex items-center gap-4">
          <button onClick={() => setFamilySize(Math.max(1, familySize - 1))} className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center text-lg font-bold hover:border-primary transition-colors">−</button>
          <span data-testid="family-size" className="text-3xl font-bold w-8 text-center">{familySize}</span>
          <button onClick={() => setFamilySize(Math.min(10, familySize + 1))} className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center text-lg font-bold hover:border-primary transition-colors">+</button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t(lang, "doYouHaveChildren")}</label>
        <div className="flex gap-2">
          {[true, false].map(v => (
            <button key={String(v)} data-testid={`btn-children-${v}`} onClick={() => setHasChildren(v)}
              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${hasChildren === v ? "border-primary bg-primary/10 text-primary" : "border-border"}`}>
              {v ? t(lang, "yes") : t(lang, "no")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t(lang, "doYouHaveJob")}</label>
        <div className="flex gap-2">
          {[true, false].map(v => (
            <button key={String(v)} data-testid={`btn-job-${v}`} onClick={() => setHasJob(v)}
              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${hasJob === v ? "border-primary bg-primary/10 text-primary" : "border-border"}`}>
              {v ? t(lang, "yes") : t(lang, "no")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t(lang, "doYouHaveInsurance")}</label>
        <div className="flex gap-2">
          {[true, false].map(v => (
            <button key={String(v)} data-testid={`btn-insurance-${v}`} onClick={() => setHasInsurance(v)}
              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${hasInsurance === v ? "border-primary bg-primary/10 text-primary" : "border-border"}`}>
              {v ? t(lang, "yes") : t(lang, "no")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t(lang, "whichState")}</label>
        <select
          data-testid="select-state"
          value={state}
          onChange={e => setState(e.target.value)}
          className="w-full border border-border rounded-xl px-3 py-2.5 bg-background text-sm"
        >
          {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">When did you arrive in the U.S.?</label>
        <input
          data-testid="input-arrival-date"
          type="date"
          value={arrivalDate}
          onChange={e => setArrivalDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full border border-border rounded-xl px-3 py-2.5 bg-background text-sm"
        />
      </div>
    </div>,

    // Step 2: Documents
    <div key="2" className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-1">{t(lang, "whatDocuments")}</h2>
        <p className="text-sm text-muted-foreground">Check all the documents you currently have. This helps us guide you.</p>
      </div>
      <div className="space-y-2">
        {DOCS.map(doc => (
          <button
            key={doc}
            data-testid={`doc-${doc}`}
            onClick={() => toggleDoc(doc)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-sm ${selectedDocs.includes(doc) ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"}`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${selectedDocs.includes(doc) ? "border-primary bg-primary" : "border-muted-foreground"}`}>
              {selectedDocs.includes(doc) && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="font-medium text-left">{t(lang, doc as any)}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground bg-muted/50 rounded-xl p-3">
        We don't store your documents. This is only used to show which steps you still need to complete.
      </p>
    </div>,

    // Step 3: Done
    <div key="3" className="text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">{t(lang, "setupComplete")}</h2>
        <p className="text-muted-foreground text-sm">Your personalized 90-day plan is ready. Let's get started.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-4 text-left space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Family members</span>
          <span className="font-medium">{familySize}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">State</span>
          <span className="font-medium">{state}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Documents you have</span>
          <span className="font-medium">{selectedDocs.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Language</span>
          <span className="font-medium">{LANGUAGES.find(l => l.code === lang)?.nativeLabel}</span>
        </div>
      </div>

      <Button
        data-testid="btn-go-dashboard"
        onClick={finishOnboarding}
        className="w-full py-5 text-base"
      >
        {t(lang, "goToDashboard")} →
      </Button>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 flex-shrink-0">
            <rect width="32" height="32" rx="8" fill="hsl(var(--primary))"/>
            <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="16" cy="21" r="3.5" fill="white"/>
          </svg>
          <div className="flex-1">
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Step {step + 1} of {totalSteps}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 pb-24">
        {steps[step]}
      </main>

      {/* Nav buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t(lang, "back")}
            </Button>
          )}
          {step < totalSteps - 1 && (
            <Button onClick={() => setStep(step + 1)} className="flex-1">
              {t(lang, "next")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
