import React from 'react';
import BrainIcon from '@/app/icons/BrainIcon';
import ZapIcon from '@/app/icons/ZapIcon';
import UsersIcon from '@/app/icons/UsersIcon';
import TrendingUpIcon from '@/app/icons/TrendingUpIcon';

const LeftPanelBranding: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col justify-center px-16">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
            <BrainIcon className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            Mind<span className="text-orange-500">Merge</span>
          </h1>
        </div>

        {/* Value Proposition */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 leading-tight">
            Create Stunning Pitch Decks with AI Power
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Join thousands of entrepreneurs who have raised millions using our AI-powered pitch deck generator.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <ZapIcon className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">AI-Powered Generation</h3>
              <p className="text-gray-400 text-sm">Create professional decks in minutes</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Team Collaboration</h3>
              <p className="text-gray-400 text-sm">Work together seamlessly with version control</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <TrendingUpIcon className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Proven Success</h3>
              <p className="text-gray-400 text-sm">$500M+ raised by our users</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">10K+</div>
            <div className="text-sm text-gray-400">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">50K+</div>
            <div className="text-sm text-gray-400">Decks Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">95%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanelBranding;
