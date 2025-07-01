import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1 min-h-screen flex flex-col" style={{ marginLeft: sidebarCollapsed ? '4rem' : '16rem', transition: 'margin-left 0.3s' }}>
          <Header toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="flex-1 p-6 w-full overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
