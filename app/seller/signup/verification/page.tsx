import React from 'react';
import Head from 'next/head';
import SellerVerificationBox from '@/app/components/Seller/Verification/SellerVerificationBox';

const Page: React.FC = () => {

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <Head>
          <title>Verify OTP | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SellerVerificationBox />
      </div>
    </>
  );
};

export default Page;