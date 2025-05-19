import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    const categories = ['Tropical', 'Freshwater', 'Saltwater', 'Pond', 'Aquatic Plants'];

    return (
        <footer className="bg-gray-800 text-white py-6 px-4 sm:py-8 md:py-10 lg:py-12">
            <div className="container mx-auto  px-2 sm:px-10">
                {/* Main footer content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {/* Logo and description */}
                    <div className="mb-6 sm:mb-0">
                        <div className="flex justify-start mb-4">
                            <Image
                                src="/transparent-logo-light.png"
                                alt="Fincart Logo"
                                className="object-contain"
                                width={120}
                                height={40}
                                sizes="(max-width: 640px) 120px, (max-width: 768px) 130px, 150px"
                            />
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base text-left">Your trusted marketplace for ornamental fish and aquatic plants.</p>
                    </div>

                    {/* Categories */}
                    <div className="mb-6 sm:mb-0">
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-left">Categories</h4>
                        <ul className="space-y-1 sm:space-y-2">
                            {categories.map((category, index) => (
                                <li key={index} className="text-left">
                                    <Link href={`/category/${category.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div className="mb-6 sm:mb-0">
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-left">Help</h4>
                        <ul className="space-y-1 sm:space-y-2">
                            <li className="text-left">
                                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">FAQ</Link>
                            </li>
                            <li className="text-left">
                                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Shipping</Link>
                            </li>
                            <li className="text-left">
                                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Returns</Link>
                            </li>
                            <li className="text-left">
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-left">Newsletter</h4>
                        <p className="text-gray-400 mb-3 text-sm sm:text-base text-left">Subscribe to get updates on new fish and exclusive offers.</p>
                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row max-w-xs mx-auto sm:mx-0">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-3 py-2 rounded-md sm:rounded-r-none bg-gray-700 focus:outline-none text-white border border-gray-600 focus:border-blue-500 text-sm"
                                aria-label="Email for newsletter"
                            />
                            <button className="bg-blue-600 px-4 py-2 rounded-md sm:rounded-l-none hover:bg-blue-700 transition-colors w-full sm:w-auto text-sm font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="border-t border-gray-700 mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6">
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                        <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">© 2025 Fincarts. All rights reserved.</p>
                        <div className="flex flex-row justify-center space-x-4 sm:space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;