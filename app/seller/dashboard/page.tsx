import TotalRevenue from '@/app/components/Seller/Dashboard/TotalRevenue';
import Orders from '@/app/components/Seller/Dashboard/Orders';
import Customers from '@/app/components/Seller/Dashboard/Customers';
import AvgOrderValue from '@/app/components/Seller/Dashboard/AvgOrderValue';
import SalesChart from '@/app/components/Seller/Dashboard/SalesChart';
import TopSellingProducts from '@/app/components/Seller/Dashboard/TopSellingProducts';
import RecentOrders from '@/app/components/Seller/Dashboard/RecentOrders';

export default function Dashboard() {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <TotalRevenue />
                <Orders />
                <Customers />
                <AvgOrderValue />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SalesChart />
                <TopSellingProducts />
            </div>
            <RecentOrders />
        </>
    );
}