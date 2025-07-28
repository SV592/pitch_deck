"use client";
import React, { useState } from "react";

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
      projectsCreated: 23,
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
    { id: "billing", label: "Billing" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <p className="text-gray-400 mt-1">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-orange-500 px-3 py-2 rounded-lg">
                {/* <Crown className="w-4 h-4" /> */}
                <span className="text-sm font-medium">{profileData.plan}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-center">
                {/* Profile Picture */}
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">
                    AJ
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                    {/* <Camera className="w-4 h-4" /> */}
                  </button>
                </div>

                <h2 className="text-xl font-semibold mb-1">
                  {profileData.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  {profileData.email}
                </p>

                {/* Quick Stats */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 text-gray-300">
                    {/* <MapPin className="w-4 h-4 text-gray-400" /> */}
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    {/* <Calendar className="w-4 h-4 text-gray-400" /> */}
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">
                        {profileData.usage.projectsCreated}
                      </div>
                      <div className="text-xs text-gray-400">Projects</div>
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
            <div className="bg-gray-800 rounded-xl border border-gray-700 mb-6">
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
                    {/* <tab.icon className="w-4 h-4" /> */}
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
                          {/* <Edit3 className="w-4 h-4" /> */}
                          <span>Edit</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                          >
                            {/* <Save className="w-4 h-4" /> */}
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancel}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {/* <X className="w-4 h-4" /> */}
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
                        {/* <MessageCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" /> */}
                        <div className="text-2xl font-bold">
                          {profileData.usage.chatMessages}
                        </div>
                        <div className="text-sm text-gray-400">
                          Chat Messages
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        {/* <FileText className="w-8 h-8 text-orange-500 mx-auto mb-2" /> */}
                        <div className="text-2xl font-bold">
                          {profileData.usage.templatesUsed}
                        </div>
                        <div className="text-sm text-gray-400">
                          Templates Used
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        {/* <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-2" /> */}
                        <div className="text-2xl font-bold">
                          {profileData.usage.projectsCreated}
                        </div>
                        <div className="text-sm text-gray-400">
                          Projects Created
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        {/* <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" /> */}
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
                          {/* <Bell className="w-5 h-5 text-gray-400" /> */}
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
                          {/* <Shield className="w-5 h-5 text-gray-400" /> */}
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

                {/* Billing Tab */}
                {activeTab === "billing" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                      Billing & Subscription
                    </h3>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            {/* <Crown className="w-5 h-5" /> */}
                            <span className="font-semibold">Pro Plan</span>
                          </div>
                          <p className="text-orange-100 text-sm">
                            Full access to all features and unlimited usage
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">$10</div>
                          <div className="text-sm text-orange-100">
                            per month
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-3">Payment Method</h4>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">
                          VISA
                        </div>
                        <span className="text-gray-300">
                          •••• •••• •••• 4242
                        </span>
                        <button className="text-orange-500 hover:text-orange-400 text-sm">
                          Update
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
