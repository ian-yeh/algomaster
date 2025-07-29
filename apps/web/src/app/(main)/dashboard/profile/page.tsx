"use client";
import React, { useEffect, useState } from 'react';
import { User, MapPin, Briefcase, Edit3, Save, X } from 'lucide-react';
import Link from 'next/link';
import { useCurrentUser } from '@/contexts/UserContext';

const ProfilePage = () => {
  const user = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    headline: '',
    location: '',
    industry: '',
    summary: '',
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const { updateProfile } = user;

  // Update profile state when userProfile changes
  useEffect(() => {
    if (user.userProfile) {
      const newProfile = {
        firstName: user.userProfile.firstName || '',
        lastName: user.userProfile.lastName || '',
        headline: user.userProfile.headline || '',
        location: user.userProfile.location || '',
        industry: user.userProfile.industry || '',
        summary: user.userProfile.summary || '',
      };
      setProfile(newProfile);
      setEditedProfile(newProfile);
    }
  }, [user.userProfile]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = async () => {
    await updateProfile({
      ...editedProfile,
      profilePictureUrl: '',
      bannerImageUrl: '',
      createdAt: new Date(),
    });
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Show loading state while user data is being fetched
  if (user.isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-lg h-32 relative">
        <div className="absolute -bottom-16 left-8">
          <Link href={'/dashboard/home'}>
            <h1 className='text-white mb-4'>Go back</h1>
          </Link>
          <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center">
            <User size={48} className="text-gray-600" />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 ml-8">
        {!isEditing ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-xl text-gray-700 mt-2">{profile.headline}</p>
            <div className="flex items-center gap-4 mt-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={16} />
                <span>{profile.industry}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={editedProfile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={editedProfile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={editedProfile.headline}
                onChange={(e) => handleInputChange('headline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editedProfile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={editedProfile.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
        {!isEditing ? (
          <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Summary
            </label>
            <textarea
              value={editedProfile.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>
        )}
      </div>

      {/* Placeholder sections for future features */}
      <div className="mt-6 space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Experience</h2>
          <p className="text-gray-500">Work experience will appear here</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-500">Education history will appear here</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills</h2>
          <p className="text-gray-500">Skills and endorsements will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
