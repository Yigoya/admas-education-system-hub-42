import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  BookText, 
  CheckSquare, 
  FileText, 
  Calendar, 
  BarChart4, 
  Settings,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();

  const navItems = [
    { name: t("Dashboard"), icon: <Home size={18} />, path: "/" },
    { name: t("Students"), icon: <GraduationCap size={18} />, path: "/students" },
    { name: t("Teachers"), icon: <Users size={18} />, path: "/teachers" },
    { name: t("Subjects"), icon: <BookText size={18} />, path: "/subjects" },
    { name: t("Grades"), icon: <BookOpen size={18} />, path: "/grades" },
    { name: t("Attendance"), icon: <CheckSquare size={18} />, path: "/attendance" },
    { name: t("Exams"), icon: <FileText size={18} />, path: "/exams" },
    { name: t("Academic Calendar"), icon: <Calendar size={18} />, path: "/calendar" },
    { name: t("Reports & Statistics"), icon: <BarChart4 size={18} />, path: "/reports" },
    { name: t("Settings"), icon: <Settings size={18} />, path: "/settings" },
  ];

  const isCurrentPath = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 h-screen z-30 border-none bg-[#204ECF] text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo and App Name */}
        <div className="flex items-center gap-2 px-4 h-16 border-b border-white/10">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full bg-white object-contain" />
          {!collapsed && <span className="font-bold text-base tracking-tight whitespace-nowrap">EFPuC EduSystem</span>}
        </div>
        {/* Section: Main */}
        <div className="px-4 pt-2 pb-1 text-xs font-semibold text-white/70 uppercase tracking-wide">
          Main
        </div>
        <div className="flex-1 px-2 py-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item, idx) => (
            <Link to={item.path} key={item.path} tabIndex={collapsed ? -1 : 0}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 my-1 px-3 py-2 rounded-lg transition-all duration-150 text-white font-medium",
                  isCurrentPath(item.path)
                    ? "bg-white/20 text-white shadow-sm"
                    : "hover:bg-white/10 hover:text-white",
                  collapsed && "justify-center px-0"
                )}
              >
                {item.icon}
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Button>
            </Link>
          ))}
        </div>
        {/* Section: Administration (example, adjust as needed) */}
        {/* <div className="px-4 pt-4 pb-1 text-xs font-semibold text-white/70 uppercase tracking-wide">
          Administration
        </div> */}
        {/* User area and collapse button */}
        <div className="mt-auto px-3 py-4 border-t border-white/10 flex flex-col gap-3">
          {!collapsed && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#204ECF] font-bold">U</div>
              <div>
                <div className="font-medium leading-tight text-white">Welcome!</div>
                <div className="text-xs text-white/70">User</div>
              </div>
            </div>
          )}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 rounded-lg text-white hover:bg-white/10",
                    collapsed && "justify-center"
                  )}
                  onClick={() => setCollapsed(!collapsed)}
                  aria-label={collapsed ? t("Expand Sidebar") : t("Collapse Sidebar")}
                >
                  {collapsed ? (
                    <ChevronRightSquare size={20} />
                  ) : (
                    <>
                      <ChevronLeftSquare size={20} />
                      <span>{t("Collapse Sidebar")}</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                {collapsed ? t("Expand Sidebar") : t("Collapse Sidebar")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
};

// Custom icons for consistent styling
const ChevronLeftSquare = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="m14 16-4-4 4-4" />
  </svg>
);

const ChevronRightSquare = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="m10 8 4 4-4 4" />
  </svg>
);
