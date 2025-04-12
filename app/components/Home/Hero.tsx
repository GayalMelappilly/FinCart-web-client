import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <section className="relative px-4 sm:px-6 md:px-8 lg:px-30 mt-4 sm:mt-6 md:mt-8">
            <div className="w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10 rounded-xl sm:rounded-2xl"></div>
                <Image
                    src="/hero.jpeg"
                    alt="Aquarium Background"
                    width={1920}
                    height={800}
                    className="w-full h-full object-cover absolute inset-0 bg-cover bg-center rounded-xl sm:rounded-2xl"
                    priority
                />

                <div className="absolute inset-0 flex flex-col justify-end sm:justify-center md:justify-end p-4 sm:p-6 md:p-8 lg:p-12 z-20">
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
                            Find your perfect fish
                        </h1>

                        <div className="bg-white p-1 rounded-lg sm:rounded-xl md:rounded-2xl flex flex-col sm:flex-row">
                            <input
                                type="text"
                                placeholder="Search for fish, plants and more"
                                className="w-full sm:flex-1 pl-3 sm:pl-4 py-2 sm:py-3 bg-transparent focus:outline-none placeholder:text-gray-800/60 text-black text-sm sm:text-base mb-2 sm:mb-0"
                            />
                            <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl md:rounded-2xl transition-colors text-sm sm:text-base">
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