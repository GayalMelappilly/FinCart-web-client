'use client'

import { FishListing } from '@/app/types/list/fishList'
import { CreditCard, Heart, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { FC, useState } from 'react'

type Props = {
    fish: FishListing | undefined
}

const FishInfo: FC<Props> = ({ fish }) => {

    const params = useParams();
    const id = params?.id as string;


    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        if (fish && quantity < fish.quantityAvailable) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = () => {
        // Logic to add the fish to the cart would go here
        console.log(`Added ${quantity} ${fish?.name} to cart`);
        // Navigate to cart page or show confirmation
    };

    const addToWishlist = () => {
        // Logic to add the fish to the wishlist would go here
        console.log(`Added ${fish?.name} to wishlist`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{fish?.name}</h1>
            {/* <p className="text-gray-500 italic mb-4">{fish.scientificName}</p> */}

            <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                    {/* {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            fill={i < Math.floor(fish?.avgRating) ? "currentColor" : "none"}
                            className={i < Math.floor(fish?.avgRating) ? "" : "text-gray-300"}
                        />
                    ))} */}
                </div>
                <span className="ml-2 text-gray-600">{fish?.avgRating} ({fish?.reviewCount} reviews)</span>
            </div>

            <div className="text-2xl font-bold text-blue-600 mb-6">₹{Number(fish?.price).toFixed(2)}</div>

            <p className="text-gray-700 mb-6">{fish?.description}</p>

            <div className="flex items-center mb-6">
                <span className="mr-2 text-gray-700">Availability:</span>
                <span className={`font-medium ${fish && fish?.quantityAvailable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fish && fish?.quantityAvailable > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {fish &&fish?.quantityAvailable > 0 && (
                    <span className="ml-2 text-gray-500">({fish?.quantityAvailable} available)</span>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex border border-gray-300 rounded-md">
                    <button
                        onClick={decrementQuantity}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <div className="flex items-center text-black justify-center w-12 border-l border-r border-gray-300">
                        {quantity}
                    </div>
                    <button
                        onClick={incrementQuantity}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                        disabled={fish && quantity >= fish.quantityAvailable}
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={addToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 text-lg font-semibold rounded-md transition-colors flex items-center justify-center"
                >
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                </button>

                <Link
                    href={`${id}/checkout`}
                    className="gap-2 rounded-md bg-amber-500/80 hover:bg-amber-500 px-6 py-3 text-white text-lg font-semibold transition-colors flex items-center justify-center"
                >
                    <CreditCard size={20} className="text-white" />
                    Buy Now
                </Link>

                <button
                    onClick={addToWishlist}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors"
                >
                    <Heart size={20} />
                </button>
            </div>

            {/* Shipping & Guarantee */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-start">
                    <Truck size={18} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                        <p className="text-gray-700 font-medium">Fast Shipping</p>
                        <p className="text-gray-500 text-sm">Delivered in special insulated containers</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <ShieldCheck size={18} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                        <p className="text-gray-700 font-medium">Live Arrival Guarantee</p>
                        <p className="text-gray-500 text-sm">Replacement or refund if fish arrive unhealthy</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FishInfo