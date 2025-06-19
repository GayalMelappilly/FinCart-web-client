'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeaderSkeleton = () => {
    return (
        <header className="bg-white w-screen fixed shadow-lg shadow-black/10 z-50 animate-pulse">
            <div className="container mx-auto py-3 lg:px-10">
                <div className="flex items-center justify-between w-full px-5">
                    {/* Logo and optional menu button */}
                    <div className="flex items-center">
                        {/* Mobile menu button skeleton */}
                        <div className="sm:hidden mr-3">
                            <div className="w-5 h-5 bg-gray-200 rounded"></div>
                        </div>

                        {/* Logo skeleton */}
                        <div className="flex items-center space-x-2">
                            <div className="md:h-5 lg:h-6 h-5 w-24 bg-gray-200 rounded pr-3"></div>
                        </div>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Desktop Search skeleton */}
                        <div className="relative hidden md:block w-48 lg:w-64">
                            <div className="w-full h-9 bg-gray-200 rounded-xl"></div>
                        </div>

                        {/* Sell button skeleton */}
                        <div className="hidden sm:block">
                            <div className="h-9 w-16 md:w-20 bg-gray-200 rounded-lg"></div>
                        </div>

                        {/* Wishlist button skeleton */}
                        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>

                        {/* Cart button skeleton */}
                        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>

                        {/* Profile button skeleton */}
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

// Enhanced skeleton with shimmer effect
const HeaderSkeletonWithShimmer = () => {
    return (
        <header className="bg-white w-screen fixed shadow-lg shadow-black/10 z-50">
            <div className="container mx-auto py-3 lg:px-10">
                <div className="flex items-center justify-between w-full px-5">
                    {/* Logo and optional menu button */}
                    <div className="flex items-center">
                        {/* Mobile menu button skeleton */}
                        <div className="sm:hidden mr-3">
                            <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
                        </div>

                        {/* Logo skeleton */}
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/splash.png"
                                alt="Fincart Logo"
                                className="md:h-5 lg:h-6 h-5 object-contain pr-3"
                                width={150}
                                height={150}
                            />
                        </Link>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Desktop Search skeleton */}
                        <div className="relative hidden md:block w-48 lg:w-64">
                            <div className="w-full h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-xl"></div>
                        </div>

                        {/* Sell button skeleton */}
                        <div className="hidden sm:block">
                            <div className="h-9 w-16 md:w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>
                        </div>

                        {/* Wishlist button skeleton */}
                        <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>

                        {/* Cart button skeleton */}
                        <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>

                        {/* Profile button skeleton */}
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

// Mobile skeleton component
const MobileHeaderSkeleton = () => {
    return (
        <header className="bg-white w-screen fixed shadow-lg shadow-black/10 z-50">
            <div className="container mx-auto py-3 px-4">
                <div className="flex items-center justify-between w-full">
                    {/* Mobile layout - simplified */}
                    <div className="flex items-center space-x-3">
                        {/* Mobile menu button */}
                        <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded sm:hidden"></div>

                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/splash.png"
                                alt="Fincart Logo"
                                className="md:h-5 lg:h-6 h-5 object-contain pr-3"
                                width={150}
                                height={150}
                            />
                        </Link>
                    </div>

                    {/* Mobile right side - fewer items */}
                    <div className="flex items-center space-x-2">
                        {/* Sell button - hidden on very small screens */}
                        <div className="hidden xs:block h-8 w-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg"></div>

                        {/* Cart */}
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>

                        {/* Profile */}
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

// Responsive skeleton that adapts to screen size
const ResponsiveHeaderSkeleton = () => {
    return (
        <>
            {/* Desktop and tablet skeleton */}
            <div className="hidden sm:block">
                <HeaderSkeletonWithShimmer />
            </div>

            {/* Mobile skeleton */}
            <div className="block sm:hidden">
                <MobileHeaderSkeleton />
            </div>
        </>
    )
}

// Advanced skeleton with staggered loading animation
const StaggeredHeaderSkeleton = () => {
    return (
        <header className="bg-white w-screen fixed shadow-lg shadow-black/10 z-50">
            <div className="container mx-auto py-3 lg:px-10">
                <div className="flex items-center justify-between w-full px-5">
                    {/* Logo section with delay */}
                    <div className="flex items-center animate-pulse">
                        <div className="sm:hidden mr-3">
                            <div className="w-5 h-5 bg-gray-200 rounded animation-delay-100"></div>
                        </div>
                        <div className="md:h-5 lg:h-6 h-5 w-24 bg-gray-200 rounded animation-delay-200"></div>
                    </div>

                    {/* Right side with staggered delays */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Search - delay 300ms */}
                        <div className="relative hidden md:block w-48 lg:w-64 animate-pulse animation-delay-300">
                            <div className="w-full h-9 bg-gray-200 rounded-xl"></div>
                        </div>

                        {/* Sell button - delay 400ms */}
                        <div className="hidden sm:block animate-pulse animation-delay-400">
                            <div className="h-9 w-16 md:w-20 bg-gray-200 rounded-lg"></div>
                        </div>

                        {/* Wishlist - delay 500ms */}
                        <div className="animate-pulse animation-delay-500">
                            <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* Cart - delay 600ms */}
                        <div className="animate-pulse animation-delay-600">
                            <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* Profile - delay 700ms */}
                        <div className="animate-pulse animation-delay-700">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderSkeleton
export {
    HeaderSkeletonWithShimmer,
    MobileHeaderSkeleton,
    ResponsiveHeaderSkeleton,
    StaggeredHeaderSkeleton
}