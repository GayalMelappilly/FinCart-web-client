'use client'

import { ReactNode, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
    Home,
    LucideIcon,
    Package,
    ShoppingBag,
    User
} from 'lucide-react';
import Footer from '../components/Footer/Footer';
import { getFormattedPathname } from '../utils/pathnameExtraction';
import SideBar from '../components/Seller/SideBar/SideBar';
import MobileSideBar from '../components/Seller/MobileSideBar/MobileSideBar';
import Header from '../components/Seller/Header/Header';
import Spinner from '../components/LoadingSpinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { getSellerDetails } from '../services/sellerAuthServices';
import { useSellerAuth } from '../context/sellerAuthContext';
import ProtectedLayout from '../components/ProtectedRoute/ProtectedRoute';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export type NavigationItem = {
    name: string;
    path: string;
    icon: LucideIcon;
};

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const title = getFormattedPathname(pathname as string)
    const [accessToken, setAccessToken] = useState('');
    const { setSellerData, setIsLoggedIn, isLoggedIn } = useSellerAuth()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setAccessToken(localStorage.getItem('sellerAccessToken') || '');
        }
    }, []);


    const innerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Scroll outer scrollbar (browser window)
        window.scrollTo({ top: 0, behavior: 'auto' })

        // Scroll inner container
        if (innerRef.current) {
            innerRef.current.scrollTo({ top: 0, behavior: 'auto' })
        }
    }, [pathname])

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-seller-details'],
        queryFn: () => getSellerDetails(accessToken),
        enabled: !!accessToken
    })

    useEffect(() => {
        if (data) {
            setIsLoggedIn(true)
            if (typeof window !== 'undefined') {
                localStorage.setItem('seller-loggedIn', 'true')
                localStorage.setItem('seller', JSON.stringify(data.data))
            }
            setSellerData(data.data)
        }
    }, [data, setIsLoggedIn, setSellerData])

    if (error) {
        console.log("ERROR HEADER COMP : ", error)
        if (typeof window !== 'undefined') {
            localStorage.setItem('seller-loggedIn', 'false')
        }
    }

    if (isLoading) return <Spinner />

    const navigationItems: NavigationItem[] = [
        { name: 'Dashboard', path: '/seller/dashboard', icon: Home },
        { name: 'Orders', path: '/seller/orders', icon: Package },
        { name: 'Products', path: '/seller/products', icon: ShoppingBag },
        { name: 'Profile', path: '/seller/profile', icon: User },
    ];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <>
            <ProtectedLayout>
                <div className="flex h-screen bg-gray-50">
                    {isLoggedIn && <>
                        <SideBar navigationItems={navigationItems} isActive={isActive} />
                        {sidebarOpen && (
                            <MobileSideBar navigationItems={navigationItems} toggleSidebar={toggleSidebar} isActive={isActive} />
                        )}
                    </>}
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <Header title={title} toggleSidebar={toggleSidebar} />
                        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
                            {children}
                        </main>
                    </div>
                </div>
                <Footer />
            </ProtectedLayout>
        </>
    );
}