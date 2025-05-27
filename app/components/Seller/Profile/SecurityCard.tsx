'use client';

import { PasswordForm } from './types';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { convertTimeago } from '@/app/utils/timeago';

interface SecurityCardProps {
  passwordForm: PasswordForm;
  onPasswordChange: (form: PasswordForm) => void;
  lastUpdatedAt: string,
  onSubmit: () => void;
  isEditMode: boolean;
  onEditModeChange: () => void;
  isLoading: boolean;
}

export default function SecurityCard({ 
  passwordForm, 
  onPasswordChange,
  lastUpdatedAt,
  onSubmit,
  isEditMode,
  onEditModeChange,
  isLoading
}: SecurityCardProps) {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPasswordChange({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
      
      {isEditMode ? (
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input 
                id="currentPassword"
                name="currentPassword"
                type={showPassword.current ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={handleChange}
                className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input 
                id="newPassword"
                name="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={handleChange}
                className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Must be at least 8 characters.
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input 
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={handleChange}
                className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition 
              ${isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-900 font-medium">Password</p>
            <p className="text-gray-500 text-sm">{convertTimeago(lastUpdatedAt)}</p>
          </div>
          <button 
            onClick={onEditModeChange}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}