'use client'

import { ReactNode } from 'react';
import { SellerAuthProvider } from '../context/sellerAuthContext';
import Layout from './layout-component';

interface SellerRootLayoutProps {
    children: ReactNode;
}

export default function SellerRootLayout({ children }: SellerRootLayoutProps) {
    return (
        <SellerAuthProvider>
            <Layout>
                {children}
            </Layout>
        </SellerAuthProvider>
    );
}