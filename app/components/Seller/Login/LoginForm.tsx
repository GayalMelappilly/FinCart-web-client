import { FormData, ValidationErrors } from '@/app/seller/login/page';
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
    formData: FormData,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errors: ValidationErrors
}

const LoginForm: FC<Props> = ({ formData, handleChange, errors }) => {
    
    return (
        <>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="emailOrMobile" className="sr-only">
                        Email or mobile number
                    </label>
                    <input
                        id="emailOrMobile"
                        name="emailOrMobile"
                        type="text"
                        autoComplete="email"
                        value={formData.emailOrMobile}
                        onChange={handleChange}
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 text-base sm:text-sm border ${errors.emailOrMobile ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
                        placeholder="Email address or mobile number"
                    />
                    {errors.emailOrMobile && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.emailOrMobile}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 text-base sm:text-sm border ${errors.password ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center">
                    <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-xs sm:text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-xs sm:text-sm">
                    <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LoginForm