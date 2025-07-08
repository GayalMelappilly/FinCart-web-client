'use client'

import { AlertCircle, Package, Tag } from 'lucide-react'
import React, { FC, useState } from 'react'
import { FishProduct } from '../AddOrEditProduct/Form'
import formatCareInstructions from '@/app/utils/formatCareInstructions'
import Image from 'next/image'
import { roboto } from '@/app/components/Fonts/Fonts'

type Props = {
    product: FishProduct
}

const ProductDetails: FC<Props> = ({ product }) => {

    const [preview, setPreview] = useState<string>(product.images[0])
 
    const formattedInstruction = formatCareInstructions(product.care_instructions);

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            {/* Product Header */}
            <div className="p-6 pb-0">
                <div className="flex flex-col md:flex-row md:items-start">
                    {/* Product Image */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-6">
                        <div className="bg-gray-100 rounded-lg overflow-hidden h-64 relative">
                            {product.images.length > 0 ? (
                                <Image className='absolute inset-0 bg-cover bg-center h-full w-full' src={preview} alt='fish-image' height={200} width={100} />
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <Package className="h-12 w-12 text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="mt-3 grid grid-cols-4 gap-2">
                                {product.images.map((image, index) => (
                                    <div key={index} className="h-16 bg-gray-100 rounded overflow-hidden" onClick={()=>setPreview(image)}>
                                        <Image className='h-full bg-cover bg-center' src={image} alt='fish-image' height={100} width={100} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info Summary */}
                    <div className="w-full md:w-2/3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                                <div className="mt-1 flex items-center">
                                    <span className="text-sm text-gray-500">SKU: {product.id}</span>
                                    {product.is_featured && (
                                        <span className="ml-3 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>
                            </div>

                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.listing_status === 'active' ? 'bg-green-100 text-green-800' :
                                product.listing_status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                {product.listing_status === 'active' ? 'Active' :
                                    product.listing_status === 'draft' ? 'Draft' :
                                        'Out of Stock'}
                            </span>
                        </div>

                        <div className="mt-6">
                            <div className={`text-3xl font-bold text-gray-900 ${roboto.className}`}>₹{Number(product.price).toFixed(2)}</div>
                            <div className="mt-2 flex items-center">
                                <Tag className="h-5 w-5 text-gray-400 mr-1" />
                                <span className="text-sm text-gray-500">{product.category}</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center">
                                <div className={`h-3 w-3 rounded-full mr-2 ${product.quantity_available > 10 ? 'bg-green-500' :
                                    product.quantity_available > 0 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                    }`} />
                                <span className="text-sm font-medium">
                                    {product.quantity_available > 10 ? 'In Stock' :
                                        product.quantity_available > 0 ? 'Low Stock' :
                                            'Out of Stock'}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                    ({product.quantity_available} units available)
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        {/* {product.tags.length > 0 && (
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 mt-6">
                <div className="px-6">
                    <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
                        <button className="py-4 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600">
                            Specifications
                        </button>
                        <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Shipping Info
                        </button>
                        <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Reviews
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* Specifications Tab */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Specifications */}
                        {/* <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Specifications</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <dl className="space-y-2">
                                    {Object.entries(product.specifications).map(([key, value], index) => (
                                        <div key={index} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 last:border-0">
                                            <dt className="text-sm font-medium text-gray-500">{key}</dt>
                                            <dd className="text-sm text-gray-900 col-span-2">{value}</dd>
                                        </div>
                                    ))}
                                    {Object.keys(product.specifications).length === 0 && (
                                        <div className="text-sm text-gray-500 py-2">No specifications available</div>
                                    )}
                                </dl>
                            </div>
                        </div> */}

                        {/* Right Column: Additional Info */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <dl className="space-y-2">
                                    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200">
                                        <dt className="text-sm font-medium text-gray-500">Weight</dt>
                                        <dd className="text-sm text-gray-900 col-span-2">{product.size || 'N/A'}</dd>
                                    </div>
                                    {/* <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200">
                                        <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                                        <dd className="text-sm text-gray-900 col-span-2">{product.dimensions || 'N/A'}</dd>
                                    </div> */}
                                    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200">
                                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                                        <dd className="text-sm text-gray-900 col-span-2">{new Date(product.created_at).toLocaleString()}</dd>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 py-2">
                                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                        <dd className="text-sm text-gray-900 col-span-2">{new Date(product.updated_at).toLocaleString()}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Care Instructions */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Care Instructions</h3>
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                                    <div className="flex items-start">
                                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                                        <div className="text-sm text-blue-800">
                                            <p>This species requires specific care conditions:</p>
                                            <ul className="list-disc ml-5 mt-2 space-y-1">
                                                {
                                                    Object.entries(formattedInstruction).map(([key, value]) => (
                                                        <li key={key}>{key}: {value}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails