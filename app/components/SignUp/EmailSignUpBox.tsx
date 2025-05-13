'use client'

import { verifyEmail } from '@/app/services/authServices'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiOutlineShieldCheck } from 'react-icons/hi'
import { HiOutlineMail } from 'react-icons/hi'

const EmailSignUpBox = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>('')
    // const [password, setPassword] = useState<string>()

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: verifyEmail,
        onSuccess: (data) => {
            if (!data.success) {
                console.log(data)
                setError(data.message)
                setIsLoading(false);
            }
            if (data.success) {
                localStorage.setItem('email-address', email)
                localStorage.setItem('vt', data.token)
                setIsLoading(false);
                router.push('/signup/verification');
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
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Top gradient banner */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-8 px-6">
                <h2 className="text-center text-white text-2xl font-bold">Fincarts</h2>
                {/* <p className="text-center text-blue-100 text-sm mt-1">Where Fins Belong</p> */}
            </div>

            <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    Join Fincarts
                </h3>

                <div className="mb-8 text-center text-gray-500 text-sm">
                    <p>Create an account to start your journey with us</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiOutlineMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setError('')
                                }}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="mt-2 text-red-600 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md flex items-center justify-center font-medium"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <HiOutlineShieldCheck className="mr-2 h-5 w-5" />
                        )}
                        {isLoading ? 'Sending OTP...' : 'Verify Email'}
                    </button>

                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <Link href={'/login'} className="block w-full">
                        <button type="button" className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 focus:outline-none transition-colors shadow-sm font-medium flex items-center justify-center">
                            Already have an account? Sign In
                        </button>
                    </Link>
                </form>

                <div className="text-center text-xs text-gray-500 mt-8">
                    <p>By continuing, you agree to Fincart&apos;s</p>
                    <p className="mt-1">
                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Terms of Service</a>
                        {" "}&{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EmailSignUpBox