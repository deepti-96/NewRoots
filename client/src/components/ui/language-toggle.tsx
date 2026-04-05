import React from "react";
import { useApp } from "@/App";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLocation } from "wouter";
import { LANGUAGES, t } from "@/lib/translations";

export function LanguageToggle() {
  const { language } = useApp();
  const [, navigate] = useLocation();

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <Button
      variant="outline"
      onClick={() => navigate("/profile")}
      className="w-full flex items-center gap-3 px-4 py-6 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
      aria-label="Change language"
    >
      <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
      <span className="font-bold text-emerald-700">
        {currentLang?.flag} {currentLang?.nativeLabel}
      </span>
      <span className="ml-auto text-xs text-slate-400">{t(language, "changeLanguage")}</span>
    </Button>
  );
}
