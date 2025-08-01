'use client';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import AppContent from './components/AppContent';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans} ${geistMono} antialiased`}
        suppressHydrationWarning
      >
        <UserProvider>
          <AppContent>{children}</AppContent>
        </UserProvider>
      </body>
    </html>
  );
}