'use client'

import React, { Suspense, useState } from 'react';
import Head from 'next/head';
import EmailConfirmationPage from '@/app/components/ConfirmationPage/EmailConfirmationPage';
import SellerForgotPasswordVerificationBox from '@/app/components/Seller/Verification/SellerForgotPasswordVerificationBox';
import Spinner from '@/app/components/LoadingSpinner/Spinner';

const Page: React.FC = () => {

  const [isConfirmed, setIsConfirmed] = useState(false)

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <Head>
          <title>Verify OTP | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Suspense fallback={<Spinner />}>
          {isConfirmed ? <SellerForgotPasswordVerificationBox /> : <EmailConfirmationPage setIsConfirmed={setIsConfirmed} type={'seller'} />}
        </Suspense>
      </div>
    </>
  );
};

export default Page;