import React, { useState, useEffect } from 'react';
import LeftPanelBranding from './components/LeftPanelBranding';
import AuthCard from './components/AuthCard';
import SocialLoginButtons from './components/SocialLoginButtons';
import AuthForm from './components/AuthForm';
import AuthToggleMode from './components/AuthToggleMode';
import SecurityNotice from './components/SecurityNotice';
import BrainIcon from '@/app/icons/BrainIcon';

// Auth0 configuration (these would normally be environment variables)
const AUTH0_CONFIG = {
  domain: 'your-domain.auth0.com', // Replace with your Auth0 domain
  clientId: 'your-client-id', // Replace with your Auth0 client ID
  redirectUri: typeof window !== 'undefined' ? window.location.origin + '/dashboard' : '',
  audience: 'your-api-identifier' // Optional: for API access
};

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  });

  // Initialize Auth0 (in a real app, you'd use the Auth0 React SDK)
  useEffect(() => {
    // This would initialize Auth0 client
    // const auth0Client = new Auth0Client(AUTH0_CONFIG);
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleAuth0Login = async (connection?: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, you'd use Auth0's loginWithRedirect or loginWithPopup
      // await auth0Client.loginWithRedirect({
      //   connection: connection, // 'google-oauth2', 'github', 'linkedin', etc.
      //   redirectUri: AUTH0_CONFIG.redirectUri
      // });
      
      // Simulate Auth0 login for demo
      setTimeout(() => {
        setSuccess('Redirecting to Auth0...');
        // In real app: window.location.href would change to Auth0 Universal Login
        console.log('Auth0 login initiated with connection:', connection || 'email');
        setIsLoading(false);
      }, 1000);
      
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsLoading(false);
    }
  };

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!isLogin && !formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, you'd use Auth0's authentication methods
      // For login: await auth0Client.loginWithCredentials(formData.email, formData.password);
      // For signup: await auth0Client.signup(formData);
      
      // Simulate authentication
      setTimeout(() => {
        setSuccess(isLogin ? 'Login successful!' : 'Account created successfully!');
        setIsLoading(false);
        // Redirect to dashboard
        // window.location.href = '/dashboard';
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      acceptTerms: false
    });
  };

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

          <AuthCard isLogin={isLogin} error={error} success={success}>
            <SocialLoginButtons
              isLoading={isLoading}
              handleAuth0Login={handleAuth0Login}
            />

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-800 px-4 text-gray-400">Or continue with email</span>
              </div>
            </div>

            <AuthForm
              isLogin={isLogin}
              formData={formData}
              handleInputChange={handleInputChange}
              handleEmailPasswordAuth={handleEmailPasswordAuth}
              isLoading={isLoading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleAuth0Login={handleAuth0Login}
            />
          </AuthCard>

          <AuthToggleMode isLogin={isLogin} toggleMode={toggleMode} />
          <SecurityNotice />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;