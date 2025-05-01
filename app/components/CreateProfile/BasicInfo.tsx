'use client'

import { ProfileFormData } from '@/app/types/types'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import LoadingAnimation from '../UploadingAnimation/UploadingAnimation'

type Props = {
    formData: ProfileFormData,
    setFormData: (formData: ProfileFormData) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    setIsFormFilled: (isFormFilled: boolean) => void
}

const BasicInfo: FC<Props> = ({ formData, setFormData, handleChange, setIsFormFilled }) => {

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [password, setPassword] = useState<string>()
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
            setIsFormFilled(false)
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
                        profileImage: data.url as string
                    });
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setUploading(false);
                setIsFormFilled(true)
            }
        };
    };

    useEffect(() => {
        if (formData.password === password && formData.password != "") {
            setIsFormFilled(true)
        } else {
            setIsFormFilled(false)
        }
    }, [formData.password, password, setIsFormFilled])

    return (
        <div className="space-y-6">
            <div className="flex justify-center mb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        // onClick={}
                        className="mt-3 px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Verify email
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

            </div>
        </div>
    )
}

export default BasicInfo
