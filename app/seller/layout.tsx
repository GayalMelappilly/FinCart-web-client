'use client'

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Menu,
    X,
    LogOut,
    Bell,
    CircleArrowLeft,
    Home,
    Package,
    ShoppingBag,
    User
} from 'lucide-react';
import Footer from '../components/Footer/Footer';
import { getFormattedPathname } from '../utils/pathnameExtraction';
import SideBar from '../components/Seller/SideBar/SideBar';
import MobileSideBar from '../components/Seller/MobileSideBar/MobileSideBar';
import Header from '../components/Seller/Header/Header';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export type NavigationItem = {
    name: string;
    path: string;
    icon: React.FC<any>; 
};

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const title = getFormattedPathname(pathname as string)

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
            <div className="flex h-screen bg-gray-50">
                <SideBar navigationItems={navigationItems} isActive={isActive} />
                {sidebarOpen && (
                    <MobileSideBar navigationItems={navigationItems} toggleSidebar={toggleSidebar} isActive={isActive} />
                )}
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header title={title} toggleSidebar={toggleSidebar} />
                    <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
}