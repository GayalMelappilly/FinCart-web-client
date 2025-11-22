'use client'

import { useEffect, useState } from 'react';
import OrderStatistics from '@/app/components/Seller/Orders/OrderStatistics';
import OrderTable from '@/app/components/Seller/Orders/OrderTable';
import OrderTabs from '@/app/components/Seller/Orders/OrderTabs';
import { OrderStatus } from '@/app/types/types';
import SearchAndFilter from '@/app/components/Seller/Orders/SearchAndFilter';
import { useQuery } from '@tanstack/react-query';
import { orderStatistics } from '@/app/services/sellerAuthServices';
import { OrderStatisticsData } from '@/app/types/seller/orders/statisticsOrders';
import Spinner from '@/app/components/LoadingSpinner/Spinner';

export default function Orders() {
    const [activeTab, setActiveTab] = useState<OrderStatus>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [orderStatisticsData, setOrderStatisticsData] = useState<OrderStatisticsData>()

    const { data, isLoading, error } = useQuery({
        queryKey: ['get-order-statistics'],
        queryFn: orderStatistics,
    });

    useEffect(() => {
        console.log("Data in statistics : ", data)
        if (data?.data) {
            setOrderStatisticsData(data.data)
        }
    }, [data])

    if (isLoading) return (
        <div className="w-full h-full"> 
            <Spinner />
        </div>
    )
    if (error) return console.log("Error while fetching order statistcs", error)

    return (
        <>
            <OrderStatistics orderCounts={orderStatisticsData} />
            <div className="bg-white rounded-lg shadow mb-6">
                <OrderTabs orderCounts={orderStatisticsData} activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <OrderTable activeTab={activeTab} searchTerm={searchTerm} />
        </>
    );
}