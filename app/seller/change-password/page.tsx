'use client'

import React from 'react';
import Head from 'next/head';
import ChangePasswordBox from '@/app/components/ChangePassword/ChangePassword';

const Page: React.FC = () => {
  // const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
        <Head>
          <title>Sign Up | Fincart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ChangePasswordBox type={'seller'} />
      </div>
    </>
  );
};

export default Page;