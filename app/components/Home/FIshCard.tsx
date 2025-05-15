
import { FishListing } from '@/app/types/list/fishList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { addToWishlist } from '@/app/services/authServices';

type Props = {
    fish: FishListing
}

const FishCard: FC<Props> = ({ fish }) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: addToWishlist,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (err) => {
            console.log('Error adding to wishlist : ', err)
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

    const PlaceholderImage = () => (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-t-xl">
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
            className="group w-full h-full cursor-pointer transform transition-all duration-300 hover:translate-y-1"
        >
            <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100">
                {/* Image container with improved height scaling */}
                <div className="h-36 xs:h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden relative">
                    {fish.images && fish.images.length > 0 ? (
                        <div className="w-full h-full relative">
                            {/* Heart button - improved for mobile */}
                            <button
                                className={`absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-red-500 
                                transition-all duration-200 rounded-full p-2 z-10 shadow-sm transform 
                                ${isHovered ? 'opacity-100 scale-105' : 'opacity-80'}`}
                                aria-label="Add to favorites"
                                onClick={HandleAddToWishlist}
                            >
                                <Heart size={18} className={`transition-all duration-300 ${mutation.isSuccess ? 'text-red-500 fill-red-500' : ''}`} />
                            </button>

                            <Image
                                src={fish.images[0]}
                                alt={fish.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                className={`object-cover object-center transition-transform duration-500 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
                                onError={(e) => {
                                    const target = e.target;
                                    if (target instanceof HTMLImageElement) {
                                        target.onerror = null;
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                            target.parentElement.classList.add('bg-gray-100');
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
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>
                    ) : (
                        <PlaceholderImage />
                    )}

                    {/* Featured badge - improved mobile visibility */}
                    {fish.isFeatured && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                            Featured
                        </div>
                    )}
                </div>

                {/* Content section with better responsive spacing */}
                <div className="p-3 xs:p-4 flex flex-col flex-grow">
                    <div className="mb-1.5">
                        <h3 className="font-semibold text-sm xs:text-base sm:text-lg text-gray-800 line-clamp-1">{fish.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">{fish.breed}</p>
                    </div>

                    {/* Rating and Price - improved mobile alignment */}
                    <div className="mt-auto pt-1.5">
                        <div className="flex items-center justify-between">
                            {/* Star rating - better mobile sizing */}
                            <div className="flex items-center space-x-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-3 h-3 xs:w-3.5 xs:h-3.5 ${i < Math.round(fish.avgRating) ? 'text-yellow-400' : 'text-gray-200'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                {/* Show rating value on larger screens */}
                                {/* <span className="hidden sm:inline-block text-xs text-gray-500 ml-1">
                                    ({fish.avgRating.toFixed(1)})
                                </span> */}
                            </div>
                            
                            {/* Price - with currency symbol */}
                            <p className="font-bold text-sm xs:text-base text-gray-800">₹{Number(fish.price).toFixed(2)}</p>
                        </div>

                        {/* Add to cart button - more touch-friendly */}
                        <button
                            className="mt-2.5 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                            text-white py-2 xs:py-2.5 rounded-lg text-xs xs:text-sm font-medium transition-all duration-300 
                            flex items-center justify-center shadow-sm hover:shadow group"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                // Add to cart logic
                            }}
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

export default FishCard