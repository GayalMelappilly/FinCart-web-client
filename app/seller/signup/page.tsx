'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '@/app/components/Footer/Footer';
import SellerSignUpBox from '@/app/components/Seller/Signup/SellerSignUpBox';

const Page: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
        <Head>
          <title>Sign Up | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SellerSignUpBox isLoading={isLoading} setIsLoading={setIsLoading} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      </div>
      <Footer />
    </>
  );
};

export default Page;