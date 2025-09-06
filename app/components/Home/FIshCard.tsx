import { FishListing } from '@/app/types/list/fishList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import { Heart, ShoppingCart, Award, Star } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { addToCart, addToCartGuest, addToWishlist } from '@/app/services/authServices';
import { useToast } from '@/app/providers/ToastProvider';
import { CartItem } from '@/app/types/user/type';
import { useUserData } from '@/app/context/userDataContext';
import { roboto } from '../Fonts/Fonts';

type Props = {
    fish: FishListing,
    isFeatured?: boolean
}

const FishCard: FC<Props> = ({ fish, isFeatured }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isGuest, setIsGuest] = useState(false)
    const [isWishlisted, setIsWishListed] = useState<boolean>(false)
    const router = useRouter();

    const { userData } = useUserData()

    const isFeatureFish = isFeatured || fish.isFeatured;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsGuest(localStorage.getItem('guest') == 'true' ? true : false)
        }
    }, []);

    useEffect(() => {
        const wishList = userData?.wishlists[0]?.wishlistItems
        const idSet = new Set(wishList?.map(item => item.fishListings.id));
        console.log(wishList, idSet, fish.id)
        const isListed = idSet.has(fish.id)
        setIsWishListed(isListed)
    }, [])

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
        <div className={`flex items-center justify-center w-full h-full rounded-t-xl ${isFeatureFish
            ? 'bg-gradient-to-br from-amber-50 to-yellow-50'
            : 'bg-gray-100'
            }`}>
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-xl opacity-20 group-hover:opacity-40 transition-all duration-500 ${isHovered ? 'animate-pulse' : ''
                    }`}></div>
            )}

            {/* Main Card Container */}
            <div className={`relative rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col ${isFeatureFish
                ? 'bg-gradient-to-br from-white via-amber-50/30 to-white'
                : 'bg-white shadow hover:shadow-lg border border-gray-100'
                }`}>

                {/* Image container with improved mobile optimization */}
                <div className={`h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden relative ${isFeatureFish ? 'bg-gradient-to-br from-amber-50 to-yellow-50' : ''
                    }`}>
                    {fish.images && fish.images.length > 0 ? (
                        <div className="w-full h-full relative">
                            {/* Heart button - optimized for mobile */}
                            {!isGuest && (
                                <button
                                    className={`absolute top-2 right-2 backdrop-blur-sm transition-all duration-200 rounded-full p-1.5 z-20 shadow-sm transform ${isFeatureFish
                                        ? 'bg-amber-100/90 text-amber-700 hover:text-red-500 hover:bg-white/90'
                                        : 'bg-white/90 text-gray-700 hover:text-red-500'
                                        } ${isHovered ? 'opacity-100 scale-105' : 'opacity-90'}`}
                                    aria-label="Add to favorites"
                                    onClick={HandleAddToWishlist}
                                >
                                    <Heart size={16} className={`transition-all duration-300 ${mutation.isSuccess || isWishlisted ? 'text-red-500 fill-red-500' : ''}`} />
                                </button>
                            )}

                            {/* Video element - shown on hover if available */}
                            {isHovered && fish.videos && fish.videos.length > 0 ? (
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover object-center"
                                    onError={(e) => {
                                        console.error('Video failed to load:', e);
                                        // Fall back to image on video error
                                        setIsHovered(false);
                                    }}
                                >
                                    <source src={fish.videos[0]} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <Image
                                    src={fish.images[0]}
                                    alt={fish.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    className={`object-cover object-center transition-transform duration-500 ease-out ${isHovered ? 'scale-110' : 'scale-100'
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
                                                placeholder.innerHTML = `<svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>`;
                                                target.parentElement.appendChild(placeholder);
                                            }
                                        }
                                    }}
                                />
                            )}

                            {/* Enhanced gradient overlay for better text visibility */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 transition-opacity duration-300`}></div>

                            {fish.size && <span className='absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1 z-10'>
                                <h1 className='text-xs sm:text-md text-white font-bold'>{fish.size}</h1>
                            </span>}
                        </div>
                    ) : (
                        <PlaceholderImage />
                    )}

                    {/* Featured badge - improved mobile positioning */}
                    {isFeatureFish && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                            <Award size={10} />
                            <span>Featured</span>
                        </div>
                    )}

                    {/* Star rating overlay on image - Mobile Optimized */}
                    <div className="absolute sm:hidden bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 z-10">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < Math.round(5)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-400 fill-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content section - optimized for mobile */}
                <div className={`p-3 flex flex-col flex-grow ${isFeatureFish ? 'bg-gradient-to-br from-white via-amber-50/20 to-white' : ''
                    }`}>

                    {/* Product info - improved mobile typography */}
                    <div className="mb-1 sm:mb-2">
                        <h3 className={`font-semibold text-sm sm:text-base line-clamp-1 transition-colors ${isFeatureFish
                            ? 'text-gray-900 group-hover:text-amber-800'
                            : 'text-gray-800'
                            }`}>
                            {fish.name}
                        </h3>
                        <p className={`text-xs sm:text-sm line-clamp-1 mt-0.5 ${isFeatureFish ? 'text-amber-700 font-medium' : 'text-gray-500'
                            }`}>
                            {fish.breed}
                        </p>
                    </div>

                    {/* Desktop-only rating and price row */}
                    <div className="flex items-center justify-between mb-1 sm:mb-3">
                        {/* Star rating - desktop */}
                        <div className="sm:flex hidden items-center gap-1">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < Math.round(5)
                                            ? (isFeatureFish ? 'text-amber-400 fill-amber-400' : 'text-yellow-400 fill-yellow-400')
                                            : 'text-gray-200 fill-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Price - desktop */}
                        <div className={`font-bold text-lg pl-1 sm:pl-0 transition-colors ${roboto.className} ${isFeatureFish
                            ? 'text-amber-800'
                            : 'text-gray-800'
                            }`}>
                            ₹{Number(fish.price).toFixed(2)}
                        </div>
                    </div>

                    {/* Add to cart button - enhanced mobile design */}
                    <button
                        className={`mt-auto w-full py-1.5 rounded-lg text-sm sm:font-semibold transition-all duration-300 
                        flex items-center justify-center shadow-sm hover:shadow-md group cursor-pointer active:scale-95 ${isFeatureFish
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-amber-200'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200'
                            }`}
                        onClick={HandleAddToCart}
                    >
                        <ShoppingCart size={16} className="mr-2 group-hover:animate-pulse" />
                        Add to Cart
                    </button>
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