import { useState, useEffect } from "react";
import { Bell, Search, Globe, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  toggleSidebar: () => void;
}

interface User {
  username: string;
  role: string;
  name: string;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [user, setUser] = useState<User | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLanguageChange = (lang: "en" | "am" | "or") => {
    setLanguage(lang);
    
    const languages: Record<string, string> = {
      en: "English",
      am: "አማርኛ",
      or: "Afaan Oromo",
    };
    
    toast({
      title: "Language Changed",
      description: `Language set to ${languages[lang]}`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/f270ab01-3ac8-48da-8e98-8b8a1bfd5c7d.png" 
            alt="Federal Prison Commission Logo" 
            className="h-10 w-10 object-contain mr-2" 
          />
          <h1 className="text-xl font-semibold text-primary-navy hidden md:block">
            Federal Prison Commission Academy
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === "en" ? "English" : language === "am" ? "አማርኛ" : "Afaan Oromo"}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("am")}>
              <span className="amharic">አማርኛ</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("or")}>
              <span className="afaan-oromo">Afaan Oromo</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 relative">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{user?.name || "User"}</div>
                <div className="text-xs text-gray-500">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || "Role"}</div>
              </div>
              <ChevronDown className="h-4 w-4 hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t("Profile")}</DropdownMenuItem>
            <DropdownMenuItem>{t("Account Settings")}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              {t("Logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
