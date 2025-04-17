'use client'

import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
    const categories: string[] = [''];

    const toggleMobileMenu = (): void => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleProfileMenu = (): void => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm relative">
            <div className="container mx-auto md:px-30 px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo and optional menu button */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="sm:hidden text-gray-600"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                        >
                            <Menu size={20} />
                        </button>
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

                        {/* Search icon for mobile */}
                        <button className="md:hidden bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors rounded-full p-2" aria-label="Search">
                            <Search size={20} />
                        </button>

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
                                className="bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 text-gray-800 transition-colors rounded-full p-2"
                                aria-label="Profile"
                            >
                                <User size={18} />
                            </button>

                            {/* Profile dropdown menu */}
                            {profileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    {username ? (
                                        <>
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-700">Signed in as</p>
                                                <p className="text-sm font-bold text-gray-900">{username}</p>
                                            </div>
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
                                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
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

            {mobileMenuOpen ? (
                <div className="fixed inset-0 z-40 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
                        onClick={toggleMobileMenu}
                    >
                        <div
                            className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg py-4 px-6 z-50 transform transition-transform duration-300 ease-in-out"
                            style={{ touchAction: "none" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <Link href="/" className="flex items-center space-x-2">
                                    <Image
                                        src="/splash.png"
                                        alt="Fincart Logo"
                                        className="h-6 object-contain"
                                        width={100}
                                        height={100}
                                    />
                                </Link>
                                <button onClick={toggleMobileMenu} aria-label="Close menu">
                                    <X size={20} className="text-gray-700" />
                                </button>
                            </div>

                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 text-black"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-black" />
                            </div>

                            {/* Profile section in mobile menu */}
                            {username ? (
                                <div className="mb-6 py-3 px-2 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-indigo-100 p-2 rounded-full">
                                            <User size={20} className="text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{username}</p>
                                            <Link href="/profile" className="text-sm text-indigo-600">
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-2 mb-6">
                                    <Link href="/login" className="flex-1">
                                        <button className="w-full py-2 bg-indigo-600 text-white rounded-lg transition-colors font-semibold">
                                            Sign In
                                        </button>
                                    </Link>
                                    <Link href="/register" className="flex-1">
                                        <button className="w-full py-2 bg-gray-100 hover:bg-indigo-100 text-gray-800 rounded-lg transition-colors font-semibold">
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            )}

                            <button className="w-full py-2 bg-gray-100 hover:bg-blue-200 hover:text-blue-600 text-gray-800 rounded-lg transition-colors font-semibold px-6 mb-6">
                                Sell
                            </button>

                            <nav className="flex flex-col space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                                {categories.map((category, index) => (
                                    <Link key={index} href={`/category/${category.toLowerCase()}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                        {category}
                                    </Link>
                                ))}
                                
                                {username && (
                                    <>
                                        <div className="border-t border-gray-100 pt-4 mt-4">
                                            <Link href="/orders" className="text-gray-600 hover:text-blue-600 transition-colors">
                                                Your Orders
                                            </Link>
                                        </div>
                                        <Link href="/settings" className="text-gray-600 hover:text-blue-600 transition-colors">
                                            Settings
                                        </Link>
                                        <button className="text-left text-red-600 hover:text-red-700 transition-colors">
                                            Sign out
                                        </button>
                                    </>
                                )}
                            </nav>
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