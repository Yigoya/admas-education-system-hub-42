
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex w-full">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        <main className="flex-1 p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
