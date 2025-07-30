import React from 'react';
import AlertCircleIcon from '@/app/icons/AlertCircleIcon';
import CheckCircleIcon from '@/app/icons/CheckCircleIcon';

interface AuthCardProps {
  isLogin: boolean;
  error: string;
  success: string;
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
  isLogin,
  error,
  success,
  children,
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-400">
          {isLogin
            ? 'Sign in to your MindMerge account'
            : 'Join thousands of successful entrepreneurs'}
        </p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2 text-red-400">
          <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-2 text-green-400">
          <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      {children}
    </div>
  );
};

export default AuthCard;
