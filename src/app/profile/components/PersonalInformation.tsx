import React from "react";

const PersonalInformation = ({
  isEditing,
  setIsEditing,
  editData,
  setEditData,
  handleSave,
  handleCancel,
  profileData,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Personal Information</h3>
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
            onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        ) : (
          <p className="px-3 py-2 bg-gray-700 rounded-lg">{profileData.bio}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;
