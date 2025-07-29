import React from "react";

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Account Settings</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-gray-400">
                Receive updates about your account
              </div>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-gray-400">
                Add an extra layer of security
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors text-sm">
            Enable
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
