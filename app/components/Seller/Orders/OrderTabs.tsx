import { OrderCountsInterface, OrderStatus } from '@/app/types/types'
import React, { FC } from 'react'

type Props = {
    orderCounts: OrderCountsInterface,
    activeTab: OrderStatus,
    setActiveTab: (activeTab: OrderStatus) => void
}

const OrderTabs:FC<Props> = ({orderCounts ,activeTab ,setActiveTab}) => {
    return (
        <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
                {(['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]).map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === tab
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab} {tab !== 'All' && `(${orderCounts[tab]})`}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default OrderTabs