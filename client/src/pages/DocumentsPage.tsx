import { useApp } from "@/App";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { FileText, CheckCircle2, UploadCloud } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function DocumentsPage() {
  const { user } = useApp();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  const { data: profile } = useQuery({
    queryKey: ["/api/user", user?.id],
    queryFn: () => user ? apiRequest("GET", `/api/user/${user.id}`).then(r => r.json()) : null,
    enabled: !!user,
  });

  if (!user) return null;

  const allPossibleDocs = ["Passport", "Visa", "I-94 Form", "Lease Agreement", "Utility Bill", "Medical Records"];
  const userDocs: string[] = profile ? (() => { try { return JSON.parse(profile.documents || "[]"); } catch { return []; }})() : [];

  // Categorize based on what user has uploaded in their profile during onboarding
  const uploadedDocs = allPossibleDocs.filter(doc => 
    userDocs.some(ud => ud.toLowerCase() === doc.toLowerCase() || doc.toLowerCase().includes(ud.toLowerCase()))
  );
  
  // Also include any custom docs they uploaded that aren't in the standard list
  userDocs.forEach(ud => {
    if (!uploadedDocs.some(doc => doc.toLowerCase().includes(ud.toLowerCase()))) {
      uploadedDocs.push(ud);
    }
  });

  const missingDocs = allPossibleDocs.filter(doc => 
    !uploadedDocs.some(ud => ud.toLowerCase() === doc.toLowerCase() || ud.toLowerCase().includes(doc.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto w-full p-8 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-slate-900 text-3xl font-bold mb-2">My Documents</h1>
        <p className="text-slate-500 text-lg">Manage your critical paperwork securely in one place.</p>
      </div>

      <div className="space-y-12">
        {/* Uploaded Documents Section */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Uploaded Documents</h2>
          {uploadedDocs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedDocs.map(doc => (
                <div key={doc} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-900">{doc}</span>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
              <p className="text-slate-500">No documents uploaded yet.</p>
            </div>
          )}
        </section>

        {/* Missing Documents Section */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Missing Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missingDocs.map(doc => (
              <div key={doc} className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{doc}</h3>
                    <p className="text-sm text-slate-500">Required for most benefits</p>
                  </div>
                </div>
                
                <button className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <UploadCloud className="w-5 h-5" />
                  Upload
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
