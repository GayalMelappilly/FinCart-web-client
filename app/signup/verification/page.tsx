import React from 'react';
import Head from 'next/head';
import Footer from '@/app/components/Footer/Footer';
import VerificationBox from '@/app/components/Verification/VerificationBox';

const Page: React.FC = () => {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
        <Head>
          <title>Verify OTP | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <VerificationBox />
      </div>
      <Footer />
    </>
  );
};

export default Page;