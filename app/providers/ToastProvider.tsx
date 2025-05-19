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