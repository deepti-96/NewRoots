import { useState } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { speakText } from "@/lib/voiceUtils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Check, ChevronRight, ChevronLeft, Globe, Building2, FileText, BadgeDollarSign, GraduationCap, Briefcase, FileBadge, CalendarIcon } from "lucide-react";
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

const DOC_ICONS: Record<string, any> = {
  passport: Globe,
  visa: FileBadge,
  i94: FileText,
  leaseProof: Building2,
  payStubs: BadgeDollarSign,
  schoolDocs: GraduationCap,
  ssnDoc: Briefcase,
  birthCert: FileText,
};

const ARRIVAL_MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
] as const;

function formatDatePart(value: number) {
  return value.toString().padStart(2, "0");
}

function toIsoDate(year: number, month: number, day: number) {
  return `${year}-${formatDatePart(month)}-${formatDatePart(day)}`;
}

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
  const [isFinishing, setIsFinishing] = useState(false);

  const lang = language;
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const [selectedYear, selectedMonth, selectedDay] = arrivalDate.split("-").map(Number);
  const arrivalYearOptions = Array.from({ length: currentYear - 1970 + 1 }, (_, index) => currentYear - index);
  const arrivalMonthOptions = ARRIVAL_MONTHS.filter((month) =>
    selectedYear === currentYear ? month.value <= currentMonth : true,
  );
  const daysInSelectedMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const maxArrivalDay =
    selectedYear === currentYear && selectedMonth === currentMonth
      ? Math.min(daysInSelectedMonth, currentDay)
      : daysInSelectedMonth;
  const arrivalDayOptions = Array.from({ length: maxArrivalDay }, (_, index) => index + 1);

  function updateArrivalDate(year: number, month: number, day: number) {
    const safeMonth = year === currentYear ? Math.min(month, currentMonth) : month;
    const daysInMonth = new Date(year, safeMonth, 0).getDate();
    const futureDayLimit =
      year === currentYear && safeMonth === currentMonth
        ? Math.min(daysInMonth, currentDay)
        : daysInMonth;
    const safeDay = Math.min(day, futureDayLimit);

    setArrivalDate(toIsoDate(year, safeMonth, safeDay));
  }
  const totalSteps = 4;

  function toggleDoc(doc: string) {
    setSelectedDocs(prev => prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]);
  }

  async function finishOnboarding() {
    if (!user || isFinishing) {
      if (!user) {
        navigate("/");
      }
      return;
    }

    setIsFinishing(true);

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

      const milestoneKeys = ["sim_card", "address", "i94", "ssn", "bank_account", "health_insurance",
        "snap", "school_enrollment", "drivers_license", "itin", "vita_tax", "wic", "medicaid"];
      const milestoneResults = await Promise.allSettled(
        milestoneKeys.map((key) => apiRequest("POST", "/api/milestones", { userId: user.id, key, completed: false })),
      );

      if (milestoneResults.some((result) => result.status === "rejected")) {
        console.warn("Some onboarding milestones could not be seeded", milestoneResults);
      }

      // Persist the onboarding language choice to localStorage so it survives
      // future sign-ins (localStorage is the source of truth, not the DB).
      setLanguage(lang);
      setLargeText(largeTextLocal);
      setVoiceEnabled(voiceLocal);
      navigate("/dashboard");
    } catch (err) {
      toast({ title: "Error saving profile", variant: "destructive" });
      setIsFinishing(false);
    }
  }

  const steps = [
    // Step 0: Language & Accessibility
    <div key="0" className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t(lang, "chooseLanguage")}</h2>
          <p className="text-base text-slate-600">Select the language most comfortable for you.</p>
          <VoiceButton text={t(lang, "chooseLanguage")} lang={lang} className="mt-3" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              data-testid={`lang-btn-${l.code}`}
              onClick={() => setLanguage(l.code as Language)}
              className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${lang === l.code ? "ring-2 ring-emerald-600 bg-emerald-50 border-emerald-200" : "bg-white border-slate-200 hover:border-emerald-300"}`}
            >
              <span className="text-4xl mb-2">{l.flag}</span>
              <div className="text-center">
                <div className="font-bold text-slate-900 text-sm">{l.nativeLabel}</div>
                <div className="text-xs text-slate-500 mt-1">{l.label}</div>
              </div>
              {lang === l.code && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-lg text-slate-900 mb-4">{t(lang, "comfortMode")}</h3>
        <div className="space-y-3">
          {[
            { key: "voice", label: t(lang, "voiceReadout"), desc: "Have text read aloud automatically", state: voiceLocal, set: setVoiceLocal },
            { key: "large", label: t(lang, "largeText"), desc: "Increase font size for easier reading", state: largeTextLocal, set: setLargeTextLocal },
          ].map(({ key, label, desc, state: s, set }) => (
            <button
              key={key}
              data-testid={`btn-mode-${key}`}
              onClick={() => set(!s)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${s ? "ring-2 ring-emerald-600 bg-emerald-50 border-emerald-200" : "bg-white border-slate-200 hover:border-slate-300"}`}
            >
              <div className="text-left">
                <div className="text-base font-bold text-slate-900">{label}</div>
                <div className="text-sm text-slate-500 mt-0.5">{desc}</div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ${s ? "bg-emerald-600" : "bg-slate-200"} relative shadow-inner`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${s ? "left-[calc(100%-1.375rem)]" : "left-0.5"}`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Step 1: Family info
    <div key="1" className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t(lang, "familySetup")}</h2>
        <p className="text-base text-slate-600">Tell us about your family so we can personalize your plan.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
        
        {/* Family Size Stepper */}
        <div>
          <label className="block text-base font-bold text-slate-900 mb-4">{t(lang, "howManyPeople")}</label>
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200 max-w-[280px]">
            <button onClick={() => setFamilySize(Math.max(1, familySize - 1))} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-2xl font-bold text-slate-700 shadow-sm hover:border-emerald-600 hover:text-emerald-700 transition-colors">−</button>
            <span data-testid="family-size" className="text-3xl font-extrabold w-12 text-center text-slate-900">{familySize}</span>
            <button onClick={() => setFamilySize(Math.min(10, familySize + 1))} className="w-12 h-12 rounded-full bg-emerald-600 border border-emerald-600 flex items-center justify-center text-2xl font-bold text-white shadow-md hover:bg-emerald-700 transition-colors">+</button>
          </div>
        </div>

        {/* Binary Questions map */}
        {[
          { key: "children", label: t(lang, "doYouHaveChildren"), val: hasChildren, set: setHasChildren },
          { key: "job", label: t(lang, "doYouHaveJob"), val: hasJob, set: setHasJob },
          { key: "insurance", label: t(lang, "doYouHaveInsurance"), val: hasInsurance, set: setHasInsurance }
        ].map(({ key, label, val, set }) => (
          <div key={key}>
            <label className="block text-base font-bold text-slate-900 mb-3">{label}</label>
            <div className="flex gap-3">
              {[true, false].map(v => (
                <button 
                  key={String(v)} 
                  data-testid={`btn-${key}-${v}`} 
                  onClick={() => set(v)}
                  className={`flex-1 py-4 rounded-xl border text-base font-bold transition-all duration-200 ${val === v ? "ring-2 ring-emerald-600 bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {v ? t(lang, "yes") : t(lang, "no")}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* State Dropdown - Floating Label Style */}
        <div className="relative pt-2">
          <label className="absolute -top-1 left-3 bg-white px-1 text-xs font-bold text-emerald-800 z-10">{t(lang, "whichState")}</label>
          <select
            data-testid="select-state"
            value={state}
            onChange={e => setState(e.target.value)}
            className="w-full border-2 border-slate-200 rounded-xl px-4 py-4 bg-white text-slate-900 font-medium text-base focus:border-emerald-600 focus:ring-0 outline-none transition-colors appearance-none"
          >
            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Arrival Date - Floating Label Style */}
        <div className="relative pt-2">
        <label className="absolute -top-1 left-3 bg-white px-1 text-xs font-bold text-emerald-800 z-10">When did you arrive in the U.S.?</label>
        <div className="grid grid-cols-3 gap-3">
          <Select
            value={String(selectedMonth)}
            onValueChange={(value) => updateArrivalDate(selectedYear, Number(value), selectedDay)}
          >
            <SelectTrigger data-testid="select-arrival-month" className="h-14 rounded-xl border-2 border-slate-200 bg-white px-4 text-base font-medium text-slate-900">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {arrivalMonthOptions.map((month) => (
                <SelectItem key={month.value} value={String(month.value)}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(selectedDay)}
            onValueChange={(value) => updateArrivalDate(selectedYear, selectedMonth, Number(value))}
          >
            <SelectTrigger data-testid="select-arrival-day" className="h-14 rounded-xl border-2 border-slate-200 bg-white px-4 text-base font-medium text-slate-900">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {arrivalDayOptions.map((day) => (
                <SelectItem key={day} value={String(day)}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(selectedYear)}
            onValueChange={(value) => updateArrivalDate(Number(value), selectedMonth, selectedDay)}
          >
            <SelectTrigger data-testid="select-arrival-year" className="h-14 rounded-xl border-2 border-slate-200 bg-white px-4 text-base font-medium text-slate-900">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {arrivalYearOptions.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      </div>
    </div>,

    // Step 2: Documents
    <div key="2" className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t(lang, "whatDocuments")}</h2>
        <p className="text-base text-slate-600">Check all the documents you currently have. This helps us personalize your journey.</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
        {DOCS.map(doc => {
          const Icon = DOC_ICONS[doc] || FileText;
          const isSelected = selectedDocs.includes(doc);
          return (
            <button
              key={doc}
              data-testid={`doc-${doc}`}
              onClick={() => toggleDoc(doc)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${isSelected ? "ring-2 ring-emerald-600 bg-emerald-50 border-emerald-200 shadow-sm" : "bg-white border-slate-200 hover:border-slate-300"}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`flex-1 font-bold text-base ${isSelected ? "text-emerald-950" : "text-slate-700"}`}>
                {t(lang, doc as any)}
              </span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? "border-emerald-600 bg-emerald-600" : "border-slate-300 bg-white"}`}>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </div>
            </button>
          )
        })}
      </div>
      
      <p className="text-sm font-medium text-slate-500 bg-slate-100/50 border border-slate-200 rounded-xl p-4 text-center">
        We don't store your documents. This is only used to show which steps you still need to complete.
      </p>
    </div>,

    // Step 3: Done
    <div key="3" className="text-center space-y-8 animate-in slide-in-from-right duration-300 mt-8">
      <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto shadow-sm">
        <Check className="w-12 h-12 text-emerald-600" />
      </div>
      
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">{t(lang, "setupComplete")}</h2>
        <p className="text-slate-600 text-lg">Your personalized 90-day plan is ready.</p>
      </div>

      <div className="bg-white border-2 border-slate-100 rounded-2xl shadow-sm text-left max-w-sm mx-auto overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm tracking-wide uppercase">Profile Summary</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-lg">
            <span className="text-slate-500 font-medium">Family members</span>
            <span className="font-extrabold text-slate-900 text-lg">{familySize}</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-lg">
            <span className="text-slate-500 font-medium">State</span>
            <span className="font-extrabold text-slate-900 text-lg">{state}</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-lg">
            <span className="text-slate-500 font-medium">Documents secured</span>
            <span className="font-extrabold text-slate-900 text-lg text-emerald-700">{selectedDocs.length}</span>
          </div>
          <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-lg">
            <span className="text-slate-500 font-medium">Language</span>
            <span className="font-extrabold text-slate-900 text-lg">{LANGUAGES.find(l => l.code === lang)?.nativeLabel}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 max-w-sm mx-auto">
        <Button
          data-testid="btn-go-dashboard"
          onClick={finishOnboarding}
          disabled={isFinishing}
          className="w-full py-7 text-lg font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-100 disabled:bg-emerald-700"
        >
          {isFinishing ? "Opening your dashboard..." : t(lang, "goToDashboard")}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Horizontal Progress Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">NewRoots</span>
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Setup</span>
          </div>
          
          <div className="flex-1 max-w-[200px]">
            <div className="flex gap-1.5 mb-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? "bg-emerald-600" : "bg-slate-200"}`} 
                />
              ))}
            </div>
            <p className="text-[11px] font-bold text-slate-500 text-right uppercase tracking-wider">Step {step + 1} of {totalSteps}</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-8 pb-32">
        {steps[step]}
      </main>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-xl mx-auto flex gap-4">
          {step > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)} 
              className="flex-1 py-6 text-base font-bold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              {t(lang, "back")}
            </Button>
          )}
          {step < totalSteps - 1 && (
            <Button 
              onClick={() => setStep(step + 1)} 
              className="flex-1 py-6 text-base font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-colors"
            >
              {t(lang, "next")}
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
