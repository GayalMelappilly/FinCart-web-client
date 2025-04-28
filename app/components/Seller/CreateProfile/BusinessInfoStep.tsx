// components/seller/steps/BusinessInfoStep.tsx
import { BusinessInfoFormData, FormErrors } from '@/app/types/seller/types';
import { FC } from 'react';

type Props = {
  formData: BusinessInfoFormData;
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

const BusinessInfoStep: FC<Props> = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900">Business Information</h3>

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

        <div>
          <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            id="logoUrl"
            name="logoUrl"
            type="url"
            value={formData.logoUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessInfoStep