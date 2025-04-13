'use client';

import { UserProfile } from './types';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface PersonalInfoCardProps {
  profile: UserProfile;
  editableProfile: UserProfile;
  isEditMode: boolean;
  onProfileChange: (profile: UserProfile) => void;
}

export default function PersonalInfoCard({ 
  profile, 
  editableProfile, 
  isEditMode, 
  onProfileChange 
}: PersonalInfoCardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onProfileChange({
      ...editableProfile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 transition-all">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
      
      {isEditMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              id="name"
              name="name"
              type="text" 
              value={editableProfile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              id="email"
              name="email"
              type="email" 
              value={editableProfile.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              value={editableProfile.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input 
              id="address"
              name="address"
              type="text" 
              value={editableProfile.address}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <User size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-gray-900">{profile.name}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Mail size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-gray-900">{profile.email}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Phone size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="text-gray-900">{profile.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-gray-900">{profile.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}