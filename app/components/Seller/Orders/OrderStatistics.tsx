import { ordersMockData } from '@/app/datasets/seller/ordersData';
import { OrderCountsInterface } from '@/app/types/types';
import React, { FC } from 'react'

type Props = {
    orderCounts: OrderCountsInterface
}

const OrderStatistics:FC<Props> = ({orderCounts}) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{orderCounts.All}</p>
                <div className="mt-2 text-xs text-gray-500">All time</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Processing</h3>
                <p className="text-2xl font-semibold text-yellow-600 mt-2">{orderCounts.Processing}</p>
                <div className="mt-2 text-xs text-gray-500">Needs your attention</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Shipped</h3>
                <p className="text-2xl font-semibold text-blue-600 mt-2">{orderCounts.Shipped}</p>
                <div className="mt-2 text-xs text-gray-500">In transit</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">Delivered</h3>
                <p className="text-2xl font-semibold text-green-600 mt-2">{orderCounts.Delivered}</p>
                <div className="mt-2 text-xs text-gray-500">Successfully completed</div>
            </div>
        </div>
    )
}

export default OrderStatistics