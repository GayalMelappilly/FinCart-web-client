import { Product } from '@/app/types/types'
import { Package } from 'lucide-react'
import React, { FC } from 'react'

type Props = {
    products: Product[],
    selectedProduct: Product,
    handleViewProduct: (product: Product) => void
}

const RelatedProducts:FC<Props> = ({ products, selectedProduct, handleViewProduct }) => {

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products
                    .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
                    .slice(0, 4)
                    .map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="h-32 bg-gray-100 relative">
                                {product.images.length > 0 ? (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url('/api/placeholder/300/300')` }}
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <Package className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                                <div className="mt-1 flex justify-between items-center">
                                    <div className="text-blue-600 font-bold">₹{product.price.toFixed(2)}</div>
                                    <button
                                        onClick={() => handleViewProduct(product)}
                                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default RelatedProducts