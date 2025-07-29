'use client';
import React, { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProfileCard from './components/ProfileCard';
import Tabs from './components/Tabs';
import PersonalInformation from './components/PersonalInformation';
import UsageStatistics from './components/UsageStatistics';
import AccountSettings from './components/AccountSettings';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@mindmerge.ai',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    bio: 'AI enthusiast and creative professional passionate about leveraging artificial intelligence to enhance productivity and creativity.',
    plan: 'Pro Plan',
    usage: {
      chatMessages: 1247,
      templatesUsed: 89,
      decksCreated: 23,
      dataProcessed: '2.4 GB',
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
    { id: 'overview', label: 'Overview' },
    { id: 'usage', label: 'Usage Stats' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className='min-h-screen bg-gray-900 items-center text-white '>
      <ProfileHeader />

      <div className='max-w-6xl mx-auto p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <ProfileCard profileData={profileData} />

          <div className='lg:col-span-3'>
            <div className='bg-[#1E2939] rounded-xl mb-6'>
              <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className='p-6'>
                {activeTab === 'overview' && (
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

                {activeTab === 'usage' && (
                  <UsageStatistics usageData={profileData.usage} />
                )}

                {activeTab === 'settings' && <AccountSettings />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;