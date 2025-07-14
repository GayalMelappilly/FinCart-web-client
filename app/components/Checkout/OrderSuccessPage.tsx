import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Download, Share2, Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { PostOrderDetails, ShippingDetailsType } from '@/app/types/types';
import { FishListing } from '@/app/types/list/fishList';

type Props = {
    shippingDetails: ShippingDetailsType,
    orderSummary: FishListing | undefined,
    quantity: number,
    details: PostOrderDetails | undefined
}

const OrderSuccessPage: React.FC<Props> = ({shippingDetails, orderSummary, quantity, details}) => {
    const [showContent, setShowContent] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [playSound, setPlaySound] = useState(false);

    const orderDetails = {
        orderNumber: details?.orderId,
        estimatedDelivery: details?.estimatedDelivery,
        items: quantity,
        total: `₹${details?.totalAmount}`,
        email: shippingDetails.email,
        shippingAddress: `${shippingDetails.address}`
    };

    const steps = [
        { icon: CheckCircle, title: "Order Confirmed", status: "completed" },
        { icon: Package, title: "Preparing", status: "current" },
        { icon: Truck, title: "Shipped", status: "pending" },
        { icon: Mail, title: "Delivered", status: "pending" }
    ];

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 300);

        // Simulate progress steps
        const stepTimer = setInterval(() => {
            setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 1500);

        // Play success sound effect (simulated)
        setPlaySound(true);

        return () => {
            clearTimeout(timer);
            clearInterval(stepTimer);
        };
    }, []);

    const handleDownloadReceipt = () => {
        // Simulate download
        console.log('Downloading receipt...');
    };

    const handleShareOrder = () => {
        // Simulate sharing
        console.log('Sharing order...');
    };

    const handleContinueShopping = () => {
        // Navigate to shop
        console.log('Continue shopping...');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-5 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className={`relative max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl w-full transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                            Order Placed Successfully! 🎉
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 animate-fade-in delay-300 px-2">
                            Thank you for your purchase. Your order is being processed.
                        </p>
                    </div>

                    {/* Order details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
                        {/* Order info */}
                        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                                Order Details
                            </h3>
                            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                <div className="flex justify-between items-start">
                                    <span className="text-gray-600">Order Number:</span>
                                    <span className="font-mono font-medium text-right ml-2 break-all">{orderDetails.orderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Quantity:</span>
                                    <span className="font-medium">{orderDetails.items} items</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total:</span>
                                    <span className="font-bold text-emerald-600">{orderDetails.total}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <span className="text-gray-600">Estimated Delivery:</span>
                                    <span className="font-medium flex items-center text-right ml-2">
                                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                                        {orderDetails.estimatedDelivery}
                                    </span>
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
                                    <span className="text-gray-600 break-words">{orderDetails.shippingAddress}</span>
                                </div>
                                <div className="flex items-start">
                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 break-words">{orderDetails.email}</span>
                                </div>
                                <div className="flex items-start">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600">Processing time: 1-2 business days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress tracker */}
                    {/* <div className="mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 text-center">Order Progress</h3>
            <div className="flex justify-between items-center max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center relative">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white scale-110' 
                        : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'animate-pulse ring-2 sm:ring-4 ring-emerald-200' : ''}`}>
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
                    </div>
                    <span className={`mt-1 sm:mt-2 text-xs sm:text-sm font-medium transition-colors duration-500 text-center ${
                      isCompleted ? 'text-emerald-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`absolute top-4 sm:top-5 md:top-6 left-4 sm:left-5 md:left-6 w-8 sm:w-12 md:w-16 h-0.5 transition-colors duration-500 ${
                        index < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div> */}

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        {/* <button
                            onClick={handleDownloadReceipt}
                            className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors duration-200 transform hover:scale-105 text-sm sm:text-base"
                        >
                            <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Download Receipt
                        </button> */}

                        {/* <button
              onClick={handleShareOrder}
              className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-100 text-blue-700 rounded-lg sm:rounded-xl hover:bg-blue-200 transition-colors duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Share Order
            </button> */}

                        <Link
                            href={'/'}
                            className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600/10 text-blue-600 rounded-lg sm:rounded-xl hover:bg-blue-700/20 duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                        >
                            Continue Shopping
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        </Link>
                    </div>
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

export default OrderSuccessPage;