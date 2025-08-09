"use client";

import React from "react";
import Image from "next/image";
import LocationIcon from "../../icons/LocationIcon";
import DateIcon from "../../icons/DateIcon";

interface ProfileCardProps {
  profileData: {
    name: string;
    email: string;
    location: string;
    joinDate: string;
    usage: {
      decksCreated: number;
      templatesUsed: number;
    };
    picture: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData }) => {
  const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-[#1E2939] rounded-xl p-6 h-full flex flex-col justify-between">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            {profileData.picture ? (
              <Image
                src={profileData.picture}
                alt={profileData.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                {getInitials(profileData.name)}
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
          <p className="text-gray-400 text-sm mb-4 break-all overflow-wrap-anywhere min-w-0">
            {profileData.email}
          </p>

          <div className="space-y-3 text-sm">
            {profileData.location && (
              <div className="flex justify-center items-center">
                <LocationIcon />
                <span>{profileData.location}</span>
              </div>
            )}
            {profileData.joinDate && (
              <div className="flex justify-center items-center space-x-3">
                <DateIcon />
                <span>Joined {profileData.joinDate}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="">
              <div className="text-2xl font-bold text-orange-500">
                {profileData.usage.decksCreated}
              </div>
              <div className="text-xs text-gray-400">Decks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
