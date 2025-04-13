import { ChevronRight } from 'lucide-react';
import React from 'react'

const recentOrders = [
    { id: '#ORD-7392', customer: 'John Cooper', date: '12 Apr 2025', amount: 120.50, status: 'Delivered' },
    { id: '#ORD-7393', customer: 'Emma Watson', date: '11 Apr 2025', amount: 85.25, status: 'Shipped' },
    { id: '#ORD-7394', customer: 'Michael Brown', date: '10 Apr 2025', amount: 210.75, status: 'Processing' },
    { id: '#ORD-7395', customer: 'Sarah Miller', date: '09 Apr 2025', amount: 45.60, status: 'Delivered' },
];

const RecentOrders = () => {
    return (
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="flex justify-between items-center p-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                    {order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.customer}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${order.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentOrders