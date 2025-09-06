import { OrderStatisticsData } from '@/app/types/seller/orders/statisticsOrders'
import { OrderStatus } from '@/app/types/types';
import React, { FC } from 'react'

type Props = {
    orderCounts: OrderStatisticsData | undefined,
    activeTab: OrderStatus,
    setActiveTab: (activeTab: OrderStatus) => void
}

const OrderTabs: FC<Props> = ({ orderCounts, activeTab, setActiveTab }) => {
    
    // Helper function to get count for each tab
    const getTabCount = (tab: OrderStatus): number | undefined => {
        if (!orderCounts) return undefined;
        
        if (tab === 'All') {
            return orderCounts.totalOrders;
        }
        
        // Convert tab to lowercase to match statusCounts keys
        const statusKey = tab.toLowerCase() as keyof typeof orderCounts.statusCounts;
        return orderCounts.statusCounts[statusKey];
    };

    return (
        <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
                {(['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]).map((tab) => {
                    const count = getTabCount(tab);
                    
                    return (
                        <button
                            key={tab}
                            className={`px-4 py-3 text-sm font-medium border-b-2 ${
                                activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab} {count !== undefined && `(${count})`}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTabs;
