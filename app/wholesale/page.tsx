'use client'

import React, { useState, useEffect } from 'react';
// import {
//     User,
//     MapPin,
//     Phone,
//     Mail,
//     Edit2,
//     ShoppingBag,
//     Heart,
//     Award,
//     Camera
// } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';
import Spinner from '../components/LoadingSpinner/Spinner';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
// import BackButton from '../components/BackButton/BackButton';
import { UserType } from '../types/user/type';
import WholesaleSection from '../components/Wholesale/WholesaleSection';

const Page = () => {
    // const [activeTab, setActiveTab] = useState('overview');
    // const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // const [ordersCount, setOrderCount] = useState<number | null>()
    // const [wishlistCount, setWishlistCount] = useState<number | null>()

    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : ''
    //   if(userData) console.log(JSON.parse(userData))

    useEffect(() => {
        try {
            setIsLoading(true);
            if (userData) {
                // setUser(JSON.parse(userData))
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err)
            setIsLoading(false);
        }
    }, [userData]);

    // useEffect(() => {
    //     setOrderCount(user?.orders.length)
    //     setWishlistCount(user?.wishlists.length)
    // }, [user])

    if (isLoading) (<Spinner />)

    // const formatDate = (date: Date | undefined) => {
    //     if (!date) return 'N/A';
    //     return new Date(date).toLocaleDateString('en-US', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric'
    //     });
    // };

    return (
        <>
            <Header />
            <WholesaleSection />
            <Footer />
        </>
    );
};

export default Page;