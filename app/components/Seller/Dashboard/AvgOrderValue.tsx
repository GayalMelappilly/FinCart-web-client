import { ArrowDown, ArrowUp, TrendingUp } from 'lucide-react'
import React, { FC } from 'react'
import { MetricWithTrend } from '@/app/types/seller/sellerDetails/types'
import { roboto } from '../../Fonts/Fonts'

type Props = {
    data: MetricWithTrend | undefined
}

const AvgOrderValue: FC<Props> = ({ data }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-lg bg-red-100">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
                    <h3 className={`text-lg font-semibold text-gray-900 ${roboto.className}`}>₹{data?.total}</h3>
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

export default AvgOrderValue