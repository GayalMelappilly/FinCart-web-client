'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FiShield } from 'react-icons/fi';

const SellerVerificationBox = () => {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Get phone number from session storage
        const storedPhone = sessionStorage.getItem('phoneNumber');
        if (!storedPhone) {
            router.push('/signup');
            return;
        }

        setPhoneNumber(storedPhone);

        // Focus the first input field
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }

        // Set up countdown timer
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setCanResend(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [router]);

    const handleOtpChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        // Only take the last character if multiple were pasted
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Navigate using arrow keys
        if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        // Allow backspace to go to previous field
        else if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();

        // Check if pasted content is a 6-digit number
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setOtp(digits);
            // Focus the last input
            inputRefs.current[5]?.focus();
        }
    };

    const handleResendOtp = () => {
        if (!canResend) return;

        // Reset timer and resend ability
        setTimer(30);
        setCanResend(false);

        // Simulate OTP resend
        console.log('Resending OTP to', phoneNumber);

        // Restart countdown
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setCanResend(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const otpValue = otp.join('');
        if (otpValue.length !== 6) return;

        setIsLoading(true);

        // Simulate verification
        try {
            // API call would go here
            setTimeout(() => {
                // Clear session storage and redirect to dashboard or onboarding
                sessionStorage.removeItem('phoneNumber');
                router.push('/seller/create-profile');
            }, 1500);
        } catch (error) {
            console.error('Error verifying OTP:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-6">
                <h2 className="text-center text-white text-2xl font-semibold">Fincart</h2>
                <p className="text-center text-blue-100 text-sm">Where fins belong</p>
            </div>

            <div className="p-6 sm:p-8">
                <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-blue-100 p-3">
                        <FiShield className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    Verify Your Phone
                </h3>

                <div className="mb-6 text-center text-gray-600">
                    <p>We&apos;ve sent a 6-digit code to</p>
                    <p className="font-medium">{phoneNumber}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="otp-input" className="sr-only">
                            Enter verification code
                        </label>
                        <div
                            className="grid grid-cols-6 gap-2 sm:gap-4"
                            onPaste={handlePaste}
                        >
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => {
                                        inputRefs.current[idx] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                    className="w-full h-12 sm:h-14 text-center text-black text-lg sm:text-xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || otp.join('').length !== 6}
                        className={`w-full py-3 px-4 rounded-lg transition-colors mb-4 font-medium flex items-center justify-center ${isLoading || otp.join('').length !== 6
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            }`}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>

                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        Didn&apos;t receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            className={`font-medium ${canResend
                                ? 'text-blue-600 hover:underline'
                                : 'text-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!canResend}
                        >
                            {canResend ? 'Resend' : `Resend in ${timer}s`}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SellerVerificationBox