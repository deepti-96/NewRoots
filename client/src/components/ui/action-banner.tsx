import React from "react";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type BannerVariant = "critical" | "success" | "info";

interface ActionBannerProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: BannerVariant;
  className?: string;
}

export function ActionBanner({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  variant = "critical",
  className = ""
}: ActionBannerProps) {
  
  const styles = {
    critical: "bg-red-50 border-red-200 text-red-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    info: "bg-blue-50 border-blue-200 text-blue-900"
  };

  const buttonStyles = {
    critical: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    info: "bg-blue-600 hover:bg-blue-700 text-white"
  };

  const Icon = variant === "success" ? CheckCircle2 : AlertCircle;
  const iconColor = variant === "critical" ? "text-red-500" : variant === "success" ? "text-emerald-500" : "text-blue-500";

  return (
    <div className={`p-4 md:p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm ${styles[variant]} ${className}`}>
      <div className="flex items-start gap-4">
        <Icon className={`w-8 h-8 flex-shrink-0 mt-1 md:mt-0 ${iconColor}`} />
        <div>
          <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
          <p className="text-sm opacity-90 leading-relaxed">{description}</p>
        </div>
      </div>
      {actionLabel && (
        <Button 
          onClick={onAction} 
          className={`flex-shrink-0 font-medium px-6 py-3 h-auto text-base rounded-xl w-full md:w-auto shadow-sm ${buttonStyles[variant]}`}
        >
          {actionLabel}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
}
