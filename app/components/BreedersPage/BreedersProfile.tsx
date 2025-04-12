import Image from 'next/image'
import React from 'react'

const BreedersProfile = () => {
    return (
        <section className="py-4 sm:py-6 md:py-8 bg-white border-b border-gray-200 mx-2 sm:mx-4 md:mx-6 lg:mx-8 mt-3 sm:mt-4 md:mt-6 rounded-lg shadow-sm">
            <div className="container mx-auto px-3 sm:px-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-md overflow-hidden">
                        <Image
                            src="/jon-snow.jpeg"
                            alt="Tropical Fish Hobbyist profile"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="text-center sm:text-left flex-1">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Jon&apos;s Betta</h1>
                        <div className="flex items-center justify-center sm:justify-start mt-1 text-gray-600 text-sm sm:text-base">
                            <span className="font-medium">4.9 rating</span>
                            <span className="mx-2">•</span>
                            <span>1,000 reviews</span>
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
                        <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-gray-800 transition duration-200">
                            Follow
                        </button>
                        <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-medium text-white transition duration-200">
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BreedersProfile