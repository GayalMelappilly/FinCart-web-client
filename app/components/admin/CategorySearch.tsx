'use client'

import { Search, X } from 'lucide-react'
import React, { FC } from 'react'

type Props = {
  categorySearchQuery: string;
  setCategorySearchQuery: (categorySearchQuery: string) => void;
}

const CategorySearch: FC<Props> = ({ categorySearchQuery, setCategorySearchQuery }) => {
  const handleClear = () => setCategorySearchQuery('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setCategorySearchQuery(e.target.value);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search categories..."
        className="pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors w-full sm:w-64"
        value={categorySearchQuery}
        onChange={(e) => handleChange(e)}
        autoComplete="off"
      />
      {!!categorySearchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default CategorySearch
