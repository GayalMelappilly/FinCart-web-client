'use client'

import Link from 'next/link'
import React, { FC, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineShieldCheck } from 'react-icons/hi'
import Image from 'next/image'
import { CountryCode, countryCodes } from '@/app/utils/dialCode'

type Props = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

const SellerSignUpBox: FC<Props> = ({ isLoading, setIsLoading, phoneNumber, setPhoneNumber }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>({
    code: 'IN',
    name: 'India',
    dial_code: '+91'
  });

  // const mutation = useMutation({
  //   mutationFn: signUpUser,
  //   onSuccess: () => {
  //     console.log('Phone number reached')
  //     router.push('/signup/verification');
  //   },
  //   onError: (err) => {
  //     console.log('Registration error : ', err)
  //   }
  // })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Format phone number with country code
    // const fullPhoneNumber = `${selectedCountry.dial_code}${phoneNumber}`;

    // Simulate OTP sending
    // try {
    //   mutation.mutate(fullPhoneNumber)
    //   setTimeout(() => {
    //     // Store phone number in session storage for the verification page
    //     sessionStorage.setItem('phoneNumber', fullPhoneNumber);
    //   }, 1000);
    // } catch (error) {
    //   console.error('Error sending OTP:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const selectCountry = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Top gradient banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-8 px-6">
        <h2 className="text-center text-white text-2xl font-bold">Fincarts</h2>
        <p className="text-center text-blue-100 text-sm mt-1">Where Fins Belong</p>
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex">
              {/* Country code dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center justify-between h-full px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-6 h-4 mr-2 relative overflow-hidden rounded-sm">
                    <Image 
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.code}.svg`} 
                      alt={selectedCountry.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <span className="mr-1 text-sm font-medium">{selectedCountry.dial_code}</span>
                  <IoIosArrowDown className="text-gray-400" />
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-64 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          className="flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100"
                          onClick={() => selectCountry(country)}
                        >
                          <div className="w-6 h-4 mr-2 relative overflow-hidden rounded-sm">
                            <Image 
                              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`} 
                              alt={country.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <span className="mr-2 font-medium">{country.dial_code}</span>
                          <span className="text-gray-600">{country.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone number input */}
              <div className="relative flex-grow">
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Enter your number"
                  required
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">We&apos;ll send a verification code to this number</p>
          </div>

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
            {isLoading ? 'Verifying...' : 'Get Verification Code'}
          </button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <Link href={'/seller/login'} className="block w-full">
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

export default SellerSignUpBox