'use client';

import { User, Calendar, Settings } from 'lucide-react';
import Avatar from './Avatar';
import { SellerData } from '@/app/types/seller/sellerDetails/types';

interface StoreInfoCardProps {
  profile: SellerData | null;
  editableProfile: SellerData | null;
  isEditMode: boolean;
  onProfileChange: (profile: SellerData | null) => void;
  onAvatarChange: () => void;
}

export default function StoreInfoCard({ 
  profile, 
  editableProfile, 
  isEditMode, 
  onProfileChange,
  onAvatarChange
}: StoreInfoCardProps) {
  // Handle business info changes specifically
  const handleBusinessInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editableProfile) return;
    
    onProfileChange({
      ...editableProfile,
      businessInfo: {
        ...editableProfile.businessInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  if (!profile || !editableProfile) {
    return <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full transition-all">
      <div className="flex flex-col items-center mb-6">
        <Avatar 
          src={profile.businessInfo.logoUrl || ''} 
          name={profile.businessInfo.businessName} 
          editable={isEditMode}
          onAvatarChange={onAvatarChange}
        />
        
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900">{profile.businessInfo.displayName}</h2>
          <p className="text-gray-600">{profile.businessInfo.businessName}</p>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span>Member since {new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-5 mt-2">
        <h3 className="font-medium text-gray-900 mb-4">Store Information</h3>
        
        {isEditMode ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input 
                id="businessName"
                name="businessName"
                type="text" 
                value={editableProfile.businessInfo.businessName}
                onChange={handleBusinessInfoChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1">
                Tax ID (GSTIN)
              </label>
              <input 
                id="gstin"
                name="gstin"
                type="text" 
                value={editableProfile.businessInfo.gstin || ''}
                onChange={handleBusinessInfoChange}
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
                <p className="text-gray-900">{profile.businessInfo.businessName}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Settings size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tax ID (GSTIN)</p>
                <p className="text-gray-900">{profile.businessInfo.gstin || 'Not provided'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}