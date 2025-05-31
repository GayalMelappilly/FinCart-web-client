'use client'

import React, { useState, useEffect, FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import { useMutation } from '@tanstack/react-query'
import { forgotPasswordVerifyEmail } from '@/app/services/authServices'

type Props = {
    setIsConfirmed: (isConfirmed: boolean) => void;
}

const EmailConfirmationPage:FC<Props> = ({setIsConfirmed}) => {
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const emailAddress = searchParams?.get('email')
        if (emailAddress) {
            setEmail(emailAddress)
        } else {
            // Redirect back if no email is provided
            router.push('/forgot-password')
        }
    }, [searchParams, router])

    const mutation = useMutation({
        mutationFn: forgotPasswordVerifyEmail,
        onSuccess: (data) => {
            if (!data.success) {
                console.log(data)
                setError(data.message)
                setIsLoading(false);
            }
            if (data.success) {
                if (typeof window !== 'undefined') {
                    // localStorage.setItem('email-address', email)
                    localStorage.setItem('fpvt', data.token)
                }
                setIsLoading(false);
                setIsConfirmed(true)
            }
        },
        onError: (err) => {
            console.log('Seller login error : ', err)
            setIsLoading(false);
        }
    })

    const handleSendVerification = async () => {
        if (!email) return

        setIsLoading(true)
        setError('')

        try {
            mutation.mutate(email)

        } catch (error) {
            console.error('Error sending verification email:', error)
            setError(error instanceof Error ? error.message : 'Failed to send verification email. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoBack = () => {
        router.back()
    }

    const maskEmail = (email: string) => {
        const [localPart, domain] = email.split('@')
        if (localPart.length <= 2) {
            return `${localPart[0]}***@${domain}`
        }
        const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1]
        return `${maskedLocal}@${domain}`
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 -mx-4 -mt-8 sm:-mx-10 sm:-mt-8 py-6 sm:rounded-t-lg">
                        <h2 className="text-center text-white text-2xl font-semibold">Fincart</h2>
                        <p className="text-center text-blue-100 text-sm">Where fins belong</p>
                    </div>

                    <div className="mt-8">
                        {/* Back button */}
                        <button
                            onClick={handleGoBack}
                            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
                        >
                            <FiArrowLeft className="h-4 w-4 mr-2" />
                            <span className="text-sm">Back</span>
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-blue-100 p-4">
                                <FiMail className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>

                        {/* Title and description */}
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                Confirm Email Address
                            </h3>
                            <p className="text-gray-600 mb-4">
                                We'll send a verification code to confirm your identity and help you reset your password.
                            </p>
                            
                            {/* Email display */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-500 mb-1">Verification code will be sent to:</p>
                                <p className="font-medium text-gray-900 text-lg">
                                    {email ? maskEmail(email) : ''}
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-blue-800 text-sm">
                                    <span className="font-medium">Note:</span> The verification code will expire in 10 minutes. 
                                    Make sure to check your spam folder if you don't see the email in your inbox.
                                </p>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-800 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleSendVerification}
                                disabled={isLoading || !email}
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${
                                    isLoading || !email
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Verification Code'
                                )}
                            </button>

                            <button
                                onClick={handleGoBack}
                                disabled={isLoading}
                                className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Use Different Email
                            </button>
                        </div>

                        {/* Additional info */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                By proceeding, you agree to receive a verification email at the address provided above.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmationPage