import React from 'react';

interface AuthToggleModeProps {
  isLogin: boolean;
  toggleMode: () => void;
}

const AuthToggleMode: React.FC<AuthToggleModeProps> = ({
  isLogin,
  toggleMode,
}) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-400">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={toggleMode}
          className="ml-2 text-orange-500 hover:text-orange-400 font-medium"
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  );
};

export default AuthToggleMode;
