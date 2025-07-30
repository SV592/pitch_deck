import React from 'react';
import ShieldIcon from '../../icons/ShieldIcon';

const SecurityNotice: React.FC = () => {
  return (
    <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
      <ShieldIcon className="w-4 h-4" />
      <span>Secured by Auth0 • Enterprise-grade security</span>
    </div>
  );
};

export default SecurityNotice;
