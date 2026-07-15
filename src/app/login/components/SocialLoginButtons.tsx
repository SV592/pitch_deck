import React from 'react';
import ChromeIcon from '../../icons/ChromeIcon';
import GithubIcon from '../../icons/GithubIcon';
import LinkedinIcon from '../../icons/LinkedinIcon';

// Social sign-in goes through the Auth0 Next SDK login route; `connection`
// pre-selects the provider on Auth0 (falls back to Universal Login otherwise).
const loginWith = (connection: string) => {
  window.location.href = `/api/auth/login?connection=${encodeURIComponent(connection)}`;
};

const SocialLoginButtons: React.FC = () => {
  return (
    <div className="space-y-3 mb-6">
      <button
        onClick={() => loginWith('google-oauth2')}
        className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors"
      >
        <ChromeIcon className="w-5 h-5 text-white" />
        <span>Continue with Google</span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => loginWith('github')}
          className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors"
        >
          <GithubIcon className="w-5 h-5" />
          <span>GitHub</span>
        </button>

        <button
          onClick={() => loginWith('linkedin')}
          className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors"
        >
          <LinkedinIcon className="w-5 h-5" />
          <span>LinkedIn</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
