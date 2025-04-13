'use client'

import { useState } from 'react';
import OrderStatistics from '@/app/components/Seller/Orders/OrderStatistics';
import { ordersMockData } from '@/app/datasets/seller/ordersData';
import OrderTable from '@/app/components/Seller/Orders/OrderTable';
import OrderTabs from '@/app/components/Seller/Orders/OrderTabs';
import { OrderStatus } from '@/app/types/types';
import SearchAndFilter from '@/app/components/Seller/Orders/SearchAndFilter';

export default function Orders() {
    const [activeTab, setActiveTab] = useState<OrderStatus>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const orderCounts = {
        All: ordersMockData.length,
        Processing: ordersMockData.filter(o => o.status === 'Processing').length,
        Shipped: ordersMockData.filter(o => o.status === 'Shipped').length,
        Delivered: ordersMockData.filter(o => o.status === 'Delivered').length,
        Cancelled: ordersMockData.filter(o => o.status === 'Cancelled').length,
    };   

    return (
        <>
            <OrderStatistics orderCounts={orderCounts} />
            <div className="bg-white rounded-lg shadow mb-6">
                <OrderTabs orderCounts={orderCounts} activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <OrderTable activeTab={activeTab} searchTerm={searchTerm} />
        </>
    );
}