'use client';

import { UserProfile } from './types';

interface BioCardProps {
  profile: UserProfile;
  editableProfile: UserProfile;
  isEditMode: boolean;
  onProfileChange: (profile: UserProfile) => void;
}

export default function BioCard({ 
  profile, 
  editableProfile, 
  isEditMode, 
  onProfileChange 
}: BioCardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onProfileChange({
      ...editableProfile,
      bio: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 transition-all">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Bio</h3>
      
      {isEditMode ? (
        <div>
          <label htmlFor="bio" className="sr-only">Bio</label>
          <textarea 
            id="bio"
            name="bio"
            value={editableProfile.bio}
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
          <p>{profile.bio}</p>
        </div>
      )}
    </div>
  );
}