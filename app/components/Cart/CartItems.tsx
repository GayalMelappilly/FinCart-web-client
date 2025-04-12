'use client'

import { CartItem } from '@/app/datasets/cartItems'
import Image from 'next/image'
import React, { FC } from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

type Props = {
    cartItems: CartItem[],
    setCartItems: (cartItems: CartItem[]) => void
}

const CartItems:FC<Props> = ({cartItems, setCartItems}) => {

    // Update quantity handler
    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    // Remove item handler
    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Cart header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">Cart Items ({cartItems.length})</h2>
                </div>
            </div>

            {/* Cart items list */}
            <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex-shrink-0 relative h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <div>
                                        <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
                                        <div className="mt-1 flex text-sm text-gray-500">
                                            <p>{item.species}</p>
                                            <span className="mx-1">·</span>
                                            <p>Size: {item.size}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 sm:mt-0">
                                        <p className="text-base font-medium text-gray-800">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            type="button"
                                            className="p-2 text-gray-600 hover:text-gray-700"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <FiMinus className="h-4 w-4" />
                                        </button>
                                        <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
                                        <button
                                            type="button"
                                            className="p-2 text-gray-600 hover:text-gray-700"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <FiPlus className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="text-gray-500 hover:text-red-500 flex items-center"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <FiTrash2 className="h-4 w-4 mr-1" />
                                        <span className="text-sm">Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CartItems