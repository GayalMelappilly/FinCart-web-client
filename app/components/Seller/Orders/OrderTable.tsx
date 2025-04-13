'use client'

import { ordersMockData } from '@/app/datasets/seller/ordersData'
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp, Clock, Eye, TruckIcon } from 'lucide-react'
import React, { FC, useState } from 'react'

type Props = {
    activeTab: string,
    searchTerm: string
}

const OrderTable:FC<Props> = ({activeTab, searchTerm}) => {
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const filteredOrders = ordersMockData.filter(order => {
        // Filter by status
        if (activeTab !== 'All' && order.status !== activeTab) {
            return false;
        }

        // Filter by search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                order.id.toLowerCase().includes(searchLower) ||
                order.customer.toLowerCase().includes(searchLower) ||
                order.email.toLowerCase().includes(searchLower)
            );
        }

        return true;
    });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;

        switch (sortColumn) {
            case 'date':
                return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
            case 'amount':
                return multiplier * (a.amount - b.amount);
            case 'customer':
                return multiplier * a.customer.localeCompare(b.customer);
            default:
                return 0;
        }
    });

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status) {
            case 'Delivered':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'Shipped':
                return <TruckIcon className="h-4 w-4 text-blue-600" />;
            case 'Processing':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'Cancelled':
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('customer')}
                            >
                                <div className="flex items-center">
                                    Customer
                                    {sortColumn === 'customer' && (
                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                                    )}
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('date')}
                            >
                                <div className="flex items-center">
                                    Date
                                    {sortColumn === 'date' && (
                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                                    )}
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('amount')}
                            >
                                <div className="flex items-center">
                                    Amount
                                    {sortColumn === 'amount' && (
                                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                                    )}
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Payment
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                    {order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                                    <div className="text-xs text-gray-500">{order.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">${order.amount.toFixed(2)}</div>
                                    <div className="text-xs text-gray-500">{order.items} items</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="flex items-center">
                                        <StatusIcon status={order.status} />
                                        <span className={`ml-1.5 text-sm font-medium
                        ${order.status === 'Delivered' ? 'text-green-600' :
                                                order.status === 'Shipped' ? 'text-blue-600' :
                                                    order.status === 'Processing' ? 'text-yellow-600' :
                                                        'text-red-600'}`}
                                        >
                                            {order.status}
                                        </span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.payment === 'Paid' ? 'bg-green-100 text-green-800' :
                                            order.payment === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}
                                    >
                                        {order.payment}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                        <Eye className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedOrders.length}</span> of{' '}
                            <span className="font-medium">{ordersMockData.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Previous</span>
                                <ChevronDown className="h-5 w-5 rotate-90" />
                            </button>
                            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                1
                            </button>
                            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Next</span>
                                <ChevronDown className="h-5 w-5 -rotate-90" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderTable