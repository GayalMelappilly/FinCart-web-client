// hooks/useRazorpay.ts
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      // Script exists, wait for it to load
      const checkLoaded = () => {
        if (window.Razorpay) {
          setIsLoaded(true);
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      setIsLoaded(true);
      setIsError(false);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Razorpay script:', error);
      setIsError(true);
      setIsLoaded(false);
    };
    
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Don't remove the script as it might be used by other components
      // Just cleanup event listeners if needed
    };
  }, []);

  return { isLoaded, isError };
};