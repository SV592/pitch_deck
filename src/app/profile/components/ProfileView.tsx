"use client";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import Tabs from "./Tabs";
import PersonalInformation from "./PersonalInformation";
import UsageStatistics from "./UsageStatistics";
import AccountSettings from "./AccountSettings";
import MostRecentDeckCard from "./MostRecentDeckCard";

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export default function ProfileView({ initialProfileData }: { initialProfileData: any }) {
  const { user, isLoading: isAuth0Loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [profileData, setProfileData] = useState(initialProfileData);
  const [editData, setEditData] = useState(initialProfileData);

  useEffect(() => {
    if (!isAuth0Loading && !user) {
      window.location.href = "/login";
    }
  }, [user, isAuth0Loading]);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        const formattedData = {
          ...updatedUser,
          name:
            updatedUser.name ||
            `${updatedUser.firstName} ${updatedUser.lastName}`.trim(),
          joinDate: profileData.joinDate, // Keep original join date
          picture: profileData.picture, // Keep original picture
          email: updatedUser.email || profileData.email,
          usage: {
            ...profileData.usage, // Keep original usage stats
            decksCreated:
              updatedUser.decks?.length ?? profileData.usage.decksCreated,
            dataProcessed: formatBytes(Number(updatedUser.dataProcessed) || 0),
          },
        };
        setProfileData(formattedData);
        setEditData(formattedData);
        setIsEditing(false);
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("An error occurred while saving the profile:", error);
    }
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

  if (isAuth0Loading || !profileData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

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

              <div className="px-6 py-3 space-y-8">
                {activeTab === "overview" && (
                  <>
                    <MostRecentDeckCard deck={profileData.mostRecentDeck} />
                    <PersonalInformation
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      editData={editData}
                      setEditData={setEditData}
                      handleSave={handleSave}
                      handleCancel={handleCancel}
                      profileData={profileData}
                    />
                  </>
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
}
