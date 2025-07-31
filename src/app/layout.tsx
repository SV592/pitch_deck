"use client";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans} ${geistMono} antialiased`}
        suppressHydrationWarning
      >
        <UserProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {/* Main content area, adjusts based on sidebar */}
            <div
              className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "ml-64" : "ml-0"
              }`}
            >
              {/* Header always visible at the top of the main content area */}
              <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
              />

              {/* Page content */}
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
