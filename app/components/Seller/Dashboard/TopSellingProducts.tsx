import { TopSellingProduct } from '@/app/types/seller/sellerDetails/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

type Props = {
    data: TopSellingProduct[] | undefined
}

const TopSellingProducts:FC<Props> = ({data}) => {

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Top Selling Fish</h2>
                <Link href={'/seller/products'}>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                </Link>
            </div>
            <div className="space-y-4">
                {data?.map((fish) => (
                    <div key={fish.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden relative">
                                <div className="w-10 h-10 relative">
                                    <div className="absolute inset-0 bg-gray-200 rounded-full" />
                                    {/* If you have fish images, use this */}
                                    <Image src={fish.image as string} alt={fish.name} fill className="object-cover" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">{fish.name}</h3>
                                <p className="text-xs text-gray-500">Stock: {fish.stock}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{fish.sold} sold</p>
                            <p className="text-xs text-gray-500">This month</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopSellingProducts