import { Search } from 'lucide-react'
import React, { FC } from 'react'

type Props = {
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void
}

const SearchAndFilter:FC<Props> = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="p-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between">
            <div className="relative max-w-xs w-full">
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* <div className="flex space-x-2">
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    Filter
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50">
                    Export
                </button>
            </div> */}
        </div>
    )
}

export default SearchAndFilter