'use client'

import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { roboto } from '../Fonts/Fonts'
import { useMutation } from '@tanstack/react-query'
import { deleteCartItem, editCartItem } from '@/app/services/authServices'
import { CartItem } from '@/app/types/user/type'
import { useToast } from '@/app/providers/ToastProvider'

type Props = {
    cartItems: CartItem[],
    setCartItems: (cartItems: CartItem[]) => void
}

const CartItems: FC<Props> = ({ cartItems, setCartItems }) => {
    const [originalQuantities, setOriginalQuantities] = useState<Record<string, number>>({});
    const [itemsToUpdate, setItemsToUpdate] = useState<Record<string, boolean>>({});
    const [isGuest, setIsGuest] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    const { showToast } = useToast()

    // Initialize original quantities when cart items load
    useEffect(() => {
        if (!cartItems || cartItems.length === 0) return;

        if (typeof window !== 'undefined') {
            setIsGuest(localStorage.getItem('guest') ? true : false)
        }

        const quantities: Record<string, number> = {};
        cartItems.forEach(item => {
            quantities[item.fishListings.id] = item.quantity;
        });
        setOriginalQuantities(quantities);
    },[]);

    const deleteMutation = useMutation({
        mutationFn: deleteCartItem,
        onSuccess: (data) => {
            showToast('success', 'Removed item from cart')
            console.log(data);
        },
        onError: (err) => {
            console.log('Delete item from cart error : ', err);
            showToast('error', 'Failed to remove item from cart')
        }
    });

    const editMutation = useMutation({
        mutationFn: editCartItem,
        onSuccess: (data) => {
            showToast('success', 'Quantity updated')
            console.log('Cart item updated successfully:', data);
        },
        onError: (err) => {
            console.log('Update item in cart error : ', err);
            showToast('error', 'Failed to update quantity')
        }
    });

    // Update quantity handler
    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        // Update cart items state
        setCartItems(cartItems.map(item =>
            item.fishListings.id === id ? { ...item, quantity: newQuantity } : item
        ));

        // Check if the new quantity is different from original
        const shouldShowUpdate = newQuantity !== originalQuantities[id];
        console.log(shouldShowUpdate, newQuantity, originalQuantities[id])
        setShowUpdate(shouldShowUpdate)
        
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
        console.log(cartItem, cartItems)
        setItemsToUpdate({})
        const itemToUpdate = cartItems.find(item => item.id == cartItem.id)
        if(itemToUpdate) itemToUpdate.quantity = cartItem.quantity
        console.log(cartItems)
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
                                    src={item.fishListings.images[0]}
                                    alt={item.fishListings.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <div>
                                        <h3 className="text-base font-medium text-gray-800">{item.fishListings.name}</h3>
                                        <div className="mt-1 flex text-sm text-gray-500">
                                            <p>{item.fishListings.breed}</p>
                                            <span className="mx-1">·</span>
                                            <p>Size: {item.fishListings.size}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 sm:mt-0">
                                        <p className={`text-base font-medium text-gray-800 ${roboto.className}`}>
                                            ₹{(Number(item.fishListings.price) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <div className='flex gap-4'>
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                type="button"
                                                className="p-2 text-gray-600 hover:text-gray-700"
                                                onClick={() => updateQuantity(item.fishListings.id, item.quantity - 1)}
                                            >
                                                <FiMinus className="h-4 w-4" />
                                            </button>
                                            <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
                                            <button
                                                type="button"
                                                className="p-2 text-gray-600 hover:text-gray-700"
                                                onClick={() => updateQuantity(item.fishListings.id, item.quantity + 1)}
                                            >
                                                <FiPlus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        {itemsToUpdate[item.fishListings.id] && showUpdate && (
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