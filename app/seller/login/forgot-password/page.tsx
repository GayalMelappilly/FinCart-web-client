'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import EmailConfirmationPage from '@/app/components/ConfirmationPage/EmailConfirmationPage';
import SellerForgotPasswordVerificationBox from '@/app/components/Seller/Verification/SellerForgotPasswordVerificationBox';

const Page: React.FC = () => {

  const [isConfirmed, setIsConfirmed] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
        <Head>
          <title>Verify OTP | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isConfirmed ? <SellerForgotPasswordVerificationBox /> : <EmailConfirmationPage setIsConfirmed={setIsConfirmed} type={'seller'} />}
      </div>
    </>
  );
};

export default Page;