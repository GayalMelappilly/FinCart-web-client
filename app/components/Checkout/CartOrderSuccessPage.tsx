import React from 'react';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Calendar, Clock, MapPin, Store } from 'lucide-react';
import Link from 'next/link';
import { PostCartOrderDetails, ShippingDetailsType } from '@/app/types/types';

type Props = {
    shippingDetails: ShippingDetailsType;
    details: PostCartOrderDetails | undefined;
}

const CartOrderSuccessPage: React.FC<Props> = ({ shippingDetails, details }) => {
    console.log('Cart order details:', details);

    const orderSummary = {
        totalOrders: details?.orders.length || 0,
        totalItems: details?.summary.itemsCheckedOut || 0,
        totalAmount: `₹${details?.summary.totalAmount}`,
        sellersCount: details?.summary.sellersCount || 0,
        pointsEarned: details?.summary.totalPointsEarned || 0,
        pointsUsed: details?.summary.pointsUsed || 0,
        totalDiscount: details?.summary.totalDiscount || 0,
        email: shippingDetails.email,
        shippingAddress: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}`
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-5 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full transition-all duration-1000 transform">
                {/* Main success card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-sm border border-gray-100">
                    {/* Success header */}
                    <div className="text-center mb-6 sm:mb-8 md:mb-12">
                        <div className="relative inline-block">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
                                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-600 animate-pulse" />
                            </div>
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-full animate-ping"></div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 animate-fade-in px-2">
                            Orders Placed Successfully! 🎉
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 animate-fade-in delay-300 px-2">
                            Thank you for your purchase. Your {orderSummary.totalOrders} order{orderSummary.totalOrders > 1 ? 's are' : ' is'} being processed.
                        </p>
                    </div>

                    {/* Order summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
                        {/* Order summary info */}
                        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                                Order Summary
                            </h3>
                            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Orders:</span>
                                    <span className="font-medium">{orderSummary.totalOrders}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Items:</span>
                                    <span className="font-medium">{orderSummary.totalItems}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sellers:</span>
                                    <span className="font-medium">{orderSummary.sellersCount}</span>
                                </div>
                                {orderSummary.totalDiscount > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discount:</span>
                                        <span className="font-medium text-green-600">-₹{orderSummary.totalDiscount}</span>
                                    </div>
                                )}
                                {orderSummary.pointsUsed > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Points Used:</span>
                                        <span className="font-medium text-blue-600">{orderSummary.pointsUsed}</span>
                                    </div>
                                )}
                                {orderSummary.pointsEarned > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Points Earned:</span>
                                        <span className="font-medium text-emerald-600">+{orderSummary.pointsEarned}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-t pt-2 mt-2">
                                    <span className="text-gray-600 font-medium">Total Amount:</span>
                                    <span className="font-bold text-emerald-600">{orderSummary.totalAmount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery info */}
                        <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                                <Truck className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                                Delivery Information
                            </h3>
                            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <div className="flex items-start">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 break-words">{orderSummary.shippingAddress}</span>
                                </div>
                                <div className="flex items-start">
                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 break-words">{orderSummary.email}</span>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">Processing time: 1-2 business days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Individual orders */}
                    {details?.orders && details.orders.length > 0 && (
                        <div className="mb-6 sm:mb-8 md:mb-12">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Order Details</h3>
                            <div className="space-y-4">
                                {details.orders.map((order, index) => (
                                    <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Store className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                                    <h4 className="font-semibold text-gray-900 truncate">{order.seller.businessName}</h4>
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                                                    <div className="flex justify-between">
                                                        <span>Order ID:</span>
                                                        <span className="font-mono text-right ml-2 break-all">{order.orderId}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Items:</span>
                                                        <span>{order.itemCount}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Amount:</span>
                                                        <span className="font-semibold text-emerald-600">₹{order.totalAmount}</span>
                                                    </div>
                                                    {order.pointsEarned > 0 && (
                                                        <div className="flex justify-between">
                                                            <span>Points Earned:</span>
                                                            <span className="font-semibold text-blue-600">+{order.pointsEarned}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end text-right">
                                                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mb-1">
                                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span>{order.estimatedDelivery || 'TBD'}</span>
                                                </div>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.orderStatus === 'confirmed'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action buttons */}
                    <Link href={'/'}>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button
                                className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600/10 text-blue-600 rounded-lg sm:rounded-xl hover:bg-blue-700/20 duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                            >
                                Continue Shopping
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                            </button>
                        </div>
                    </Link>
                </div>
            </div>

            {/* CSS animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                
                .delay-300 {
                    animation-delay: 0.3s;
                }
                
                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    );
};

export default CartOrderSuccessPage;