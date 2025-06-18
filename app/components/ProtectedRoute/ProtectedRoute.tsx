'use client'

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = [
    '/seller/signup',
    '/seller/signup/verification',
    '/seller/create-profile',
    '/seller/login',
    '/seller/login/forgot-password',
    '/seller/change-password'
  ];
  
  const isPublicPath = publicPaths.some(path => pathname === path);

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' ? localStorage.getItem('seller-loggedIn') === 'true' : false
    setIsLoggedIn(loggedIn);

    if (!loggedIn && !isPublicPath) {
      router.replace('/seller/signup');
    }

    if(loggedIn && isPublicPath) {
      router.replace('/seller/dashboard')
    }

  }, [pathname, router, isPublicPath]);

  // Return null while waiting for client-side check
  if (isLoggedIn === null && !isPublicPath) return null;

  return isPublicPath || isLoggedIn ? <>{children}</> : null;
}
