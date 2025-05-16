'use client'

import React, { useState } from "react";
import { Toast, ToastContext, ToastPosition, ToastProps, ToastType } from "../context/toastContext";

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);
  
  // Add a new toast
  const showToast = (type: ToastType, message: string, position: ToastPosition = 'bottom-right') => {
    const id = Math.random().toString(36).substring(2, 9);
    console.log('Toast triggered:', { type, message, position });
    setToasts(prev => [...prev, { id, type, message, position }]);
  };
  
  // Remove a toast
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // Position class for the container
  const getPositionClass = (position: ToastPosition) => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4 flex-col';
      case 'top-center':
        return 'top-4 left-1/2 -translate-x-1/2 flex-col';
      case 'top-right':
        return 'top-4 right-4 flex-col';
      case 'bottom-left':
        return 'bottom-4 left-4 flex-col-reverse';
      case 'bottom-center':
        return 'bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse';
      case 'bottom-right':
      default:
        return 'bottom-4 right-4 flex-col-reverse';
    }
  };
  
  // Group toasts by position
  const toastsByPosition = toasts.reduce<Record<ToastPosition, typeof toasts>>(
    (acc, toast) => {
      const position = toast.position || 'bottom-right';
      if (!acc[position]) acc[position] = [];
      acc[position].push(toast);
      return acc;
    },
    {} as Record<ToastPosition, typeof toasts>
  );
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast containers for each position */}
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div 
          key={position} 
          className={`fixed flex gap-3 z-50 ${getPositionClass(position as ToastPosition)}`}
        >
          {positionToasts.map(toast => (
            <Toast
              key={toast.id}
              type={toast.type}
              message={toast.message}
              position={toast.position}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Example usage component
const ToastDemo = () => {
  const { showToast } = useToast();
  
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Toast Component Demo</h1>
      
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => showToast('success', 'Item added to cart successfully!')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Add to Cart
        </button>
        
        <button
          onClick={() => showToast('error', 'Failed to add item to cart')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Error Example
        </button>
        
        <button
          onClick={() => showToast('info', 'Your order is being processed')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Info Example
        </button>
        
        <button
          onClick={() => showToast('warning', 'Only 2 items left in stock')}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
        >
          Stock Warning
        </button>
      </div>
    </div>
  );
};