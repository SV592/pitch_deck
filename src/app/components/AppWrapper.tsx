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
      <div className="relative h-screen w-screen">
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-50"
            onClick={toggleSidebar}
          ></div>
        )}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-300 ease-in-out`}
          style={{ zIndex: 1 }}
        >
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
