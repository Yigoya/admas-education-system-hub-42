
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
        "bg-white border-r h-screen transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="px-3 py-2">
          {navItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 my-1",
                  isCurrentPath(item.path)
                    ? "bg-gray-100 text-primary font-medium"
                    : "hover:bg-gray-100 hover:text-primary-foreground"
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Button>
            </Link>
          ))}
        </div>

        <div className="mt-auto p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRightSquare size={18} />
            ) : (
              <>
                <ChevronLeftSquare size={18} />
                <span>{t("Collapse Sidebar")}</span>
              </>
            )}
          </Button>
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
