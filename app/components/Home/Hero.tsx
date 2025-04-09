import Image from 'next/image'
import React from 'react'

type Props = {}

const Hero = (props: Props) => {
    return (
        <section className="relative mx-55 mt-8">
            <div className="w-full h-[35rem] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10 rounded-2xl"></div>
                <Image
                    src="/hero.jpeg"
                    alt="Aquarium Background"
                    width={1920}
                    height={800}
                    className="w-full h-full object-cover absolute inset-0 bg-cover bg-center rounded-2xl"
                    priority
                />

                <div className="container mx-auto p-30 h-full flex relative z-20 items-end">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Find your perfect fish</h1>

                        <div className="bg-white p-1 rounded-2xl flex">
                            <input
                                type="text"
                                placeholder="Search for fish, plants and more"
                                className="flex-1 pl-4 py-3 bg-transparent focus:outline-none placeholder:text-gray-800/60 text-black"
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero