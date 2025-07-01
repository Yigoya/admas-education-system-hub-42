
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  // Mock settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [theme, setTheme] = useState("light");
  const [academicYear, setAcademicYear] = useState("2023-2024");
  const [timezone, setTimezone] = useState("Africa/Addis_Ababa");
  
  const handleSaveSettings = () => {
    toast({
      title: t("Settings Saved"),
      description: t("Your settings have been saved successfully."),
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("Settings")}</h1>
        <Button onClick={handleSaveSettings}>{t("Save Changes")}</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="general">{t("General")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("Notifications")}</TabsTrigger>
          <TabsTrigger value="security">{t("Security")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("General Settings")}</CardTitle>
              <CardDescription>{t("Manage your account settings and preferences")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="school-name">{t("School Name")}</Label>
                    <Input id="school-name" defaultValue="Federal Prison Commission Academy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academic-year">{t("Academic Year")}</Label>
                    <Select value={academicYear} onValueChange={setAcademicYear}>
                      <SelectTrigger id="academic-year">
                        <SelectValue placeholder={t("Select academic year")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                        <SelectItem value="2025-2026">2025-2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">{t("Timezone")}</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder={t("Select timezone")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Addis_Ababa">Africa/Addis Ababa (UTC+3)</SelectItem>
                        <SelectItem value="Africa/Nairobi">Africa/Nairobi (UTC+3)</SelectItem>
                        <SelectItem value="Africa/Cairo">Africa/Cairo (UTC+2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">{t("Language")}</Label>
                    <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder={t("Select language")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="am">አማርኛ</SelectItem>
                        <SelectItem value="or">Afaan Oromo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">{t("Theme")}</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder={t("Select theme")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t("Light")}</SelectItem>
                      <SelectItem value="dark">{t("Dark")}</SelectItem>
                      <SelectItem value="system">{t("System")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("System Settings")}</CardTitle>
              <CardDescription>{t("Configure system-wide settings")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Auto Backup")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Automatically backup system data daily")}
                  </p>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Maintenance Mode")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Put system in maintenance mode")}
                  </p>
                </div>
                <Switch checked={false} onCheckedChange={() => {}} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("Notification Settings")}</CardTitle>
              <CardDescription>{t("Control when and how you receive notifications")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Enable Notifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Receive notifications about system events")}
                  </p>
                </div>
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Email Notifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Receive notifications via email")}
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications} 
                  disabled={!notificationsEnabled}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("SMS Notifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Receive notifications via SMS")}
                  </p>
                </div>
                <Switch 
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications} 
                  disabled={!notificationsEnabled}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("Notification Types")}</CardTitle>
              <CardDescription>{t("Select which types of events trigger notifications")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Student Registration")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("When new students are registered")}
                  </p>
                </div>
                <Switch checked={true} disabled={!notificationsEnabled} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Exam Results")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("When exam results are published")}
                  </p>
                </div>
                <Switch checked={true} disabled={!notificationsEnabled} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("System Updates")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("When system updates are available")}
                  </p>
                </div>
                <Switch checked={false} disabled={!notificationsEnabled} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("Security Settings")}</CardTitle>
              <CardDescription>{t("Manage your account security")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t("Current Password")}</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t("New Password")}</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t("Confirm New Password")}</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>{t("Change Password")}</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("Two-Factor Authentication")}</CardTitle>
              <CardDescription>{t("Add an extra layer of security to your account")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Enable Two-Factor Authentication")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Require a verification code in addition to your password")}
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Login Activity Alerts")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Receive notifications for unusual login activity")}
                  </p>
                </div>
                <Switch checked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
