import { FishListing, SellerInfo } from '@/app/types/sellerProfile/type'
import { convertKeysToCamelCase } from '@/app/utils/convertKeysToCamelCase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

type Props = {
    fishListings: FishListing[]
    breederInfo: SellerInfo
}

const Listings: FC<Props> = ({ fishListings, breederInfo }) => {

    const router = useRouter()

    const HandleClick = (fish: FishListing) => {
        const info = convertKeysToCamelCase(fish)
        const fishDetails = {
            ...info,
            users: {
                businessName: breederInfo.business_name,
                displayName: breederInfo.display_name,
                id: breederInfo.id,
                logoUrl: breederInfo.logo_url,
                sellerAddresses: {
                    sellerLocations: {
                        city: breederInfo.location?.city,
                        state: breederInfo.location?.state,
                        country: breederInfo.location?.country
                    }
                },
                sellerRating: breederInfo.seller_rating,
                status: breederInfo.status
            }
        }
        console.log("Breeder selected fish : ", fishDetails)
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedFish', JSON.stringify(fishDetails))
        }
        router.push(`/fish/${fish.id}`);
    }

    return (
        <div className="max-w-6xl mx-2 md:mx-0">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">All Listings</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {fishListings?.map((fish) => (
                    <div key={fish.id} onClick={() => HandleClick(fish)} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200">
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