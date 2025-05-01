'use client'

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Protected wrapper component that checks authentication
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = localStorage?.getItem('seller-loggedIn') === 'true'
  const router = useRouter();
  const pathname = usePathname();
  
  // Define public paths that don't require authentication
  const publicPaths = ['/seller/signup', '/seller/signup/verification', '/seller/create-profile', '/seller/login'];
  const isPublicPath = publicPaths.some(path => pathname === path);
  
  useEffect(() => {
    // Only redirect if not on a public path and not authenticated
    if (!isLoggedIn && !isPublicPath) {
      console.log(isLoggedIn, pathname)
      router.replace('/seller/signup');
    }
  }, [isLoggedIn, router, isPublicPath, pathname]);
  
  // If on public path or authenticated, show the children components
  return isPublicPath || isLoggedIn ? <>{children}</> : null;
}