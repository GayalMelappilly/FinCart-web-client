'use client'

import { useToast } from '@/app/providers/ToastProvider';
import { changePassword } from '@/app/services/authServices';
// import { updatePassword } from '@/app/services/authServices';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const ChangePasswordBox = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [passwordStrength, setPasswordStrength] = useState<string>('');
    const router = useRouter();

    const {showToast} = useToast()

    const mutation = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            if (!data.success) {
                setError(data.message || 'Failed to update password');
            }
            if (data.success) {
                console.log('Password updated successfully');
                showToast('success', 'Password updated successfully')
                router.push('/login'); // or wherever you want to redirect
            }
        },
        onError: (err) => {
            console.log('Password update error:', err);
            showToast('error', 'Failed to update password')
            setError('Something went wrong. Please try again.');
        }
    });

    const checkPasswordStrength = (password: string) => {
        if (password.length < 8) {
            setPasswordStrength('Too short');
            return;
        }
        
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        switch (strength) {
            case 0:
            case 1:
                setPasswordStrength('Weak');
                break;
            case 2:
            case 3:
                setPasswordStrength('Medium');
                break;
            case 4:
            case 5:
                setPasswordStrength('Strong');
                break;
            default:
                setPasswordStrength('');
        }
    };

    const handleNewPasswordChange = (value: string) => {
        setNewPassword(value);
        checkPasswordStrength(value);
        
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        
        // Clear error when user starts typing
        if (error) {
            setError('');
        }
    };

    const validatePasswords = () => {
        if (newPassword.length < 8) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePasswords()) return;

        setIsLoading(true);
        setError('');

        try {
            const data = {
                newPassword,
                confirmPassword
            };
            mutation.mutate(data);

        } catch (error) {
            console.error('Error updating password:', error);
            setError('Failed to update password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 'Weak':
                return 'text-red-500';
            case 'Medium':
                return 'text-yellow-500';
            case 'Strong':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    const isFormValid = newPassword.length >= 8 && newPassword === confirmPassword;

    return (
        <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-6">
                <h2 className="text-center text-white text-2xl font-semibold">Fincart</h2>
                <p className="text-center text-blue-100 text-sm">Where fins belong</p>
            </div>

            <div className="p-6 sm:p-8">
                <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-blue-100 p-3">
                        <FiLock className="h-6 w-6 text-blue-600" />
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    Set New Password
                </h3>

                <div className="mb-6 text-center text-gray-600">
                    <p>Create a secure password for your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="new-password"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => handleNewPasswordChange(e.target.value)}
                                className={`w-full px-3 py-3 border ${error ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10`}
                                placeholder="Enter new password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showNewPassword ? (
                                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <FiEye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {newPassword && passwordStrength && (
                            <p className={`mt-1 text-xs ${getStrengthColor()}`}>
                                Strength: {passwordStrength}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                className={`w-full px-3 py-3 border ${error ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10`}
                                placeholder="Confirm new password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showConfirmPassword ? (
                                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <FiEye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {confirmPassword && newPassword !== confirmPassword && (
                            <p className="mt-1 text-xs text-red-500">
                                Passwords do not match
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="mb-4">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !isFormValid}
                        className={`w-full py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center ${
                            isLoading || !isFormValid
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        }`}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>

                {/* <div className="mt-6 text-center">
                    <div className="text-xs text-gray-500 space-y-1">
                        <p>Password requirements:</p>
                        <p>• At least 8 characters long</p>
                        <p>• Use a mix of letters, numbers, and symbols for better security</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ChangePasswordBox