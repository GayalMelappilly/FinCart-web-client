import { FormData, FormErrors } from '@/app/types/seller/types';
import Link from 'next/link';
import React, { FC } from 'react'

type Props = {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: FormErrors;
    error: string;
}

const AccountStep: FC<Props> = ({ formData, handleChange, errors, error }) => {

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">Bank Details & Account Setup</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                    <input
                        id="bankAccountNumber"
                        name="bankAccountNumber"
                        type="text"
                        value={formData.bankAccountNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="bankIfscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
                    <input
                        id="bankIfscCode"
                        name="bankIfscCode"
                        type="text"
                        value={formData.bankIfscCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.bankIfscCode && <p className="mt-1 text-sm text-red-600">{errors.bankIfscCode}</p>}
                </div>

                <div>
                    <label htmlFor="bankAccountHolderName" className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                    <input
                        id="bankAccountHolderName"
                        name="bankAccountHolderName"
                        type="text"
                        value={formData.bankAccountHolderName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <div className="h-px bg-gray-200 my-6"></div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password*</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="md:col-span-2 mt-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="agreeToTerms"
                                name="agreeToTerms"
                                type="checkbox"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-500">Terms and Conditions</Link> and <Link href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                            </label>
                            {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-md bg-red-50 p-4 mt-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountStep