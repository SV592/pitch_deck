"use client";
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileHeader from "./components/ProfileHeader";
import ProfileCard from "./components/ProfileCard";
import Tabs from "./components/Tabs";
import PersonalInformation from "./components/PersonalInformation";
import UsageStatistics from "./components/UsageStatistics";
import AccountSettings from "./components/AccountSettings";

const Profile: React.FC = () => {
  const { user, isLoading: isAuth0Loading } = useUser();
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
    if (isAuth0Loading) {
      return; // Wait for Auth0 user to load
    }

    if (user) {
      // Populate basic profile data from Auth0 session
      const basicProfileData = {
        name: user.name || user.nickname || user.email || '',
        email: user.email || '',
        picture: user.picture || '',
        // Add other basic fields if available directly from user object
        phone: '', // Will be fetched from backend
        location: '', // Will be fetched from backend
        joinDate: user.updated_at
          ? new Date(user.updated_at).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })
          : '',
        bio: '', // Will be fetched from backend
        plan: 'Pro Plan', // Default or fetched from backend
        usage: {
          chatMessages: 0,
          templatesUsed: 0,
          decksCreated: 0,
          dataProcessed: '0 GB',
        },
      };
      setProfileData(basicProfileData);
      setEditData(basicProfileData);

      // Now fetch additional data from backend
      const fetchAdditionalProfileData = async () => {
        console.log("Attempting to fetch additional profile data from backend...");
        try {
          const response = await fetch('/api/profile');
          if (!response.ok) {
            if (response.status === 401) {
              // If backend says unauthorized, it means JWT failed, redirect to login
              window.location.href = '/login';
              return;
            }
            throw new Error(`Backend error: ${response.statusText}`);
          }
          const data = await response.json();
          // Merge additional data from backend with existing basic data
          setProfileData((prev) => ({
            ...prev,
            phone: data.phone || '',
            location: data.location || '',
            bio: data.bio || '',
            // Add other fields from backend response here
          }));
          setEditData((prev) => ({
            ...prev,
            phone: data.phone || '',
            location: data.location || '',
            bio: data.bio || '',
          }));
        } catch (error: any) {
          console.error('Failed to fetch additional profile data:', error);
        }
      };
      fetchAdditionalProfileData();
    } else {
      // If not loading and no user, redirect to login
      window.location.href = '/login';
    }
  }, [user, isAuth0Loading]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setProfileData(updatedUser);
        setIsEditing(false);
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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

  if (isAuth0Loading) {
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