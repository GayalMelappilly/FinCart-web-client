'use client'

import { useSellerAuth } from '@/app/context/sellerAuthContext'
import { useToast } from '@/app/providers/ToastProvider'
import { loginSeller } from '@/app/services/sellerAuthServices'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HiEye, HiEyeOff, HiLockClosed, HiUser, HiOutlineArrowRight, HiOutlineLogin } from 'react-icons/hi'

const LoginBox = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { setIsLoggedIn, setProfileUrl } = useSellerAuth()

    const { showToast } = useToast()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: loginSeller,
        onSuccess: (data) => {
            if (!data.success) {
                setError(true)
            }
            if (data.accessToken) {
                showToast('success', 'Logged in successfully')
                console.log('data: ', data)
                if (typeof window !== 'undefined') {
                    localStorage.setItem('sellerAccessToken', data.accessToken as string)
                    localStorage.setItem('seller-loggedIn', 'true')
                    setProfileUrl(data.profileUrl)
                    setIsLoggedIn(true)
                    window.location.reload();
                    router.push('/seller/dashboard');
                }
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
            console.error('Error logging in:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 px-8 py-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-center mb-3">
                        <div className="w-16 h-12 bg- backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Image
                                src={'/erasebg-transformed.png'}
                                alt='fincarts'
                                height={1000}
                                width={1000}
                                className="w-16 h-10"
                            />
                        </div>
                    </div>
                    <h2 className="text-center text-white text-2xl font-bold mb-2">
                        Seller Dashboard
                    </h2>
                    <p className="text-center text-blue-100 text-sm">
                        Access your business control center
                    </p>
                </div>
            </div>

            <div className="px-8 py-8">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                        Welcome Back
                    </h3>
                    <p className="text-center text-gray-600 text-sm">
                        Sign in to manage your business
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Identifier Input */}
                    <div>
                        <label htmlFor="identifier" className="block text-sm font-semibold text-gray-800 mb-3">
                            Email or Phone Number
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <HiUser className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                id="identifier"
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-gray-900 placeholder-gray-500 transition-all"
                                placeholder="your.email@company.com or phone"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-3">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <HiLockClosed className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-gray-900 placeholder-gray-500 transition-all"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <HiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <HiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-gray-700 font-medium">
                                Keep me signed in
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link
                                href={{ pathname: "/seller/login/forgot-password", query: { email: identifier } }}
                                className="font-medium text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Authentication Failed</h3>
                                    <p className="text-sm text-red-700 mt-1">
                                        Please check your email/phone number and password
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-3 sm:py-4 px-6 rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed font-semibold text-sm sm:text-base flex items-center justify-center group"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing you in...
                            </>
                        ) : (
                            <>
                                <HiOutlineLogin className="mr-2 h-5 w-5" />
                                Access Dashboard
                                <HiOutlineArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center my-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium bg-white px-2">
                            New to Fincarts?
                        </span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Signup Link */}
                    <Link href="/seller/signup" className="block w-full">
                        <button
                            type="button"
                            className="w-full bg-white text-blue-700 py-3 sm:py-4 px-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all font-semibold text-sm sm:text-base flex items-center justify-center group"
                        >
                            Start Selling Today
                            <HiOutlineArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </form>

                {/* Security & Support */}
                {/* <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium text-gray-700">Secure Login</span>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="text-xs font-medium text-gray-700">24/7 Support</span>
                        </div>
                    </div>
                </div> */}

                {/* Terms */}
                <div className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
                    <p>By signing in, you agree to our</p>
                    <p className="mt-1">
                        <Link href="/terms" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                            Seller Terms
                        </Link>
                        {" "} and {" "}
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginBox