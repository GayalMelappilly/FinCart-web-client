'use client'

import { useToast } from "@/app/providers/ToastProvider";
import { addToCart, addToCartGuest, addToWishlist } from "@/app/services/authServices";
import { FishListing } from "@/app/types/list/fishList";
import { useMutation } from "@tanstack/react-query";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

type Props = {
    fish: FishListing;
    viewMode: string;
}

export const FishCard: FC<Props> = ({ fish, viewMode = 'grid' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

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
            const item = data.data
            if (typeof window !== 'undefined') {
                const cart = JSON.parse(localStorage.getItem('guestCartItems') as string)
                cart.push(item)
                console.log("Cart items : ", cart, item)
                localStorage.removeItem('guestCartItems')
                localStorage.setItem('guestCartItems', JSON.stringify(cart))
            }
            showToast('success', 'Item added to cart')
            console.log(data)
        },
        onError: (err) => {
            showToast('error', 'Failed to add item to cart')
            console.log('User profile error : ', err)
        }
    })


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

    if (viewMode === 'list') {
        return (
            <div
                onClick={HandleClick}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
            >
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 border border-gray-100 flex">
                    {/* Image Section */}
                    <div className="w-48 h-40 overflow-hidden relative flex-shrink-0">
                        <Image
                            src={fish.images[0]}
                            alt={fish.name}
                            height={1000}
                            width={1000}
                            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        />

                        {fish.isFeatured && (
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                                Featured
                            </div>
                        )}

                        <button
                            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-red-500 transition-all duration-200 rounded-full p-2 shadow-sm"
                            onClick={HandleAddToWishlist}
                        >
                            <Heart size={16} />
                        </button>

                        {fish.listingStatus !== 'active' && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors">{fish.name}</h3>
                                    <p className="text-sm text-gray-500">{fish.breed}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-blue-600">₹{fish.price}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center space-x-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.round(fish.avgRating) ? 'text-yellow-400' : 'text-gray-200'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{fish.avgRating}</span>
                            </div>
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow group"
                            onClick={HandleAddToCart}
                        >
                            <ShoppingCart size={16} className="mr-1.5 group-hover:animate-pulse" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Grid view (default)
    return (
        <div
            onClick={HandleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group w-full h-full cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
        >
            <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100">
                {/* Image container */}
                <div className="h-48 overflow-hidden relative">
                    <Image
                        src={fish.images[0]}
                        alt={fish.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
                        height={1000}
                        width={1000}
                    />

                    <button
                        className={`absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-red-500 transition-all duration-200 rounded-full p-2 z-10 shadow-sm transform ${isHovered ? 'opacity-100 scale-105' : 'opacity-80'}`}
                        onClick={HandleAddToWishlist}
                    >
                        <Heart size={18} />
                    </button>

                    {fish.isFeatured && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                            Featured
                        </div>
                    )}

                    {fish.listingStatus !== 'active' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Out of Stock
                            </span>
                        </div>
                    )}

                    <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* Content section */}
                <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                        <h3 className="font-semibold text-base text-gray-800 line-clamp-1">{fish.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{fish.breed}</p>
                    </div>

                    <div className="mt-auto pt-2">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < Math.round(fish.avgRating) ? 'text-yellow-400' : 'text-gray-200'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="font-bold text-base text-gray-800">₹{Number(fish.price).toFixed(2)}</p>
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow group"
                            onClick={HandleAddToCart}
                        >
                            <ShoppingCart size={16} className="mr-1.5 group-hover:animate-pulse" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}