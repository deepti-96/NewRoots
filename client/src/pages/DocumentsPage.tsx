import { useApp } from "@/App";
import { t } from "@/lib/translations";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  FileText, CheckCircle2, Shield, User, Home, Heart, CreditCard, 
  Lock, AlertCircle, Upload, Loader2, Search
} from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  {
    id: "identity",
    title: "docCat1",
    icon: User,
    docs: ["Passport", "Visa", "I-94 Form", "Social Security Number", "Birth Certificate"]
  },
  {
    id: "housing",
    title: "docCat2",
    icon: Home,
    docs: ["Lease Agreement", "Utility Bill"]
  },
  {
    id: "finance",
    title: "docCat3",
    icon: Heart,
    docs: ["Medical Records", "Immunization records", "Bank Statement", "Employment Authorization (EAD)"]
  }
];

export default function DocumentsPage() {
  const { user, language } = useApp();
  const lang = language;
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  const { data: profile } = useQuery({
    queryKey: ["/api/user", user?.id],
    queryFn: () => user ? apiRequest("GET", `/api/user/${user.id}`).then(r => r.json()) : null,
    enabled: !!user,
  });

  const verifyMutation = useMutation({
    mutationFn: async (updatedDocs: string[]) => {
      return apiRequest("PATCH", `/api/user/${user?.id}`, { 
        documents: JSON.stringify(updatedDocs) 
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/user", user?.id] });
      qc.invalidateQueries({ queryKey: ["/api/milestones", user?.id] });
      setUploadingDoc(null);
      toast({
        title: "Document Verified",
        description: "Status updated and your milestones have been synchronized.",
      });
    }
  });

  if (!user) return null;

  const currentDocs: string[] = profile ? (() => { try { return JSON.parse(profile.documents || "[]"); } catch { return []; }})() : [];
  
  const totalPossibleDocs = CATEGORIES.reduce((acc, cat) => acc + cat.docs.length, 0);
  const securedCount = currentDocs.length;
  const progressPercent = Math.round((securedCount / totalPossibleDocs) * 100);

  const handleVerification = (docName: string) => {
    if (currentDocs.includes(docName)) return;
    setUploadingDoc(docName);
    
    // Simulate a brief delay for "processing"
    setTimeout(() => {
      const updatedDocs = [...currentDocs, docName];
      verifyMutation.mutate(updatedDocs);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto w-full p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">{t(lang, "officialRecords")}</Badge>
          </div>
          <h1 className="text-slate-900 text-4xl font-black tracking-tight">{t(lang, "navDocuments")}</h1>
          <p className="text-slate-500 text-lg max-w-md">{t(lang, "documentsSub")}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50 min-w-[300px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t(lang, "checklistProgress")}</span>
            <span className="text-2xl font-black text-emerald-600">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-slate-100 mb-2" />
          <p className="text-xs text-slate-500 font-medium">{securedCount} of {totalPossibleDocs} {t(lang, "documentsVerified")}</p>
        </div>
      </div>

      {/* Search/Filter placeholder - simple visual for premium feel */}
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          disabled
          placeholder={t(lang, "searchDocuments")} 
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-400 cursor-not-allowed shadow-sm"
        />
      </div>

      <div className="grid gap-12">
        {CATEGORIES.map((category) => (
          <section key={category.id} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                <category.icon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{t(lang, category.title as any)}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.docs.map((doc) => {
                const isSecured = currentDocs.includes(doc);
                const isUploading = uploadingDoc === doc;

                return (
                  <div 
                    key={doc}
                    onClick={() => !isSecured && !isUploading && handleVerification(doc)}
                    className={`
                      relative group cursor-pointer overflow-hidden
                      border-2 rounded-[2rem] p-7 transition-all duration-300
                      ${isSecured 
                        ? "bg-white border-emerald-500/20 shadow-emerald-100/30 shadow-lg" 
                        : "bg-slate-50/50 border-dashed border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40"
                      }
                    `}
                  >
                    {/* Background decoration */}
                    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-10 transition-colors ${isSecured ? 'bg-emerald-500' : 'bg-slate-500 group-hover:bg-emerald-300'}`} />

                    <div className="flex flex-col h-full justify-between items-start gap-6 relative z-10">
                      <div className="flex justify-between w-full items-start">
                        <div className={`
                          w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                          ${isSecured ? "bg-emerald-50 text-emerald-600 rotate-0" : "bg-white border border-slate-100 text-slate-400 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-500 shadow-sm"}
                        `}>
                          {isSecured ? <FileText className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
                        </div>
                        
                        {isSecured ? (
                          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-emerald-100/50">
                            <CheckCircle2 className="w-3 h-3" />
                            {t(lang, "verified")}
                          </div>
                        ) : isUploading ? (
                          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-amber-100">
                             <Loader2 className="w-3 h-3 animate-spin" />
                             {t(lang, "verifying")}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-slate-200 group-hover:bg-emerald-100 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-colors">
                            {t(lang, "missing")}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className={`font-black text-lg transition-colors ${isSecured ? "text-slate-900" : "text-slate-500 group-hover:text-emerald-900"}`}>
                          {doc}
                        </h3>
                        <p className={`text-xs font-medium transition-colors ${isSecured ? "text-emerald-600/70" : "text-slate-400 group-hover:text-emerald-600/70"}`}>
                          {isSecured ? "ID: #" + Math.random().toString(36).substr(2, 6).toUpperCase() : t(lang, "requiredForJourney")}
                        </p>
                      </div>

                      {/* Explicit button removed as per request, instead we use a text link/hint */}
                      {!isSecured && !isUploading && (
                        <div className="pt-2 flex items-center gap-2 text-emerald-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t(lang, "markAsPresent")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Informational Note */}
      <div className="mt-16 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-20 h-20 rounded-3xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-lg shadow-slate-200/50">
          <AlertCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-3">
          <h4 className="text-xl font-black text-slate-900 leading-tight">{t(lang, "whyChecklistTitle")}</h4>
          <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
            {t(lang, "whyChecklistBody")}
          </p>
        </div>
      </div>
    </div>
  );
}
