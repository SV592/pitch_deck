"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AppContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading } = useUser();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
