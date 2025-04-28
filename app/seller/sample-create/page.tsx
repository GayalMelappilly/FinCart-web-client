'use client'

import { useState, ChangeEvent, FormEvent, JSX } from 'react';
import { useRouter } from 'next/navigation'; // Updated from next/router
import Head from 'next/head';
import Link from 'next/link';
// import axios from 'axios';

// Define TypeScript interfaces
interface FormData {
    businessName: string;
    businessType: string;
    email: string;
    phone: string;
    alternatePhone: string;
    gstin: string;
    panCard: string;
    legalBusinessName: string;
    displayName: string;
    storeDescription: string;
    logoUrl: string;
    websiteUrl: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    pinCode: string;
    city: string;
    state: string;
    country: string;
    bankAccountNumber: string;
    bankIfscCode: string;
    bankAccountHolderName: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

interface BusinessType {
    value: string;
    label: string;
}

interface FormErrors {
    [key: string]: string | undefined;
}

interface SellerData {
    business_name: string;
    business_type: string;
    email: string;
    phone: string;
    alternate_phone: string | null;
    gstin: string | null;
    pan_card: string;
    legal_business_name: string;
    display_name: string;
    store_description: string | null;
    logo_url: string | null;
    website_url: string | null;
    address: {
        address_line1: string;
        address_line2: string | null;
        landmark: string | null;
        pin_code: string;
        city: string;
        state: string;
        country: string;
    };
    bank_details: {
        account_number: string | null;
        ifsc_code: string | null;
        account_holder_name: string | null;
    };
    password: string;
}

export default function Page() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [error, setError] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});

    // Form state
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

    const businessTypes: BusinessType[] = [
        { value: 'INDIVIDUAL', label: 'Individual' },
        { value: 'PROPRIETORSHIP', label: 'Proprietorship' },
        { value: 'PARTNERSHIP', label: 'Partnership' },
        { value: 'LLP', label: 'LLP' },
        { value: 'PRIVATE_LIMITED', label: 'Private Limited' },
        { value: 'PUBLIC_LIMITED', label: 'Public Limited' },
        { value: 'OTHER', label: 'Other' }
    ];

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Clear error for this field when it changes
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
            if (!formData.businessName.trim()) {
                newErrors.businessName = 'Business name is required';
                isValid = false;
            }

            if (!formData.businessType) {
                newErrors.businessType = 'Business type is required';
                isValid = false;
            }

            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
                isValid = false;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
                newErrors.email = 'Invalid email address';
                isValid = false;
            }

            if (!formData.phone.trim()) {
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

            if (!formData.panCard.trim()) {
                newErrors.panCard = 'PAN Card is required';
                isValid = false;
            } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
                newErrors.panCard = 'Please enter a valid PAN Card number';
                isValid = false;
            }

            if (!formData.legalBusinessName.trim()) {
                newErrors.legalBusinessName = 'Legal business name is required';
                isValid = false;
            }

            if (!formData.displayName.trim()) {
                newErrors.displayName = 'Display name is required';
                isValid = false;
            }

            if (formData.websiteUrl && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/\w-]*)*$/.test(formData.websiteUrl)) {
                newErrors.websiteUrl = 'Please enter a valid URL';
                isValid = false;
            }
        } else if (stepNumber === 2) {
            // Address validation
            if (!formData.addressLine1.trim()) {
                newErrors.addressLine1 = 'Address is required';
                isValid = false;
            }

            if (!formData.pinCode.trim()) {
                newErrors.pinCode = 'PIN Code is required';
                isValid = false;
            } else if (!/^\d{6}$/.test(formData.pinCode)) {
                newErrors.pinCode = 'Please enter a valid 6-digit PIN Code';
                isValid = false;
            }

            if (!formData.city.trim()) {
                newErrors.city = 'City is required';
                isValid = false;
            }

            if (!formData.state.trim()) {
                newErrors.state = 'State is required';
                isValid = false;
            }

            if (!formData.country.trim()) {
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

    const nextStep = (): void => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = (): void => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {

        console.log("SUBMITTED")

        e.preventDefault();

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
            const sellerData: SellerData = {
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
            // const response = await axios.post('/api/seller/register', sellerData);
            console.log("Submitting data:", sellerData);

            // Redirect to login page or dashboard
            router.push('/seller/login?registered=true');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head>
                <title>Seller Signup | FishMarket</title>
                <meta name="description" content="Register as a seller on FishMarket" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <Link href="/" className="inline-block">
                                <h1 className="text-3xl font-bold text-blue-600">FishMarket</h1>
                            </Link>
                            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Sell with us</h2>
                            <p className="text-gray-600 mt-2">Join our marketplace and reach thousands of aquarium enthusiasts</p>
                        </div>

                        {/* Progress Indicator */}
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center w-full max-w-2xl">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>1</div>
                                <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>2</div>
                                <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>3</div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Business Information */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-medium text-gray-900">Business Information</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name*</label>
                                                <input
                                                    id="businessName"
                                                    name="businessName"
                                                    type="text"
                                                    value={formData.businessName}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Business Type*</label>
                                                <select
                                                    id="businessType"
                                                    name="businessType"
                                                    value={formData.businessType}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    {businessTypes.map(type => (
                                                        <option key={type.value} value={type.value}>{type.label}</option>
                                                    ))}
                                                </select>
                                                {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700">Alternate Phone</label>
                                                <input
                                                    id="alternatePhone"
                                                    name="alternatePhone"
                                                    type="tel"
                                                    value={formData.alternatePhone}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.alternatePhone && <p className="mt-1 text-sm text-red-600">{errors.alternatePhone}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">GSTIN</label>
                                                <input
                                                    id="gstin"
                                                    name="gstin"
                                                    type="text"
                                                    value={formData.gstin}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.gstin && <p className="mt-1 text-sm text-red-600">{errors.gstin}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">PAN Card*</label>
                                                <input
                                                    id="panCard"
                                                    name="panCard"
                                                    type="text"
                                                    value={formData.panCard}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.panCard && <p className="mt-1 text-sm text-red-600">{errors.panCard}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="legalBusinessName" className="block text-sm font-medium text-gray-700">Legal Business Name*</label>
                                                <input
                                                    id="legalBusinessName"
                                                    name="legalBusinessName"
                                                    type="text"
                                                    value={formData.legalBusinessName}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.legalBusinessName && <p className="mt-1 text-sm text-red-600">{errors.legalBusinessName}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name*</label>
                                                <input
                                                    id="displayName"
                                                    name="displayName"
                                                    type="text"
                                                    value={formData.displayName}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>}
                                            </div>

                                            <div className="md:col-span-2">
                                                <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">Store Description</label>
                                                <textarea
                                                    id="storeDescription"
                                                    name="storeDescription"
                                                    rows={3}
                                                    value={formData.storeDescription}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">Website URL</label>
                                                <input
                                                    id="websiteUrl"
                                                    name="websiteUrl"
                                                    type="url"
                                                    value={formData.websiteUrl}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.websiteUrl && <p className="mt-1 text-sm text-red-600">{errors.websiteUrl}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Logo URL</label>
                                                <input
                                                    id="logoUrl"
                                                    name="logoUrl"
                                                    type="url"
                                                    value={formData.logoUrl}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Address */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-medium text-gray-900">Business Address</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1*</label>
                                                <input
                                                    id="addressLine1"
                                                    name="addressLine1"
                                                    type="text"
                                                    value={formData.addressLine1}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
                                            </div>

                                            <div className="md:col-span-2">
                                                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                                                <input
                                                    id="addressLine2"
                                                    name="addressLine2"
                                                    type="text"
                                                    value={formData.addressLine2}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark</label>
                                                <input
                                                    id="landmark"
                                                    name="landmark"
                                                    type="text"
                                                    value={formData.landmark}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">PIN Code*</label>
                                                <input
                                                    id="pinCode"
                                                    name="pinCode"
                                                    type="text"
                                                    value={formData.pinCode}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.pinCode && <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City*</label>
                                                <input
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State*</label>
                                                <input
                                                    id="state"
                                                    name="state"
                                                    type="text"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country*</label>
                                                <input
                                                    id="country"
                                                    name="country"
                                                    type="text"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Bank Details & Password */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-medium text-gray-900">Bank Details & Account Setup</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                                                <input
                                                    id="bankAccountNumber"
                                                    name="bankAccountNumber"
                                                    type="text"
                                                    value={formData.bankAccountNumber}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="bankIfscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
                                                <input
                                                    id="bankIfscCode"
                                                    name="bankIfscCode"
                                                    type="text"
                                                    value={formData.bankIfscCode}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.bankIfscCode && <p className="mt-1 text-sm text-red-600">{errors.bankIfscCode}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="bankAccountHolderName" className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                                                <input
                                                    id="bankAccountHolderName"
                                                    name="bankAccountHolderName"
                                                    type="text"
                                                    value={formData.bankAccountHolderName}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <div className="h-px bg-gray-200 my-6"></div>
                                            </div>

                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password*</label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password*</label>
                                                <input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                {/* {errors.confirmPassword && className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        /> */}
                                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                                            </div>

                                            <div className="md:col-span-2 mt-4">
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            id="agreeToTerms"
                                                            name="agreeToTerms"
                                                            type="checkbox"
                                                            checked={formData.agreeToTerms}
                                                            onChange={handleChange}
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                                            I agree to the <Link href="/terms" className="text-blue-600 hover:text-blue-500">Terms and Conditions</Link> and <Link href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                                                        </label>
                                                        {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="rounded-md bg-red-50 p-4 mt-6">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-8">
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Back
                                        </button>
                                    )}

                                    <div className="flex-1"></div>

                                    {step < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Next
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Registering...
                                                </>
                                            ) : (
                                                'Register'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/seller/login" className="font-medium text-blue-600 hover:text-blue-500">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}