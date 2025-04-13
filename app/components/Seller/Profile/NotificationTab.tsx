'use client';

import { NotificationType } from './types';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NotificationProps {
  notification: NotificationType;
  onClose: () => void;
}

export default function Notification({ notification, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // After fade-out animation
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  const bgColor = notification.type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = notification.type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = notification.type === 'success' ? 'text-green-800' : 'text-red-800';
  const iconColor = notification.type === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <div className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`${bgColor} ${borderColor} ${textColor} border-l-4 p-4 rounded shadow-md flex items-center max-w-md`}>
        <div className="flex-grow">
          {notification.message}
        </div>
        <button onClick={onClose} className={`${iconColor} ml-2 hover:text-opacity-75`}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
}