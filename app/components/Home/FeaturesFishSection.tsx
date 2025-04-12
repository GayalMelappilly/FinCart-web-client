import { featuredFish } from '@/app/datasets/featuredFish'
import Link from 'next/link'
import React from 'react'

const FeaturesFishSection = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Fish</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {featuredFish.map((fish) => (
                    <Link href={`/fish/${fish.id}`} key={fish.id} className="group">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <div className="h-48 overflow-hidden">
                                <div className="w-full h-full bg-gray-200 relative">
                                    {/* Using a div with background-image as placeholder since we don't have actual images */}
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                                        style={{ backgroundImage: `url('fish.jpeg')` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-gray-800">{fish.name}</h3>
                                <p className="text-blue-600 font-medium mt-1">₹{fish.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default FeaturesFishSection