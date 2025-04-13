import { Search } from 'lucide-react'
import React, { FC } from 'react'

type Props = {
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void
}

const SearchProduct:FC<Props> = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
    )
}

export default SearchProduct