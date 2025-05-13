import { FishListing } from '@/app/types/list/fishList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import { Heart, ShoppingCart } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { addToWishlist } from '@/app/services/authServices';

type Props = {
    fish: FishListing
}

const FishCard: FC<Props> = ({ fish }) => {

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: addToWishlist,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (err) => {
            console.log('Error adding to wishlist : ', err)
        }
    })

    const HandleClick = () => {
        localStorage.setItem('selectedFish', JSON.stringify(fish))
        router.push(`/fish/${fish.id}`);
    }

    const HandleAddToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
            mutation.mutate(fish.id)
            // console.log('fish: ',fish)
        } catch (err) {
            console.log('Error while adding item to wishlist', err)
        }
    }


    const PlaceholderImage = () => (
        <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
        </div>
    );

    return (
        <div
            onClick={HandleClick}
            className="group w-full h-full cursor-pointer"
        >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                {/* Image container with responsive height */}
                <div className="h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden relative">
                    {fish.images && fish.images.length > 0 ? (
                        <div className="w-full h-full relative">
                            {/* Heart button - optimized for touch */}
                            <button
                                className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/80 backdrop-blur-sm text-gray-800 hover:text-red-500 hover:bg-white transition-all duration-200 rounded-full p-1.5 sm:p-2 opacity-70 group-hover:opacity-100 z-10 shadow-sm"
                                aria-label="Add to favorites"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click
                                    HandleAddToWishlist(e);
                                }}
                            >
                                <Heart size={16} className="transition-transform duration-200 hover:scale-110" />
                            </button>

                            <Image
                                src={fish.images[0]}
                                alt={fish.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                onError={(e) => {
                                    // Handle image loading error
                                    const target = e.target;
                                    if (target instanceof HTMLImageElement) {
                                        target.onerror = null;
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                            target.parentElement.classList.add('bg-gray-100');
                                            const placeholder = document.createElement('div');
                                            placeholder.className = "flex items-center justify-center w-full h-full";
                                            placeholder.innerHTML = `<svg class="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>`;
                                            target.parentElement.appendChild(placeholder);
                                        }
                                    }
                                }}
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ) : (
                        <PlaceholderImage />
                    )}

                    {/* Featured badge - responsive sizing */}
                    {fish.isFeatured && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-medium px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
                            Featured
                        </div>
                    )}
                </div>

                {/* Content section with responsive padding */}
                <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow space-y-1 sm:space-y-2">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-1">{fish.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2 line-clamp-1">{fish.breed}</p>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between">
                            {/* Star rating - responsive size */}
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.round(fish.avgRating) ? 'text-yellow-400' : 'text-gray-200'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            {/* Price - responsive text size */}
                            <p className="font-bold text-sm sm:text-base text-black">₹{Number(fish.price).toFixed(2)}</p>
                        </div>

                        {/* Add to cart button - properly sized for touch */}
                        <button
                            className="mt-2 sm:mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center justify-center"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click when clicking the button
                                // Add to cart logic would go here
                            }}
                        >
                            <ShoppingCart size={14} className="mr-1" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FishCard