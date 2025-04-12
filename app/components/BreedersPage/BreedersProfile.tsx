import Image from 'next/image'
import React from 'react'

type Props = {}

const BreedersProfile = (props: Props) => {
    return (
        <section className="py-8 bg-white border-b border-gray-200 mx-30 mt-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="w-32 h-32 rounded-md overflow-hidden mb-4 md:mb-0 md:mr-6">
                        <Image
                            src="/jon-snow.jpeg"
                            alt="Tropical Fish Hobbyist profile"
                            width={128}
                            height={128}
                            className="object-cover"
                        />
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-2xl font-bold text-gray-800">Jon's Betta</h1>
                        <div className="flex items-center justify-center md:justify-start mt-1 text-gray-600">
                            <span className="font-medium">4.9 rating</span>
                            <span className="mx-2">•</span>
                            <span>1,000 reviews</span>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex space-x-3">
                        <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-gray-800 transition duration-200">
                            Follow
                        </button>
                        <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-medium text-white transition duration-200">
                            Message
                        </button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default BreedersProfile