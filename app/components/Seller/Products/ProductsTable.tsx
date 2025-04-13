import { ArrowUpDown, ChevronLeft, ChevronRight, Edit, Eye, Package, Trash2 } from 'lucide-react'
import React, { FC } from 'react'
import TableHead from './Table/TableHead'
import TableProducts from './Table/TableProducts'
import TablePagination from './Table/TablePagination'
import { Product } from '@/app/types/types'

type Props = {
    products: Product[],
    setProducts: (products: Product[]) => void,
    sortBy: { field: keyof Product | ''; direction: 'asc' | 'desc' },
    setSortBy: (sortBy: { field: keyof Product | ''; direction: 'asc' | 'desc' }) => void,
    currentPage: number,
    setCurrentPage: (currentPage: number) => void,
    filteredProducts: Product[],
    indexOfFirstItem: number,
    indexOfLastItem: number,
    totalPages: number,
    currentItems: Product[],
    handleViewProduct: (product: Product) => void,
    handleEditProduct: (product: Product) => void
}

const ProductsTable: FC<Props> = ({ products, setProducts, sortBy, setSortBy, currentPage, setCurrentPage, filteredProducts, indexOfFirstItem, indexOfLastItem, totalPages, currentItems, handleViewProduct, handleEditProduct }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <TableHead sortBy={sortBy} setSortBy={setSortBy} />
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((product) => (
                                <TableProducts products={products} setProducts={setProducts} product={product} handleViewProduct={handleViewProduct} handleEditProduct={handleEditProduct} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                filteredProducts={filteredProducts}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
                totalPages={totalPages}
            />
        </div>
    )
}

export default ProductsTable