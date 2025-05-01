'use client'

import { FormData, FormErrors } from '@/app/types/seller/types';
import { FC, useState } from 'react';
import LoadingAnimation from '../../UploadingAnimation/UploadingAnimation';
import Image from 'next/image';

type Props = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors: FormErrors;
}

const businessTypes = [
  { value: 'INDIVIDUAL', label: 'Individual' },
  { value: 'PROPRIETORSHIP', label: 'Proprietorship' },
  { value: 'PARTNERSHIP', label: 'Partnership' },
  { value: 'LLP', label: 'LLP' },
  { value: 'PRIVATE_LIMITED', label: 'Private Limited' },
  { value: 'PUBLIC_LIMITED', label: 'Public Limited' },
  { value: 'OTHER', label: 'Other' }
];

const BusinessInfoStep: FC<Props> = ({ formData, handleChange, setFormData, errors }) => {

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          console.log('Profile picture : ', data.url)
          setFormData({
            ...formData,
            logoUrl: data.url as string
          });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900">Business Information</h3>

      <div className="flex justify-center mb-8">
        <div>
          <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Logo URL</label>
          <div className="relative w-32 h-32 rounded-md overflow-hidden border-2 border-blue-100 bg-gray-100">
            {uploading ? (
              <LoadingAnimation />
            ) : imagePreview ? (
              <Image src={imagePreview} alt="Profile preview" layout="fill" objectFit="cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-blue-600 rounded-md p-2 cursor-pointer">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name*</label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Business Type*</label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            {businessTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700">Alternate Phone</label>
          <input
            id="alternatePhone"
            name="alternatePhone"
            type="tel"
            value={formData.alternatePhone}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.alternatePhone && <p className="mt-1 text-sm text-red-600">{errors.alternatePhone}</p>}
        </div>

        <div>
          <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">GSTIN</label>
          <input
            id="gstin"
            name="gstin"
            type="text"
            value={formData.gstin}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.gstin && <p className="mt-1 text-sm text-red-600">{errors.gstin}</p>}
        </div>

        <div>
          <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">PAN Card*</label>
          <input
            id="panCard"
            name="panCard"
            type="text"
            value={formData.panCard}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.panCard && <p className="mt-1 text-sm text-red-600">{errors.panCard}</p>}
        </div>

        <div>
          <label htmlFor="legalBusinessName" className="block text-sm font-medium text-gray-700">Legal Business Name*</label>
          <input
            id="legalBusinessName"
            name="legalBusinessName"
            type="text"
            value={formData.legalBusinessName}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.legalBusinessName && <p className="mt-1 text-sm text-red-600">{errors.legalBusinessName}</p>}
        </div>

        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name*</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">Store Description</label>
          <textarea
            id="storeDescription"
            name="storeDescription"
            rows={3}
            value={formData.storeDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">Website URL</label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            value={formData.websiteUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.websiteUrl && <p className="mt-1 text-sm text-red-600">{errors.websiteUrl}</p>}
        </div>
      </div>
    </div>
  );
}

export default BusinessInfoStep