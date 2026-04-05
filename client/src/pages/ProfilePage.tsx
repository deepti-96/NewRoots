import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { LogOut, Globe, MapPin, Users, Briefcase, Shield, FileText, CheckCircle2, ChevronRight, ExternalLink, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { user, setUser, language, setLanguage } = useApp();
  const [, navigate] = useLocation();
  const lang = language;

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  const { data: profile } = useQuery({
    queryKey: ["/api/user", user?.id],
    queryFn: () => user ? apiRequest("GET", `/api/user/${user.id}`).then(r => r.json()) : null,
    enabled: !!user,
  });

  const { logout: auth0Logout } = useAuth0();

  function logout() {
    setUser(null);
    localStorage.setItem("newroots_lang", "en");
    setLanguage("en");
    auth0Logout({ 
      logoutParams: { 
        returnTo: window.location.origin 
      } 
    });
  }

  if (!user) return null;

  const docs: string[] = (() => {
    try { return JSON.parse(profile?.documents || "[]"); } catch { return []; }
  })();

  const memberId = `NR-${user.id.toString().padStart(6, "0")}`;
  
  // Format dates gracefully
  const arrivalDate = profile?.arrivalDate 
    ? new Date(profile.arrivalDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : t(lang, "profileNotRecorded");

  const joinDate = new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto w-full p-8 animate-in fade-in duration-500 pb-24">
      {/* Header & Log out */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight">{t(lang, "profile")}</h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {t(lang, "signOut")}
        </button>
      </div>

      {/* Digital ID Card Hero Workspace */}
      <div className="relative w-full rounded-[2rem] bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 p-8 sm:p-10 text-white shadow-2xl overflow-hidden mb-10 group">
        {/* Glassmorphic decorative orbs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-400 rounded-full mix-blend-overlay filter blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-400 rounded-full mix-blend-overlay filter blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
        
        {/* Card Overlay texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 h-full">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shadow-inner">
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-br from-white to-emerald-100 bg-clip-text text-transparent">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-1 opacity-80">{t(lang, "primaryMember")}</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">{user.username}</h2>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold text-teal-900 bg-emerald-100 rounded-full">
                  ID: {memberId}
                </span>
                <span className="text-emerald-50/60 text-xs">{t(lang, "joined")} {joinDate}</span>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:block text-right">
            <div className="w-16 h-16 ml-auto rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm opacity-50">
              <span className="font-mono text-xl">USA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Data Vault */}
        <div className="lg:col-span-7 space-y-10">
          
          <section>
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">{t(lang, "verifiedInformation")}</h3>
            <div className="bg-white border border-slate-100 rounded-3xl p-2 shadow-sm">
              {[
                { icon: MapPin, label: t(lang, "profileCurrentState"), value: profile?.state || t(lang, "profileNotSet") },
                { icon: Users, label: t(lang, "profileFamilySize"), value: profile?.familySize ? `${profile.familySize} ${t(lang, "profileMembers")}` : t(lang, "profileNotSet") },
                { icon: Calendar, label: t(lang, "profileArrivalDate"), value: arrivalDate },
                { icon: Shield, label: t(lang, "profileHealthCoverage"), value: profile?.hasInsurance ? t(lang, "profileInsured") : t(lang, "profileNotRecorded") },
                { icon: Briefcase, label: t(lang, "profileEmployment"), value: profile?.employmentStatus === "employed" ? t(lang, "profileEmployed") : t(lang, "profileLookingForWork") },
              ].map((item, index) => (
                <div key={item.label} className={`flex items-center justify-between p-4 ${index !== 4 ? 'border-b border-slate-50' : ''} hover:bg-slate-50/50 rounded-xl transition-colors`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-600 text-sm">{item.label}</span>
                  </div>
                  <span className="font-bold text-slate-900 text-sm text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">{t(lang, "languagePreference")}</h3>
            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col sm:flex-row flex-wrap gap-2">
              {LANGUAGES.map(l => {
                const isActive = lang === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => {
                      const newLang = l.code as Language;
                      setLanguage(newLang);
                      // Persist to DB so it survives sign-ins
                      if (user) {
                        apiRequest("PATCH", `/api/user/${user.id}`, { language: newLang }).catch(console.error);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                      isActive 
                        ? "bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500 ring-inset shadow-sm" 
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    }`}
                  >
                    <span className="text-lg leading-none">{l.flag}</span>
                    {l.nativeLabel}
                  </button>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Support Modules */}
        <div className="lg:col-span-5 space-y-10">
          
          {docs.length > 0 && (
            <section>
              <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">{t(lang, "digitalVault")}</h3>
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <div className="space-y-4">
                  {docs.map(doc => (
                    <div key={doc} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-bold text-slate-700">{t(lang, doc as any)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section>
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">{t(lang, "externalSupportLinks")}</h3>
            <div className="bg-white border border-slate-100 rounded-3xl p-2 shadow-sm">
              {[
                { label: t(lang, "link_usagov"), url: "https://www.usa.gov/benefits" },
                { label: t(lang, "link_benefitsgov"), url: "https://www.benefits.gov" },
                { label: t(lang, "link_healthcaregov"), url: "https://www.healthcare.gov/immigrants/" },
                { label: t(lang, "link_irs"), url: "https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers" },
                { label: t(lang, "link_jobcenter"), url: "https://www.careeronestop.org/LocalHelp/local-help.aspx" },
              ].map(({ label, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl group hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-700 text-sm group-hover:text-emerald-700 transition-colors">{label}</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all group-hover:translate-x-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
