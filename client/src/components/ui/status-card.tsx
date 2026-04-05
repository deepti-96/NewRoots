import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface StatusCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export function StatusCard({ title, description, children, footer, icon, className = "", isActive = false }: StatusCardProps) {
  return (
    <Card className={`rounded-2xl shadow-sm transition-all duration-200 border-slate-200 ${isActive ? 'ring-2 ring-emerald-500 shadow-md' : 'hover:shadow-md'} ${className}`}>
      <CardHeader className="flex flex-row items-start space-y-0 pb-4">
        <div className="flex-1 space-y-1">
          <CardTitle className="text-xl font-bold text-slate-900 leading-tight">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-slate-600 text-sm leading-relaxed">
              {description}
            </CardDescription>
          )}
        </div>
        {icon && (
          <div className="ml-4 flex-shrink-0 text-emerald-700 bg-emerald-50 p-2 rounded-xl">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="text-slate-700 text-base">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="pt-4 border-t border-slate-100">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
