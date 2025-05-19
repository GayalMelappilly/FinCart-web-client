'use client';

import { SellerData, Address } from '@/app/types/seller/sellerDetails/types';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface PersonalInfoCardProps {
  profile: SellerData | null;
  editableProfile: SellerData | null;
  isEditMode: boolean;
  onProfileChange: (profile: SellerData | null) => void;
}

export default function PersonalInfoCard({ 
  profile, 
  editableProfile, 
  isEditMode, 
  onProfileChange 
}: PersonalInfoCardProps) {
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editableProfile) return;
    
    onProfileChange({
      ...editableProfile,
      contactInfo: {
        ...editableProfile.contactInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editableProfile) return;
    
    // If we already have an address, update it
    if (editableProfile.address) {
      if (e.target.name === 'addressLine1') {
        onProfileChange({
          ...editableProfile,
          address: {
            ...editableProfile.address,
            addressLine1: e.target.value
          }
        });
      } else if (e.target.name.startsWith('location.')) {
        // Handle location fields (city, state, etc.)
        const locationField = e.target.name.split('.')[1];
        onProfileChange({
          ...editableProfile,
          address: {
            ...editableProfile.address,
            location: {
              ...editableProfile.address.location,
              [locationField]: e.target.value
            }
          }
        });
      }
    } 
    // If we don't have an address yet, create a new one
    else {
      const newAddress: Address = {
        addressLine1: '',
        addressType: null,
        landmark: null,
        location: {
          city: '',
          state: '',
          country: '',
          pinCode: ''
        }
      };
      
      if (e.target.name === 'addressLine1') {
        newAddress.addressLine1 = e.target.value;
      } else if (e.target.name.startsWith('location.')) {
        const locationField = e.target.name.split('.')[1];
        newAddress.location = {
          ...newAddress.location,
          [locationField]: e.target.value
        };
      }
      
      onProfileChange({
        ...editableProfile,
        address: newAddress
      });
    }
  };

  if (!profile || !editableProfile) {
    return <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">Loading...</div>;
  }

  const getFormattedAddress = (address: Address | null): string => {
    if (!address) return 'No address provided';
    
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.landmark,
      address.location.city,
      address.location.state,
      address.location.country,
      address.location.pinCode
    ].filter(Boolean);
    
    return parts.join(', ');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 transition-all">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
      
      {isEditMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              id="displayName"
              name="displayName"
              type="text" 
              value={editableProfile.businessInfo.displayName || ''}
              onChange={(e) => {
                onProfileChange({
                  ...editableProfile,
                  businessInfo: {
                    ...editableProfile.businessInfo,
                    displayName: e.target.value
                  }
                });
              }}
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
              value={editableProfile.contactInfo.email}
              onChange={handleContactInfoChange}
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
              value={editableProfile.contactInfo.phone}
              onChange={handleContactInfoChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input 
              id="addressLine1"
              name="addressLine1"
              type="text" 
              value={editableProfile.address?.addressLine1 || ''}
              onChange={handleAddressChange}
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
              <p className="text-gray-900">{profile.businessInfo.displayName}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Mail size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-gray-900">{profile.contactInfo.email}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <Phone size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="text-gray-900">{profile.contactInfo.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-gray-900">{getFormattedAddress(profile.address)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}