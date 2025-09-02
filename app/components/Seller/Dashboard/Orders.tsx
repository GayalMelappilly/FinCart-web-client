import { MetricWithTrend } from '@/app/types/seller/sellerDetails/types'
import { ArrowDown, ArrowUp, ShoppingBag } from 'lucide-react'
import React, { FC, useEffect } from 'react'
import { roboto } from '../../Fonts/Fonts'
import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '@/app/services/sellerAuthServices'

type Props = {
    data: MetricWithTrend | undefined
}

const Orders:FC<Props> = ({data}) => {

    console.log("Order data : ",data)

    const orderData = useQuery({
        queryKey: ['get-all-orders'],
        queryFn: getAllOrders
    });

    useEffect(()=>{
        console.log("Order data : ",orderData.data)
    }, [orderData.data])

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-lg bg-green-100">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Orders</p>
                    <h3 className={`text-lg font-semibold text-gray-900 ${roboto.className}`}>{data?.total}</h3>
                    <div className="flex items-center text-xs mt-1">
                        {data?.trend == 'up' ? (
                            <>
                                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                                <span className="text-green-500">{data.percentChange}%</span>
                                <span className="text-gray-400 ml-1">vs last month</span>
                            </>
                        ) : (
                            
                            <>
                                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                                <span className="text-red-500">{data?.percentChange}%</span>
                                <span className="text-gray-400 ml-1">vs last month</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders