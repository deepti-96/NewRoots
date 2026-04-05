import { useApp } from "@/App";
import { t } from "@/lib/translations";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import VoiceButton from "@/components/VoiceButton";
import AgentChatWidget from "@/components/AgentChatWidget";
import { MILESTONES, getMilestoneTitle, getMilestoneDescription, getMilestoneTips } from "@/lib/milestoneData";
import { Check, Clock, AlertCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ActionBanner } from "@/components/ui/action-banner";
import { StatusCard } from "@/components/ui/status-card";
import { DependencyBadge } from "@/components/ui/dependency-badge";

interface Milestone {
  id: number;
  userId: number;
  key: string;
  completed: boolean;
  completedAt: string | null;
  notes: string;
}

export default function DashboardPage() {
  const { user, language } = useApp();
  const [, navigate] = useLocation();
  const qc = useQueryClient();
  const lang = language;
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

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

  const arrivalDate = profile?.arrivalDate;
  const daysInUS = arrivalDate
    ? Math.max(0, Math.floor((Date.now() - new Date(arrivalDate).getTime()) / 86400000))
    : 0;
  
  const milestoneMap: Record<string, Milestone> = {};
  for (const m of milestones) milestoneMap[m.key] = m;

  const completedCount = milestones.filter(m => m.completed).length;
  const totalCount = MILESTONES.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const weeks = [
    { label: "Week 1 — First 72 Hours", range: [1, 1] },
    { label: "Week 2 — Key Paperwork & Identity", range: [2, 2] },
    { label: "Week 3–4 — Benefits & Legal Compliance", range: [3, 4] },
    { label: "Month 2 — Employment & Self-Sufficiency", range: [5, 7] },
    { label: "Month 3 — Stability & Integration", range: [8, 13] },
  ];

  function getMilestonesForWeekRange(min: number, max: number) {
    return MILESTONES.filter(m => m.week >= min && m.week <= max);
  }

  // Find next critical action
  const nextCritical = MILESTONES.find(m => m.urgency === "urgent" && !milestoneMap[m.key]?.completed);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto w-full p-8 animate-in fade-in duration-500">
      {/* Hero Welcome */}
      <h1 className="text-slate-900 text-3xl font-bold mb-2">Welcome to NewRoots.</h1>
      <p className="text-slate-500 text-lg mb-8">Here is your Day 1 Action Plan.</p>

      {/* Critical Action Alert */}
      {nextCritical ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-900 mb-1">Action Needed: {getMilestoneTitle(nextCritical, lang)}</h3>
            <p className="text-amber-800/80 mb-3">{getMilestoneDescription(nextCritical, lang)}</p>
            <Button 
               onClick={() => {
                 setExpandedKey(nextCritical.key);
                 document.getElementById(`milestone-card-${nextCritical.key}`)?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="bg-amber-700 hover:bg-amber-800 text-white rounded-xl shadow-sm"
            >
              Resolve Now
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <Check className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 mb-1">All Caught Up!</h3>
            <p className="text-emerald-800/80">You have completed all urgent tasks for now.</p>
          </div>
        </div>
      )}

      {/* 3 Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-2">Overall Progress</p>
          <div className="text-3xl font-extrabold text-emerald-700 mb-3">{completionPercent}%</div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-600 rounded-full transition-all duration-1000" style={{ width: `${completionPercent}%` }} />
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <p className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-2">Documents Ready</p>
           <div className="text-3xl font-extrabold text-slate-900">
             {profile ? ((() => { try { return JSON.parse(profile.documents || "[]").length; } catch { return 0; }})()) : 0} <span className="text-xl text-slate-400 font-medium">/ 8</span>
           </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
           <p className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-2">Days in U.S.</p>
           <div className="text-3xl font-extrabold text-slate-900">
             {daysInUS} <span className="text-xl text-slate-400 font-medium">/ 90</span>
           </div>
        </div>
      </div>

      {/* Milestones List */}
      <h2 className="font-bold text-2xl tracking-tight text-slate-900 mt-8 mb-6">{t(lang, "milestones")}</h2>
      <div className="space-y-8">
        {weeks.map(({ label, range }) => {
          const items = getMilestonesForWeekRange(range[0], range[1]);
          const completedInGroup = items.filter(m => milestoneMap[m.key]?.completed).length;
          
          if (items.length === 0) return null;

          return (
            <div key={label} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="text-lg font-semibold text-slate-800">{label}</h3>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {completedInGroup} / {items.length}
                </span>
              </div>
              
              <div className="grid gap-4">
                {items.map(milestone => {
                  const dbMs = milestoneMap[milestone.key];
                  const isCompleted = dbMs?.completed ?? false;
                  const isExpanded = expandedKey === milestone.key;
                  const title = getMilestoneTitle(milestone, lang);
                  const description = getMilestoneDescription(milestone, lang);
                  const tips = getMilestoneTips(milestone, lang);

                  let statusBadgeText = "ready";
                  if (isCompleted) statusBadgeText = "completed";
                  else if (milestone.urgency === "urgent") statusBadgeText = "action_needed";

                  return (
                    <StatusCard 
                      key={milestone.key}
                      title={title}
                      isActive={isExpanded}
                      className={isCompleted ? "opacity-75 bg-slate-50/50" : ""}
                    >
                      <div id={`milestone-card-${milestone.key}`}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <DependencyBadge status={statusBadgeText as any} />
                          </div>
                          
                          <div className="flex gap-2">
                            <VoiceButton text={`${title}. ${description}`} lang={lang} />
                            <Button
                              variant="ghost" 
                              size="sm"
                              onClick={() => setExpandedKey(isExpanded ? null : milestone.key)}
                              className="text-slate-500 hover:text-slate-800"
                            >
                              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </Button>
                          </div>
                        </div>

                        {/* Collapsed view snippet */}
                        {!isExpanded && (
                          <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                            {description}
                          </p>
                        )}
                        
                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-2 duration-200">
                            <p className="text-slate-700 leading-relaxed">{description}</p>

                            {milestone.requiredDocs && milestone.requiredDocs.length > 0 && (
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-sm font-semibold text-slate-800 mb-2">{t(lang, "documentsNeeded")}</p>
                                <div className="flex flex-wrap gap-2">
                                  {milestone.requiredDocs.map(doc => (
                                    <span key={doc} className="text-xs bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-1 shadow-sm">
                                      {doc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {tips.length > 0 && (
                              <div className="bg-emerald-50 text-emerald-900 rounded-xl p-4 border border-emerald-100 space-y-2">
                                <p className="text-sm font-bold flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-emerald-600" /> {t(lang, "tipsLabel")}
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {tips.map(tip => (
                                    <li key={tip} className="text-sm text-emerald-800/80">{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                              <Button
                                size="lg"
                                className={`w-full sm:w-auto px-8 font-semibold rounded-xl text-white shadow-sm ${
                                  isCompleted ? "bg-slate-600 hover:bg-slate-700" : "bg-emerald-600 hover:bg-emerald-700"
                                }`}
                                onClick={() => {
                                  if (dbMs) {
                                    toggleMutation.mutate({ id: dbMs.id, completed: !isCompleted });
                                  }
                                }}
                              >
                                {isCompleted ? t(lang, "markIncomplete") : t(lang, "markComplete")}
                                {!isCompleted && <Check className="w-5 h-5 ml-2" />}
                              </Button>

                              {milestone.officialLink && (
                                <a
                                  href={milestone.officialLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-white border border-emerald-200 px-4 py-3 rounded-xl w-full sm:w-auto text-center justify-center transition-colors hover:bg-emerald-50"
                                >
                                  {t(lang, "officialLink")}
                                  <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </StatusCard>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <AgentChatWidget />
    </div>
  );
}
