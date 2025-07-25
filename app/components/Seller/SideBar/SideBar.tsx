'use client'

import { NavigationItem } from '@/app/seller/layout-component';
import { logoutSeller } from '@/app/services/sellerAuthServices';
import { useQuery } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import Spinner from '../../LoadingSpinner/Spinner';
import { useToast } from '@/app/providers/ToastProvider';

type Props = {
    navigationItems: NavigationItem[];
    isActive: (path: string) => boolean;
}

const SideBar: FC<Props> = ({ navigationItems, isActive }) => {
    const [accessToken, setAccessToken] = useState('');
    const router = useRouter();

    const { showToast } = useToast()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setAccessToken(localStorage.getItem('sellerAccessToken') || '');
        }
    }, []);

    // Move the useQuery hook to the component level
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['logout-seller'],
        queryFn: () => logoutSeller(accessToken),
        enabled: false // This prevents the query from running automatically
    });

    useEffect(() => {
        if (error) {
            showToast('error', 'Logout unsuccessful')
            console.log("ERROR HEADER COMP : ", error);
            if (typeof window !== 'undefined') {
                localStorage.setItem('seller-loggedIn', 'false');
            }
        }

        if (data) {
            showToast('success', 'Logout successful')
            if (typeof window !== 'undefined') {
                localStorage.removeItem('sellerAccessToken')
                localStorage.removeItem('seller-loggedIn')
                localStorage.removeItem('seller-email-address')
                localStorage.removeItem('seller')
            }
            window.location.href = '/';
        }
    }, [data, error, router]);

    const handleLogout = () => {
        refetch(); // Trigger the query when the logout button is clicked
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex items-center shadow-sm z-10 border-r bg-white mb-8 justify-center h-16 px-4 border-b border-gray-200">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/splash.png"
                            alt="Fincart Logo"
                            className="h-6 object-contain"
                            width={140}
                            height={100}
                        />
                    </Link>
                </div>
                <div className="flex flex-col max-h-fit shadow-sm z-10 rounded-e-xl bg-white flex-grow px-4 py-4">
                    <nav className="flex-1 space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(item.path)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="pt-4 mt-6 border-t border-gray-200">
                        <button
                            className="flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 w-full"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;