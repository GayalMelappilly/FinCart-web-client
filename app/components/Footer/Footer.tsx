import Link from 'next/link';
import React from 'react'

type Props = {}

const Footer = (props: Props) => {

    const categories = ['Tropical', 'Freshwater', 'Saltwater', 'Pond', 'Aquatic Plants'];

    return (
        <footer className="bg-gray-800 text-white py-12 px-30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Fincart</h3>
                        <p className="text-gray-400">Your trusted marketplace for ornamental fish and aquatic plants.</p>
                    </div>

                    <div>
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

                    <div>
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
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none text-white"
                            />
                            <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400">© 2025 Fincart. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer