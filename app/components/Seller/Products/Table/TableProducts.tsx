'use client'

import { Edit, Eye, Package, Trash2 } from 'lucide-react'
import React, { FC } from 'react'
import { FishProduct } from '../AddOrEditProduct/Form'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { deleteProduct } from '@/app/services/sellerAuthServices'
import { roboto } from '@/app/components/Fonts/Fonts'

type Props = {
    products: FishProduct[] | undefined,
    setProducts: (product: FishProduct[]) => void,
    product: FishProduct,
    handleViewProduct: (product: FishProduct) => void,
    handleEditProduct: (product: FishProduct) => void
}

const TableProducts:FC<Props> = ({products, setProducts, product, handleViewProduct, handleEditProduct}) => {

    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (err) => {
            console.log('Add product error : ', err)
        }
    })

    // Function to handle deleting a product
    const handleDeleteProduct = (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?') && products) {
            mutation.mutate(productId)
            setProducts(products.filter(p => p.id !== productId));
        }
    };


    return (
        <tr key={product.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                        {product.images.length > 0 ? (
                            // <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${product.images[0]}')` }} />
                            <Image src={product.images[0]} alt='fish-image' height={100} width={100} />
                        ) : (
                            <Package className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.id}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm text-gray-900 ${roboto.className}`}>₹{Number(product.price).toFixed(2)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.quantity_available}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.fish_categories?.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.listing_status === 'active' ? 'bg-green-100 text-green-800' :
                    product.listing_status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {product.listing_status === 'active' ? 'Active' :
                        product.listing_status === 'draft' ? 'Draft' :
                            'Out of Stock'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(product.updated_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => handleViewProduct(product)}
                        className="text-gray-600 hover:text-gray-900"
                        title="View"
                    >
                        <Eye className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                    >
                        <Edit className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TableProducts