
import { useState } from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  CheckSquare,
  Clock,
  Clipboard,
  PieChart,
  ArrowUpRight,
  User
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { statistics } from "@/mock/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();
  
  // Recent activity data
  const activities = [
    {
      id: "1",
      type: "student",
      title: t("New Student Registered"),
      time: t("Today at 10:30 AM"),
      description: t("Abebe Kebede has been registered as a new student in Grade 8."),
      icon: <User className="h-6 w-6 text-blue-600" />,
    },
    {
      id: "2",
      type: "exam",
      title: t("Final Exam Results Posted"),
      time: t("Yesterday at 3:45 PM"),
      description: t("Grade 10 Mathematics final exam results have been posted."),
      icon: <Clipboard className="h-6 w-6 text-red-600" />,
    },
    {
      id: "3",
      type: "attendance",
      title: t("Attendance Report Generated"),
      time: t("Yesterday at 1:20 PM"),
      description: t("Monthly attendance report for Grade 6 has been generated."),
      icon: <Clock className="h-6 w-6 text-yellow-600" />,
    },
    {
      id: "4",
      type: "teacher",
      title: t("New Teacher Joined"),
      time: t("2 days ago"),
      description: t("Solomon Haile has joined as an English teacher."),
      icon: <GraduationCap className="h-6 w-6 text-green-600" />,
    },
    {
      id: "5",
      type: "course",
      title: t("New Course Added"),
      time: t("3 days ago"),
      description: t("Afan Oromo Literature has been added to Grade 9 curriculum."),
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
    },
  ];

  // Chart data
  const studentsByGradeData = statistics.gradeDistribution.map((item) => ({
    name: `${t("Grade")} ${item.grade}`,
    value: item.count,
  }));

  const genderDistributionData = [
    { name: t("Male"), value: statistics.genderDistribution.male },
    { name: t("Female"), value: statistics.genderDistribution.female },
  ];

  const inmateStatusData = [
    { name: t("Inmates"), value: statistics.inmateStudents },
    { name: t("Non-Inmates"), value: statistics.nonInmateStudents },
  ];

  const attendanceData = [
    { name: t("Jan"), value: 92 },
    { name: t("Feb"), value: 88 },
    { name: t("Mar"), value: 91 },
    { name: t("Apr"), value: 87 },
    { name: t("May"), value: 90 },
    { name: t("Jun"), value: 94 },
    { name: t("Jul"), value: 88 },
    { name: t("Aug"), value: 86 },
    { name: t("Sep"), value: 92 },
    { name: t("Oct"), value: 89 },
    { name: t("Nov"), value: 91 },
    { name: t("Dec"), value: 87 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("Dashboard")}</h1>
        <div className="text-sm text-muted-foreground">
          {t("Academic Year")}: 2023-2024
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("Total Students")}
          value={statistics.totalStudents}
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title={t("Total Teachers")}
          value={statistics.totalTeachers}
          icon={<GraduationCap className="h-6 w-6" />}
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title={t("Average Attendance")}
          value={`${statistics.averageAttendance}%`}
          icon={<Clock className="h-6 w-6" />}
          trend={{ value: 2, positive: false }}
        />
        <StatCard
          title={t("Average Grade")}
          value={statistics.averageGrade}
          icon={<CheckSquare className="h-6 w-6" />}
          trend={{ value: 8, positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title={t("Students by Grade")}
          type="bar"
          data={studentsByGradeData}
          className="lg:col-span-2"
          height={300}
        />
        <ChartCard
          title={t("Gender Distribution")}
          type="pie"
          data={genderDistributionData}
          height={300}
          colors={["#0A2463", "#DA121A"]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title={t("Monthly Attendance Rate")}
          type="line"
          data={attendanceData}
          className="lg:col-span-2"
          height={300}
        />
        <ChartCard
          title={t("Inmate vs. Non-Inmate Students")}
          type="pie"
          data={inmateStatusData}
          height={300}
          colors={["#078930", "#FCDD09"]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity 
          activities={activities} 
          className="lg:col-span-2"
        />
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-lg font-medium mb-4">{t("Quick Links")}</h3>
            <div className="space-y-2">
              <a 
                href="/students/register" 
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
              >
                <span>{t("Student Registration")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a 
                href="/attendance" 
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
              >
                <span>{t("Today's Attendance")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a 
                href="/exams" 
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
              >
                <span>{t("Upcoming Exams")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a 
                href="/reports" 
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
              >
                <span>{t("Generate Reports")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-navy to-primary-blue text-white rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">{t("Academic Calendar")}</h3>
            <p className="text-sm opacity-90 mb-4">{t("Next important dates")}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("Mid-term Exams")}</p>
                  <p className="text-xs opacity-90">{t("Grade")} 1-12</p>
                </div>
                <p className="text-sm font-medium">{t("Dec 10-15")}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("Parents Meeting")}</p>
                  <p className="text-xs opacity-90">{t("All grades")}</p>
                </div>
                <p className="text-sm font-medium">{t("Dec 20")}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{t("Winter Break")}</p>
                  <p className="text-xs opacity-90">{t("School closed")}</p>
                </div>
                <p className="text-sm font-medium">{t("Dec 25-Jan 5")}</p>
              </div>
            </div>
            
            <button className="mt-4 text-sm flex items-center justify-center w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-2 rounded-md">
              {t("View Full Calendar")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
