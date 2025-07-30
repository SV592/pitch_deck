import React from "react";
import LocationIcon from "../../icons/LocationIcon";
import DateIcon from "../../icons/DateIcon";

interface ProfileCardProps {
  profileData: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profileData }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-[#1E2939] rounded-xl p-6 h-[446px]">
        <div className="text-center">
          {/* Profile Picture */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">
              AJ
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
          <p className="text-gray-400 text-sm mb-4">{profileData.email}</p>

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
  );
};

export default ProfileCard;
