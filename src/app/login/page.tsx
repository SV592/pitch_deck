'use client';

import { useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/'); // Redirect to home if already logged in
      } else if (!error) {
        // Only redirect to login if not loading, no user, and no error (meaning not already trying to log in)
        window.location.href = '/api/auth/login'; // This will trigger Auth0 login
      }
    }
  }, [user, isLoading, error, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      Redirecting to login...
    </div>
  );
};

export default LoginPage;