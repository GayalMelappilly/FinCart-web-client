'use client'

import React, { useState } from 'react'

type Props = {}

const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
    { month: 'Jul', sales: 7000 },
];

const SalesChart = (props: Props) => {

    const [timeRange, setTimeRange] = useState('monthly');

    const maxSales = Math.max(...salesData.map(item => item.sales));

    return (
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
                <div className="flex space-x-2">
                    <button
                        className={`px-3 py-1 text-xs rounded-md ${timeRange === 'weekly' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                        onClick={() => setTimeRange('weekly')}
                    >
                        Weekly
                    </button>
                    <button
                        className={`px-3 py-1 text-xs rounded-md ${timeRange === 'monthly' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                        onClick={() => setTimeRange('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-3 py-1 text-xs rounded-md ${timeRange === 'yearly' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                        onClick={() => setTimeRange('yearly')}
                    >
                        Yearly
                    </button>
                </div>
            </div>
            <div className="h-64 relative">
                <div className="flex h-full items-end space-x-2">
                    {salesData.map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                                className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-all"
                                style={{ height: `${(data.sales / maxSales) * 100}%` }}
                            ></div>
                            <span className="text-xs mt-2 text-gray-600">{data.month}</span>
                        </div>
                    ))}
                </div>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                    <span>₹{maxSales}</span>
                    <span>₹{maxSales * 0.75}</span>
                    <span>₹{maxSales * 0.5}</span>
                    <span>₹{maxSales * 0.25}</span>
                    <span>₹0</span>
                </div>
            </div>
        </div>
    )
}

export default SalesChart