'use client';

import { SellerData } from '@/app/types/seller/sellerDetails/types';

interface BioCardProps {
  profile: SellerData | null;
  editableProfile: SellerData | null;
  isEditMode: boolean;
  onProfileChange: (profile: SellerData | null) => void;
}

export default function BioCard({ 
  profile, 
  editableProfile, 
  isEditMode, 
  onProfileChange 
}: BioCardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!editableProfile) return;
    
    onProfileChange({
      ...editableProfile,
      businessInfo: {
        ...editableProfile.businessInfo,
        storeDescription: e.target.value
      }
    });
  };

  if (!profile || !editableProfile) {
    return <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 transition-all">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Bio</h3>
      
      {isEditMode ? (
        <div>
          <label htmlFor="storeDescription" className="sr-only">Bio</label>
          <textarea 
            id="storeDescription"
            name="storeDescription"
            value={editableProfile.businessInfo.storeDescription || ''}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell customers about your business and expertise..."
          />
          <p className="mt-2 text-sm text-gray-500">
            Write a short bio that highlights your expertise and what makes your business special.
          </p>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>{profile.businessInfo.storeDescription || 'No bio provided yet.'}</p>
        </div>
      )}
    </div>
  );
}