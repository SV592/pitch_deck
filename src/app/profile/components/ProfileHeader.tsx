import React from "react";

const ProfileHeader = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
      </div>
      <div>
        <p className="text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
