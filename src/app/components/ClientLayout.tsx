'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import AppContent from './AppContent';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <AppContent>{children}</AppContent>
    </UserProvider>
  );
}
