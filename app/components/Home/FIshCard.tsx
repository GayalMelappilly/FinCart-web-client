import { FishListing } from '@/app/types/list/fishList';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

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

const FishCard:FC<Props> = ({fish}) => {

    const router = useRouter()

    const HandleClick = () => {
        localStorage.setItem('selectedFish', JSON.stringify(fish))
        router.push(`/fish/${fish.id}`);
    }

    return (
        <div onClick={HandleClick} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="h-48 overflow-hidden relative">
                    {fish.images && fish.images.length > 0 ? (
                        <div className="w-full h-full relative">
                            <Image
                                src={fish.images[0]}
                                alt={fish.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    // Handle image loading error
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.style.display = 'none';
                                    target.parentElement!.classList.add('bg-gray-100');
                                    const placeholder = document.createElement('div');
                                    placeholder.innerHTML = `<svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>`;
                                    target.parentElement!.appendChild(placeholder);
                                }}
                            />
                        </div>
                    ) : (
                        <PlaceholderImage />
                    )}

                    {/* Featured badge if the fish is featured */}
                    {fish.isFeatured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                            Featured
                        </div>
                    )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-medium text-gray-800 text-lg">{fish.name}</h3>
                    <div className="flex items-center mt-1 mb-2">
                        {/* Star rating */}
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.round(fish.avgRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <p className="text-blue-600 font-medium text-lg">₹{Number(fish.price).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FishCard