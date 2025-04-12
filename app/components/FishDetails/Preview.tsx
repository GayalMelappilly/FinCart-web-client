'use client'

import React, { useState } from 'react'

const Preview = () => {

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                {/* Main Image */}
                <div className="aspect-square w-full bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    {/* This would be an actual image in production */}
                    <div
                        className="w-full h-full bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url('/neon-tetra.jpeg')` }}
                    ></div>
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2].map((index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'
                                }`}
                        >
                            {/* This would be actual thumbnails in production */}
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('/neon-tetra.jpeg')` }}
                            ></div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Preview