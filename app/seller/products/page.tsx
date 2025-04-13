'use client'

import { useState } from 'react';
import { Plus, Edit } from 'lucide-react';
import ProductsTable from '@/app/components/Seller/Products/ProductsTable';
import RelatedProducts from '@/app/components/Seller/Products/RelatedProducts';
import ProductDetails from '@/app/components/Seller/Products/ViewProduct/ProductDetails';
import Form from '@/app/components/Seller/Products/AddOrEditProduct/Form';
import SearchProduct from '@/app/components/Seller/Products/SearchProduct';
import FilterProduct from '@/app/components/Seller/Products/FilterProduct';
import { Product, ProductView } from '@/app/types/types';
import { productsMock } from '@/app/datasets/seller/productsData';

export default function Products() {
    const [products, setProducts] = useState<Product[]>(productsMock);
    const [view, setView] = useState<ProductView>('list');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editableProduct, setEditableProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState<{ field: keyof Product | ''; direction: 'asc' | 'desc' }>({ field: '', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Function to handle filtering and sorting
    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;

            const matchesStatus = statusFilter === 'All' ||
                (statusFilter === 'Active' && product.status === 'active') ||
                (statusFilter === 'Draft' && product.status === 'draft') ||
                (statusFilter === 'Out of Stock' && product.status === 'out_of_stock');

            return matchesSearch && matchesCategory && matchesStatus;
        })
        .sort((a, b) => {
            if (!sortBy.field) return 0;

            const fieldA = a[sortBy.field as keyof Product];
            const fieldB = b[sortBy.field as keyof Product];

            if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                return sortBy.direction === 'asc'
                    ? fieldA.localeCompare(fieldB)
                    : fieldB.localeCompare(fieldA);
            }

            if (typeof fieldA === 'number' && typeof fieldB === 'number') {
                return sortBy.direction === 'asc'
                    ? fieldA - fieldB
                    : fieldB - fieldA;
            }

            return 0;
        });

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Function to handle adding new product
    const handleAddProduct = () => {
        const newProduct: Product = {
            id: `PROD-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: 'Saltwater Fish',
            images: [],
            featured: false,
            status: 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            specifications: {},
            weight: '',
            dimensions: '',
            tags: []
        };

        setEditableProduct(newProduct);
        setView('add');
    };

    const handleViewProduct = (product: Product) => {
        setSelectedProduct(product);
        setView('view');
    };

    // Function to handle editing a product
    const handleEditProduct = (product: Product) => {
        setEditableProduct({ ...product });
        setView('edit');
    };

    return (
        <>
            {/* Product List View */}
            {view === 'list' && (
                <div>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Manage Products</h1>
                        <button
                            onClick={handleAddProduct}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-5 w-5 mr-1" />
                            Add New Product
                        </button>
                    </div>

                    {/* Filter and Search */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <FilterProduct selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

                            {/* Results Count */}
                            <div className="flex items-center justify-end">
                                <span className="text-sm text-gray-600">
                                    Showing {Math.min(filteredProducts.length, currentItems.length)} of {filteredProducts.length} products
                                </span>
                            </div>
                        </div>
                    </div>
                    <ProductsTable
                        products={products}
                        setProducts={setProducts}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        filteredProducts={filteredProducts}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        totalPages={totalPages}
                        currentItems={currentItems}
                        handleViewProduct={handleViewProduct}
                        handleEditProduct={handleEditProduct}
                    />
                </div>
            )}

            {/* Add/Edit Product Form */}
            {(view === 'add' || view === 'edit') && editableProduct && (
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {view === 'add' ? 'Add New Product' : 'Edit Product'}
                        </h1>
                        <button
                            onClick={() => {
                                setEditableProduct(null);
                                setView('list');
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                    <Form products={products} setProducts={setProducts} editableProduct={editableProduct} setEditableProduct={setEditableProduct} view={view} setView={setView} />
                </div>
            )}

            {/* View Product Details */}
            {view === 'view' && selectedProduct && (
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => handleEditProduct(selectedProduct)}
                                className="flex items-center px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Edit className="h-5 w-5 mr-1" />
                                Edit
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Back to List
                            </button>
                        </div>
                    </div>
                    <ProductDetails product={selectedProduct} />
                    <RelatedProducts product={selectedProduct} />
                </div>
            )}
        </>
    );
}