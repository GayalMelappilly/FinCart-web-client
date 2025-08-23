import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoLogoInstagram } from 'react-icons/io';

const Footer = () => {
    const helpLinks = [
        { title: 'FAQ', href: '/help/faq' },
        { title: 'Shipping', href: '/help/policy/shipping' },
        { title: 'Returns', href: '/help/policy/returns-and-refunds' },
    ];

    const legalLinks = [
        { title: 'Privacy Policy', href: '/help/privacy-policy' },
        { title: 'Terms & Conditions', href: '/help/terms' },
    ];

    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main footer content */}
                <div className="py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand section */}
                        <div>
                            <div className="mb-4">
                                <Image
                                    src="/transparent-logo-light.png"
                                    alt="Fincart Logo"
                                    width={120}
                                    height={42}
                                    className="lg:h-10 md:h-6 h-6 w-auto"
                                />
                            </div>
                            <p className="text-gray-400 text-base max-w-md">
                                Your trusted marketplace for premium ornamental fish and aquatic plants. 
                                Bringing the beauty of aquatic life to your home.
                            </p>
                        </div>

                        {/* Help section */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                Help & Support
                            </h3>
                            <ul className="space-y-3">
                                {helpLinks.map((link) => (
                                    <li key={link.title}>
                                        <Link 
                                            href={link.href} 
                                            className="text-gray-400 hover:text-white text-sm transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact section */}
                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                                Contact
                            </h3>
                            <div className="space-y-3 text-sm text-gray-400 mb-6">
                                <p>fincarts.services@gmail.com</p>
                            </div>
                            
                            {/* Social Links */}
                            <div>
                                <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
                                <div className="flex space-x-4">
                                    <Link 
                                        href="https://instagram.com/fincarts" 
                                        className="text-gray-400 hover:text-white transition-colors"
                                        aria-label="Follow us on Instagram"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IoLogoInstagram className='h-5 w-5' />
                                    </Link>
                                    
                                    <Link 
                                        href="https://youtube.com/" 
                                        className="text-gray-400 hover:text-white transition-colors"
                                        aria-label="Subscribe to our YouTube channel"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </Link>
                                    
                                    <Link 
                                        href="https://facebook.com/" 
                                        className="text-gray-400 hover:text-white transition-colors"
                                        aria-label="Follow us on Facebook"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="border-t border-gray-800 py-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2025 Fincarts. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            {legalLinks.map((link) => (
                                <Link 
                                    key={link.title}
                                    href={link.href} 
                                    className="text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;