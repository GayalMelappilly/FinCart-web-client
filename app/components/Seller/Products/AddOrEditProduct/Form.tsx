'use client'

import ImageUploading from '@/app/components/LazyLoading/ImageUploading';
import { addProduct, editProduct } from '@/app/services/sellerAuthServices';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { IndianRupee, X, FileVideo } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react';

// Updated types based on fish_listings schema
export interface FishProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity_available: number;
    category: string | null;
    images: string[];
    videos: string[];
    is_featured: boolean;
    listing_status: 'active' | 'out_of_stock';
    created_at: string;
    updated_at: string;
    age?: string;
    size?: string;
    color?: string;
    breed?: string;
    care_instructions: Record<string, string>;
    dietary_requirements: Record<string, string>;
    view_count?: number;
    fish_categories?: { id: string, name: string }
}

export type FishProductView = 'list' | 'add' | 'edit' | 'view';

type Props = {
    products: FishProduct[] | undefined;
    setProducts: (products: FishProduct[]) => void;
    editableProduct: FishProduct | null;
    setEditableProduct: (editableProduct: FishProduct | null) => void;
    view: FishProductView;
    setView: (view: FishProductView) => void;
    categories: { id: number; name: string }[];
    refetch: UseQueryResult['refetch'];
    setLoading: (loading: boolean) => void
}

const Form: FC<Props> = ({
    products,
    setProducts,
    editableProduct,
    setEditableProduct,
    view,
    setView,
    categories,
    refetch,
    setLoading
}) => {

    const [uploading, setUploading] = useState<boolean>(false)

    useEffect(() => {
        console.log('Edit products while editing : ', editableProduct)
    }, [])

    const addMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (err) => {
            console.log('Add product error : ', err)
        }
    })

    const editMutation = useMutation({
        mutationFn: editProduct,
        onSuccess: (data) => {
            refetch()
            console.log(data)
            // setLoading(false)
        },
        onError: (err) => {
            console.log('Edit product error : ', err)
        }
    })

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editableProduct) return;

        // Update products list
        console.log('reached herer')
        if (view === 'add') {
            console.log('reached')
            if (products && products?.length > 0) {
                setProducts([...products, editableProduct]);
            } else {
                setProducts([editableProduct])
            }
            addMutation.mutate(editableProduct)
        } else {
            setLoading(true)
            setProducts([editableProduct])
            editMutation.mutate(editableProduct)
        }

        // Reset form and go back to list view
        setEditableProduct(null);
        setView('list');
    };

    // Function to handle care instructions field changes
    // const handleCareInstructionChange = (key: string, value: string) => {
    //     if (!editableProduct) return;

    //     setEditableProduct({
    //         ...editableProduct,
    //         care_instructions: {
    //             ...editableProduct.care_instructions,
    //             [key]: value
    //         }
    //     });
    // };

    // Function to remove a care instruction
    // const handleRemoveCareInstruction = (key: string) => {
    //     if (!editableProduct) return;

    //     const newCareInstructions = { ...editableProduct.care_instructions };
    //     delete newCareInstructions[key];

    //     setEditableProduct({
    //         ...editableProduct,
    //         care_instructions: newCareInstructions
    //     });
    // };

    // Function to add a care instruction field
    // const handleAddCareInstruction = () => {
    //     if (!editableProduct) return;

    //     setEditableProduct({
    //         ...editableProduct,
    //         care_instructions: {
    //             ...editableProduct.care_instructions,
    //             '': ''
    //         }
    //     });
    // };

    // Function to handle dietary requirements field changes
    // const handleDietaryRequirementChange = (key: string, value: string) => {
    //     if (!editableProduct) return;

    //     setEditableProduct({
    //         ...editableProduct,
    //         dietary_requirements: {
    //             ...editableProduct.dietary_requirements,
    //             [key]: value
    //         }
    //     });
    // };

    // Function to remove a dietary requirement
    // const handleRemoveDietaryRequirement = (key: string) => {
    //     if (!editableProduct) return;

    //     const newDietaryRequirements = { ...editableProduct.dietary_requirements };
    //     delete newDietaryRequirements[key];

    //     setEditableProduct({
    //         ...editableProduct,
    //         dietary_requirements: newDietaryRequirements
    //     });
    // };

    // Function to add a dietary requirement field
    // const handleAddDietaryRequirement = () => {
    //     if (!editableProduct) return;

    //     setEditableProduct({
    //         ...editableProduct,
    //         dietary_requirements: {
    //             ...editableProduct.dietary_requirements,
    //             '': ''
    //         }
    //     });
    // };

    const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editableProduct || !e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        if (!file) return;

        const isVideo = file.type.startsWith('video/');
        const isImage = file.type.startsWith('image/');

        if (!isImage && !isVideo) {
            console.error('Unsupported file type');
            return;
        }

        // Check file size limits
        const maxImageSize = 5 * 1024 * 1024; // 5MB for images
        const maxVideoSize = 50 * 1024 * 1024; // 50MB for videos

        if (isImage && file.size > maxImageSize) {
            alert('Image file is too large. Maximum size is 5MB.');
            return;
        }

        if (isVideo && file.size > maxVideoSize) {
            alert('Video file is too large. Maximum size is 50MB.');
            return;
        }

        // Proceed with upload...
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Data = reader.result as string;
            setUploading(true);

            try {
                const response = await fetch('/api/image-upload/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        [isImage ? 'image' : 'video']: base64Data
                    }),
                });

                const data = await response.json();

                if (data.url) {
                    const mediaUrl = data.url as string;

                    if (isImage) {
                        setEditableProduct({
                            ...editableProduct,
                            images: [...editableProduct.images, mediaUrl]
                        });
                    } else if (isVideo) {
                        setEditableProduct({
                            ...editableProduct,
                            videos: [...(editableProduct.videos || []), mediaUrl]
                        });
                    }
                }
            } catch (error) {
                console.error(`Error uploading ${isImage ? 'image' : 'video'}:`, error);
                if (error instanceof Error && error.message.includes('413')) {
                    alert('File is too large. Please try a smaller file.');
                }
            } finally {
                setUploading(false);
            }
        };
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
        // Handle regular inputs
        else {
            setEditableProduct({
                ...editableProduct,
                [name]: value
            });
        }
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
        <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div>
                                    <h2 className="text-lg font-medium mb-4 text-gray-700">Basic Information</h2>
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Fish Name*</label>
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
                                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
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
                                                    <IndianRupee className="absolute left-2 top-2.5 h-5 w-4 text-gray-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="quantity_available" className="block text-sm font-medium text-gray-700 mb-1">Quantity Available*</label>
                                                <input
                                                    type="number"
                                                    id="quantity_available"
                                                    name="quantity_available"
                                                    min="0"
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={editableProduct?.quantity_available || ''}
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
                                                <option value={editableProduct?.category || ''}>{editableProduct?.category || 'Select the category'}</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="listing_status" className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                                            <select
                                                id="listing_status"
                                                name="listing_status"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                value={editableProduct?.listing_status || 'active'}
                                                onChange={handleInputChange}
                                            >
                                                <option value="active">Active</option>
                                                <option value="out_of_stock">Out of Stock</option>
                                            </select>
                                        </div>

                                        {/* <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_featured"
                                                name="is_featured"
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                checked={editableProduct?.is_featured || false}
                                                onChange={(e) => {
                                                    if (editableProduct) {
                                                        setEditableProduct({
                                                            ...editableProduct,
                                                            is_featured: e.target.checked
                                                        })
                                                    }
                                                }}
                                            />
                                            <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                                                Feature this fish on homepage
                                            </label>
                                        </div> */}
                                    </div>
                                </div>

                                {/* Fish Characteristics */}
                                <div>
                                    <h2 className="text-lg font-medium mb-4 text-gray-700">Fish Characteristics</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* <div>
                                            <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">Breed/Species</label>
                                            <input
                                                type="text"
                                                id="breed"
                                                name="breed"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                value={editableProduct?.breed || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                            <input
                                                type="text"
                                                id="age"
                                                name="age"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                value={editableProduct?.age || ''}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 6 months"
                                            />
                                        </div> */}
                                        <div>
                                            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Size*</label>
                                            <input
                                                type="text"
                                                id="size"
                                                name="size"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                value={editableProduct?.size || ''}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 2 inches"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Dietary Requirements */}
                                {/* <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-medium text-gray-700">Dietary Requirements</h2>
                                        <button
                                            type="button"
                                            onClick={handleAddDietaryRequirement}
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            + Add Requirement
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {editableProduct && Object.entries(editableProduct.dietary_requirements || {}).map(([key, value], index) => (
                                            <div key={index} className="flex items-start space-x-2">
                                                <input
                                                    type="text"
                                                    placeholder="Type"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={key}
                                                    onChange={(e) => {
                                                        const newKey = e.target.value;
                                                        const newDietaryRequirements = { ...editableProduct.dietary_requirements };
                                                        if (key !== '') {
                                                            delete newDietaryRequirements[key];
                                                        }
                                                        newDietaryRequirements[newKey] = value;
                                                        setEditableProduct({
                                                            ...editableProduct,
                                                            dietary_requirements: newDietaryRequirements
                                                        });
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Details"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={value}
                                                    onChange={(e) => handleDietaryRequirementChange(key, e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveDietaryRequirement(key)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div>
                            <div className="space-y-6">
                                {/* Product Images */}
                                <div>
                                    <h2 className="text-lg font-medium mb-4 text-gray-700">Fish Images</h2>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {/* Existing Images */}
                                        {editableProduct?.images?.map((image, index) => (
                                            <div key={index} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center"
                                                    style={{ backgroundImage: `url('${image}')` }}
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
                                        {editableProduct?.videos?.map((video, index) => (
                                            <div key={`video-${index}`} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
                                                <video
                                                    className="w-full h-full object-cover"
                                                    muted
                                                    loop
                                                    preload="metadata"
                                                    onMouseEnter={(e) => e.currentTarget.play()}
                                                    onMouseLeave={(e) => e.currentTarget.pause()}
                                                >
                                                    <source src={video} type="video/mp4" />
                                                </video>

                                                <div className="absolute top-2 left-2 px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded">
                                                    Video
                                                </div>

                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:opacity-0 transition-opacity pointer-events-none">
                                                    <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    // onClick={() => handleRemoveVideo(index)}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 z-10"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}

                                        {uploading && (
                                            <ImageUploading />
                                        )}

                                        {/* Upload Button */}
                                        <div className="h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                className="hidden"
                                                accept="image/*,video/*"
                                                onChange={handleMediaUpload}
                                            />
                                            <label htmlFor="imageUpload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                                <FileVideo className="h-8 w-8 text-gray-400" />
                                                <span className="mt-2 text-sm text-gray-500">Add Image/Video</span>
                                            </label>
                                        </div>
                                    </div>

                                    <p className="mt-2 text-xs text-gray-500">
                                        Upload high-quality images/videos. First image will be the main fish image.
                                    </p>
                                </div>

                                {/* Care Instructions */}
                                {/* <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-medium text-gray-700">Care Instructions</h2>
                                        <button
                                            type="button"
                                            onClick={handleAddCareInstruction}
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            + Add Instruction
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {editableProduct && Object.entries(editableProduct.care_instructions || {}).map(([key, value], index) => (
                                            <div key={index} className="flex items-start space-x-2">
                                                <input
                                                    type="text"
                                                    placeholder="Topic"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={key}
                                                    onChange={(e) => {
                                                        const newKey = e.target.value;
                                                        const newCareInstructions = { ...editableProduct.care_instructions };
                                                        if (key !== '') {
                                                            delete newCareInstructions[key];
                                                        }
                                                        newCareInstructions[newKey] = value;
                                                        setEditableProduct({
                                                            ...editableProduct,
                                                            care_instructions: newCareInstructions
                                                        });
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Instructions"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                    value={value}
                                                    onChange={(e) => handleCareInstructionChange(key, e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCareInstruction(key)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}

                                {/* Advanced Info with help icon */}
                                {/* <div>
                                    <div className="flex items-center mb-4">
                                        <h2 className="text-lg font-medium text-gray-700">Additional Information</h2>
                                        <div className="ml-2 group relative">
                                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                                            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                                                Add more details about your fish to help buyers make informed decisions.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="tank_size" className="block text-sm font-medium text-gray-700 mb-1">Recommended Tank Size</label>
                                            <input
                                                type="text"
                                                id="tank_size"
                                                name="tank_size"
                                                placeholder="e.g., 10 gallons minimum"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                onChange={(e) => {
                                                    if (editableProduct) {
                                                        handleCareInstructionChange('tank_size', e.target.value);
                                                    }
                                                }}
                                                value={editableProduct?.care_instructions?.tank_size || ''}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="water_parameters" className="block text-sm font-medium text-gray-700 mb-1">Water Parameters</label>
                                            <input
                                                type="text"
                                                id="water_parameters"
                                                name="water_parameters"
                                                placeholder="e.g., pH 6.5-7.5, temperature 72-82°F"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                onChange={(e) => {
                                                    if (editableProduct) {
                                                        handleCareInstructionChange('water_parameters', e.target.value);
                                                    }
                                                }}
                                                value={editableProduct?.care_instructions?.water_parameters || ''}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="compatibility" className="block text-sm font-medium text-gray-700 mb-1">Compatibility</label>
                                            <input
                                                type="text"
                                                id="compatibility"
                                                name="compatibility"
                                                placeholder="e.g., peaceful, compatible with community fish"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                                onChange={(e) => {
                                                    if (editableProduct) {
                                                        handleCareInstructionChange('compatibility', e.target.value);
                                                    }
                                                }}
                                                value={editableProduct?.care_instructions?.compatibility || ''}
                                            />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                        <div>
                            {view === 'edit' && editableProduct?.updated_at && (
                                <span className="text-sm text-gray-500">
                                    Last updated: {new Date(editableProduct.updated_at).toLocaleString()}
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
                                {view === 'add' ? 'Add Fish Listing' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Form;