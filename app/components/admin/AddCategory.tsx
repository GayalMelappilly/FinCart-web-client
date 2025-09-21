'use client'

import React, { useEffect, useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { addCategory, getAllCategoriesWithCount } from '@/app/services/adminServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

type CategoryType = {
    id: string;
    name: string
}

const AddCategoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parentCategory: '',
        feature: false
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [categories, setCategories] = useState<CategoryType[]>([])

    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['get-all-categories'],
        queryFn: getAllCategoriesWithCount,
    })

    useEffect(() => {
        console.log('Categories : ', data)
        setCategories(data?.list)
    }, [data])

    const createCategoryMutation = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            // Refresh the categories list
            queryClient.invalidateQueries({ queryKey: ['get-categories-with-count-admin'] });
            // Close modal and reset form
            onClose();
            resetForm();
        },
        onError: () => {
            setErrors({ submit: 'Failed to create category. Please try again.' });
        }
    });

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            parentCategory: '',
            feature: false
        });
        setErrors({});
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Category name must be at least 2 characters';
        }

        if (formData.description && formData.description.length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const categoryData = {
            name: formData.name.trim(),
            description: formData.description.trim() || undefined,
            parentCategory: formData.parentCategory || undefined,
            feature: formData.feature
        };

        createCategoryMutation.mutate(categoryData);
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto scrollbar-hide">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleClose} />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
                <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md mx-2 sm:mx-0 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto scrollbar-hide">
                    {/* Header */}
                    <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl sm:rounded-t-2xl">
                        <div className="flex-1 min-w-0 pr-4">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Add New Category</h2>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                            disabled={createCategoryMutation.isPending}
                        >
                            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                        {/* Category Name */}
                        <div>
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                                Category Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="categoryName"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter category name..."
                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
                                    }`}
                                disabled={createCategoryMutation.isPending}
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Parent Category */}
                        <div>
                            <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700 mb-2">
                                Parent Category
                            </label>
                            <select
                                id="parentCategory"
                                value={formData.parentCategory}
                                onChange={(e) => handleInputChange('parentCategory', e.target.value)}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors text-sm sm:text-base"
                                disabled={createCategoryMutation.isPending}
                            >
                                <option value="">Select parent category (optional)</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Enter category description..."
                                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm sm:text-base scrollbar-hide ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
                                    }`}
                                disabled={createCategoryMutation.isPending}
                            />
                            <div className="flex justify-between mt-1">
                                {errors.description && (
                                    <p className="text-xs sm:text-sm text-red-600">{errors.description}</p>
                                )}
                                <p className="text-xs sm:text-sm text-gray-500 ml-auto">
                                    {formData.description.length}/500
                                </p>
                            </div>
                        </div>

                        {/* Feature Toggle */}
                        <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1 min-w-0 pr-4">
                                <h3 className="text-sm font-medium text-gray-900">Featured Category</h3>
                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">Make this category featured on the homepage</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                <input
                                    type="checkbox"
                                    checked={formData.feature}
                                    onChange={(e) => handleInputChange('feature', e.target.checked)}
                                    className="sr-only peer"
                                    disabled={createCategoryMutation.isPending}
                                />
                                <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {/* Error Message */}
                        {errors.submit && (
                            <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-xs sm:text-sm text-red-600">{errors.submit}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4 bottom-0 bg-white pb-2 sm:pb-0">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium text-sm sm:text-base order-2 sm:order-1"
                                disabled={createCategoryMutation.isPending}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={createCategoryMutation.isPending}
                                className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2 text-sm sm:text-base order-1 sm:order-2"
                            >
                                {createCategoryMutation.isPending ? (
                                    <>
                                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span>Create Category</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Custom CSS for hiding scrollbars */}
            <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default AddCategoryModal;
