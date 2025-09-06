import { OrderStatisticsData } from '@/app/types/seller/orders/statisticsOrders';
import React, { FC } from 'react'

type Props = {
    orderCounts: OrderStatisticsData | undefined
}

const OrderStatistics:FC<Props> = ({orderCounts}) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{orderCounts?.totalOrders}</p>
                <div className="mt-2 text-xs text-gray-500">All time</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Processing</h3>
                <p className="text-2xl font-semibold text-yellow-600 mt-2">{orderCounts?.statusCounts.processing}</p>
                <div className="mt-2 text-xs text-gray-500">Needs your attention</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Shipped</h3>
                <p className="text-2xl font-semibold text-blue-600 mt-2">{orderCounts?.statusCounts.shipped}</p>
                <div className="mt-2 text-xs text-gray-500">In transit</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Delivered</h3>
                <p className="text-2xl font-semibold text-green-600 mt-2">{orderCounts?.statusCounts.delivered}</p>
                <div className="mt-2 text-xs text-gray-500">Successfully completed</div>
            </div>
        </div>
    )
}

export default OrderStatistics