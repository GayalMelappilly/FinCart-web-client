'use client'

import Image from 'next/image'
import React, { FC, useState } from 'react'

type Props = {
    images: string[] | undefined
}

const Preview: FC<Props> = ({ images }) => {

    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                {/* Main Image */}
                <div className="w-full bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <Image
                        className="w-full h-auto object-contain rounded-lg"
                        src={images ? images[selectedImage] : ''}
                        alt="fish-image"
                        width={200} // Or any max width you expect
                        height={0}  // Let it auto-scale height based on aspect
                    />
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2">
                    {images?.map((url, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={` bg-gray-100 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-transparent'
                                }`}
                        >
                            {/* This would be actual thumbnails in production */}
                            {/* <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('/neon-tetra.jpeg')` }}
                            ></div> */}
                            <Image
                                className="w-full h-auto object-contain rounded-lg"
                                src={url}
                                alt="fish-image"
                                width={800} // Or any max width you expect
                                height={0}  // Let it auto-scale height based on aspect
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Preview