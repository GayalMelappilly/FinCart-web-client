import { ArrowUp, ShoppingBag } from 'lucide-react'
import React from 'react'

const Orders = () => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-lg bg-green-100">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Orders</p>
                    <h3 className="text-lg font-semibold text-gray-900">145</h3>
                    <div className="flex items-center text-xs mt-1">
                        <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-green-500">12.3%</span>
                        <span className="text-gray-400 ml-1">vs last month</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders