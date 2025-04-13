import { categories } from '@/app/datasets/seller/categories';
import { Product, ProductView } from '@/app/types/types';
import { DollarSign, FileImage, Info, X } from 'lucide-react';
import React, { FC } from 'react'

type Props = {
    products: Product[],
    setProducts: (products: Product[]) => void,
    editableProduct: Product | null,
    setEditableProduct: (editableProduct: Product | null) => void,
    view: ProductView,
    setView: (view: ProductView) => void
}

const Form: FC<Props> = ({ products, setProducts, editableProduct, setEditableProduct, view, setView }) => {

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editableProduct) return;

        // Update products list
        if (view === 'add') {
            setProducts([...products, editableProduct]);
        } else {
            setProducts(products.map(p => p.id === editableProduct.id ? editableProduct : p));
        }

        // Reset form and go back to list view
        setEditableProduct(null);
        setView('list');
    };

    // Function to handle specification field changes
    const handleSpecificationChange = (oldKey: string, newKey: string, value: string) => {
        if (!editableProduct) return;

        const newSpecifications = { ...editableProduct.specifications };

        // Delete old key if it exists and is being renamed
        if (oldKey && oldKey !== newKey) {
            delete newSpecifications[oldKey];
        }

        // Add new key-value pair
        newSpecifications[newKey] = value;

        setEditableProduct({
            ...editableProduct,
            specifications: newSpecifications
        });
    };

    // Function to remove a specification
    const handleRemoveSpecification = (key: string) => {
        if (!editableProduct) return;

        const newSpecifications = { ...editableProduct.specifications };
        delete newSpecifications[key];

        setEditableProduct({
            ...editableProduct,
            specifications: newSpecifications
        });
    };

    // Function to handle file uploads
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editableProduct || !e.target.files || e.target.files.length === 0) return;

        // In a real app, this would upload the file to a server
        // Here we just simulate a file upload with a URL
        const mockImageUrl = `/products/${Date.now()}-${e.target.files[0].name}`;

        setEditableProduct({
            ...editableProduct,
            images: [...editableProduct.images, mockImageUrl]
        });

        // Reset the input
        e.target.value = '';
    };

    // Function to handle input changes in add/edit form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (!editableProduct) return;

        // Handle special cases like checkboxes
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setEditableProduct({
                ...editableProduct,
                [name]: checked
            });
        }
        // Handle numbers
        else if (type === 'number') {
            setEditableProduct({
                ...editableProduct,
                [name]: parseFloat(value)
            });
        }
        // Handle specifications (dot notation in name)
        else if (name.startsWith('spec.')) {
            const specKey = name.split('.')[1];
            setEditableProduct({
                ...editableProduct,
                specifications: {
                    ...editableProduct.specifications,
                    [specKey]: value
                }
            });
        }
        // Handle tags (comma separated values)
        else if (name === 'tags') {
            setEditableProduct({
                ...editableProduct,
                tags: value.split(',').map(tag => tag.trim())
            });
        }
        // Handle regular inputs
        else {
            setEditableProduct({
                ...editableProduct,
                [name]: value
            });
        }
    };

    // Function to add a specification field
    const handleAddSpecification = () => {
        if (!editableProduct) return;

        setEditableProduct({
            ...editableProduct,
            specifications: {
                ...editableProduct.specifications,
                '': ''
            }
        });
    };

    // Function to remove an image
    const handleRemoveImage = (index: number) => {
        if (!editableProduct) return;

        const newImages = [...editableProduct.images];
        newImages.splice(index, 1);

        setEditableProduct({
            ...editableProduct,
            images: newImages
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div>
                                    {/* Basic Info */}
                                    <div>
                                        <h2 className="text-lg font-medium mb-4 text-gray-700">Basic Information</h2>
                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={editableProduct?.name || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows={4}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={editableProduct?.description || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($)*</label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            id="price"
                                                            name="price"
                                                            min="0"
                                                            step="0.01"
                                                            required
                                                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                            value={editableProduct?.price || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                                                    <input
                                                        type="number"
                                                        id="stock"
                                                        name="stock"
                                                        min="0"
                                                        required
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                        value={editableProduct?.stock || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                                                <select
                                                    id="category"
                                                    name="category"
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={editableProduct?.category || ''}
                                                    onChange={handleInputChange}
                                                >
                                                    {categories.slice(1).map((category) => (
                                                        <option key={category} value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                                                <select
                                                    id="status"
                                                    name="status"
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={editableProduct?.status || ''}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="draft">Draft</option>
                                                    <option value="out_of_stock">Out of Stock</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="featured"
                                                    name="featured"
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    checked={editableProduct?.featured}
                                                    onChange={(e) => {
                                                        if (editableProduct) {
                                                            setEditableProduct({
                                                                ...editableProduct,
                                                                featured: e.target.checked
                                                            })
                                                        }
                                                    }}
                                                />
                                                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                                                    Feature this product on homepage
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Specifications */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-medium text-gray-700">Specifications</h2>
                                            <button
                                                type="button"
                                                onClick={handleAddSpecification}
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                + Add Specification
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {editableProduct && Object.entries(editableProduct.specifications).map(([key, value], index) => (
                                                <div key={index} className="flex items-start space-x-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Name"
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                        value={key}
                                                        onChange={(e) => handleSpecificationChange(key, e.target.value, value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Value"
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                        value={value}
                                                        onChange={(e) => handleSpecificationChange(key, key, e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSpecification(key)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div>
                                <div className="space-y-6">
                                    {/* Product Images */}
                                    <div>
                                        <h2 className="text-lg font-medium mb-4 text-gray-700">Product Images</h2>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {/* Existing Images */}
                                            {editableProduct?.images.map((image, index) => (
                                                <div key={index} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center"
                                                        style={{ backgroundImage: `url('/api/placeholder/300/300')` }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Upload Button */}
                                            <div className="h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer">
                                                <input
                                                    type="file"
                                                    id="imageUpload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                />
                                                <label htmlFor="imageUpload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                                    <FileImage className="h-8 w-8 text-gray-400" />
                                                    <span className="mt-2 text-sm text-gray-500">Add Image</span>
                                                </label>
                                            </div>
                                        </div>

                                        <p className="mt-2 text-xs text-gray-500">
                                            Upload high-quality images. First image will be the main product image.
                                        </p>
                                    </div>

                                    {/* Additional Details */}
                                    <div>
                                        <h2 className="text-lg font-medium mb-4 text-gray-700">Additional Details</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                                                <input
                                                    type="text"
                                                    id="weight"
                                                    name="weight"
                                                    placeholder="e.g., 0.2 lbs"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={editableProduct?.weight || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                                                <input
                                                    type="text"
                                                    id="dimensions"
                                                    name="dimensions"
                                                    placeholder="e.g., 5 × 3 × 2 inches"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={editableProduct?.dimensions || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                                <input
                                                    type="text"
                                                    id="tags"
                                                    name="tags"
                                                    placeholder="e.g., reef safe, beginner friendly (comma separated)"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={editableProduct?.tags.join(', ')}
                                                    onChange={handleInputChange}
                                                />
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Tags help customers find your products. Separate each tag with a comma.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SEO Section */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <h2 className="text-lg font-medium text-gray-700">SEO Information</h2>
                                            <div className="ml-2 group relative">
                                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                                                <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                                                    Optimize your product visibility in search results by adding relevant SEO information.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                                                <input
                                                    type="text"
                                                    id="metaTitle"
                                                    name="metaTitle"
                                                    placeholder="Keep under 60 characters for best results"
                                                    maxLength={60}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                                                <textarea
                                                    id="metaDescription"
                                                    name="metaDescription"
                                                    rows={3}
                                                    placeholder="Keep under 160 characters for best results"
                                                    maxLength={160}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                        <div>
                            {view === 'edit' && (
                                <span className="text-sm text-gray-500">
                                    Last updated: {editableProduct && new Date(editableProduct?.updatedAt).toLocaleString()}
                                </span>
                            )}
                        </div>
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditableProduct(null);
                                    setView('list');
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {view === 'add' ? 'Add Product' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Form