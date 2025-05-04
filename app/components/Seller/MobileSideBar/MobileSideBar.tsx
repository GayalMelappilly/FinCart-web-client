import { NavigationItem } from '@/app/seller/layout-component';
import { CircleArrowLeft, LogOut, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

type Props = {
    navigationItems: NavigationItem[];
    isActive: (path: string) => boolean;
    toggleSidebar: () => void;
}

const MobileSideBar:FC<Props> = ({navigationItems, isActive, toggleSidebar}) => {
    return (
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
    )
}

export default MobileSideBar