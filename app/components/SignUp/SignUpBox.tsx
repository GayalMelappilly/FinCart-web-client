import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { HiPhone } from 'react-icons/hi'

type Props = {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    phoneNumber: string,
    setPhoneNumber: (phoneNumber: string) => void
}

const SignUpBox: FC<Props> = ({ isLoading, setIsLoading, phoneNumber, setPhoneNumber }) => {

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate OTP sending
        try {
            // API call would go here
            setTimeout(() => {
                // Store phone number in session storage for the verification page
                sessionStorage.setItem('phoneNumber', phoneNumber);
                router.push('/signup/verification');
            }, 1000);
        } catch (error) {
            console.error('Error sending OTP:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 py-6">
                <h2 className="text-center text-white text-2xl font-semibold">Fincart</h2>
                {/* <p className="text-center text-teal-100 text-sm">Ornamental Fish Marketplace</p> */}
            </div>

            <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    Create Your Account
                </h3>

                <div className="mb-6 text-center text-gray-600">
                    <p>Enter your phone number to receive a verification code</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiPhone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="phone"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="pl-10 block w-full px-3 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mb-4 font-medium flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isLoading ? 'Sending Code...' : 'Send Verification Code'}
                    </button>

                    <Link href={'/login'}>
                        <button className="w-full bg-gray-200 text-black py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none transition-colors mb-4 font-medium flex items-center justify-center">
                            Already an user? Log In
                        </button>
                    </Link>
                </form>

                <div className="text-center text-sm text-gray-500 mt-6">
                    <p>By continuing, you agree to Fincart&apos;s</p>
                    <p>
                        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> & <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpBox