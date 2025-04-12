import { fishListings } from '@/app/datasets/breedersListings'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Listings = () => {

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">All Listings</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {fishListings.map((fish) => (
                    <Link href={`/fish/${fish.id}`} key={fish.id}>
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200">
                            <div className="aspect-square bg-gray-50 relative">
                                <Image
                                    src={fish.image}
                                    alt={fish.alt}
                                    fill
                                    className="object-cover p-4"
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-gray-800">{fish.name}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Listings