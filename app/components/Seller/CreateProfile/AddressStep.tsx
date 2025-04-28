import { AddressFormData } from '@/app/types/seller/types';
import React, { FC } from 'react'

interface FormErrors {
    [key: string]: string | undefined;
}

type Props = {
    formData: AddressFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: FormErrors;
}

const AddressStep: FC<Props> = ({ formData, handleChange, errors }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">Business Address</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1*</label>
                    <input
                        id="addressLine1"
                        name="addressLine1"
                        type="text"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <input
                        id="addressLine2"
                        name="addressLine2"
                        type="text"
                        value={formData.addressLine2}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                    <input
                        id="landmark"
                        name="landmark"
                        type="text"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">PIN Code*</label>
                    <input
                        id="pinCode"
                        name="pinCode"
                        type="text"
                        value={formData.pinCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.pinCode && <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>}
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City*</label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>

                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State*</label>
                    <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>

                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country*</label>
                    <input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                </div>
            </div>
        </div>
    )
}

export default AddressStep