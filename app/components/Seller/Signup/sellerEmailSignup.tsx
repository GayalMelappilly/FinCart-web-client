'use client'

import { verifySellerEmail } from '@/app/services/sellerAuthServices'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiOutlineShieldCheck, HiOutlineMail, HiOutlineArrowRight } from 'react-icons/hi'

const EmailSignUpBox = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>('')

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: verifySellerEmail,
        onSuccess: (data) => {
            if (!data.success) {
                console.log(data)
                setError(data.message)
                setIsLoading(false);
            }
            if (data.success) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('seller-email-address', email)
                    localStorage.setItem('svt', data.token)
                }
                setIsLoading(false);
                router.push('/seller/signup/verification');
            }
        },
        onError: (err) => {
            console.log('Seller login error : ', err)
            setIsLoading(false);
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            mutation.mutate(email as string)
        } catch (error) {
            console.error('Error signing up:', error);
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
                        Start Your Business Journey
                    </h2>
                    <p className="text-center text-blue-100 text-sm">
                        Join Fincarts Seller Hub and reach millions of customers
                    </p>
                </div>
            </div>

            <div className="px-8 py-8">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                        Create Seller Account
                    </h3>
                    <p className="text-center text-gray-600 text-sm">
                        Enter your business email to get started
                    </p>
                </div>

                {/* Quick Benefits */}
                {/* <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                    <div className="text-center">
                        <p className="text-sm font-medium text-blue-900 mb-2">✨ What you get:</p>
                        <div className="flex justify-center space-x-4 text-xs text-blue-700">
                            <span>• Free listing</span>
                            <span>• 24/7 support</span>
                            <span>• Analytics dashboard</span>
                        </div>
                    </div>
                </div> */}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-3">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <HiOutlineMail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setError('')
                                }}
                                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-gray-900 placeholder:text-xs placeholder:sm:text-base placeholder-gray-500 transition-all"
                                placeholder="Email address"
                                required
                            />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                            We&apos;ll send a verification code to this email
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-3 sm:py-4 px-6 rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed font-semibold text-xs md:text-base flex items-center justify-center group"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending verification code...
                            </>
                        ) : (
                            <>
                                <HiOutlineShieldCheck className="mr-2 h-5 w-5" />
                                Verify Email & Continue
                                <HiOutlineArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center my-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium bg-white px-2">
                            Already registered?
                        </span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Login Link */}
                    <Link href={'/seller/login'} className="block w-full">
                        <button 
                            type="button" 
                            className="w-full bg-white text-blue-700 py-3 sm:py-4 px-2 sm:px-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all font-semibold text-xs md:text-base flex items-center justify-center group"
                        >
                            Sign In to Seller Dashboard
                            <HiOutlineArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </form>

                {/* Security Note */}
                {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                        <HiOutlineShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Secure & Protected</p>
                            <p className="text-xs text-gray-600 mt-1">
                                Your information is encrypted and secure. We never share your data with third parties.
                            </p>
                        </div>
                    </div>
                </div> */}

                {/* Terms */}
                <div className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
                    <p>By continuing, you agree to Fincarts</p>
                    <p className="mt-1">
                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                            Seller Terms & Conditions
                        </a>
                        {" "} and {" "}
                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EmailSignUpBox