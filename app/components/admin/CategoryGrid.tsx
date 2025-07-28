'use client'

import { useToast } from '@/app/providers/ToastProvider'
import { setFeaturedCategories } from '@/app/services/adminServices'
import { FishCategory } from '@/app/types/admin/types'
import { useMutation } from '@tanstack/react-query'
import { Edit, Eye, Grid3x3 } from 'lucide-react'
import React, { FC, useState } from 'react'
import LoadingAnimation from '../UploadingAnimation/UploadingAnimation'

type Props = {
    filteredCategories: FishCategory[],
    categorySearchQuery: string,
    // setShowCategoryModal : (showCategoryModal: boolean) => void
    setActiveTab: (activeTab: 'dashboard' | 'products' | 'categories') => void
}

const CategoryGrid: FC<Props> = React.memo(({ filteredCategories, categorySearchQuery, setActiveTab }) => {

    const [isFeatured, setIsFeatured] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>(false)

    const mutation = useMutation({
        mutationFn: setFeaturedCategories,
        onSuccess: (data) => {
            console.log(data);
            setLoading(false);
            setActiveTab('categories')
        },
        onError: (err) => {
            console.log('Delete item from cart error : ', err);
        }
    });

    const HandleFeatureChange = (id: string, featured: boolean) =>{
        const data = {
            id: id, 
            featured: !featured
        }
        setLoading(true)
        mutation.mutate(data)
    }

    // if(loading){
    //     return <LoadingAnimation />
    // }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
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
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                    <Edit className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {category.description && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                        )}

                        {/* Category Info */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                                <span className="text-sm font-medium text-gray-700">Featured</span>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={category.feature}
                                        onChange={() => {
                                            HandleFeatureChange(category.id, category.feature)
                                            category.feature = !category.feature
                                        }} 
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
                    <button
                        // onClick={() => setShowCategoryModal(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Create Category
                    </button>
                </div>
            )}
        </div>
    )
})

CategoryGrid.displayName = 'CategoryGrid';

export default CategoryGrid