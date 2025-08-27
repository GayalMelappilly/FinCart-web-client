'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SellerData } from '@/app/types/seller/sellerDetails/types';

interface ChartDataItem {
    period: string;
    sales: number;
    type: 'actual' | 'estimated' | 'placeholder';
}

type TimeRange = 'weekly' | 'monthly' | 'yearly';

type Props = {
    sellerData: SellerData | null | undefined;
};

// Modern professional color palette
const SALES_COLORS = {
    actual: 'bg-gradient-to-t from-emerald-500 to-emerald-400',
    estimated: 'bg-gradient-to-t from-blue-500 to-blue-400',
    placeholder: 'bg-gradient-to-t from-slate-300 to-slate-200',
};

const SALES_HOVER_COLORS = {
    actual: 'hover:from-emerald-600 hover:to-emerald-500',
    estimated: 'hover:from-blue-600 hover:to-blue-500',
    placeholder: 'hover:from-slate-400 hover:to-slate-300',
};

const SALES_SHADOWS = {
    actual: 'shadow-lg shadow-emerald-200/50',
    estimated: 'shadow-lg shadow-blue-200/50',
    placeholder: 'shadow-lg shadow-slate-200/50',
};

const SalesChart: React.FC<Props> = ({ sellerData }) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
    const [salesData, setSalesData] = useState<ChartDataItem[]>([]);
    const [tooltip, setTooltip] = useState<{
        visible: boolean;
        x: number;
        y: number;
        data?: ChartDataItem;
    }>({ visible: false, x: 0, y: 0 });

    // Generate sales data
    useEffect(() => {
        if (!sellerData) return;
        let chartData: ChartDataItem[] = [];
        
        if (timeRange === 'monthly') {
            if (sellerData.salesChartData && sellerData.salesChartData.length > 0) {
                chartData = sellerData.salesChartData.map((item) => ({
                    period: item.month,
                    sales: Math.max(item.sales || 0, 10),
                    type: 'actual',
                }));
            } else {
                // Fallback: generate 8 months with variety in sales & type
                const totalSales = Math.max(sellerData.metrics?.totalSales || 0, 1200);
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                chartData = months.map((m, i) => ({
                    period: m,
                    sales: Math.round(totalSales / 8 + Math.random() * totalSales * 0.15),
                    type: (i < 5 ? 'actual' : i < 7 ? 'estimated' : 'placeholder') as ChartDataItem['type'],
                }));
            }
        } else if (timeRange === 'weekly') {
            if (sellerData.recentSales && sellerData.recentSales.length > 0) {
                chartData = sellerData.recentSales
                    .slice(-4)
                    .map((sale, i) => ({
                        period: `W${i + 1}`,
                        sales: Math.max(sale.dailySales || 0, 10),
                        type: 'actual' as ChartDataItem['type'],
                    }));
            } else {
                const totalSales = Math.max(sellerData.metrics?.totalSales || 0, 400);
                chartData = [
                    { period: 'W1', sales: Math.floor(totalSales * 0.2), type: 'actual' },
                    { period: 'W2', sales: Math.floor(totalSales * 0.22), type: 'actual' },
                    { period: 'W3', sales: Math.floor(totalSales * 0.21), type: 'estimated' },
                    { period: 'W4', sales: Math.floor(totalSales * 0.13), type: 'placeholder' },
                ];
            }
        } else if (timeRange === 'yearly') {
            const year = new Date().getFullYear();
            const totalSales = Math.max(sellerData.metrics?.totalSales || 0, 1500);
            chartData = [
                { period: `${year - 2}`, sales: Math.floor(totalSales * 0.64), type: 'estimated' },
                { period: `${year - 1}`, sales: Math.floor(totalSales * 0.79), type: 'estimated' },
                { period: `${year}`, sales: totalSales, type: 'actual' },
            ];
        }
        setSalesData(chartData);
    }, [sellerData, timeRange]);

    // Y-axis scale
    const maxSales = Math.max(...salesData.map((i) => i.sales), 100);

    // Metrics
    const totalSales = sellerData?.metrics?.totalSales || 0;
    const totalOrders = sellerData?.metrics?.totalOrders || 0;

    // Tooltip handling
    const chartRef = useRef<HTMLDivElement>(null);

    function handleBarMouseEnter(e: React.MouseEvent, data: ChartDataItem) {
        const chartElem = chartRef.current;
        if (!chartElem) return;
        const rect = chartElem.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            data,
        });
    }

    function handleBarMouseLeave() {
        setTooltip((prev) => ({ ...prev, visible: false }));
    }

    if (!sellerData)
        return (
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-center min-h-[24rem]">
                <div className="text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <div className="w-6 h-6 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Loading sales data...</p>
                </div>
            </div>
        );

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
            {/* Header */}
            <div className="p-6 pb-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                    <div className="flex-1">
                        <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">
                            Sales Overview
                        </h2>
                        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                                    Total Sales
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg lg:text-xl font-bold text-slate-900">
                                        ₹{totalSales.toLocaleString()}
                                    </span>
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                        revenueTrend === 'up' 
                                            ? 'bg-emerald-100 text-emerald-700' 
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        <span className="text-xs">
                                            {revenueTrend === 'up' ? '↗' : '↘'}
                                        </span>
                                        {Math.abs(Number(revenueChange))}%
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                                    Orders
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg lg:text-xl font-bold text-slate-900">
                                        {totalOrders.toLocaleString()}
                                    </span>
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                        ordersTrend === 'up' 
                                            ? 'bg-emerald-100 text-emerald-700' 
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        <span className="text-xs">
                                            {ordersTrend === 'up' ? '↗' : '↘'}
                                        </span>
                                        {Math.abs(Number(ordersChange))}%
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                                    Avg Order Value
                                </span>
                                <span className="text-lg lg:text-xl font-bold text-slate-900">
                                    ₹{avgOrderValue.toLocaleString()}
                                </span>
                            </div>
                        </div> */}
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex-shrink-0">
                        <div className="inline-flex bg-slate-100 p-1 rounded-xl">
                            {(['weekly', 'monthly', 'yearly'] as TimeRange[]).map((range) => (
                                <button
                                    key={range}
                                    type="button"
                                    className={`px-4 py-2 text-sm font-medium capitalize rounded-lg transition-all duration-200 ${
                                        timeRange === range
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                                    }`}
                                    onClick={() => setTimeRange(range)}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Container */}
            <div className="px-6 pb-6">
                <div ref={chartRef} className="relative h-64 sm:h-72 lg:h-80 w-full">
                    {/* Chart Area */}
                    <div className="absolute inset-0 pl-12 pr-4 mx-10 pb-1 pt-4">
                        <div className="h-full flex items-end justify-between gap-2">
                            {salesData.map((d, i) => {
                                const chartHeight = 240; // Fixed height in pixels for calculation (h-64 = 256px - padding)
                                const barHeight = Math.max(Math.round((d.sales / maxSales) * chartHeight * 0.85), 16); // pixel based height
                                return (
                                    <div key={`${d.period}-${i}`} className="flex flex-col items-center flex-1 max-w-[80px]">
                                        <div
                                            className={`
                                                w-full transition-all duration-300 cursor-pointer rounded-t-lg
                                                ${SALES_COLORS[d.type]}
                                                ${SALES_HOVER_COLORS[d.type]}
                                                ${SALES_SHADOWS[d.type]}
                                                hover:scale-105 hover:-translate-y-1
                                            `}
                                            style={{
                                                height: `${barHeight}px`,
                                            }}
                                            onMouseEnter={(e) => handleBarMouseEnter(e, d)}
                                            onMouseMove={(e) => handleBarMouseEnter(e, d)}
                                            onMouseLeave={handleBarMouseLeave}
                                        />
                                        <span className="text-xs font-medium text-slate-600 mt-3 text-center truncate w-full">
                                            {d.period}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-4 bottom-8 w-12 flex flex-col justify-between">
                        <span className="text-xs text-slate-500 text-right pr-2">
                            ₹{maxSales >= 1000 ? `${(maxSales / 1000).toFixed(0)}k` : maxSales.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 text-right pr-2">
                            ₹{maxSales * 0.75 >= 1000 ? `${(maxSales * 0.75 / 1000).toFixed(0)}k` : Math.round(maxSales * 0.75).toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 text-right pr-2">
                            ₹{maxSales * 0.5 >= 1000 ? `${(maxSales * 0.5 / 1000).toFixed(0)}k` : Math.round(maxSales * 0.5).toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 text-right pr-2">
                            ₹{maxSales * 0.25 >= 1000 ? `${(maxSales * 0.25 / 1000).toFixed(0)}k` : Math.round(maxSales * 0.25).toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 text-right pr-2">₹0</span>
                    </div>

                    {/* Grid lines */}
                    <div className="absolute left-12 right-4 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`border-t ${i === 4 ? 'border-slate-300' : 'border-slate-100'}`}
                            />
                        ))}
                    </div>

                    {/* Tooltip */}
                    {tooltip.visible && tooltip.data && (
                        <div
                            style={{
                                position: 'absolute',
                                left: Math.min(Math.max(tooltip.x - 70, 10), chartRef.current?.clientWidth ? chartRef.current.clientWidth - 150 : 0),
                                top: Math.max(tooltip.y - 90, 10),
                                zIndex: 50,
                                pointerEvents: 'none'
                            }}
                            className="bg-slate-800 text-white text-sm rounded-xl px-4 py-3 shadow-xl min-w-[140px] animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
                        >
                            <div className="font-semibold text-slate-200 text-xs uppercase tracking-wide">
                                {tooltip.data.period}
                            </div>
                            <div className="text-lg font-bold text-white mt-1">
                                ₹{tooltip.data.sales.toLocaleString()}
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${
                                    tooltip.data.type === 'actual' 
                                        ? 'bg-emerald-400' 
                                        : tooltip.data.type === 'estimated' 
                                        ? 'bg-blue-400' 
                                        : 'bg-slate-400'
                                }`} />
                                <span className="text-xs text-slate-300 capitalize">
                                    {tooltip.data.type === 'placeholder' ? 'No Data' : tooltip.data.type}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-sm" />
                            <span className="text-slate-600 font-medium">Actual</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-t from-blue-500 to-blue-400 shadow-sm" />
                            <span className="text-slate-600 font-medium">Estimated</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-t from-slate-300 to-slate-200 shadow-sm" />
                            <span className="text-slate-600 font-medium">No Data</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesChart;