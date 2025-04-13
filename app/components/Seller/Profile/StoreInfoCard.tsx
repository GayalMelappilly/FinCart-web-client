'use client';

import { UserProfile } from './types';
import { User, Calendar, Settings } from 'lucide-react';
import Avatar from './Avatar';

interface StoreInfoCardProps {
  profile: UserProfile;
  editableProfile: UserProfile;
  isEditMode: boolean;
  onProfileChange: (profile: UserProfile) => void;
  onAvatarChange: () => void;
}

export default function StoreInfoCard({ 
  profile, 
  editableProfile, 
  isEditMode, 
  onProfileChange,
  onAvatarChange
}: StoreInfoCardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onProfileChange({
      ...editableProfile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full transition-all">
      <div className="flex flex-col items-center mb-6">
        <Avatar 
          src={profile.avatar} 
          name={profile.name} 
          editable={isEditMode}
          onAvatarChange={onAvatarChange}
        />
        
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
          <p className="text-gray-600">{profile.storeName}</p>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span>Member since {profile.joinDate}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-5 mt-2">
        <h3 className="font-medium text-gray-900 mb-4">Store Information</h3>
        
        {isEditMode ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input 
                id="storeName"
                name="storeName"
                type="text" 
                value={editableProfile.storeName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                Tax ID
              </label>
              <input 
                id="taxId"
                name="taxId"
                type="text" 
                value={editableProfile.taxId}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <User size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Store Name</p>
                <p className="text-gray-900">{profile.storeName}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Settings size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tax ID</p>
                <p className="text-gray-900">{profile.taxId}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}