import { ProfileFormData } from '@/app/types/types';
import React, { FC } from 'react'

type Props = {
    formData: ProfileFormData,
    setFormData: (formData: ProfileFormData) => void,
}

const Preferences:FC<Props> = ({formData, setFormData}) => {

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const [section, field] = name.split('.');

        setFormData({
            ...formData,
            [section]: {
                ...(formData[section as keyof ProfileFormData] as Record<string, any>),
                [field]: checked
            }
        });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Profile Preferences</h3>

            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="newsletter"
                        name="preferences.newsletter"
                        checked={formData.preferences.newsletter}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="ml-3 block text-sm text-gray-700">
                        Subscribe to newsletter for latest updates and offers
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="sms"
                        name="preferences.sms"
                        checked={formData.preferences.sms}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sms" className="ml-3 block text-sm text-gray-700">
                        Receive SMS notifications for order updates
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="priorityDelivery"
                        name="preferences.priorityDelivery"
                        checked={formData.preferences.priorityDelivery}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="priorityDelivery" className="ml-3 block text-sm text-gray-700">
                        Enable priority delivery for faster shipping
                    </label>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                            You can update your preferences anytime from your account settings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preferences