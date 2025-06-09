// import Image from 'next/image'
import React from 'react'

const Categories = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-blue-50 lg:px-10">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">Popular Categories</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { name: 'Bettas', color: 'from-blue-500 to-purple-500', image: '/api/placeholder/200/200' },
                        { name: 'Tetras', color: 'from-teal-500 to-green-500', image: '/api/placeholder/200/200' },
                        { name: 'Cichlids', color: 'from-yellow-500 to-orange-500', image: '/api/placeholder/200/200' },
                        { name: 'Goldfish', color: 'from-red-500 to-orange-400', image: '/api/placeholder/200/200' },
                        { name: 'Guppies', color: 'from-blue-400 to-teal-500', image: '/api/placeholder/200/200' },
                        { name: 'Marine', color: 'from-indigo-500 to-blue-600', image: '/api/placeholder/200/200' },
                    ].map((category, index) => (
                        <div key={index} className="group relative w-full h-32 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                            {/* <Image src={category.image} alt={category.name} className="w-full h-32 object-cover mix-blend-overlay" height={1000} width={1000} /> */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white font-bold text-lg lg:text-xl">{category.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories