import { RelatedFish } from '@/app/datasets/fishDetails'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
    relatedFish: RelatedFish[]
}

const RelatedFishRecommendation:FC<Props> = ({relatedFish}) => {
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You may also like</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedFish.map((relatedFish: RelatedFish) => (
                    <Link href={`/fish/${relatedFish.id}`} key={relatedFish.id} className="group">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-48 overflow-hidden">
                                <div className="w-full h-full bg-gray-200 relative">
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                                        style={{ backgroundImage: `url('/neon-tetra.jpeg')` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-800">{relatedFish.name}</h3>
                                <p className="text-blue-600 font-medium mt-1">₹{relatedFish.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default RelatedFishRecommendation