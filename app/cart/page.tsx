'use client'

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import OrderSummary from '../components/Cart/OrderSummary';
// import RelatedProducts from '../components/Cart/RelatedProducts';
import CartIsEmpty from '../components/Cart/CartIsEmpty';
import ContinueShoppingButton from '../components/ContinueShoppingButton/ContinueShoppingButton';
import CartItems from '../components/Cart/CartItems';
import Spinner from '../components/LoadingSpinner/Spinner';
import { CartItem } from '../types/user/type';

const Page: React.FC = () => {

    const [cartItems, setCartItems] = useState<CartItem[]>();
    const [isLoading, setIsLoading] = useState(true);
    // const [ordersCount, setOrderCount] = useState<number | null>()
    // const [wishlistCount, setWishlistCount] = useState<number | null>()

    
    useEffect(() => {
        try {
            const storageData = typeof window !== 'undefined' ? localStorage.getItem('user') : ''
            const userData = storageData ? JSON.parse(storageData) : ''
            setIsLoading(true);
            if (userData) {
                setCartItems(userData.shoppingCarts[0].cartItems)
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err)
            setIsLoading(false);
        }
    }, []);

    if(isLoading) return (<Spinner />)

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Your Cart | Fincart</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <ContinueShoppingButton />

            <main className="container mx-auto px-4 md:px-30 py-8 mb-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart items */}
                    <div className="w-full lg:w-8/12">
                        {cartItems && cartItems.length > 0 ? (
                            <CartItems cartItems={cartItems} setCartItems={setCartItems} />
                        ) : (
                            <CartIsEmpty />
                        )}
                    </div>
                    {cartItems && <OrderSummary cartItems={cartItems} /> }
                </div>
                {/* <RelatedProducts cartItems={cartItems} /> */}
            </main>

            <Footer />
        </div>
    );
};

export default Page;