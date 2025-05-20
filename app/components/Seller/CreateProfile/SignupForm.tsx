'use client'

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BusinessInfoStep from './BusinessInfoStep';
import FormNavigation from './FormNavigation';
import AddressStep from './AddressStep';
import AccountStep from './AccountStep';
import { FormData, FormErrors, SellerDataCreate } from '@/app/types/seller/types';
import { useMutation } from '@tanstack/react-query';
import { createSellerProfile } from '@/app/services/sellerAuthServices';

type Props = {
  step: number;
  setStep: (step: number) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
      // Add any other properties that might come in the error response
    };
    status?: number;
    statusText?: string;
  };
  message: string;
  // Add other properties that might be in the error object
  code?: string;
  request?: unknown;
  config?: unknown;
}


const SignupForm: FC<Props> = ({
  step,
  setStep,
  formData,
  setFormData
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (stepNumber === 1) {
      // Business Information validation
      if (formData.businessName?.trim() === '') {
        newErrors.businessName = 'Business name is required';
        isValid = false;
      }

      if (formData.businessType?.trim() === '') {
        newErrors.businessType = 'Business type is required';
        isValid = false;
      }

      if (formData.email?.trim() === '') {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = 'Invalid email address';
        isValid = false;
      }

      if (formData.phone?.trim() === '') {
        newErrors.phone = 'Phone number is required';
        isValid = false;
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
        isValid = false;
      }

      if (formData.alternatePhone && !/^\d{10}$/.test(formData.alternatePhone)) {
        newErrors.alternatePhone = 'Please enter a valid 10-digit phone number';
        isValid = false;
      }

      if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin)) {
        newErrors.gstin = 'Please enter a valid GSTIN';
        isValid = false;
      }

      if (formData.panCard?.trim() === '') {
        newErrors.panCard = 'PAN Card is required';
        isValid = false;
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
        newErrors.panCard = 'Please enter a valid PAN Card number';
        isValid = false;
      }

      if (formData.legalBusinessName?.trim() === '') {
        newErrors.legalBusinessName = 'Legal business name is required';
        isValid = false;
      }

      if (formData.displayName?.trim() === '') {
        newErrors.displayName = 'Display name is required';
        isValid = false;
      }

      if (formData.websiteUrl && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/\w-]*)*$/.test(formData.websiteUrl)) {
        newErrors.websiteUrl = 'Please enter a valid URL';
        isValid = false;
      }
    } else if (stepNumber === 2) {
      // Address validation
      if (formData.addressLine1?.trim() === '') {
        newErrors.addressLine1 = 'Address is required';
        isValid = false;
      }

      if (formData.pinCode?.trim() === '') {
        newErrors.pinCode = 'PIN Code is required';
        isValid = false;
      } else if (!/^\d{6}$/.test(formData.pinCode)) {
        newErrors.pinCode = 'Please enter a valid 6-digit PIN Code';
        isValid = false;
      }

      if (formData.city?.trim() === '') {
        newErrors.city = 'City is required';
        isValid = false;
      }

      if (formData.state?.trim() === '') {
        newErrors.state = 'State is required';
        isValid = false;
      }

      if (formData.country?.trim() === '') {
        newErrors.country = 'Country is required';
        isValid = false;
      }
    } else if (stepNumber === 3) {
      // Bank Details & Password validation
      if (formData.bankIfscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.bankIfscCode)) {
        newErrors.bankIfscCode = 'Please enter a valid IFSC Code';
        isValid = false;
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = (e: React.MouseEvent): void => {
    e.preventDefault()
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const mutation = useMutation({
    mutationFn: createSellerProfile,
    onSuccess: (data) => {
      if (data.success) {
        router.push('/seller/login');
      }
    },
    onError: (err) => {
      console.log('Seller profile error : ', err)
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    console.log("SUBMITTED")

    if (!validateStep(3)) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Transform the data to match API expectations
      const sellerData: SellerDataCreate = {
        business_name: formData.businessName,
        business_type: formData.businessType,
        email: formData.email,
        phone: formData.phone,
        alternate_phone: formData.alternatePhone || null,
        gstin: formData.gstin || null,
        pan_card: formData.panCard,
        legal_business_name: formData.legalBusinessName,
        display_name: formData.displayName,
        store_description: formData.storeDescription || null,
        logo_url: formData.logoUrl || null,
        website_url: formData.websiteUrl || null,
        address: {
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2 || null,
          landmark: formData.landmark || null,
          pin_code: formData.pinCode,
          city: formData.city,
          state: formData.state,
          country: formData.country
        },
        bank_details: {
          account_number: formData.bankAccountNumber || null,
          ifsc_code: formData.bankIfscCode || null,
          account_holder_name: formData.bankAccountHolderName || null
        },
        password: formData.password
      };

      // Call your API to register the seller
      mutation.mutate(sellerData)
      // const response = await axios.post('/api/seller/register', sellerData);

    } catch (err: unknown) {
      const error = err as ApiErrorResponse;
      setError(error.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <BusinessInfoStep
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        )}

        {step === 2 && (
          <AddressStep
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        )}

        {step === 3 && (
          <AccountStep
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            error={error}
          />
        )}

        <FormNavigation
          step={step}
          nextStep={nextStep}
          prevStep={prevStep}
          isSubmitting={isSubmitting}
        />
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/seller/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm