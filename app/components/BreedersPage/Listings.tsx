import { FishListing } from '@/app/types/sellerProfile/type'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

type Props = {
    fishListings: FishListing[]
}

const Listings: FC<Props> = ({ fishListings }) => {

    const router = useRouter()

    const HandleClick = (fish: FishListing) => {
        localStorage.setItem('selectedFish', JSON.stringify(fish))
        router.push(`/fish/${fish.id}`);
    }

    return (
        <div className="max-w-6xl mx-2 md:mx-0">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">All Listings</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {fishListings?.map((fish) => (
                    <div key={fish.id} onClick={()=>HandleClick(fish)} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200">
                        <div className="aspect-square bg-gray-50 relative">
                            <Image
                                src={fish.images[0] as string}
                                alt={`${fish.name} image`}
                                fill
                                className="object-cover p-4"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-gray-800">{fish.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Listings