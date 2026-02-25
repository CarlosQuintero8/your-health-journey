import { Home, BarChart3, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { path: "/", label: "Home", icon: Home },
  { path: "/historial", label: "History", icon: BarChart3 },
  { path: "/perfil", label: "Profile", icon: User },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith("/registro")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border card-shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto h-16 px-2">
        {tabs.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)} className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 min-w-[72px] ${isActive ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground"}`}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[11px] ${isActive ? "font-semibold" : "font-medium"}`}>{label}</span>
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

export default BottomNav;
