'use client'

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Home,
    Package,
    ShoppingBag,
    User,
    Menu,
    X,
    LogOut,
    Bell,
    CircleArrowLeft
} from 'lucide-react';
import Footer from '../components/Footer/Footer';
import { getFormattedPathname } from '../utils/pathnameExtraction';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const title = getFormattedPathname(pathname as string)
    const isActive = (path: string) => {
        return pathname === path;
    };

    const navigationItems = [
        { name: 'Dashboard', path: '/seller/dashboard', icon: Home },
        { name: 'Orders', path: '/seller/orders', icon: Package },
        { name: 'Products', path: '/seller/products', icon: ShoppingBag },
        { name: 'Profile', path: '/seller/profile', icon: User },
    ];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar for desktop */}
                <div className="hidden md:flex md:flex-shrink-0">
                    <div className="flex flex-col w-64">
                        <div className="flex items-center shadow-sm z-10 border-r bg-white mb-8 justify-center h-16 px-4 border-b border-gray-200">
                            <Link href="/" className="flex items-center space-x-2">
                                <Image
                                    src="/splash.png"
                                    alt="Fincart Logo"
                                    className="h-6 object-contain"
                                    width={100}
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
                                >
                                    <LogOut className="mr-3 h-5 w-5" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile sidebar */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 md:hidden">
                        <div
                            className="absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300"
                            onClick={toggleSidebar}
                        ></div>
                        <div className="fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white transform transition-transform ease-in-out duration-300">
                            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                                <Link href="/seller/dashboard" className="flex items-center space-x-2">
                                    <Image
                                        src="/slash.png"
                                        alt="Fincart Logo"
                                        width={40}
                                        height={40}
                                        className="h-8 w-auto"
                                    />
                                </Link>
                                <button
                                    onClick={toggleSidebar}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto px-4 py-4">
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
                                                onClick={toggleSidebar}
                                            >
                                                <Icon className="mr-3 h-5 w-5" />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </nav>
                                <div className="pt-4 mt-6 border-t border-gray-200">
                                    <Link href={'/'}>
                                        <button className="text-gray-700 p-2 rounded-lg flex items-center px-4 py-3 text-sm font-medium">
                                            <CircleArrowLeft className="mr-3 h-5 w-5" />
                                            Back to Shopping
                                        </button>
                                    </Link>
                                </div>
                                <div className="pt-4 mt-6 border-t border-gray-200">
                                    <button
                                        className="flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 w-full"
                                    >
                                        <LogOut className="mr-3 h-5 w-5" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main content */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Top header */}
                    <header className="bg-white shadow-sm z-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <button
                                        onClick={toggleSidebar}
                                        className="md:hidden text-gray-400 hover:text-gray-500"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </button>
                                    <h1 className="ml-2 md:ml-0 text-lg font-medium text-gray-900">
                                        {title}
                                    </h1>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Link href={'/'}>
                                        <button className="bg-gray-100 hidden md:block hover:bg-blue-200 hover:text-blue-600 text-gray-800 p-2 rounded-lg relative">
                                            Back to Shopping
                                        </button>
                                    </Link>
                                    <button className="text-gray-400 hover:text-gray-500 relative">
                                        <Bell className="h-6 w-6" />
                                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                                    </button>
                                    <Link href="/seller/profile" className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-medium">TL</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
}