'use client'

import React, { FC, useEffect, useState } from 'react'
// import Spinner from '../LoadingSpinner/Spinner';
// import { useParams } from 'next/navigation';
import Image from 'next/image';
import { roboto } from '../Fonts/Fonts';
import { CartItem } from '@/app/types/user/type';

type Props = {
    cartItems: CartItem[] | null
    // orderSummary: FishListing | undefined,
    // setOrderSummary: (orderSummary: FishListing | undefined) => void,
    // quantity: number,
    // setQuantity: (quantity: number) => void,
}

export const CartOrderSummary: FC<Props> = ({
    cartItems
    // orderSummary, setOrderSummary, quantity, setQuantity
}) => {
    // const [isLoading, setIsLoading] = useState(false);
    const [totalProductPrice, setTotalProductPrice] = useState<number>(1)

    // const url = useParams()
    // const decoded = decodeURIComponent(url?.id as string)
    // const valueAfterAmp = decoded.split('&')[1];

    // const price = orderSummary && orderSummary.price && (Number(orderSummary?.price))

    useEffect(() => {
        if (!cartItems) return;

        let total = 0;

        cartItems.forEach((item: CartItem) => {
            const itemPrice = Number(item.fishListings.price) * Number(item.quantity);
            total += itemPrice;
        });

        setTotalProductPrice(total);
        console.log('Final Total Price:', total);
    }, [cartItems]);

    // useEffect(() => {
    //     setIsLoading(true);

    //     const data = typeof window !== 'undefined' ? localStorage.getItem('selectedFish') : ""

    //     if (data) {
    //         try {
    //             setOrderSummary(JSON.parse(data));
    //             setQuantity(Number(valueAfterAmp))
    //         } catch (error) {
    //             console.error('Failed to decode fish data from URL:', error);
    //         }
    //     }

    //     setIsLoading(false);
    // }, [valueAfterAmp]);
    // console.log(orderSummary ? orderSummary : "None")

    console.log('Cart items in os : ', cartItems, totalProductPrice)

    // if (isLoading) return <Spinner />

    return (
        <div className="mt-8 lg:mt-0">
            <div className="bg-white border border-zinc-300 rounded-md p-6">
                <h2 className="text-xl font-semibold mb-6 text text-gray-800">Order summary</h2>

                {/* Order Items */}
                {cartItems?.map((item: CartItem) => (
                    <div key={item?.id} className="flex mb-4">
                        <div className="h-16 w-16 bg-gray-200 rounded-md flex-shrink-0">
                            <Image
                                className="w-full h-full bg-cover bg-center rounded-md"
                                src={item.fishListings.images[0] as string}
                                alt="fish-image"
                                width={800} // Or any max width you expect
                                height={0}  // Let it auto-scale height based on aspect
                            />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-black font-medium">{item.fishListings .name}</h3>
                            <p className="text-gray-600">₹{Number(item.fishListings.price).toFixed(2)}</p>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}

                {/* Order Calculations */}
                <div className="border-t border-zinc-300 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal : {cartItems?.map((item: CartItem, index: number, ) => (
                            <div className='ml-2' key={index}>
                                <p>{item.fishListings.price} x {item.quantity} : {Number(item.fishListings.price) * item.quantity}</p>
                            </div>
                        ))}</span>
                        {cartItems && <span className={`font-medium text-black mt-auto ${roboto.className}`}>₹{totalProductPrice}</span>}
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                        Shipping calculated at checkout
                    </div>

                    {/* Promo Code */}
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors mb-4">
                        Add promo code
                    </button>

                    {/* Total */}
                    <div className="border-t border-zinc-300 pt-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Total</span>
                            {cartItems && <span className={`font-medium text-black ${roboto.className}`}>₹{totalProductPrice.toFixed(2)}</span>}
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">To be paid</span>
                            {cartItems && <span className={`font-medium text-black ${roboto.className}`}>₹{totalProductPrice.toFixed(2)}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}