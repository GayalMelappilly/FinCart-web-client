'use client'

import { getCurrentUser, logoutUser } from '@/app/services/authServices';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Heart, Menu, Search, ShoppingBag, ShoppingCart, User, X } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Spinner from '../LoadingSpinner/Spinner';
import { useRouter } from 'next/navigation';
import { UserType } from '@/app/types/user/type';


const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<UserType | null>()
    const [accessToken, setAccessToken] = useState('');

    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setAccessToken(localStorage.getItem('accessToken') || '');
        }
        if (!localStorage.getItem('accessToken')) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('guest', 'true')
            }
        }else{
            if (typeof window !== 'undefined') {
                localStorage.removeItem('guest')
            }
        }
    }, []);

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-current-user'],
        queryFn: () => getCurrentUser(accessToken),
        enabled: !!accessToken
    })

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken')
                setAccessToken('')
            }
            setUser(null)
            router.refresh();
        }
    });

    useEffect(() => {
        if (data?.success) setUser(data?.data)
        console.log(data)
    }, [data])

    if (error) console.log("Error fetching user : ", error);
    if (isLoading || logoutMutation.isPending) return <Spinner />

    const categories: string[] = [''];

    const toggleMobileMenu = (): void => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleProfileMenu = (): void => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const HandleLogout = () => {
        logoutMutation.mutate()
    }

    return (
        <header className="bg-white shadow-sm relative">
            <div className="container mx-auto md:px-30 px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo and optional menu button */}
                    <div className="flex items-center ">
                        <button
                            className="sm:hidden text-gray-600 mt-1"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                        >
                            <Menu size={20} />
                        </button>
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

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="relative hidden md:block w-48 lg:w-64">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-8 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 text-black"
                            />
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-black" />
                        </div>

                        <Link href={'/seller/dashboard'}>
                            <button className="hidden sm:block py-2 bg-gray-100 hover:bg-blue-200 hover:text-blue-600 text-gray-800 rounded-lg transition-colors font-semibold px-4 md:px-6">
                                Sell
                            </button>
                        </Link>

                        <Link href={'/wishlist'}>
                            <button className="bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-800 transition-colors rounded-full p-2" aria-label="Wishlist">
                                <Heart size={18} />
                            </button>
                        </Link>

                        <Link href={'/cart'}>
                            <button className="bg-gray-100 hover:bg-amber-50 hover:text-amber-600 text-gray-800 transition-colors rounded-full p-2" aria-label="Cart">
                                <ShoppingCart size={18} />
                            </button>
                        </Link>

                        {/* Profile section */}
                        <div className="relative">
                            <button
                                onClick={toggleProfileMenu}
                                className={`bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 text-gray-800 transition-colors rounded-full ${user?.profilePictureUrl ? 'my-2' : 'p-2'}`}
                                aria-label="Profile"
                            >
                                {user?.profilePictureUrl ? <Image src={user.profilePictureUrl} alt='profile-image' className='rounded-full hover:scale-105' width={32} height={32} /> : <User size={18} />}
                            </button>

                            {/* Profile dropdown menu */}
                            {profileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    {user ? (
                                        <>
                                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Your Profile
                                            </Link>
                                            <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Your Orders
                                            </Link>
                                            <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Settings
                                            </Link>
                                            <div className="border-t border-gray-100">
                                                <button onClick={HandleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                                    Sign out
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Sign in
                                            </Link>
                                            <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Create account
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen ? (
                <div className="fixed inset-0 z-40 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
                        onClick={toggleMobileMenu}
                    >
                        <div
                            className="absolute top-0 left-0 h-full w-[85%] max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out rounded-r-2xl overflow-hidden"
                            style={{ touchAction: "none" }}
                            onClick={(e) => e.stopPropagation()}
                        >

                            {/* Header with logo and close button */}
                            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                                <Link href="/" className="flex items-center space-x-2">
                                    <Image
                                        src="/splash.png"
                                        alt="Fincart Logo"
                                        className="h-6 w-auto object-contain"
                                        width={100}
                                        height={100}
                                    />
                                </Link>
                                <button
                                    onClick={toggleMobileMenu}
                                    aria-label="Close menu"
                                    className="rounded-full p-1.5 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <X size={20} className="text-gray-700" />
                                </button>
                            </div>

                            {/* Content area with gradient background */}
                            <div className="h-full pb-20 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
                                {/* Search bar - redesigned */}
                                <div className="mx-4 my-4">
                                    <div className="relative flex items-center">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search for fish..."
                                            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-gray-700 placeholder-gray-400 shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Profile section in mobile menu */}
                                <div className="px-4 mb-5">
                                    {user ? (
                                        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={toggleProfileMenu}
                                                    className={`bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 text-gray-800 transition-colors rounded-full ${user?.profilePictureUrl ? 'my-2' : 'p-2'}`}
                                                    aria-label="Profile"
                                                >
                                                    {user?.profilePictureUrl ? <Image src={user.profilePictureUrl} alt='profile-image' className='rounded-full hover:scale-105' width={32} height={32} /> : <User size={18} />}
                                                </button>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{user.fullName}</p>
                                                    <Link href="/profile" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                                                        View Profile
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-2">
                                            <div className="flex gap-2">
                                                <Link href="/login" className="flex-1">
                                                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-sm transition-all duration-200 font-medium text-sm">
                                                        Sign In
                                                    </button>
                                                </Link>
                                                <Link href="/signup" className="flex-1">
                                                    <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl shadow-sm transition-all duration-200 font-medium text-sm border border-gray-200">
                                                        Register
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Sell button */}
                                <div className="px-4 mb-5">
                                    <Link href={'/seller/dashboard'} className="flex items-center justify-center space-x-1 sm:space-x-2 bg-zinc-200 hover:bg-blue-300/40 font-medium hover:scale-105 duration-300 text-slate-800 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6 rounded-lg border border-slate-200 transition-all">
                                        <span>Sell Your Fish</span>
                                        <ShoppingBag size={16} />
                                    </Link>
                                </div>

                                {/* Navigation */}
                                <div className="px-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                        Categories
                                    </h3>

                                    <div className="space-y-1 mb-6">
                                        {categories.map((category, index) => (
                                            <Link
                                                key={index}
                                                href={`/category/${category.toLowerCase()}`}
                                                className="flex items-center py-2.5 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors group"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-500 mr-2.5 transition-colors"></span>
                                                {category}
                                            </Link>
                                        ))}
                                    </div>

                                    {user && (
                                        <div className="pt-2 border-t border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-4 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Your Account
                                            </h3>

                                            <div className="space-y-1">
                                                <Link
                                                    href="/orders"
                                                    className="flex items-center py-2.5 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                    Your Orders
                                                </Link>

                                                <Link
                                                    href="/settings"
                                                    className="flex items-center py-2.5 px-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Settings
                                                </Link>

                                                <button
                                                    className="w-full flex items-center py-2.5 px-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-700 transition-colors"
                                                    onClick={HandleLogout}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Support section at bottom */}
                                <div className="px-4 mt-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 shadow-sm">
                                        <h4 className="font-medium text-gray-900 mb-2">Need help?</h4>
                                        <p className="text-sm text-gray-600 mb-3">Contact our customer support team</p>
                                        <Link href="/support">
                                            <button className="w-full py-2 bg-white text-blue-600 border border-blue-200 rounded-lg transition-colors hover:bg-blue-50 text-sm font-medium">
                                                Contact Support
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 z-40 pointer-events-none">
                    <div className="absolute inset-0 bg-black/0 transition-opacity duration-300 ease-in-out">
                        <div
                            className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg py-4 px-6 z-50 transform -translate-x-full transition-transform duration-300 ease-in-out"
                        >
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header