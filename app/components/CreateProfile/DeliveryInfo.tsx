import { ProfileFormData } from '@/app/types/types'
import { countryCodes } from '@/app/utils/dialCode'
import React, { FC } from 'react'

type Props = {
    formData: ProfileFormData,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    setIsFormFilled: (isFormFilled: boolean) => void
}


const DeliveryInfo: FC<Props> = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Delivery Address</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                <input
                    type="text"
                    name="address.addressLine1"
                    value={formData.address.addressLine1}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                <input
                    type="text"
                    name="address.addressLine2"
                    value={formData.address.addressLine2}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                    <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal/ZIP Code</label>
                    <input
                        type="text"
                        name="address.pincode"
                        value={formData.address.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        className="w-full px-2 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DeliveryInfo