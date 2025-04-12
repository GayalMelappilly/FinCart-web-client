'use client'

import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const categories = ['Tropical', 'Freshwater', 'Saltwater', 'Pond', 'Aquatic Plants'];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-sm relative">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo and optional menu button */}
                    <div className="flex items-center space-x-4">
                        <button 
                            className="sm:hidden text-gray-600"
                            onClick={toggleMobileMenu}
                        >
                            <Menu size={20} />
                        </button>
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/splash.png"
                                alt="Fincart Logo"
                                className="h-6 object-contain"
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
                        <button className="md:hidden bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors rounded-full p-2">
                            <Search size={20} />
                        </button>
                        
                        <button className="hidden sm:block py-2 bg-gray-100 hover:bg-blue-200 hover:text-blue-600 text-gray-800 rounded-lg transition-colors font-semibold px-4 md:px-6">
                            Sell
                        </button>
                        
                        <Link href={'/wishlist'}>
                            <button className="bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-800 transition-colors rounded-full p-2">
                                <Heart size={18}/>
                            </button>
                        </Link>
                        
                        <Link href={'/cart'}>
                            <button className="bg-gray-100 hover:bg-amber-50 hover:text-amber-600 text-gray-800 transition-colors rounded-full p-2">
                                <ShoppingCart size={18} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}>
                    <div 
                        className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg py-4 px-6 z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <Link href="/" className="flex items-center space-x-2">
                                <Image
                                    src="/splash.png"
                                    alt="Fincart Logo"
                                    className="h-6 object-contain"
                                />
                            </Link>
                            <button onClick={toggleMobileMenu}>
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
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header