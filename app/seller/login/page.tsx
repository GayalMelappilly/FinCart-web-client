'use client';

import LoginBox from '@/app/components/Seller/Login/LoginBox';

// Define TypeScript interfaces
export interface FormData {
    emailOrMobile: string;
    password: string;
    rememberMe: boolean;
}

export interface ValidationErrors {
    emailOrMobile?: string;
    password?: string;
    general?: string;
}

export default function LoginPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            {/* <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Fincarts</span>
                            <span className="text-sm text-gray-500 ml-2">Business</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            New to selling? 
                            <a href="/seller/signup" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                                Create Account
                            </a>
                        </div>
                    </div>
                </div>
            </header> */}

            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
                {/* Left Section - Hero Content */}
                <div className="lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-8 lg:py-0">
                    <div className="max-w-lg mx-auto lg:mx-0">
                        <div className="mb-8">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Welcome Back to
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                                    Seller Dashboard
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mt-4 leading-relaxed">
                                Continue managing your business and growing your sales
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Track Your Sales</h3>
                                    <p className="text-gray-600 text-sm">Real-time analytics and insights</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Manage Inventory</h3>
                                    <p className="text-gray-600 text-sm">Keep track of your products</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Fast Payments</h3>
                                    <p className="text-gray-600 text-sm">Secure and timely settlements</p>
                                </div>
                            </div>
                        </div>

                        {/* Success Metrics */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
                            <h3 className="font-bold text-lg mb-4">Today&apos;s Highlights</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-2xl font-bold">2.5K+</div>
                                    <div className="text-blue-100 text-sm">Orders Today</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">₹45L</div>
                                    <div className="text-blue-100 text-sm">Today&apos;s Revenue</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Login Form */}
                <div className="lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
                    <div className="w-full max-w-md">
                        <LoginBox />
                    </div>
                </div>
            </div>
        </div>
    );
}