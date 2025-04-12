'use client'

import { CartItem } from '@/app/datasets/cartItems'
import Image from 'next/image'
import React, { FC } from 'react'

type Props = {
    cartItems: CartItem[]
}

const RelatedProducts:FC<Props> = ({cartItems}) => {
    return (
        <>
            {cartItems.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-xl font-medium text-gray-800 mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="relative h-48 bg-gray-100">
                                    <Image
                                        src={`/api/placeholder/300/200`}
                                        alt="Product image"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-800 truncate">Guppy - Fancy Mix</h3>
                                    <p className="text-sm text-gray-500 mt-1">Poecilia reticulata</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="font-semibold text-teal-600">$8.99</span>
                                        <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default RelatedProducts