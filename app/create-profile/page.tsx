'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileFormData } from '../types/types';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ProgressIndicatorMobile from '../components/CreateProfile/ProgressIndicatorMobile';
import SideSection from '../components/CreateProfile/SideSection';
import BasicInfo from '../components/CreateProfile/BasicInfo';
import DeliveryInfo from '../components/CreateProfile/DeliveryInfo';
import Preferences from '../components/CreateProfile/Preferences';
import FormButtons from '../components/CreateProfile/FormButtons';
import PageHeader from '../components/CreateProfile/PageHeader';
import { useMutation } from '@tanstack/react-query';
import { createProfile } from '@/pages/api/users/action';

const CreateProfilePage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: null,
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      country: 'United States',
    },
    preferences: {
      newsletter: true,
      sms: false,
      priorityDelivery: false,
    }
  });

  const mutation = useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      router.push('/');
    },
    onError: (err) => {
      console.log('User profile error : ', err)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...(formData[section as keyof ProfileFormData] as {[key: string]: boolean}),
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      mutation.mutate(formData)
      console.log('Form data submitted:', formData);
      router.push('/');
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <>
    <Header />
      <div className="flex min-h-screen bg-gray-50 md:px-30">
        <div className="flex-1 flex flex-col p-8">
          <div className="max-w-2xl w-full mx-auto">
            <PageHeader />
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <BasicInfo formData={formData} setFormData={setFormData} handleChange={handleChange} />
              )}
              {step === 2 && (
                <DeliveryInfo formData={formData} handleChange={handleChange} />
              )}
              {step === 3 && (
                <Preferences formData={formData} setFormData={setFormData} />
              )}

              <FormButtons step={step} setStep={setStep} />
            </form>
            {/* Progress Indicator for mobile */}
            <ProgressIndicatorMobile step={step} />
          </div>
        </div>
        {/* Side Section */}
        <SideSection step={step} /> 
      </div>
      <Footer />
    </>
  );
};

export default CreateProfilePage;