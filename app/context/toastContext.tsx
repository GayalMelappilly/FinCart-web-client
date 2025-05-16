import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Define the types of toasts available
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// Define the position options for the toast
export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

// Simplified Toast component props
export interface ToastProps {
  type: ToastType;
  message: string;
  position?: ToastPosition;
  onClose?: () => void;
}

// Toast context to manage toasts globally
interface ToastContextType {
  showToast: (type: ToastType, message: string, position?: ToastPosition) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Main Toast component
export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  position = 'bottom-right',
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  
  // Handle closing the toast with animation
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Match this with the transition duration
  };
  
  // Auto-close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(handleClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Configure icon based on toast type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return null;
    }
  };

  // Configure color based on toast type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div
      className={`
        p-4 rounded-lg border shadow-lg max-w-md w-full transform transition-all duration-300 flex
        ${getTypeStyles()}
        ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
      `}
    >
      <div className="mr-3 flex-shrink-0 pt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close toast"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
