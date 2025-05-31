'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '@/app/components/Footer/Footer';
import ForgotPasswordVerificationBox from '@/app/components/Verification/ForgetPasswordVerificationBox';
import EmailConfirmationPage from '@/app/components/ConfirmationPage/EmailConfirmationPage';

const Page: React.FC = () => {

  const [isConfirmed, setIsConfirmed] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
        <Head>
          <title>Verify OTP | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isConfirmed ? <ForgotPasswordVerificationBox /> : <EmailConfirmationPage setIsConfirmed={setIsConfirmed} />}
      </div>
      <Footer />
    </>
  );
};

export default Page;