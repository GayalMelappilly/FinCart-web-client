import { categories } from '@/app/datasets/seller/categories'
import { Filter } from 'lucide-react'
import React, { FC } from 'react'

type Props = {
  selectedCategory: string,
  setSelectedCategory: (selectedCategory: string) => void,
  statusFilter: string,
  setStatusFilter: (statusFilter: string) => void
}

const FilterProduct: FC<Props> = ({ selectedCategory, setSelectedCategory, statusFilter, setStatusFilter }) => {
  return (
    <>
      <div className="relative">
        <select
          // size={20}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
            <option>
              All Categories
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
        <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border text-gray-800 placeholder:text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </>
  )
}

export default FilterProduct