import { Product } from '@/app/types/types'
import { Edit, Eye, Package, Trash2 } from 'lucide-react'
import React, { FC } from 'react'

type Props = {
    products: Product[],
    setProducts: (product: Product[]) => void,
    product: Product,
    handleViewProduct: (product: Product) => void,
    handleEditProduct: (product: Product) => void
}

const TableProducts:FC<Props> = ({products, setProducts, product, handleViewProduct, handleEditProduct}) => {

    // Function to handle deleting a product
    const handleDeleteProduct = (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };


    return (
        <tr key={product.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                        {product.images.length > 0 ? (
                            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('/api/placeholder/100/100')` }} />
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
                <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.stock}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.category}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' :
                    product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {product.status === 'active' ? 'Active' :
                        product.status === 'draft' ? 'Draft' :
                            'Out of Stock'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(product.updatedAt).toLocaleDateString()}
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