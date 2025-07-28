"use client";
import React, { useState } from "react";
import LocationIcon from "../icons/LocationIcon";
import DateIcon from "../icons/DateIcon";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@mindmerge.ai",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    bio: "AI enthusiast and creative professional passionate about leveraging artificial intelligence to enhance productivity and creativity.",
    plan: "Pro Plan",
    usage: {
      chatMessages: 1247,
      templatesUsed: 89,
      decksCreated: 23,
      dataProcessed: "2.4 GB",
    },
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage Stats" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 items-center text-white ">
      {/* Header */}
      <div className="border-b bg-gray-800 border-gray-700">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-gray-400 mt-1">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E2939] rounded-xl p-6 h-[446px]">
              <div className="text-center">
                {/* Profile Picture */}
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">
                    AJ
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-1">
                  {profileData.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {profileData.email}
                </p>

                {/* Quick Stats */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-center items-center">
                    <LocationIcon />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex justify-center items-center space-x-3">
                    <DateIcon />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">
                        {profileData.usage.decksCreated}
                      </div>
                      <div className="text-xs text-gray-400">Decks</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">
                        {profileData.usage.templatesUsed}
                      </div>
                      <div className="text-xs text-gray-400">Templates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-[#1E2939] rounded-xl mb-6">
              <div className="flex border-b border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        Personal Information
                      </h3>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                        >
                          <span>Edit</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                          >
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) =>
                              setEditData({ ...editData, name: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-700 rounded-lg">
                            {profileData.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-700 rounded-lg">
                            {profileData.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-700 rounded-lg">
                            {profileData.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.location}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                location: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-700 rounded-lg">
                            {profileData.location}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editData.bio}
                          onChange={(e) =>
                            setEditData({ ...editData, bio: e.target.value })
                          }
                          rows={4}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-700 rounded-lg">
                          {profileData.bio}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Usage Stats Tab */}
                {activeTab === "usage" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Usage Statistics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">
                          {profileData.usage.chatMessages}
                        </div>
                        <div className="text-sm text-gray-400">
                          Chat Messages
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">
                          {profileData.usage.templatesUsed}
                        </div>
                        <div className="text-sm text-gray-400">
                          Templates Used
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">
                          {profileData.usage.projectsCreated}
                        </div>
                        <div className="text-sm text-gray-400">
                          Projects Created
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold">
                          {profileData.usage.dataProcessed}
                        </div>
                        <div className="text-sm text-gray-400">
                          Data Processed
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Account Settings</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-medium">
                              Email Notifications
                            </div>
                            <div className="text-sm text-gray-400">
                              Receive updates about your account
                            </div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-medium">
                              Two-Factor Authentication
                            </div>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
