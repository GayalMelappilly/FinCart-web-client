import { FishListing } from '@/app/types/list/fishList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import { roboto } from '../Fonts/Fonts';
import { Heart } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { addToWishlist } from '@/app/services/authServices';

type Props = {
    fish: FishListing
}

const PlaceholderImage = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    </div>
);

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
        try{
            mutation.mutate(fish.id)
            // console.log('fish: ',fish)
        }catch(err){
            console.log('Error while adding item to wishlist', err)
        }
    }


    return (
        <div onClick={HandleClick} className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                <div className="h-52 overflow-hidden relative">
                    {fish.images && fish.images.length > 0 ? (
                        <div className="w-full h-full relative">
                            {/* Heart button - visible only on hover */}
                            <button
                                className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white transition-all duration-200 rounded-full p-2 opacity-0 group-hover:opacity-100 z-10 shadow-sm"
                                aria-label="Add to favorites"
                                onClick={(e) => HandleAddToWishlist(e)}
                            >
                                <Heart size={18} className="transition-transform duration-200 hover:scale-110" />
                            </button>

                            <Image
                                src={fish.images[0]}
                                alt={fish.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                onError={(e) => {
                                    // Handle image loading error
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.style.display = 'none';
                                    target.parentElement!.classList.add('bg-gray-100');
                                    const placeholder = document.createElement('div');
                                    placeholder.className = "flex items-center justify-center w-full h-full";
                                    placeholder.innerHTML = `<svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>`;
                                    target.parentElement!.appendChild(placeholder);
                                }}
                            />

                            {/* Gradient overlay for better text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ) : (
                        <PlaceholderImage />
                    )}

                    {/* Featured badge if the fish is featured */}
                    {fish.isFeatured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                            Featured
                        </div>
                    )}
                </div>

                <div className="p-5 flex flex-col flex-grow space-y-2">
                    <h3 className="font-medium text-gray-800 text-lg group-hover:text-blue-600 transition-colors">{fish.name}</h3>

                    <div className="flex items-center">
                        {/* Star rating */}
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.round(fish.avgRating) ? 'text-yellow-400' : 'text-gray-200'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        {/* Reviews count */}
                        {/* <span className="text-xs text-gray-500 ml-2">
                            ({fish.reviews?.length || 0} reviews)
                        </span> */}
                    </div>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                        <p className={`text-blue-600 font-semibold text-lg ${roboto.className}`}>₹{Number(fish.price).toFixed(2)}</p>

                        {/* Add to cart button - subtle and appears on hover */}
                        {/* <button
                            className="text-gray-600 hover:text-blue-600 transition-colors group-hover:translate-x-0 translate-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the parent HandleClick from firing
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FishCard