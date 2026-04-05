import React from "react";
import { Sidebar } from "./sidebar";
import { useLocation } from "wouter";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();

  // Certain pages like landing and onboarding might not need the persistent layout.
  if (location === "/" || location === "/onboarding") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <main className="flex-1 flex justify-center w-full overflow-y-auto">
        <div className="w-full max-w-5xl px-4 md:px-8 py-8 md:py-12 pb-24">
          {children}
        </div>
      </main>
    </div>
  );
}
