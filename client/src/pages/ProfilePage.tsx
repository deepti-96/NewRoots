import { useApp } from "@/App";
import { t, LANGUAGES, type Language } from "@/lib/translations";
import AppNav from "@/components/AppNav";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { LogOut, Globe, User, MapPin, Users, Briefcase, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  function logout() {
    setUser(null);
    navigate("/");
  }

  const selectedLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  if (!user) return null;

  const docs: string[] = (() => {
    try { return JSON.parse(profile?.documents || "[]"); } catch { return []; }
  })();

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppNav />
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold">{t(lang, "profile")}</h1>
        </div>

        {/* User card */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-lg">{user.username}</h2>
              <p className="text-sm text-muted-foreground">NewRoots Member</p>
            </div>
          </div>
        </div>

        {/* Profile details */}
        {profile && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Your Information</h3>

            {[
              { icon: MapPin, label: "State", value: profile.state || "Not set" },
              { icon: Users, label: "Family size", value: profile.familySize ? `${profile.familySize} people` : "Not set" },
              { icon: Briefcase, label: "Employment", value: profile.employmentStatus === "employed" ? "Has job" : "Looking for work" },
              { icon: Shield, label: "Health insurance", value: profile.hasInsurance ? "Has insurance" : "No insurance yet" },
              { icon: FileText, label: "Documents on hand", value: docs.length > 0 ? `${docs.length} documents` : "None recorded" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}

            {profile.arrivalDate && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📅</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Arrival date</p>
                  <p className="text-sm font-medium">{new Date(profile.arrivalDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Language selector */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            {t(lang, "chooseLanguage")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                data-testid={`profile-lang-${l.code}`}
                onClick={() => setLanguage(l.code as Language)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all ${lang === l.code ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}
              >
                <span>{l.flag}</span>
                <span className="font-medium">{l.nativeLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Documents checklist */}
        {docs.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-4">
            <h3 className="font-semibold text-sm mb-3">Your Documents</h3>
            <div className="space-y-1">
              {docs.map(doc => (
                <div key={doc} className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>{t(lang, doc as any)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <h3 className="font-semibold text-sm mb-3">Helpful Links</h3>
          <div className="space-y-2">
            {[
              { label: "USAGov — Find Benefits", url: "https://www.usa.gov/benefits" },
              { label: "Benefits.gov", url: "https://www.benefits.gov" },
              { label: "Healthcare.gov for Immigrants", url: "https://www.healthcare.gov/immigrants/" },
              { label: "CFPB Consumer Tools", url: "https://www.consumerfinance.gov/consumer-tools/" },
              { label: "IRS Free Tax Help (VITA)", url: "https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers" },
              { label: "Find American Job Center", url: "https://www.careeronestop.org/LocalHelp/local-help.aspx" },
              { label: "211.org — Local Help", url: "https://www.211.org" },
            ].map(({ label, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-muted transition-colors"
              >
                <span className="text-sm text-primary">{label}</span>
                <span className="text-xs text-muted-foreground">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <Button
          data-testid="btn-logout"
          variant="outline"
          onClick={logout}
          className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </main>
    </div>
  );
}
