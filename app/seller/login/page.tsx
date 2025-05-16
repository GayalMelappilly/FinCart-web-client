'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import LoginHeader from '@/app/components/Seller/Login/LoginHeader';
import LoginForm from '@/app/components/Seller/Login/LoginForm';
import SubmitButton from '@/app/components/Seller/Login/SubmitButton';
import { useMutation } from '@tanstack/react-query';
import { loginSeller } from '@/app/services/sellerAuthServices';
import { useSellerAuth } from '@/app/context/sellerAuthContext';
import LoginBox from '@/app/components/Seller/Login/LoginBox';

// Define TypeScript interfaces
export interface FormData {
    emailOrMobile: string;
    password: string;
    rememberMe: boolean;
}

export interface ValidationErrors {
    emailOrMobile?: string;
    password?: string;
    general?: string;
}

export default function LoginPage() {
    // const router = useRouter();
    // const [isLoading, setIsLoading] = useState(false);
    // const [formData, setFormData] = useState<FormData>({
    //     emailOrMobile: '',
    //     password: '',
    //     rememberMe: false,
    // });
    // const [errors, setErrors] = useState<ValidationErrors>({});
    // const { setIsLoggedIn } = useSellerAuth();

    // const mutation = useMutation({
    //     mutationFn: loginSeller,
    //     onSuccess: (data) => {
    //         if (data.accessToken) {
    //             setIsLoggedIn(true)
    //             if (typeof window !== 'undefined') {
    //                 localStorage.setItem('sellerAccessToken', data.accessToken as string)
    //                 localStorage.setItem('seller-loggedIn', 'true')
    //             }
    //             router.push('/seller/dashboard');
    //         }
    //     },
    //     onError: (err) => {
    //         setIsLoggedIn(false)
    //         console.log('Seller login error : ', err)
    //         if (typeof window !== 'undefined') {
    //             localStorage.setItem('seller-loggedIn', 'false')
    //             localStorage.removeItem('seller-loggedIn');
    //         }
    //     }
    // })

    // // Handle input changes
    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: type === 'checkbox' ? checked : value,
    //     });

    //     // Clear error when user starts typing
    //     if (errors[name as keyof ValidationErrors]) {
    //         setErrors({
    //             ...errors,
    //             [name]: undefined,
    //         });
    //     }
    // };

    // // Validate form
    // const validateForm = (): boolean => {
    //     const newErrors: ValidationErrors = {};

    //     // Email/Mobile validation
    //     if (!formData.emailOrMobile) {
    //         newErrors.emailOrMobile = 'Email or mobile number is required';
    //     } else if (
    //         !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\d{10,15})$/.test(formData.emailOrMobile)
    //     ) {
    //         newErrors.emailOrMobile = 'Please enter a valid email or mobile number';
    //     }

    //     // Password validation
    //     if (!formData.password) {
    //         newErrors.password = 'Password is required';
    //     } else if (formData.password.length < 6) {
    //         newErrors.password = 'Password must be at least 6 characters';
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    // // Handle form submission
    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     console.log(formData)

    //     if (!validateForm()) {
    //         return;
    //     }

    //     setIsLoading(true);

    //     try {
    //         // Replace this with your actual authentication API call
    //         mutation.mutate(formData)

    //     } catch (error) {
    //         console.error('Login error:', error);
    //         setErrors({
    //             ...errors,
    //             general: error instanceof Error ? error.message : 'Login failed. Please try again.',
    //         });
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <div className="min-h-3/4 pt-20 flex items-center justify-center bg-gray-50 py-6 px-2 sm:py-12 sm:px-6">
            <LoginBox />
            {/* <div className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-6 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                <LoginHeader errors={errors} />

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <LoginForm formData={formData} handleChange={handleChange} errors={errors} />
                    <SubmitButton isLoading={isLoading} />
                </form>
            </div> */}
        </div>
    );
}