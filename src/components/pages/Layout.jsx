import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/" || path === "/models") return "Model Management";
    if (path.startsWith("/models/")) return "Model Details";
    if (path === "/clients") return "Client Management";
    if (path === "/jobs") return "Job Management";
    if (path === "/bookings") return "Booking Management";
    if (path === "/calendar") return "Calendar";
    if (path === "/messages") return "Messages";
    if (path === "/documents") return "Document Management";
    if (path === "/analytics") return "Analytics";
    return "Elevé Agency";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <Header
          title={getPageTitle()}
          onMenuToggle={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;