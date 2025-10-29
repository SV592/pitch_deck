import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import ClientLayout from './components/ClientLayout';

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}