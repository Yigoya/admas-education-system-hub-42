
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { AuthGuard } from "./components/layout/AuthGuard";
import { LanguageProvider } from "./contexts/LanguageContext";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import StudentRegistration from "./pages/StudentRegistration";
import InmateStudents from "./pages/InmateStudents";
import TeacherList from "./pages/TeacherList";
import TeacherRegistration from "./pages/TeacherRegistration";
import SubjectManagement from "./pages/SubjectManagement";
import CourseManagement from "./pages/CourseManagement";
import Login from "./pages/Login";
import GradeManagement from "./pages/GradeManagement";
import AttendanceManagement from "./pages/AttendanceManagement";
import ExamManagement from "./pages/ExamManagement";
import ReportsAndStatistics from "./pages/ReportsAndStatistics";
import CalendarPage from "./pages/CalendarPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <AuthGuard>
                  <MainLayout />
                </AuthGuard>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="students" element={<StudentList />} />
              <Route path="students/register" element={<StudentRegistration />} />
              <Route path="students/inmates" element={<InmateStudents />} />
              <Route path="teachers" element={<TeacherList />} />
              <Route path="teachers/register" element={<TeacherRegistration />} />
              <Route path="subjects" element={<SubjectManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="grades" element={<GradeManagement />} />
              <Route path="attendance" element={<AttendanceManagement />} />
              <Route path="exams" element={<ExamManagement />} />
              <Route path="reports" element={<ReportsAndStatistics />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
