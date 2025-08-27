'use client'

import TotalRevenue from '@/app/components/Seller/Dashboard/TotalRevenue';
import Orders from '@/app/components/Seller/Dashboard/Orders';
import Customers from '@/app/components/Seller/Dashboard/Customers';
import AvgOrderValue from '@/app/components/Seller/Dashboard/AvgOrderValue';
import SalesChart from '@/app/components/Seller/Dashboard/SalesChart';
import TopSellingProducts from '@/app/components/Seller/Dashboard/TopSellingProducts';
import RecentOrders from '@/app/components/Seller/Dashboard/RecentOrders';
import { useEffect, useState } from 'react';
import { SellerData } from '@/app/types/seller/sellerDetails/types';

export default function Dashboard() {

    const [seller, setSeller] = useState<SellerData | null>()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSeller(JSON.parse(localStorage.getItem('seller') as string))
        }
    }, []);

    useEffect(() => {
        console.log('seller : ', seller)
    }, [seller])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <TotalRevenue data={seller?.metrics.dashboard.revenue} />
                <Orders data={seller?.metrics.dashboard.orders} />
                <Customers data={seller?.metrics.dashboard.customers} />
                <AvgOrderValue data={seller?.metrics.dashboard.avgOrderValue} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SalesChart sellerData={seller} />
                <TopSellingProducts data={seller?.topSellingProducts} />
            </div>
            <RecentOrders recentOrder={seller?.recentOrders} />
        </>
    );
}