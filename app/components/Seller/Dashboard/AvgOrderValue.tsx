import { ArrowDown, TrendingUp } from 'lucide-react'
import React from 'react'

const AvgOrderValue = () => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-lg bg-red-100">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                    <h3 className="text-lg font-semibold text-gray-900">$58.34</h3>
                    <div className="flex items-center text-xs mt-1">
                        <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-red-500">4.8%</span>
                        <span className="text-gray-400 ml-1">vs last month</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AvgOrderValue