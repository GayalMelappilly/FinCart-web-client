'use client'

import { Search } from 'lucide-react'
import React, { FC, useEffect, useMemo } from 'react'
import debounce from 'lodash.debounce';

type Props = {
    categorySearchQuery: string;
    setCategorySearchQuery: (val: string) => void;
}

const CategorySearch: FC<Props> = ({ categorySearchQuery, setCategorySearchQuery }) => {

    useEffect(() => {
        console.log(categorySearchQuery)
    }, [categorySearchQuery]);

    return (
        <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
                type="text"
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors w-full sm:w-64"
                value={categorySearchQuery}
                onChange={(e) => setCategorySearchQuery(e.target.value)}
            />
        </div>
    )
}

export default CategorySearch