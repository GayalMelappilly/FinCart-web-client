'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import LoginBox from '../components/Login/LoginBox';
import ChangePasswordBox from '../components/ChangePassword/ChangePassword';

const Page: React.FC = () => {
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
        <Head>
          <title>Sign Up | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ChangePasswordBox />
      </div>
      <Footer />
    </>
  );
};

export default Page;