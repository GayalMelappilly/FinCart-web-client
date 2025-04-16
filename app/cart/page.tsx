'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { CartItem, Items } from '../datasets/cartItems';
import OrderSummary from '../components/Cart/OrderSummary';
import RelatedProducts from '../components/Cart/RelatedProducts';
import CartItems from '../components/Cart/CartItems';
import CartIsEmpty from '../components/Cart/CartIsEmpty';
import ContinueShoppingButton from '../components/ContinueShoppingButton/ContinueShoppingButton';

const Page: React.FC = () => {

    const items = Items
    const [cartItems, setCartItems] = useState<CartItem[]>(items);

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
                        {cartItems.length > 0 ? (
                            <CartItems cartItems={cartItems} setCartItems={setCartItems} />
                        ) : (
                            <CartIsEmpty />
                        )}
                    </div>
                    <OrderSummary cartItems={cartItems}/>
                </div>
                <RelatedProducts cartItems={cartItems} />
            </main>

            <Footer />
        </div>
    );
};

export default Page;