'use client'

import React from 'react';
import Head from 'next/head';
// import Footer from '@/app/components/Footer/Footer';
// import SellerSignUpBox from '@/app/components/Seller/Signup/SellerSignUpBox';
import EmailSignUpBox from '@/app/components/Seller/Signup/sellerEmailSignup';

const Page: React.FC = () => {
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
        <Head>
          <title>Sign Up | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <SellerSignUpBox isLoading={isLoading} setIsLoading={setIsLoading} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} /> */}
        < EmailSignUpBox />
      </div>
    </>
  );
};

export default Page;