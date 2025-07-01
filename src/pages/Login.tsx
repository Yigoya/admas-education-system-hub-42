
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if ((email === "admin@fpca.edu.et" && password === "password") || 
          (email === "teacher@fpca.edu.et" && password === "password") || 
          (email === "student@fpca.edu.et" && password === "password")) {
        
        const role = email.split('@')[0]; // Extract role from email
        
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify({ 
          email, 
          role, // use email prefix as role for simplicity
          name: role === "admin" 
            ? "Admin User" 
            : role === "teacher" 
              ? "Teacher User" 
              : "Student User",
          isAuthenticated: true
        }));

        toast({
          title: getTranslation("loginSuccessful", language),
          description: getTranslation("welcomeBack", language),
        });
        
        navigate("/");
      } else {
        toast({
          title: getTranslation("loginFailed", language),
          description: getTranslation("invalidCredentials", language),
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  // Translation function for login page
  const getTranslation = (key: string, lang: string) => {
    const translations: Record<string, Record<string, string>> = {
      loginTitle: {
        en: "Login to FPCA",
        am: "የ FPCA መግቢያ",
        or: "FPCA seensaa gali"
      },
      loginDescription: {
        en: "Enter your credentials to access your account",
        am: "ወደ መለያዎ ለመግባት የመለያ መረጃዎን ያስገቡ",
        or: "Herrega keessan argachuuf ragaa keessan galchaa"
      },
      email: {
        en: "Email",
        am: "ኢሜል",
        or: "Imeelii"
      },
      password: {
        en: "Password",
        am: "የይለፍ ቃል",
        or: "Jecha darbii"
      },
      login: {
        en: "Login",
        am: "ግባ",
        or: "Seeni"
      },
      language: {
        en: "Language",
        am: "ቋንቋ",
        or: "Afaan"
      },
      loginSuccessful: {
        en: "Login Successful",
        am: "መግባት ተሳክቷል",
        or: "Seensa milkaa'e"
      },
      welcomeBack: {
        en: "Welcome back to the system",
        am: "ወደ ስርዓቱ እንኳን በደህና መጡ",
        or: "Baga nagaan sisteema keenyatti deebitani"
      },
      loginFailed: {
        en: "Login Failed",
        am: "መግባት አልተሳካም",
        or: "Seensuun hin milkoofne"
      },
      invalidCredentials: {
        en: "Invalid email or password",
        am: "ልክ ያልሆነ ኢሜል ወይም የይለፍ ቃል",
        or: "Imeelii ykn jecha darbii dogoggora"
      },
      english: {
        en: "English",
        am: "እንግሊዝኛ",
        or: "Ingliffaa"
      },
      amharic: {
        en: "Amharic",
        am: "አማርኛ",
        or: "Afaan Amaaraa"
      },
      afanOromo: {
        en: "Afan Oromo",
        am: "ኦሮሚኛ",
        or: "Afaan Oromoo"
      }
    };

    return translations[key]?.[lang] || translations[key]?.["en"] || key;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/f270ab01-3ac8-48da-8e98-8b8a1bfd5c7d.png" 
              alt="Federal Prison Commission Logo" 
              className="h-24 w-24 object-contain" 
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {getTranslation("loginTitle", language)}
          </CardTitle>
          <CardDescription className="text-center">
            {getTranslation("loginDescription", language)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">{getTranslation("language", language)}</Label>
              <Select
                value={language}
                onValueChange={setLanguage}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{getTranslation("english", language)}</SelectItem>
                  <SelectItem value="am">{getTranslation("amharic", language)}</SelectItem>
                  <SelectItem value="or">{getTranslation("afanOromo", language)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{getTranslation("email", language)}</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@fpca.edu.et"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{getTranslation("password", language)}</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : getTranslation("login", language)}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>Mock accounts: admin@fpca.edu.et/password, teacher@fpca.edu.et/password, student@fpca.edu.et/password</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
