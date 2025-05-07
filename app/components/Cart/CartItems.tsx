'use client'

import { CartItem } from '@/app/types/cart/type'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { roboto } from '../Fonts/Fonts'
import { useMutation } from '@tanstack/react-query'
import { deleteCartItem, editCartItem } from '@/app/services/authServices'

type Props = {
    cartItems: CartItem[],
    setCartItems: (cartItems: CartItem[]) => void
}

const CartItems: FC<Props> = ({ cartItems, setCartItems }) => {
    // Track original quantities to compare with current values
    const [originalQuantities, setOriginalQuantities] = useState<Record<string, number>>({});
    // Track which items have update buttons visible
    const [itemsToUpdate, setItemsToUpdate] = useState<Record<string, boolean>>({});

    // Initialize original quantities when cart items load
    useEffect(() => {
        const quantities: Record<string, number> = {};
        cartItems.forEach(item => {
            quantities[item.fish_listings.id] = item.quantity;
        });
        setOriginalQuantities(quantities);
    }, [cartItems]);

    const deleteMutation = useMutation({
        mutationFn: deleteCartItem,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log('Delete item from cart error : ', err);
        }
    });

    const editMutation = useMutation({
        mutationFn: editCartItem,
        onSuccess: (data) => {
            console.log('Cart item updated successfully:', data);
        },
        onError: (err) => {
            console.log('Update item in cart error : ', err);
        }
    });

    // Update quantity handler
    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        // Update cart items state
        setCartItems(cartItems.map(item =>
            item.fish_listings.id === id ? { ...item, quantity: newQuantity } : item
        ));

        // Check if the new quantity is different from original
        const shouldShowUpdate = newQuantity !== originalQuantities[id];
        
        // Update the items that need update buttons
        setItemsToUpdate(prev => ({
            ...prev,
            [id]: shouldShowUpdate
        }));
    };

    // Handle update button click
    const handleUpdate = (item: CartItem) => {
        const cartItem = {
            id: item?.id,
            quantity: item.quantity
        }
        setItemsToUpdate({})
        editMutation.mutate(cartItem);
    };

    // Remove item handler
    const removeItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
        deleteMutation.mutate(id);
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
                                    src={item.fish_listings.images[0]}
                                    alt={item.fish_listings.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <div>
                                        <h3 className="text-base font-medium text-gray-800">{item.fish_listings.name}</h3>
                                        <div className="mt-1 flex text-sm text-gray-500">
                                            <p>{item.fish_listings.breed}</p>
                                            <span className="mx-1">·</span>
                                            <p>Size: {item.fish_listings.size}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 sm:mt-0">
                                        <p className={`text-base font-medium text-gray-800 ${roboto.className}`}>
                                            ₹{(Number(item.fish_listings.price) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <div className='flex gap-4'>
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                type="button"
                                                className="p-2 text-gray-600 hover:text-gray-700"
                                                onClick={() => updateQuantity(item.fish_listings.id, item.quantity - 1)}
                                            >
                                                <FiMinus className="h-4 w-4" />
                                            </button>
                                            <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
                                            <button
                                                type="button"
                                                className="p-2 text-gray-600 hover:text-gray-700"
                                                onClick={() => updateQuantity(item.fish_listings.id, item.quantity + 1)}
                                            >
                                                <FiPlus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        {itemsToUpdate[item.fish_listings.id] && (
                                            <button 
                                                className='bg-green-600 px-3 py-1 rounded-md text-white'
                                                onClick={() => handleUpdate(item)}
                                                disabled={editMutation.isPending}
                                            >
                                                {editMutation.isPending ? 'Updating...' : 'Update'}
                                            </button>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="text-gray-500 hover:text-red-500 flex items-center"
                                        onClick={() => removeItem(item.id)}
                                        disabled={deleteMutation.isPending}
                                    >
                                        <FiTrash2 className="h-4 w-4 mr-1" />
                                        <span className="text-sm">
                                            {deleteMutation.isPending ? 'Removing...' : 'Remove'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartItems;