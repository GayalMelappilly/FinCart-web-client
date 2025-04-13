'use client';

import { Edit2, X } from 'lucide-react';

interface ProfileHeaderProps {
  activeTab: 'view' | 'edit';
  onTabChange: (tab: 'view' | 'edit') => void;
}

export default function ProfileHeader({ activeTab, onTabChange }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Seller Profile</h1>
        <p className="text-gray-600">Manage your personal information and settings</p>
      </div>
      
      {activeTab === 'view' ? (
        <button 
          onClick={() => onTabChange('edit')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          <Edit2 size={18} className="mr-2" />
          Edit Profile
        </button>
      ) : (
        <button 
          onClick={() => onTabChange('view')}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          <X size={18} className="mr-2" />
          Cancel
        </button>
      )}
    </div>
  );
}