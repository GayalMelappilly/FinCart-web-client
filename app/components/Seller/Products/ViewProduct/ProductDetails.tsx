'use client'
import { AlertCircle, Package, Tag, Play, Pause } from 'lucide-react'
import React, { FC, useState, useRef, useEffect } from 'react'
import { FishProduct } from '../AddOrEditProduct/Form'
import formatCareInstructions from '@/app/utils/formatCareInstructions'
import Image from 'next/image'
import { roboto } from '@/app/components/Fonts/Fonts'

type Props = {
    product: FishProduct
}

type MediaItem = {
    type: 'image' | 'video'
    src: string
    thumbnail?: string
}

const ProductDetails: FC<Props> = ({ product }) => {
    // Combine images and videos into a single media array
    const mediaItems: MediaItem[] = [
        ...product.images.map(img => ({ type: 'image' as const, src: img })),
        ...product.videos.map(video => ({ type: 'video' as const, src: video, thumbnail: video }))
    ]

    const [selectedMedia, setSelectedMedia] = useState<MediaItem>(mediaItems[0] || { type: 'image', src: '' })
    const [activeTab, setActiveTab] = useState('specifications')
    const [isPlaying, setIsPlaying] = useState(false)
    // const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const formattedInstruction = formatCareInstructions(product.care_instructions)

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
        }
    }, [isPlaying])

    const handleVideoToggle = () => {
        setIsPlaying(!isPlaying)
    }

    // const handleMuteToggle = () => {
    //     if (videoRef.current) {
    //         videoRef.current.muted = !isMuted
    //         setIsMuted(!isMuted)
    //     }
    // }

    const tabs = [
        { id: 'specifications', label: 'Specifications' },
        { id: 'shipping', label: 'Shipping Info' },
        { id: 'reviews', label: 'Reviews' }
    ]

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Product Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden mb-8">
                    {/* Product Header Section */}
                    <div className="p-6 sm:p-8 lg:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Media Section */}
                            <div className="space-y-6">
                                {/* Main Media Display */}
                                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-md overflow-hidden shadow-inner">
                                    {mediaItems.length > 0 ? (
                                        selectedMedia.type === 'image' ? (
                                            <Image
                                                className="w-full h-auto object-contain transition-all duration-500 hover:scale-105"
                                                src={selectedMedia.src}
                                                alt="Product media"
                                                // fill
                                                width={800}
                                                height={0}
                                                // priority
                                            />
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <video
                                                    ref={videoRef}
                                                    className="w-full h-full object-cover"
                                                    src={selectedMedia.src}
                                                    // muted={isMuted}
                                                    loop
                                                    playsInline
                                                />
                                                {/* Video Controls Overlay */}
                                                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={handleVideoToggle}
                                                            className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                                        >
                                                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                                                        </button>
                                                        {/* <button
                                                            onClick={handleMuteToggle}
                                                            className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                                        >
                                                            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Package className="h-16 w-16 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Media Thumbnails */}
                                {mediaItems.length > 1 && (
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                                        {mediaItems.map((media, index) => (
                                            <div
                                                key={index}
                                                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${selectedMedia.src === media.src
                                                        ? 'ring-3 ring-blue-500 ring-offset-2 scale-105 shadow-lg'
                                                        : 'hover:scale-105 hover:shadow-md'
                                                    }`}
                                                onClick={() => setSelectedMedia(media)}
                                            >
                                                {media.type === 'image' ? (
                                                    <Image
                                                        className="w-full h-full object-cover"
                                                        src={media.src}
                                                        alt="Thumbnail"
                                                        fill
                                                        sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
                                                    />
                                                ) : (
                                                    <div className="relative w-full h-full bg-gray-200">
                                                        <video
                                                            className="w-full h-full object-cover"
                                                            src={media.src}
                                                            muted
                                                        />
                                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                            <Play className="w-4 h-4 text-white" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Information */}
                            <div className="space-y-8">
                                {/* Header Info */}
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div className="space-y-2">
                                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                                {product.name}
                                            </h1>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                    SKU: {product.id}
                                                </span>
                                                {product.is_featured && (
                                                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold rounded-full shadow-lg">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${product.listing_status === 'active'
                                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                                                    product.listing_status === 'draft'
                                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                                                        'bg-gradient-to-r from-red-400 to-red-500 text-white'
                                                }`}>
                                                {product.listing_status === 'active' ? '✓ Active' :
                                                    product.listing_status === 'draft' ? '📝 Draft' :
                                                        '❌ Out of Stock'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price and Category */}
                                    <div className="space-y-4">
                                        <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent ${roboto.className}`}>
                                            ₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </div>

                                        <div className="flex items-center gap-2 text-lg">
                                            <Tag className="h-5 w-5 text-blue-500" />
                                            <span className="text-gray-700 font-medium">{product.fish_categories?.name}</span>
                                        </div>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                                        <div className={`h-4 w-4 rounded-full shadow-lg ${product.quantity_available > 10 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                                                product.quantity_available > 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                                                    'bg-gradient-to-r from-red-400 to-red-500'
                                            }`} />
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                            <span className="font-semibold text-gray-800">
                                                {product.quantity_available > 10 ? '✓ In Stock' :
                                                    product.quantity_available > 0 ? '⚠️ Low Stock' :
                                                        '❌ Out of Stock'}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                ({product.quantity_available} units available)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900">Description</h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="border-t border-gray-200/50">
                        {/* Tab Navigation */}
                        <div className="px-6 sm:px-8 lg:px-12">
                            <nav className="flex space-x-1 overflow-x-auto scrollbar-hide" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-6 font-semibold text-sm transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                                ? 'border-b-3 border-blue-500 text-blue-600 bg-blue-50/50'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 border-b-3 border-transparent'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 sm:p-8 lg:p-12">
                            {activeTab === 'specifications' && (
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    {/* Additional Information */}
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                            Additional Information
                                        </h3>
                                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200/50 shadow-inner">
                                            <dl className="space-y-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-gray-200/70">
                                                    <dt className="text-sm font-semibold text-gray-600">Weight</dt>
                                                    <dd className="text-sm font-medium text-gray-900 sm:col-span-2">{product.size || 'N/A'}</dd>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-gray-200/70">
                                                    <dt className="text-sm font-semibold text-gray-600">Created</dt>
                                                    <dd className="text-sm font-medium text-gray-900 sm:col-span-2">{new Date(product.created_at).toLocaleString()}</dd>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-3">
                                                    <dt className="text-sm font-semibold text-gray-600">Last Updated</dt>
                                                    <dd className="text-sm font-medium text-gray-900 sm:col-span-2">{new Date(product.updated_at).toLocaleString()}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>

                                    {/* Care Instructions */}
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                                            Care Instructions
                                        </h3>
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50 shadow-inner">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 p-2 bg-blue-500 rounded-xl shadow-lg">
                                                    <AlertCircle className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="space-y-3">
                                                    <p className="text-blue-800 font-semibold">This species requires specific care conditions:</p>
                                                    <ul className="space-y-2">
                                                        {Object.entries(formattedInstruction).map(([key, value]) => (
                                                            <li key={key} className="flex items-start gap-2 text-sm text-blue-800">
                                                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                                                <span><strong>{key}:</strong> {value}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'shipping' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                                        Shipping Information
                                    </h3>
                                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200/50">
                                        <p className="text-gray-700 text-lg">Shipping details will be displayed here.</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                                        Customer Reviews
                                    </h3>
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200/50">
                                        <p className="text-gray-700 text-lg">Customer reviews will be displayed here.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails