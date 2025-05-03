import { ArrowUpDown } from 'lucide-react'
import React, { FC } from 'react'
import { FishProduct } from '../AddOrEditProduct/Form';

type Props = {
    sortBy: {field: keyof FishProduct | ''; direction: 'asc' | 'desc'},
    setSortBy: (sortBy: {field: keyof FishProduct | ''; direction: 'asc' | 'desc'}) => void,
}

const TableHead:FC<Props> = ({ sortBy, setSortBy }) => {

    const handleSort = (field: keyof FishProduct) => {
        if (sortBy.field === field) {
            setSortBy({
                field,
                direction: sortBy.direction === 'asc' ? 'desc' : 'asc'
            });
        } else {
            setSortBy({
                field,
                direction: 'asc'
            });
        }
    };

    return (
        <thead className="bg-gray-50">
            <tr>
                {/* Sortable columns */}
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                >
                    <div className="flex items-center">
                        Product
                        {sortBy.field === 'name' && (
                            <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                    </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('price')}
                >
                    <div className="flex items-center">
                        Price
                        {sortBy.field === 'price' && (
                            <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                    </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('quantity_available')}
                >
                    <div className="flex items-center">
                        Stock
                        {sortBy.field === 'quantity_available' && (
                            <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                    </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('category')}
                >
                    <div className="flex items-center">
                        Category
                        {sortBy.field === 'category' && (
                            <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                    </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('listing_status')}
                >
                    <div className="flex items-center">
                        Status
                        {sortBy.field === 'listing_status' && (
                            <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                    </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('updated_at')}
                >
                    <div className="flex items-center">
                        Last Updated
                        {sortBy.field === 'updated_at' && (
                            <ArrowUpDown className="h-4 w-4 ml-1" />
                        )}
                    </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
    )
}

export default TableHead