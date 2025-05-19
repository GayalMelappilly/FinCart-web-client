import { useToast } from '@/app/providers/ToastProvider';
import { updateSellerProfile } from '@/app/services/sellerAuthServices';
import { 
  Address, 
  BusinessInfo, 
  ContactInfo, 
  SellerData, 
  SellerSettings,
  SellerPaymentSettings
} from '@/app/types/seller/sellerDetails/types';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export interface DashboardMetric {
  total: string;
  percentChange: string;
  trend: string;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type NotificationType = {
  type: 'success' | 'error' | 'info';
  message: string;
} | null;

export function useProfile() {
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');
  const [profile, setProfile] = useState<SellerData | null>(null);
  const [editableProfile, setEditableProfile] = useState<SellerData | null>(null);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notification, setNotification] = useState<NotificationType>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {showToast} = useToast()

  const mutation = useMutation({
    mutationFn: updateSellerProfile,
    onSuccess: (data) => {
      console.log(data)
      showToast('success', 'Profile updated')
    },
    onError: (err) => {
      console.log('Profile update failed : ', err)
      showToast('error', 'Failed to update profile')
    }
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadProfileFromLocalStorage = () => {
      try {
        const sellerDataString = localStorage.getItem('seller');
        if (sellerDataString) {
          const sellerData = JSON.parse(sellerDataString);
          setProfile(sellerData);
          setEditableProfile(sellerData);
        }
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
        showNotification('error', 'Failed to load profile data');
      }
    };

    loadProfileFromLocalStorage();
  }, []);

  // Reset editable profile when switching tabs
  useEffect(() => {
    if (activeTab === 'view' && profile) {
      setEditableProfile(profile);
    }
  }, [activeTab, profile]);

  const handleProfileUpdate = async () => {
    if (!editableProfile) return;
    
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call
      mutation.mutate(editableProfile)
      
      // Update the profile with the edited values
      setProfile(editableProfile);
      
      // Save updated profile to localStorage
      localStorage.setItem('seller', JSON.stringify(editableProfile));
      
      setActiveTab('view');
      showNotification('success', 'Profile updated successfully!');
    } catch (error) {
      showNotification('error', 'Failed to update profile. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusinessInfoUpdate = (updates: Partial<BusinessInfo>) => {
    if (!editableProfile) return;
    
    setEditableProfile({
      ...editableProfile,
      businessInfo: {
        ...editableProfile.businessInfo,
        ...updates
      }
    });
  };

  const handleAddressUpdate = (updates: Partial<Address>) => {
    if (!editableProfile) return;
    
    setEditableProfile({
      ...editableProfile,
      address: editableProfile.address ? {
        ...editableProfile.address,
        ...updates
      } : {
        addressLine1: '',
        addressType: null,
        landmark: null,
        location: {
          city: '',
          state: '',
          country: '',
          pinCode: ''
        },
        ...updates
      }
    });
  };

  const handleContactInfoUpdate = (updates: Partial<ContactInfo>) => {
    if (!editableProfile) return;
    
    setEditableProfile({
      ...editableProfile,
      contactInfo: {
        ...editableProfile.contactInfo,
        ...updates
      }
    });
  };

  const handleSettingsUpdate = (updates: Partial<SellerSettings>) => {
    if (!editableProfile) return;
    
    setEditableProfile({
      ...editableProfile,
      settings: editableProfile.settings ? {
        ...editableProfile.settings,
        ...updates
      } : {
        autoAcceptOrders: false,
        defaultWarrantyPeriod: 0,
        returnWindow: 0,
        shippingProvider: '',
        minOrderValue: 0,
        ...updates
      }
    });
  };

  const handlePaymentSettingsUpdate = (updates: Partial<SellerPaymentSettings>) => {
    if (!editableProfile) return;
    
    setEditableProfile({
      ...editableProfile,
      paymentSettings: editableProfile.paymentSettings ? {
        ...editableProfile.paymentSettings,
        ...updates
      } : {
        paymentCycle: '',
        minPayoutAmount: 0,
        ...updates
      }
    });
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type: type as 'success' | 'error' | 'info', message });
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
    handleBusinessInfoUpdate,
    handleAddressUpdate,
    handleContactInfoUpdate,
    handleSettingsUpdate,
    handlePaymentSettingsUpdate,
    showNotification
  };
}