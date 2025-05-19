'use client'

import { useToast } from '@/app/providers/ToastProvider'
import { loginUser } from '@/app/services/authServices'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HiEye, HiEyeOff, HiLockClosed, HiUser } from 'react-icons/hi'

const LoginBox = () => {

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {showToast} = useToast()

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (!data.success) {
                setError(true)
            }
            if (data.accessToken) {
                showToast('success', 'Logged in successfully')
                if (typeof window !== 'undefined') {
                    localStorage.setItem('sellerAccessToken', data.accessToken as string)
                    localStorage.setItem('seller-loggedIn', 'true')
                }
                router.push('/seller/dashboard');
            }
        },
        onError: (err) => {
            console.log('Seller login error : ', err)
        }
    })

    useEffect(() => {
        setError(false)
    }, [identifier, password])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = { identifier, password }
            mutation.mutate(formData)
        } catch (error) {
            console.error('Error sending OTP:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden my-10">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-8 px-6">
                <h2 className="text-center text-white text-2xl font-bold">Fincarts</h2>
                <p className="text-center text-blue-100 text-sm mt-1">Where Fins Belong</p>
            </div>

            <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Welcome Back
                </h3>

                <div className="mb-6 text-center text-gray-600">
                    <p>Log in with your email/phone and password</p>
                </div>

                <div>
                    <div className="mb-5">
                        <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                            Email or Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="identifier"
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="pl-10 block w-full px-3 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter email or phone number"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiLockClosed className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 block w-full px-3 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <HiEyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <HiEye className="h-5 w-5 text-gray-400" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    {error && <div className="bg-red-50 p-2 w-fit rounded-lg border border-red-200 text-red-700 mb-5">
                        <p className="font-medium">Invalid credentials</p>
                        <p className='text-sm'>Please check the email/phone number and password</p>
                    </div>}

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mb-4 font-medium flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Don&apos;t have an account?
                            </span>
                        </div>
                    </div>

                    <Link href="/signup">
                        <button
                            type="button"
                            className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 focus:outline-none transition-colors font-medium flex items-center justify-center"
                        >
                            Create a new account
                        </button>
                    </Link>
                </div>

                <div className="text-center text-sm text-gray-500 mt-6">
                    <p>By continuing, you agree to Fincart&apos;s</p>
                    <p>
                        <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> & <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginBox