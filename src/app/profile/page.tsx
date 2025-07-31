"use client";
import React, { useState, useEffect } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileCard from "./components/ProfileCard";
import Tabs from "./components/Tabs";
import PersonalInformation from "./components/PersonalInformation";
import UsageStatistics from "./components/UsageStatistics";
import AccountSettings from "./components/AccountSettings";
import { useUser } from "@auth0/nextjs-auth0/client";

const Profile: React.FC = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    joinDate: "",
    bio: "",
    plan: "Pro Plan",
    usage: {
      chatMessages: 0,
      templatesUsed: 0,
      decksCreated: 0,
      dataProcessed: "0 GB",
    },
    picture: "",
  });

  const [editData, setEditData] = useState(profileData);

  useEffect(() => {
    if (user) {
      const initialData = {
        name: user.name || "",
        email: user.email || "",
        phone: "",
        location: "",
        joinDate: user.updated_at
          ? new Date(user.updated_at).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          : "",
        bio: "",
        plan: "Pro Plan",
        usage: {
          chatMessages: 0,
          templatesUsed: 0,
          decksCreated: 0,
          dataProcessed: "0 GB",
        },
        picture: user.picture || "",
      };
      setProfileData(initialData);
      setEditData(initialData);
    }
  }, [user]);

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
      <ProfileHeader />

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:items-start gap-8">
          <ProfileCard profileData={profileData} />

          <div className="lg:col-span-3">
            <div className="bg-[#1E2939] rounded-xl mb-6">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <div className="p-6">
                {activeTab === "overview" && (
                  <PersonalInformation
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editData={editData}
                    setEditData={setEditData}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    profileData={profileData}
                  />
                )}

                {activeTab === "usage" && (
                  <UsageStatistics usageData={profileData.usage} />
                )}

                {activeTab === "settings" && <AccountSettings />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
