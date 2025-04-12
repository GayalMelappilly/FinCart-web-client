import { Heart, Menu, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

type Props = {}

const Header = (props: Props) => {

    const categories = ['Tropical', 'Freshwater', 'Saltwater', 'Pond', 'Aquatic Plants'];

    return (
        <header className="bg-white shadow-sm px-10">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="flex items-center space-x-2">
                            {/* <div className="text-blue-600">
                                <Menu size={20} />
                            </div> */}
                            <img
                                src="/splash.png"
                                alt="Fincart Logo"
                                className="h-6 object-contain"
                            />

                        </Link>

                        {/* <nav className="hidden md:flex space-x-6 ml-5">
                            {categories.map((category, index) => (
                                <Link key={index} href={`/category/${category.toLowerCase()}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                    {category}
                                </Link>
                            ))}
                        </nav> */}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block w-64">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 text-black"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-black" />
                        </div>
                        <button className="py-2 bg-gray-100 hover:bg-blue-200 hover:text-blue-600 text-gray-800 rounded-lg transition-colors font-semibold px-6">
                            Sell
                        </button>
                        <button className="bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-800 font-medium transition-colors rounded-full p-2">
                            <Heart size={20} />
                        </button>
                        <button className="bg-gray-100 hover:bg-amber-50 hover:text-amber-600 text-gray-800 font-medium transition-colors rounded-full p-2">
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header