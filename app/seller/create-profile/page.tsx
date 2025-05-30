'use client'

import { useState } from 'react';
import SignupForm from '@/app/components/Seller/CreateProfile/SignupForm';
import SignupHeader from '@/app/components/Seller/CreateProfile/SignupHeader';
import SignupProgress from '@/app/components/Seller/CreateProfile/SignupProgress';
import { FormData } from '@/app/types/seller/types';

export default function SellerSignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessType: 'INDIVIDUAL',
    email: '',
    phone: '',
    alternatePhone: '',
    gstin: '',
    panCard: '',
    legalBusinessName: '',
    displayName: '',
    storeDescription: '',
    logoUrl: '',
    websiteUrl: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'India',
    bankAccountNumber: '',
    bankIfscCode: '',
    bankAccountHolderName: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  if (typeof window !== 'undefined') {
    formData.email = localStorage.getItem('seller-email-address') as string
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <SignupHeader />
          <SignupProgress step={step} />
          <SignupForm
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
}