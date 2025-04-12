import Link from 'next/link'
import React from 'react'
import { FiHeart } from 'react-icons/fi'

type Props = {}

const EmptyWishlist = (props: Props) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex justify-center">
                <FiHeart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="mt-4 text-xl font-medium text-gray-800">Your wishlist is empty</h2>
            <p className="mt-2 text-gray-500">Save items you love and want to revisit later</p>
            <div className="mt-6">
                <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Browse Fish Collection
                </Link>
            </div>
        </div>
    )
}

export default EmptyWishlist