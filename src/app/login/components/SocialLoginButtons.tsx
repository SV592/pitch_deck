import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import ChromeIcon from '../../icons/ChromeIcon';
import GithubIcon from '../../icons/GithubIcon';
import LinkedinIcon from '../../icons/LinkedinIcon';

interface SocialLoginButtonsProps {
  // handleAuth0Login: (connection?: string) => Promise<void>; // Removed
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  // handleAuth0Login, // Removed
}) => {
  return (
    <div className="space-y-3 mb-6">
      <button
        onClick={() => loginWithRedirect({ connection: 'google-oauth2' })}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700 disabled:opacity-50 border border-gray-600 rounded-lg transition-colors"
      >
        <ChromeIcon className="w-5 h-5 text-white" />
        <span>Continue with Google</span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => loginWithRedirect({ connection: 'google-oauth2' })}
          disabled={isLoading}
          className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700 disabled:opacity-50 border border-gray-600 rounded-lg transition-colors"
        >
          <GithubIcon className="w-5 h-5" />
          <span>GitHub</span>
        </button>

        <button
          onClick={() => loginWithRedirect({ connection: 'google-oauth2' })}
          disabled={isLoading}
          className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700 disabled:opacity-50 border border-gray-600 rounded-lg transition-colors"
        >
          <LinkedinIcon className="w-5 h-5" />
          <span>LinkedIn</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
