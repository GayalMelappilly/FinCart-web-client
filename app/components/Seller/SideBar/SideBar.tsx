import { NavigationItem } from '@/app/seller/layout';
import { Home, LogOut, Package, ShoppingBag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react'

type Props = {
    navigationItems: NavigationItem[];
    isActive: (path: string) => boolean;
}

const SideBar:FC<Props> = ({navigationItems, isActive}) => {

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

export default SideBar