import { Seller } from '@/app/types/list/fishList'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
    breeder: Seller | undefined | null
}

const BreederInfo:FC<Props> = ({breeder}) => {

    console.log(breeder)

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <h2 className="text-xl text-gray-800 font-semibold mb-4">About Breeder</h2>
            <div className="flex items-center">
                { breeder && <Image
                    src={breeder?.logo_url as string}
                    alt={`${breeder?.display_name} profile picture`}
                    width={80}
                    height={80}
                    className="rounded-md object-cover mr-4 "
                /> }
                <div className='flex flex-col gap-1'>
                    <h3 className="font-semibold md:text-lg text-gray-600">{breeder?.display_name}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className='text-sm md:text-base' >{breeder?.seller_addresses.seller_locations.city},{breeder?.seller_addresses.seller_locations.state}</span>
                    </div>
                    {/* <div className="flex items-center">
                        <span className="text-gray-600 mr-2 text-sm md:text-md">5 years on Finest Fish</span>
                        {/* <div className="flex gap-2 items-center">
                            <span className="mr-1 text-gray-800">4.9</span>
                            <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                            <span className="text-gray-600">stars</span>
                        </div> 
                    </div> */}
                </div>
                <Link href={`/breeder/${breeder?.id}`} className='absolute right-0 top-0 md:top-auto md:bottom-0 m-6'>
                    <button className="ml-auto bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium text-xs md:text-base transition duration-200">
                        Visit Store
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default BreederInfo