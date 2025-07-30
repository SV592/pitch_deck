import React from 'react';
import MailIcon from '../../icons/MailIcon';
import LockIcon from '../../icons/LockIcon';
import EyeIcon from '../../icons/EyeIcon';
import EyeOffIcon from '../../icons/EyeOffIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import LoaderIcon from '../../icons/LoaderIcon';

interface AuthFormProps {
  isLogin: boolean;
  formData: any;
  handleInputChange: (field: string, value: string | boolean) => void;
  handleEmailPasswordAuth: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleAuth0Login: (connection?: string) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  formData,
  handleInputChange,
  handleEmailPasswordAuth,
  isLoading,
  showPassword,
  setShowPassword,
  handleAuth0Login,
}) => {
  return (
    <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
      {!isLogin && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Doe"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <MailIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
      )}

      {!isLogin && (
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
            className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2 mt-1"
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-300">
            I agree to the{' '}
            <a href="#" className="text-orange-500 hover:text-orange-400">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-orange-500 hover:text-orange-400">Privacy Policy</a>
          </label>
        </div>
      )}

      {isLogin && (
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
            />
            <span className="text-sm text-gray-300">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => handleAuth0Login('email')} // This would trigger forgot password flow
            className="text-sm text-orange-500 hover:text-orange-400"
          >
            Forgot password?
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500 disabled:opacity-50 rounded-lg transition-colors font-semibold"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="w-5 h-5 animate-spin" />
            <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
          </>
        ) : (
          <>
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRightIcon className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

export default AuthForm;
