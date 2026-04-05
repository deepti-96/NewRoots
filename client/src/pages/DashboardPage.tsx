import { useApp } from "@/App";
import { t } from "@/lib/translations";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import AppNav from "@/components/AppNav";
import VoiceButton from "@/components/VoiceButton";
import { MILESTONES, getMilestoneTitle, getMilestoneDescription, getMilestoneTips } from "@/lib/milestoneData";
import { Check, Clock, AlertCircle, ChevronDown, ChevronUp, ExternalLink, Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { VoiceInput } from "@/lib/voiceUtils";

interface Milestone {
  id: number;
  userId: number;
  key: string;
  completed: boolean;
  completedAt: string | null;
  notes: string;
}

export default function DashboardPage() {
  const { user, language, voiceEnabled } = useApp();
  const [, navigate] = useLocation();
  const qc = useQueryClient();
  const lang = language;
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [voiceText, setVoiceText] = useState("");
  const [listening, setListening] = useState(false);

  // Redirect to login if no user
  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  const { data: milestones = [] } = useQuery<Milestone[]>({
    queryKey: ["/api/milestones", user?.id],
    queryFn: () => user ? apiRequest("GET", `/api/milestones/${user.id}`).then(r => r.json()) : Promise.resolve([]),
    enabled: !!user,
  });

  const { data: profile } = useQuery({
    queryKey: ["/api/user", user?.id],
    queryFn: () => user ? apiRequest("GET", `/api/user/${user.id}`).then(r => r.json()) : null,
    enabled: !!user,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      apiRequest("PATCH", `/api/milestones/${id}`, { completed }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/milestones", user?.id] }),
  });

  // Compute days in US
  const arrivalDate = profile?.arrivalDate;
  const daysInUS = arrivalDate
    ? Math.max(0, Math.floor((Date.now() - new Date(arrivalDate).getTime()) / 86400000))
    : 0;
  const day90Progress = Math.min(100, (daysInUS / 90) * 100);

  // Map milestone DB data by key
  const milestoneMap: Record<string, Milestone> = {};
  for (const m of milestones) milestoneMap[m.key] = m;

  const completedCount = milestones.filter(m => m.completed).length;
  const totalCount = MILESTONES.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Group by week
  const weeks = [
    { label: "Week 1 — First Days", range: [1, 1] },
    { label: "Week 2 — Key Paperwork", range: [2, 2] },
    { label: "Week 3–4 — Benefits & Family", range: [3, 4] },
    { label: "Month 2–3 — Getting Settled", range: [5, 13] },
  ];

  function getMilestonesForWeekRange(min: number, max: number) {
    return MILESTONES.filter(m => m.week >= min && m.week <= max);
  }

  const urgencyColor: Record<string, string> = {
    urgent: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20",
    recommended: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
    optional: "text-muted-foreground bg-muted",
  };

  // Voice input for search
  let voiceInputRef: VoiceInput | null = null;
  function startVoiceInput() {
    if (listening) {
      voiceInputRef?.stop();
      setListening(false);
      return;
    }
    voiceInputRef = new VoiceInput({
      lang,
      onResult: (text) => {
        setVoiceText(text);
        setListening(false);
      },
      onStart: () => setListening(true),
      onEnd: () => setListening(false),
      onError: () => setListening(false),
    });
    voiceInputRef.start();
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppNav />

      <main className="max-w-2xl mx-auto px-4 pt-4 pb-8">
        {/* Welcome banner */}
        <div className="hero-gradient text-white rounded-2xl p-5 mb-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-white/70 text-sm">{t(lang, "welcomeBack")},</p>
              <h1 className="text-xl font-bold">{user.displayName || user.username}</h1>
            </div>
            <div className="text-right">
              <div className="day-badge rounded-xl px-3 py-1.5 text-sm font-bold">
                {daysInUS < 90
                  ? t(lang, "dayOf90", { day: String(daysInUS) })
                  : "90+ days "}
              </div>
            </div>
          </div>

          {/* 90-day progress bar */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>{t(lang, "daysInUS")}</span>
              <span>{Math.min(daysInUS, 90)} / 90</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-700"
                style={{ width: `${day90Progress}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-white/60">
            {t(lang, "completedMilestones", { count: String(completedCount), total: String(totalCount) })}
          </p>
        </div>

        {/* Overall milestone progress */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold text-sm">{t(lang, "progressTitle")}</h2>
              <p className="text-xs text-muted-foreground">{t(lang, "progressSub")}</p>
            </div>
            <span className="text-2xl font-bold text-primary">{completionPercent}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" />{completedCount} {t(lang, "completed")}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground" />{totalCount - completedCount} {t(lang, "pending")}</span>
          </div>
        </div>

        {/* Voice note input */}
        <div className="bg-muted/50 border border-border rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-3">
            <button
              data-testid="btn-voice-input"
              onClick={startVoiceInput}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${listening ? "bg-red-500 text-white pulse-urgent" : "bg-primary/10 text-primary hover:bg-primary/20"}`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <p className="text-sm font-medium">{listening ? t(lang, "stopListening") : t(lang, "listenAndSpeak")}</p>
              {voiceText && <p className="text-xs text-muted-foreground mt-0.5">"{voiceText}"</p>}
              {!voiceText && !listening && <p className="text-xs text-muted-foreground">Ask a question or tell us what you need help with</p>}
            </div>
          </div>
        </div>

        {/* Milestone weeks */}
        <h2 className="font-bold text-base mb-3">{t(lang, "milestones")}</h2>

        <div className="space-y-5">
          {weeks.map(({ label, range }) => {
            const items = getMilestonesForWeekRange(range[0], range[1]);
            const completedInGroup = items.filter(m => milestoneMap[m.key]?.completed).length;
            return (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">{label}</h3>
                  <span className="text-xs text-muted-foreground">{completedInGroup}/{items.length}</span>
                </div>
                <div className="relative milestone-track space-y-2">
                  {items.map(milestone => {
                    const dbMs = milestoneMap[milestone.key];
                    const isCompleted = dbMs?.completed ?? false;
                    const isExpanded = expandedKey === milestone.key;
                    const title = getMilestoneTitle(milestone, lang);
                    const description = getMilestoneDescription(milestone, lang);
                    const tips = getMilestoneTips(milestone, lang);

                    return (
                      <div
                        key={milestone.key}
                        data-testid={`milestone-${milestone.key}`}
                        className={`relative ml-10 rounded-xl border transition-all ${
                          isCompleted
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : milestone.urgency === "urgent"
                            ? "bg-card border-orange-200 dark:border-orange-800/50 pulse-urgent"
                            : "bg-card border-border"
                        }`}
                      >
                        {/* Circle indicator */}
                        <div className={`absolute -left-[2.65rem] top-3.5 w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 bg-background ${
                          isCompleted ? "border-green-500 bg-green-500" : milestone.urgency === "urgent" ? "border-orange-400" : "border-border"
                        }`}>
                          {isCompleted
                            ? <Check className="w-3.5 h-3.5 text-white" />
                            : milestone.urgency === "urgent"
                            ? <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
                            : <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          }
                        </div>

                        <button
                          onClick={() => setExpandedKey(isExpanded ? null : milestone.key)}
                          className="w-full text-left p-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-sm font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>{title}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${urgencyColor[milestone.urgency]}`}>
                                  {milestone.urgency === "urgent" ? t(lang, "urgent") : milestone.urgency === "recommended" ? t(lang, "recommended") : ""}
                                </span>
                              </div>
                              {!isExpanded && <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>}
                            </div>
                            <div className="flex items-center gap-1">
                              <VoiceButton text={`${title}. ${description}`} lang={lang} />
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                            </div>
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-3 pb-3 space-y-3">
                            <p className="text-sm text-muted-foreground">{description}</p>

                            {milestone.requiredDocs && milestone.requiredDocs.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold mb-1">Documents needed:</p>
                                <div className="flex flex-wrap gap-1">
                                  {milestone.requiredDocs.map(doc => (
                                    <span key={doc} className="text-xs bg-muted rounded-full px-2 py-0.5">{doc}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {tips.length > 0 && (
                              <div className="bg-primary/5 rounded-xl p-3 space-y-1">
                                <p className="text-xs font-semibold text-primary">Tips:</p>
                                {tips.map(tip => (
                                  <p key={tip} className="text-xs text-muted-foreground flex gap-1.5">
                                    <span className="text-primary">•</span>{tip}
                                  </p>
                                ))}
                              </div>
                            )}

                            {milestone.officialLink && (
                              <a
                                href={milestone.officialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {t(lang, "officialLink")}
                              </a>
                            )}

                            <Button
                              data-testid={`btn-toggle-${milestone.key}`}
                              size="sm"
                              variant={isCompleted ? "outline" : "default"}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (dbMs) {
                                  toggleMutation.mutate({ id: dbMs.id, completed: !isCompleted });
                                }
                              }}
                              className="w-full"
                            >
                              {isCompleted ? t(lang, "markIncomplete") : t(lang, "markComplete")}
                              {!isCompleted && <Check className="w-3.5 h-3.5 ml-1" />}
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
