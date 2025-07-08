import Image from 'next/image'
import React from 'react'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'

const RecentlyViewed = () => {
    return (
        <div className="mt-12">
            <h2 className="text-xl font-medium text-gray-800 mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="relative h-40 bg-gray-100">
                            <Image
                                src={`/api/placeholder/300/200`}
                                alt="Product image"
                                layout="fill"
                                objectFit="cover"
                            />
                            <button
                                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-red-600 hover:bg-red-100 transition-colors"
                                aria-label="Add to wishlist"
                            >
                                <FiHeart />
                            </button>
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-gray-800 text-sm truncate">Guppy - Fancy Mix</h3>
                            <div className="mt-1 flex justify-between items-center">
                                <span className="font-semibold text-gray-800 text-sm">₹8.99</span>
                                <button className="text-xs bg-blue-600 p-2 rounded-md text-white hover:bg-blue-700 font-medium flex">
                                    <FiShoppingCart className="mr-1 h-4 w-4" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentlyViewed