'use client'

import Image from 'next/image'
import React, { FC, useState } from 'react'

type Props = {
    images: string[] | undefined,
    videos: string[] | undefined
}

type MediaItem = {
    url: string;
    type: 'image' | 'video';
    index: number;
}

const Preview: FC<Props> = ({ images, videos }) => {
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    // Combine images and videos into a single media array
    const mediaItems: MediaItem[] = [
        ...(images?.map((url, index) => ({ url, type: 'image' as const, index })) || []),
        ...(videos?.map((url, index) => ({ url, type: 'video' as const, index })) || [])
    ];

    const selectedMedia = mediaItems[selectedMediaIndex];

    return (
        <div className="mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                {/* Main Media Display */}
                <div className="w-full bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    {selectedMedia?.type === 'image' ? (
                        <Image
                            className="w-full h-auto object-contain rounded-lg"
                            src={selectedMedia.url}
                            alt="fish-image"
                            width={800}
                            height={0}
                        />
                    ) : selectedMedia?.type === 'video' ? (
                        <video
                            className="w-full h-auto object-contain rounded-lg"
                            controls
                            preload="metadata"
                        >
                            <source src={selectedMedia.url} type="video/mp4" />
                            <source src={selectedMedia.url} type="video/webm" />
                            <source src={selectedMedia.url} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="w-full h-48 flex items-center justify-center text-gray-500">
                            No media available
                        </div>
                    )}
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-2">
                    {mediaItems.map((media, index) => (
                        <button
                            key={`${media.type}-${media.index}`}
                            onClick={() => setSelectedMediaIndex(index)}
                            className={`bg-gray-100 rounded-lg overflow-hidden border-2 relative ${
                                selectedMediaIndex === index ? 'border-blue-500' : 'border-transparent'
                            }`}
                        >
                            {media.type === 'image' ? (
                                <Image
                                    className="w-full h-auto object-cover rounded-lg aspect-square"
                                    src={media.url}
                                    alt="thumbnail"
                                    width={100}
                                    height={100}
                                />
                            ) : (
                                <div className="relative aspect-square">
                                    <video
                                        className="w-full h-full object-cover rounded-lg"
                                        preload="metadata"
                                        muted
                                    >
                                        <source src={media.url} type="video/mp4" />
                                        <source src={media.url} type="video/webm" />
                                        <source src={media.url} type="video/ogg" />
                                    </video>
                                    {/* Play icon overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                                        <div className="w-6 h-6 flex items-center justify-center bg-white bg-opacity-80 rounded-full">
                                            <svg 
                                                className="w-3 h-3 text-gray-700 ml-0.5" 
                                                fill="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Preview