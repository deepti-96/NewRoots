import React from "react";
import { useApp } from "@/App";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useApp();

  const toggleLang = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLang}
      className="w-full flex items-center justify-between px-4 py-6 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
      aria-label="Toggle language between English and Español"
    >
      <span className={language === "en" ? "font-bold text-emerald-700" : "opacity-70"}>
        English
      </span>
      <span className="text-slate-300 mx-2">|</span>
      <span className={language === "es" ? "font-bold text-emerald-700" : "opacity-70"}>
        Español
      </span>
    </Button>
  );
}
