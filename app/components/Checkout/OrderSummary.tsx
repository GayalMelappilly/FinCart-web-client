'use client'

import { FishListing } from '@/app/types/list/fishList';
import React, { FC, useEffect, useState } from 'react'
import Spinner from '../LoadingSpinner/Spinner';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { roboto } from '../Fonts/Fonts';

type Props = {
    orderSummary: FishListing | undefined,
    setOrderSummary: (orderSummary: FishListing | undefined) => void,
    quantity: number,
    setQuantity: (quantity: number) => void,
}

export const OrderSummary:FC<Props> = ({orderSummary, setOrderSummary, quantity, setQuantity}) => {
    const [isLoading, setIsLoading] = useState(true);

    const url = useParams()
    const decoded = decodeURIComponent(url?.id as string)
    const valueAfterAmp = decoded.split('&')[1];

    const price = orderSummary && orderSummary.price && (Number(orderSummary?.price/10))

    useEffect(() => {
        setIsLoading(true);

        const data = typeof window !== 'undefined' ? localStorage.getItem('selectedFish') : ""
        
        if (data) {
            try {
                setOrderSummary(JSON.parse(data));
                setQuantity(Number(valueAfterAmp))
            } catch (error) {
                console.error('Failed to decode fish data from URL:', error);
            }
        }
        
        setIsLoading(false);
    }, [valueAfterAmp]);
    console.log(orderSummary ? orderSummary : "None")

    if (isLoading) return <Spinner />

    return (
        <div className="mt-8 lg:mt-0">
            <div className="bg-white border border-zinc-300 rounded-md p-6">
                <h2 className="text-xl font-semibold mb-6 text text-gray-800">Order summary</h2>

                {/* Order Items */}
                {/* {orderDetails.items.map((item) => ( */}
                <div key={orderSummary?.id} className="flex mb-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-md flex-shrink-0">
                        <Image
                            className="w-full h-full bg-cover bg-center rounded-md"
                            src={orderSummary?.images[0] as string}
                            alt="fish-image"
                            width={800} // Or any max width you expect
                            height={0}  // Let it auto-scale height based on aspect
                        />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-black font-medium">{orderSummary?.name}</h3>
                        <p className="text-gray-600">₹{price?.toFixed(2)}</p>
                        <p className="text-gray-500">Quantity: {quantity}</p>
                    </div>
                </div>
                {/* ))} */}

                {/* Order Calculations */}
                <div className="border-t border-zinc-300 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal : {price} x {quantity}</span>
                        { orderSummary && <span className={`font-medium text-black ${roboto.className}`}>₹{price && price * quantity}</span> }
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
                            { orderSummary && <span className={`font-medium text-black ${roboto.className}`}>₹{price && (price * quantity).toFixed(2)}</span> }
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">To be paid</span>
                            { orderSummary && <span className={`font-medium text-black ${roboto.className}`}>₹{price && (price * quantity).toFixed(2)}</span> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}