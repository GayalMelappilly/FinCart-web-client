import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    const categories = ['Tropical', 'Freshwater', 'Saltwater', 'Pond', 'Aquatic Plants'];

    return (
        <footer className="bg-gray-800 text-white py-8 md:px-30 sm:py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="mb-6 sm:mb-0">
                        <Image
                            src="/transparent-logo-light.png"
                            alt="Fincart Logo"
                            className="h-6 object-contain mb-6"
                            width={150}
                            height={100}
                        />
                        <p className="text-gray-400">Your trusted marketplace for ornamental fish and aquatic plants.</p>
                    </div>

                    <div className="mb-6 sm:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <Link href={`/category/${category.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6 sm:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Help</h4>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping</Link></li>
                            <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Subscribe to get updates on new fish and exclusive offers.</p>
                        <div className="flex flex-col sm:flex-row">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 rounded-t-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none text-white border-white border-2 mb-2 sm:mb-0"
                            />
                            <button className="bg-blue-600 px-4 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-blue-700 transition-colors w-full sm:w-auto">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-400 text-center sm:text-left mb-4 sm:mb-0">© 2025 Fincarts. All rights reserved.</p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;