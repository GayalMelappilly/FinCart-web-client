import React, { FC } from 'react'
import TableHead from './Table/TableHead'
import TableProducts from './Table/TableProducts'
import TablePagination from './Table/TablePagination'
import { FishProduct } from './AddOrEditProduct/Form'

type Props = {
    products: FishProduct[] | undefined,
    setProducts: (products: FishProduct[]) => void,
    sortBy: { field: keyof FishProduct | ''; direction: 'asc' | 'desc' },
    setSortBy: (sortBy: { field: keyof FishProduct | ''; direction: 'asc' | 'desc' }) => void,
    currentPage: number,
    setCurrentPage: (currentPage: number) => void,
    filteredProducts: FishProduct[] | undefined,
    indexOfFirstItem: number,
    indexOfLastItem: number,
    totalPages: number | undefined,
    currentItems: FishProduct[] | undefined,
    handleViewProduct: (product: FishProduct) => void,
    handleEditProduct: (product: FishProduct) => void
}

const ProductsTable: FC<Props> = ({ products, setProducts, sortBy, setSortBy, currentPage, setCurrentPage, filteredProducts, indexOfFirstItem, indexOfLastItem, totalPages, currentItems, handleViewProduct, handleEditProduct }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <TableHead sortBy={sortBy} setSortBy={setSortBy} />
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems?.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            currentItems?.map((product) => (
                                <TableProducts key={product.id} products={products} setProducts={setProducts} product={product} handleViewProduct={handleViewProduct} handleEditProduct={handleEditProduct} />
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