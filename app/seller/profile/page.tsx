'use client';

import BioCard from '@/app/components/Seller/Profile/BioCard';
import Notification from '@/app/components/Seller/Profile/NotificationTab';
import PersonalInfoCard from '@/app/components/Seller/Profile/PersonalInfoCard';
import ProfileHeader from '@/app/components/Seller/Profile/ProfileHeader';
import SecurityCard from '@/app/components/Seller/Profile/SecurityCard';
import StoreInfoCard from '@/app/components/Seller/Profile/StoreInfoCard';
import { useProfile } from '@/hooks/useProfile';
import { Save } from 'lucide-react';

export default function ProfilePage() {
  const {
    activeTab,
    setActiveTab,
    profile,
    editableProfile,
    setEditableProfile,
    passwordForm,
    setPasswordForm,
    notification,
    isLoading,
    handleProfileUpdate,
    handlePasswordChange,
    showNotification
  } = useProfile();

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <Notification 
          notification={notification} 
          onClose={() => setPasswordForm({...passwordForm})} 
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ProfileHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <StoreInfoCard 
              profile={profile}
              editableProfile={editableProfile}
              isEditMode={activeTab === 'edit'}
              onProfileChange={setEditableProfile}
            />
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard 
              profile={profile}
              editableProfile={editableProfile}
              isEditMode={activeTab === 'edit'}
              onProfileChange={setEditableProfile}
            />
            
            <BioCard 
              profile={profile}
              editableProfile={editableProfile}
              isEditMode={activeTab === 'edit'}
              onProfileChange={setEditableProfile}
            />
            
            <SecurityCard 
              passwordForm={passwordForm}
              onPasswordChange={setPasswordForm}
              lastUpdatedAt={profile?.updatedAt as string}
              onSubmit={handlePasswordChange}
              isEditMode={activeTab === 'edit'}
              onEditModeChange={() => setActiveTab('edit')}
              isLoading={isLoading}
            />
            
            {/* Save Button for Edit Mode */}
            {activeTab === 'edit' && (
              <div className="flex justify-end">
                <button
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                  className={`flex items-center px-6 py-3 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition
                    ${isLoading 
                      ? 'bg-green-400 cursor-not-allowed focus:ring-green-300' 
                      : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                    }`}
                >
                  <Save size={18} className="mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}