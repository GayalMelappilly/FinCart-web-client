'use client'

import React, { useState, useEffect } from 'react';
import {
    User,
    MapPin,
    Phone,
    Mail,
    Edit2,
    ShoppingBag,
    Heart,
    Award,
    Camera
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from '../components/LoadingSpinner/Spinner';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import BackButton from '../components/BackButton/BackButton';
import { UserType } from '../types/user/type';

const Page = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [ordersCount, setOrderCount] = useState<number | null>()
    const [wishlistCount, setWishlistCount] = useState<number | null>()

    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : ''
    //   if(userData) console.log(JSON.parse(userData))

    useEffect(() => {
        try {
            setIsLoading(true);
            if (userData) {
                setUser(JSON.parse(userData))
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err)
            setIsLoading(false);
        }
    }, [userData]);

    useEffect(() => {
        setOrderCount(user?.orders.length)
        setWishlistCount(user?.wishlists.length)
    }, [user])

    if (isLoading) (<Spinner />)

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
        <Header />
        <BackButton />
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-32"></div>
                        <div className="px-6 pb-6">
                            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-4">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                                        {user && user.profilePictureUrl ? (
                                            <Image
                                                src={user.profilePictureUrl}
                                                alt={user.fullName}
                                                width={128}
                                                height={128}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <User size={48} className="text-gray-400" />
                                            </div>
                                        )}
                                        <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition">
                                            <Camera size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
                                            <p className="text-gray-500 flex items-center mt-1">
                                                <Mail size={16} className="mr-2" />
                                                {user?.email}
                                                {user?.emailVerified && (
                                                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                                        Verified
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <button className="mt-3 md:mt-0 flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                                            <Edit2 size={16} className="mr-2" />
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="w-full lg:w-1/3">
                            {/* Profile Stats */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Account Info</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-3 rounded-full">
                                                <User size={20} className="text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm text-gray-500">Member Since</p>
                                                {user?.createdAt && <p className="font-medium">{formatDate(new Date(user?.createdAt))}</p> }
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-3 rounded-full">
                                                <Phone size={20} className="text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm text-gray-500">Phone Number</p>
                                                <p className="font-medium flex items-center">
                                                    {user?.phoneNumber || 'Not provided'}
                                                    {user?.phoneVerified && (
                                                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                                            Verified
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-3 rounded-full">
                                                <Award size={20} className="text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm text-gray-500">Reward Points</p>
                                                <p className="font-medium">{user?.pointsBalance} points</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                                    <nav className="space-y-2">
                                        <Link href="/orders" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition">
                                            <ShoppingBag size={20} className="text-blue-600 mr-3" />
                                            <span>My Orders ({ordersCount})</span>
                                        </Link>
                                        <Link href="/wishlist" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition">
                                            <Heart size={20} className="text-blue-600 mr-3" />
                                            <span>Wishlist ({wishlistCount})</span>
                                        </Link>
                                        <Link href="/settings" className="flex items-center p-3 rounded-md hover:bg-gray-50 transition">
                                            <Edit2 size={20} className="text-blue-600 mr-3" />
                                            <span>Account Settings</span>
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="w-full lg:w-2/3">
                            {/* Tab Navigation */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                                <div className="border-b border-gray-200">
                                    <nav className="flex" aria-label="Tabs">
                                        <button
                                            onClick={() => setActiveTab('overview')}
                                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'overview'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            Overview
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('addresses')}
                                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'addresses'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            Addresses
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('security')}
                                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'security'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            Security
                                        </button>
                                    </nav>
                                </div>

                                {/* Tab Content */}
                                <div className="p-6">
                                    {activeTab === 'overview' && (
                                        <div>
                                            <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
                                            <p className="text-gray-600 mb-6">
                                                Welcome back to your AquaTrade account. Manage your fish collection, track orders, and update your profile information.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-medium text-blue-800">Recent Orders</h3>
                                                        <Link href="/orders" className="text-sm text-blue-600 hover:underline">
                                                            View All
                                                        </Link>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        {ordersCount === 0
                                                            ? "You haven't placed any orders yet"
                                                            : `You have placed ${ordersCount} order(s)`}
                                                    </p>
                                                </div>

                                                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-medium text-purple-800">Wishlist</h3>
                                                        <Link href="/wishlist" className="text-sm text-purple-600 hover:underline">
                                                            View All
                                                        </Link>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        {wishlistCount === 0
                                                            ? "Your wishlist is empty"
                                                            : `You have ${wishlistCount} item(s) in your wishlist`}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                                                <h3 className="font-medium text-yellow-800 mb-2">Reward Points</h3>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-gray-700">Current Balance</p>
                                                    <p className="font-bold text-lg">{user?.pointsBalance} points</p>
                                                </div>
                                                <div className="mt-4">
                                                    <Link
                                                        href="/rewards"
                                                        className="text-sm font-medium text-yellow-700 hover:text-yellow-800"
                                                    >
                                                        Learn how to earn and use points →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'addresses' && (
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center">
                                                    <MapPin size={16} className="mr-2" />
                                                    Add New Address
                                                </button>
                                            </div>

                                            {user?.userAddresses && user.userAddresses.length > 0 ? (
                                                <div className="space-y-4">
                                                    {user.userAddresses.map((address) => (
                                                        <div
                                                            key={address.id}
                                                            className="border rounded-lg p-4 relative hover:border-blue-300 transition"
                                                        >
                                                            {address.isDefault && (
                                                                <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                                                    Default
                                                                </span>
                                                            )}
                                                            <h3 className="font-medium">{user.fullName}</h3>
                                                            <p className="text-gray-600 mt-1">{address.addressLine1}</p>
                                                            {address.addressLine2 && (
                                                                <p className="text-gray-600">{address.addressLine2}</p>
                                                            )}
                                                            <p className="text-gray-600">
                                                                {address.city}, {address.state} {address.postalCode}
                                                            </p>
                                                            <p className="text-gray-600">{address.country}</p>

                                                            <div className="mt-4 pt-3 border-t border-gray-100 flex gap-3">
                                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                                    Edit
                                                                </button>
                                                                {!address.isDefault && (
                                                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                                        Set as Default
                                                                    </button>
                                                                )}
                                                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12 border border-dashed rounded-lg">
                                                    <MapPin size={48} className="mx-auto text-gray-400 mb-3" />
                                                    <h3 className="text-lg font-medium text-gray-700 mb-1">No addresses found</h3>
                                                    <p className="text-gray-500 mb-4">Add your first delivery address</p>
                                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                                                        Add Address
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'security' && (
                                        <div>
                                            <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

                                            <div className="space-y-6">
                                                <div className="border-b pb-6">
                                                    <h3 className="text-lg font-medium mb-2">Email Address</h3>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-gray-600">{user?.email}</p>
                                                            <div className="mt-1">
                                                                {user?.emailVerified ? (
                                                                    <span className="text-green-600 text-sm flex items-center">
                                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>
                                                                        Verified
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-yellow-600 text-sm">Not Verified</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                            Change
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="border-b pb-6">
                                                    <h3 className="text-lg font-medium mb-2">Phone Number</h3>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-gray-600">{user?.phoneNumber || 'Not provided'}</p>
                                                            <div className="mt-1">
                                                                {user?.phoneVerified ? (
                                                                    <span className="text-green-600 text-sm flex items-center">
                                                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>
                                                                        Verified
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-yellow-600 text-sm">
                                                                        {user?.phoneNumber ? 'Not Verified' : ''}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                            {user?.phoneNumber ? 'Change' : 'Add'}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-medium mb-2">Password</h3>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-gray-600">••••••••••</p>
                                                            <p className="text-sm text-gray-500">Last updated 3 months ago</p>
                                                        </div>
                                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                            Change Password
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;