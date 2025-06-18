import { FishListing } from '@/app/types/list/fishList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import { Heart, ShoppingCart, Award, Star } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { addToCart, addToCartGuest, addToWishlist } from '@/app/services/authServices';
import { useToast } from '@/app/providers/ToastProvider';
import { CartItem } from '@/app/types/user/type';

type Props = {
    fish: FishListing,
    isFeatured?: boolean
}

const FishCard: FC<Props> = ({ fish, isFeatured }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isGuest, setIsGuest] = useState(false)
    const router = useRouter();

    // Check if fish is featured (either from prop or fish.isFeatured)
    const isFeatureFish = isFeatured || fish.isFeatured;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsGuest(localStorage.getItem('guest') == 'true' ? true : false)
        }
    }, []);

    console.log('fish details : ', fish)

    const { showToast } = useToast()

    const mutation = useMutation({
        mutationFn: addToWishlist,
        onSuccess: (data) => {
            showToast('success', 'Item added to wishlist')
            console.log(data)
        },
        onError: (err) => {
            showToast('error', 'Failed to add item to wishlist')
            console.log('Error adding to wishlist : ', err)
        }
    });

    const cartMutation = useMutation({
        mutationFn: addToCart,
        onSuccess: (data) => {
            showToast('success', 'Item added to cart')
            console.log(data)
        },
        onError: (err) => {
            showToast('error', 'Failed to add item to cart')
            console.log('User profile error : ', err)
        }
    })

    const guestCartMutation = useMutation({
        mutationFn: addToCartGuest,
        onSuccess: (data) => {
            const newItem = data.data;

            if (typeof window !== 'undefined') {
                try {
                    // Get existing cart items or initialize empty array
                    const existingCart = JSON.parse(localStorage.getItem('guestCartItems') || '[]');

                    // Find if item already exists in cart
                    const existingItemIndex = existingCart.findIndex(
                        (cartItem: CartItem) => cartItem.fishListingId === newItem.fishListingId
                    );

                    let updatedCart;

                    if (existingItemIndex !== -1) {
                        // Item exists - update quantity
                        updatedCart = existingCart.map((cartItem: CartItem, index: string) =>
                            index === existingItemIndex
                                ? { ...cartItem, quantity: cartItem.quantity + newItem.quantity }
                                : cartItem
                        );

                        console.log(`Updated quantity for ${newItem.fishListings.breed}. New quantity: ${updatedCart[existingItemIndex].quantity}`);
                    } else {
                        // Item doesn't exist - add new item
                        updatedCart = [...existingCart, newItem];
                        console.log(`Added new item to cart: ${newItem.fishListings.breed}`);
                    }

                    // Update localStorage with the updated cart
                    localStorage.setItem('guestCartItems', JSON.stringify(updatedCart));

                    console.log("Updated cart items:", updatedCart);

                } catch (error) {
                    console.error('Error updating cart:', error);
                    showToast('error', 'Failed to update cart');
                    return;
                }
            }

            showToast('success', 'Item added to cart');
            console.log('Cart operation successful:', data);
        },
        onError: (err) => {
            showToast('error', 'Failed to add item to cart');
            console.error('Guest cart mutation error:', err);
        }
    });

    const HandleClick = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedFish', JSON.stringify(fish))
        }
        router.push(`/fish/${fish.id}`);
    }

    const HandleAddToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
            mutation.mutate(fish.id)
        } catch (err) {
            console.log('Error while adding item to wishlist', err)
        }
    }

    const HandleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
            const item = {
                fishId: fish?.id,
                quantity: 1
            }
            const isGuest = typeof window !== 'undefined' ? localStorage.getItem('guest') : false
            if (isGuest == 'true') {
                guestCartMutation.mutate(item)
            } else {
                cartMutation.mutate(item)
            }
        } catch (err) {
            console.log('Error while adding item to wishlist', err)
        }
    }

    const PlaceholderImage = () => (
        <div className={`flex items-center justify-center w-full h-full rounded-t-xl ${
            isFeatureFish 
                ? 'bg-gradient-to-br from-amber-50 to-yellow-50' 
                : 'bg-gray-100'
        }`}>
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
        </div>
    );

    return (
        <div
            onClick={HandleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group w-full h-full cursor-pointer transform transition-all duration-300 active:scale-95 relative 
                    hover:scale-102
            `}
        >
            {/* Premium Glow Effect for Featured Fish */}
            {isFeatureFish && (
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-xl opacity-20 group-hover:opacity-40 transition-all duration-500 ${
                    isHovered ? 'animate-pulse' : ''
                }`}></div>
            )}

            {/* Main Card Container */}
            <div className={`relative rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
                isFeatureFish 
                    ? 'bg-gradient-to-br from-white via-amber-50/30 to-white' 
                    : 'bg-white shadow hover:shadow-lg border border-gray-100'
            }`}>

                {/* Image container with improved height scaling */}
                <div className={`h-36 xs:h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden relative ${
                    isFeatureFish ? 'bg-gradient-to-br from-amber-50 to-yellow-50' : ''
                }`}>
                    {fish.images && fish.images.length > 0 ? (
                        <div className="w-full h-full relative">
                            {/* Heart button - improved for mobile */}
                            {!isGuest && (
                                <button
                                    className={`absolute top-3 right-3 backdrop-blur-sm transition-all duration-200 rounded-full p-2 z-10 shadow-sm transform ${
                                        isFeatureFish 
                                            ? 'bg-amber-100/90 text-amber-700 hover:text-red-500 hover:bg-white/90' 
                                            : 'bg-white/90 text-gray-700 hover:text-red-500'
                                    } ${isHovered ? 'opacity-100 scale-105' : 'opacity-80'}`}
                                    aria-label="Add to favorites"
                                    onClick={HandleAddToWishlist}
                                >
                                    <Heart size={18} className={`transition-all duration-300 ${mutation.isSuccess ? 'text-red-500 fill-red-500' : ''}`} />
                                </button>
                            )}

                            <Image
                                src={fish.images[0]}
                                alt={fish.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                className={`object-cover object-center transition-transform duration-500 ease-out ${
                                    isHovered ? 'scale-110' : 'scale-100'
                                }`}
                                onError={(e) => {
                                    const target = e.target;
                                    if (target instanceof HTMLImageElement) {
                                        target.onerror = null;
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                            target.parentElement.classList.add(isFeatureFish ? 'bg-gradient-to-br from-amber-50 to-yellow-50' : 'bg-gray-100');
                                            const placeholder = document.createElement('div');
                                            placeholder.className = "flex items-center justify-center w-full h-full";
                                            placeholder.innerHTML = `<svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>`;
                                            target.parentElement.appendChild(placeholder);
                                        }
                                    }
                                }}
                            />

                            {/* Enhanced gradient overlay */}
                            <div className={`absolute inset-0 transition-opacity duration-300 ${
                                isHovered ? 'opacity-100' : 'opacity-0'
                            } ${
                                isFeatureFish 
                                    ? 'bg-gradient-to-t from-amber-900/20 to-transparent' 
                                    : 'bg-gradient-to-t from-black/30 to-transparent'
                            }`}></div>
                        </div>
                    ) : (
                        <PlaceholderImage />
                    )}

                    {/* Standard Featured badge - improved mobile visibility */}
                    {isFeatureFish && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Award size={12} />
                            <span>Featured</span>
                        </div>
                    )}
                </div>

                {/* Content section with better responsive spacing */}
                <div className={`p-3 xs:p-4 flex flex-col flex-grow ${
                    isFeatureFish ? 'bg-gradient-to-br from-white via-amber-50/20 to-white' : ''
                }`}>
                    <div className="mb-1.5">
                        <h3 className={`font-semibold text-sm xs:text-base sm:text-lg line-clamp-1 transition-colors ${
                            isFeatureFish 
                                ? 'text-gray-900 group-hover:text-amber-800' 
                                : 'text-gray-800'
                        }`}>
                            {fish.name}
                        </h3>
                        <p className={`text-xs sm:text-sm line-clamp-1 ${
                            isFeatureFish ? 'text-amber-700 font-medium' : 'text-gray-500'
                        }`}>
                            {fish.breed}
                        </p>
                    </div>

                    {/* Rating and Price - improved mobile alignment */}
                    <div className="mt-auto pt-1.5">
                        <div className="flex items-center justify-between">
                            {/* Star rating - enhanced for featured fish */}
                            <div className="flex items-center space-x-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3 h-3 xs:w-3.5 xs:h-3.5 ${
                                            i < Math.round(fish.avgRating) 
                                                ? (isFeatureFish ? 'text-amber-400 fill-amber-400' : 'text-yellow-400 fill-yellow-400')
                                                : 'text-gray-200 fill-gray-200'
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Price - enhanced styling for featured fish */}
                            <div className={`font-bold text-sm xs:text-base transition-colors ${
                                isFeatureFish 
                                    ? 'text-amber-800 px-2 py-1 rounded-md' 
                                    : 'text-gray-800'
                            }`}>
                                ₹{Number(fish.price).toFixed(2)}
                            </div>
                        </div>

                        {/* Add to cart button - enhanced for featured fish */}
                        <button
                            className={`mt-2.5 w-full py-2 xs:py-2.5 rounded-lg text-xs xs:text-sm font-medium transition-all duration-300 
                            flex items-center justify-center shadow-sm hover:shadow group cursor-pointer ${
                                isFeatureFish 
                                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white' 
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                            }`}
                            onClick={HandleAddToCart}
                        >
                            <ShoppingCart size={16} className="mr-1.5 group-hover:animate-pulse" />
                             Add to Cart
                        </button>
                    </div>
                </div>

                {/* Subtle shine effect for featured fish */}
                {isFeatureFish && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
                )}
            </div>
        </div>
    )
}

export default FishCard