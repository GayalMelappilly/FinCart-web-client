'use client'

import React from 'react';
import Head from 'next/head';
import EmailSignUpBox from '@/app/components/Seller/Signup/sellerEmailSignup';

const Page: React.FC = () => {
  return (
    <>
      <Head>
        <title>Become a Seller | Fincarts Business</title>
        <meta name="description" content="Join Fincarts as a seller and grow your business with millions of customers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
          {/* Left Section - Hero Content */}
          <div className="lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-8 lg:py-0">
            <div className="max-w-lg mx-auto lg:mx-0">
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Start Selling on 
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                    Fincarts Today
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mt-4 leading-relaxed">
                  Join millions of sellers and grow your business with India&apos;s trusted marketplace
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Reach a wide range of Customers</h3>
                    <p className="text-gray-600 text-sm">Access to India&apos;s largest customer base</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">0% Commission for 30 Days</h3>
                    <p className="text-gray-600 text-sm">Start selling without any platform fees</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast & Secure Payments</h3>
                    <p className="text-gray-600 text-sm">Get paid in 7-15 days with secure transactions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">24/7 Seller Support</h3>
                    <p className="text-gray-600 text-sm">Dedicated support team to help you succeed</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10L+</div>
                  <div className="text-sm text-gray-600">Active Sellers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹1000Cr+</div>
                  <div className="text-sm text-gray-600">Monthly GMV</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Signup Form */}
          <div className="lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
            <div className="w-full max-w-md">
              <EmailSignUpBox />
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        {/* <div className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">Trusted by leading brands across India</p>
            </div>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-gray-400 font-semibold">Brand 1</div>
              <div className="text-gray-400 font-semibold">Brand 2</div>
              <div className="text-gray-400 font-semibold">Brand 3</div>
              <div className="text-gray-400 font-semibold">Brand 4</div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Page;