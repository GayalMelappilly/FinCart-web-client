'use client'

import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import EmailSignUpBox from '../components/SignUp/EmailSignUpBox';

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
        {/* <SignUpBox isLoading={isLoading} setIsLoading={setIsLoading} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} /> */}
        <EmailSignUpBox />
      </div>
      <Footer />
    </>
  );
};

export default Page;