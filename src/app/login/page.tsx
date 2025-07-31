"use client";
import React, { useEffect } from "react";
import LeftPanelBranding from "./components/LeftPanelBranding";
import AuthCard from "./components/AuthCard";
import SocialLoginButtons from "./components/SocialLoginButtons";
import SecurityNotice from "./components/SecurityNotice";
import BrainIcon from "@/app/icons/BrainIcon";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/'); // Redirect to home if already logged in
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <LeftPanelBranding />

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <BrainIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              Mind<span className="text-orange-500">Merge</span>
            </h1>
          </div>

          <AuthCard isLogin={true} error={""} success={""}>
            <SocialLoginButtons
              isLoading={false}
              handleAuth0Login={() => window.location.href = '/api/auth/login'}
            />

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-800 px-4 text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Auth0 Universal Login handles email/password */}
            <a
              href="/api/auth/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Login / Sign Up with Email
            </a>
          </AuthCard>

          <SecurityNotice />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
