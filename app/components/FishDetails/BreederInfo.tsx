import { MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BreederInfo = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <h2 className="text-xl text-gray-800 font-semibold mb-4">About Breeder</h2>
            <div className="flex items-center">
                <Image
                    src="/jon-snow.jpeg"
                    alt="Nancy's profile picture"
                    width={80}
                    height={80}
                    className="rounded-md object-cover mr-4"
                />
                <div className='flex flex-col gap-1'>
                    <h3 className="font-semibold text-lg text-gray-600">Jon&apos;s Betta</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Phoenix, AZ</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-600 mr-2">5 years on Finest Fish,</span>
                        <div className="flex gap-2 items-center">
                            <span className="mr-1 text-gray-800">4.9</span>
                            <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                            <span className="text-gray-600">stars</span>
                        </div>
                    </div>
                </div>
                <Link href={`/breeder/jon-snow`} className='absolute right-0 bottom-0 m-6'>
                    <button className="ml-auto bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium transition duration-200">
                        Visit Store
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default BreederInfo