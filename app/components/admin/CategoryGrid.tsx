'use client'

import { categories } from '@/app/datasets/seller/categories'
import { useToast } from '@/app/providers/ToastProvider'
import { deleteFishCategory, setFeaturedCategories, updateFishCategory } from '@/app/services/adminServices'
import { FishCategory } from '@/app/types/admin/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, Grid3x3, X, Upload, AlertCircle, Trash } from 'lucide-react'
import React, { FC, useState, useEffect } from 'react'

type Props = {
    categorySearchQuery: string,
    setActiveTab: (activeTab: 'dashboard' | 'products' | 'categories') => void,
    allCategories: FishCategory[], // For parent category selection
    setAllCategories: React.Dispatch<React.SetStateAction<FishCategory[]>>
}

const CategoryGrid: FC<Props> = React.memo(({ categorySearchQuery, allCategories, setAllCategories }) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<FishCategory | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        parentCategory: '',
        feature: false
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const queryClient = useQueryClient()

    const { showToast } = useToast()

    const updateMutation = useMutation({
        mutationFn: updateFishCategory,
        onSuccess: (data) => {
            const updatedCategory = data.data
            const index = allCategories.findIndex(cat => cat.id === updatedCategory.id)

            if (index !== -1) {
                setAllCategories((prev: FishCategory[]) => {
                    const updated = [...prev]
                    updated[index] = {
                        id: updatedCategory.id,
                        name: updatedCategory.name,
                        description: updatedCategory.description,
                        feature: updatedCategory.feature,
                        imageUrl: updatedCategory.image_url,
                        parentCategoryId: updatedCategory.parent_category_id,
                        parentCategory: updatedCategory.fish_categories ? {
                            id: updatedCategory.fish_categories.id,
                            name: updatedCategory.fish_categories.name,
                        } : null,
                        childCategories: updatedCategory.other_fish_categories || [],
                        productCount: updatedCategory._count?.fish_listings || 0,
                        createdAt: updatedCategory.created_at,
                        updatedAt: updatedCategory.updated_at,
                    }
                    return updated
                })
            }

            console.log('Category updated:', data)
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            setShowEditModal(false)
            setSelectedCategory(null)
            setErrors({})
        },
        onError: (err: unknown) => {
            console.error('Update category error:', err)
            setErrors({ submit: 'Failed to update category' })
        }
    })

    const featureMutation = useMutation({
        mutationFn: setFeaturedCategories,
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
        onError: (err) => {
            console.log('Feature toggle error:', err)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteFishCategory,
        onSuccess: (data) => {
            if(data.success){
                const updatedCategories = allCategories.filter(category => category.id !== data.data.id);
                setAllCategories(updatedCategories)
                console.log('Successfully deleted category : ',data)
            }else{
                console.log("Couldn't delete category : ",data)
            }
        },
        onError: (err: unknown) => {
            console.error('Update category error:', err)
            setErrors({ submit: 'Failed to update category' })
        }
    })

    useEffect(() => {
        if (selectedCategory) {
            setFormData({
                name: selectedCategory.name || '',
                description: selectedCategory.description || '',
                imageUrl: selectedCategory.imageUrl || '',
                parentCategory: selectedCategory.parentCategory?.name || '',
                feature: selectedCategory.feature || false
            })
        }
    }, [selectedCategory])

    const handleEditClick = (category: FishCategory) => {
        setSelectedCategory(category)
        setShowEditModal(true)
        setErrors({})
    }

    const handleDeleteClick = (id: string, count: number, name: string) => {
        if(count === 0){
            deleteMutation.mutate(id)
        }else{
            showToast('error', `This category can't be deleted. Products have been already listed under ${name}`)
        }
    }

    const handleCloseModal = () => {
        setShowEditModal(false)
        setSelectedCategory(null)
        setErrors({})
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Category name must be at least 2 characters'
        }

        if (formData.parentCategory && formData.parentCategory === selectedCategory?.name) {
            newErrors.parentCategory = 'A category cannot be its own parent'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm() || !selectedCategory) return

        const updateData = {
            id: selectedCategory.id,
            categoryData: {
                name: formData.name.trim(),
                description: formData.description.trim(),
                imageUrl: formData.imageUrl.trim(),
                parentCategory: formData.parentCategory.trim(),
                feature: formData.feature
            }
        }

        updateMutation.mutate(updateData)
    }

    const handleFeatureChange = (category: FishCategory) => {
        const data = {
            id: category.id,
            featured: !category.feature
        }
        category.feature = !category.feature
        featureMutation.mutate(data)
    }

    // const availableParentCategories = allCategories?.filter(
    //     cat => cat.id !== selectedCategory?.id
    // )

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCategories?.length > 0 ? (
                    allCategories?.map(category => (
                        <div key={category.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                                        <Grid3x3 className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
                                        <p className="text-sm text-gray-500">{category.productCount} products</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleDeleteClick(category.id, category.productCount, category.name)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash className='h-4 w-4' />
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(category)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {category.description && (
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                            )}

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                                    <span className="text-sm font-medium text-gray-700">Featured</span>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={category.feature}
                                            onChange={() => handleFeatureChange(category)}
                                        />
                                        <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition-colors duration-300">
                                            <div className={`absolute ${category.feature ? 'right-1' : 'left-1'} top-1 w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300`}></div>
                                        </div>
                                    </label>
                                </div>

                                {category.parentCategory && (
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-700">Parent Category</span>
                                        <span className="text-sm text-gray-600">{category.parentCategory.name}</span>
                                    </div>
                                )}

                                {category.childCategories && category.childCategories.length > 0 && (
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-700 block mb-2">
                                            Subcategories ({category.childCategories.length})
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {category.childCategories.slice(0, 3).map((child: { id: string, name: string }) => (
                                                <span key={child.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                    {child.name}
                                                </span>
                                            ))}
                                            {category.childCategories.length > 3 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                    +{category.childCategories.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <Grid3x3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {categorySearchQuery ? 'No matching categories found' : 'No Categories Yet'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {categorySearchQuery
                                ? 'Try adjusting your search query'
                                : 'Start by creating your first product category.'}
                        </p>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Create Category
                        </button>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {showEditModal && selectedCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                                    <Edit className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Edit Category</h2>
                                    <p className="text-sm text-gray-500">Update category information</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-5">
                            {/* Error Alert */}
                            {errors.submit && (
                                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                                    <p className="text-sm text-red-800">{errors.submit}</p>
                                </div>
                            )}

                            {/* Category Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value })
                                        setErrors({ ...errors, name: '' })
                                    }}
                                    className={`w-full px-4 py-2.5 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                    placeholder="Enter category name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Enter category description"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    <Upload className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Parent Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Parent Category
                                </label>
                                <select
                                    value={formData.parentCategory}
                                    onChange={(e) => {
                                        setFormData({ ...formData, parentCategory: e.target.value })
                                        setErrors({ ...errors, parentCategory: '' })
                                    }}
                                    className={`w-full px-4 py-2.5 border ${errors.parentCategory ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                                >
                                    <option value="">None (Root Category)</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.parentCategory && (
                                    <p className="mt-1 text-sm text-red-600">{errors.parentCategory}</p>
                                )}
                            </div>

                            {/* Featured Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Featured Category</label>
                                    <p className="text-xs text-gray-500 mt-0.5">Display this category prominently</p>
                                </div>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.feature}
                                        onChange={(e) => setFormData({ ...formData, feature: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition-colors duration-300">
                                        <div className={`absolute ${formData.feature ? 'right-1' : 'left-1'} top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300`}></div>
                                    </div>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    disabled={updateMutation.isPending}
                                    className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={updateMutation.isPending}
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {updateMutation.isPending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Category'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
})

CategoryGrid.displayName = 'CategoryGrid'

export default CategoryGrid