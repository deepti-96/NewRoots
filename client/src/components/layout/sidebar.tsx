import React from "react";
import { Link, useLocation } from "wouter";
import { 
  Map, 
  HeartHandshake, 
  Briefcase, 
  FileText,
  LayoutDashboard,
  User,
  LogOut,
  Calculator,
  Settings,
  HelpCircle
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useApp } from "@/App";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { apiRequest } from "@/lib/queryClient";

export function Sidebar() {
  const [location, navigate] = useLocation();
  const { language, setUser } = useApp();
  const { logout: auth0Logout } = useAuth0();

  async function logout() {
    try {
      await apiRequest("POST", "/api/auth/logout");
    } catch (e) {
      console.error("Backend logout failed", e);
    }
    setUser(null);
    auth0Logout({ 
      logoutParams: { 
        returnTo: window.location.origin 
      } 
    });
  }

  const navGroups = [
    {
      group: language === "en" ? "Overview" : "Visión General",
      items: [
        { href: "/dashboard", icon: LayoutDashboard, label: language === "en" ? "Dashboard" : "Panel" },
      ]
    },
    {
      group: language === "en" ? "Support & Services" : "Soporte y Servicios",
      items: [
        { href: "/benefits", icon: HeartHandshake, label: language === "en" ? "Benefits Explorer" : "Beneficios" },
        { href: "/taxes", icon: Calculator, label: language === "en" ? "Taxes & Finance" : "Impuestos y Finanzas" },
      ]
    },
    {
      group: language === "en" ? "Manage" : "Gestionar",
      items: [
        { href: "/documents", icon: FileText, label: language === "en" ? "My Documents" : "Mis Documentos" },
      ]
    },
    {
      group: language === "en" ? "Account" : "Cuenta",
      items: [
        { href: "/profile", icon: User, label: language === "en" ? "Family Profile" : "Perfil Familiar" },
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white h-screen sticky top-0 flex flex-col pt-6 pb-6 shadow-sm z-10 hidden md:flex">
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold text-emerald-800 tracking-tight flex items-center gap-2">
          <HeartHandshake className="w-6 h-6" />
          NewRoots
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto w-full scrollbar-hide">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-4 text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
              {group.group}
            </h3>
            {group.items.map((item) => {
              // Exact match or fallback for root dashboard mapping
              const isActive = location === item.href || (location === "/" && item.href === "/dashboard");
              
              return (
                <Link key={item.href} href={item.href}>
                  <a className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                    isActive 
                      ? "bg-emerald-50 text-emerald-800 shadow-sm" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}>
                    <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-4 pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-slate-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5 text-slate-400" />
          {language === "en" ? "Sign Out" : "Cerrar sesión"}
        </button>
        <LanguageToggle />
      </div>
    </aside>
  );
}
