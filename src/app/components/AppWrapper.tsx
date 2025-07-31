'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingSpinner from './LoadingSpinner';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const { isLoading } = useUser();

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
