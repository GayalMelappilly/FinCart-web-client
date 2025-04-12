import Link from 'next/link'
import React from 'react'
import { FiShoppingBag } from 'react-icons/fi'

const CartIsEmpty = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex justify-center">
                <FiShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="mt-4 text-xl font-medium text-gray-800">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Explore our collection to add ornamental fish to your cart.</p>
            <div className="mt-6">
                <Link href="/browse" className="btn inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                    Browse Fish Collection
                </Link>
            </div>
        </div>
    )
}

export default CartIsEmpty