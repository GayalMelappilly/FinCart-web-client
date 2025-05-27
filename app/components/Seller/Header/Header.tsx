import { useSellerAuth } from '@/app/context/sellerAuthContext';
import { Bell, Menu, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react'

type Props = {
    title: string;
    toggleSidebar: () => void;
}

const Header: FC<Props> = ({ title, toggleSidebar }) => {

    const { isLoggedIn, profileUrl, sellerData } = useSellerAuth()
    const [profile, setProfile] = useState<string | null>(null)

    useEffect(()=>{
        setProfile(profileUrl || sellerData?.businessInfo.logoUrl || null)
    },[profileUrl, sellerData?.businessInfo.logoUrl])

    return (
        <header className="bg-white shadow-sm z-10 md:pr-20">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {!isLoggedIn ?
                        (
                            <div className="md:px-20 flex items-center ">
                                <Link href="/" className="flex items-center space-x-2">
                                    <Image
                                        src="/splash.png"
                                        alt="Fincart Logo"
                                        className="md:h-6 h-5 object-contain pr-3"
                                        width={150}
                                        height={150}
                                    />
                                </Link>
                            </div>
                        ) : (
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
                        )}
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
                            {profile ? <Image src={profile as string} alt='profile-image' className='rounded-full hover:scale-105 h-8 w-8' width={1000} height={1000} /> : <User size={18} />}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header