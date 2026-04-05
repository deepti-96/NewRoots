import React from "react";
import { Badge } from "@/components/ui/badge";

export type DependencyStatus = "blocked" | "ready" | "action_needed" | "completed";

interface DependencyBadgeProps {
  status: DependencyStatus;
  label?: string;
  className?: string;
}

const statusConfig = {
  blocked: {
    baseLabel: "Blocked",
    classes: "bg-red-100 text-red-800 hover:bg-red-200 border-red-300",
  },
  ready: {
    baseLabel: "Ready",
    classes: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-300",
  },
  action_needed: {
    baseLabel: "Action Needed",
    classes: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300",
  },
  completed: {
    baseLabel: "Completed",
    classes: "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300",
  },
};

export function DependencyBadge({ status, label, className = "" }: DependencyBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={`font-semibold border rounded-full px-3 py-1 ${config.classes} ${className}`}
    >
      {label || config.baseLabel}
    </Badge>
  );
}
