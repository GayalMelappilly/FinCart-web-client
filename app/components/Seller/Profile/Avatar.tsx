'use client';

import { SellerData } from '@/app/types/seller/sellerDetails/types';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import SmallUploadingAnimation from '../../UploadingAnimation/SmallUploadingAnimation';

interface AvatarProps {
  src: string;
  name: string;
  editable?: boolean;
  editableProfile: SellerData;
  onProfileChange: (editables: SellerData) => void;
}

export default function Avatar({ src, name, editable = false, editableProfile, onProfileChange }: AvatarProps) {

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('clicked', editableProfile)
    if (!editableProfile) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setImagePreview(base64Image as string);
      setUploading(true);
      try {
        const response = await fetch('/api/image-upload/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await response.json();
        if (data.url) {
          console.log('Profile picture : ', editableProfile, data.url)
          onProfileChange({
            ...editableProfile,
            businessInfo: {
              ...editableProfile.businessInfo,
              logoUrl: data.url
            }
          })
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
        console.log('final : ', editableProfile)
      }
    };
  };

  return (
    <div className="relative">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow">

        {uploading ? (
          <SmallUploadingAnimation />
        ) : imagePreview ? (
          <Image
            src={imagePreview}
            alt={`${name}'s avatar`}
            width={128}
            height={128}
            className="w-full h-full object-cover" />
        ) : (
          <Image
            src={src}
            alt={`${name}'s avatar`}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {editable && (
        <button
          className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Change avatar"
        >
          <input
            type="file"
            className="absolute bottom-0 right-0 w-10 h-10 p-2 rounded-full text-black/0"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <Camera size={16} />
        </button>
      )}
    </div>
  );
}