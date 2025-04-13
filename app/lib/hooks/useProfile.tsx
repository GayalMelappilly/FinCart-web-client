import { useState, useEffect } from 'react';
import { UserProfile, PasswordForm, NotificationType } from '@/app/components/Seller/Profile/types'

export function useProfile() {
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');
  const [profile, setProfile] = useState<UserProfile>({
    id: 'S12345',
    name: 'Tyrion Lannister',
    email: 'tyrion@got.com',
    phone: '+91 1234567891',
    address: 'Casterly Rock, King\'s Landing',
    joinDate: '12 June 1945',
    avatar: '/profile-avatar.jpg',
    bio: 'Casterly Rock exotic fins',
    storeName: 'Tyrion\'s Aquatics',
    taxId: 'TAX-9876543',
  });
  
  const [editableProfile, setEditableProfile] = useState<UserProfile>(profile);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset editable profile when switching tabs
  useEffect(() => {
    if (activeTab === 'view') {
      setEditableProfile(profile);
    }
  }, [activeTab, profile]);

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the profile with the edited values
      setProfile(editableProfile);
      setActiveTab('view');
      showNotification('success', 'Profile updated successfully!');
    } catch (error) {
      showNotification('error', 'Failed to update profile. Please try again.');
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    // Basic validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showNotification('error', 'New passwords do not match!');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      showNotification('error', 'Password must be at least 8 characters long!');
      return;
    }
    
    if (!passwordForm.currentPassword) {
      showNotification('error', 'Please enter your current password!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Reset the password form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      showNotification('success', 'Password changed successfully!');
    } catch (error) {
      showNotification('error', 'Failed to update password. Please try again.');
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type: type as 'success' | 'error', message });
    setTimeout(() => setNotification(null), 3000);
  };

  return {
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
  };
}