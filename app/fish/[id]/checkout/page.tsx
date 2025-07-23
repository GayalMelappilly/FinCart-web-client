'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/app/components/Header/Header';
import BackButton from '@/app/components/BackButton/BackButton';
import ShippingSection from '@/app/components/Checkout/ShippingSection';
import PaymentSection from '@/app/components/Checkout/PaymentSection';
import { OrderSummary } from '@/app/components/Checkout/OrderSummary';
import Footer from '@/app/components/Footer/Footer';
import { FishListing } from '@/app/types/list/fishList';
import { useMutation } from '@tanstack/react-query';
import { productCheckout, createRazorpayOrder } from '@/app/services/authServices';
import { useToast } from '@/app/providers/ToastProvider';
import OrderSuccessPage from '@/app/components/Checkout/OrderSuccessPage';
import { PostOrderDetails } from '@/app/types/types';
import { GuestOrder } from '@/app/types/checkout/type';
import { useRazorpay } from '@/hooks/useRazorpay';

// Declare Razorpay global type
declare global {
    interface Window {
        Razorpay: any;
    }
}

const Page = () => {
    const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
    const [orderSummary, setOrderSummary] = useState<FishListing | undefined>();
    const [quantity, setQuantity] = useState<number>(1)
    const [isGuest, setIsGuest] = useState(false)
    const [successData, setSucessData] = useState<PostOrderDetails>()
    const [isOrderSuccess, setIsOrderSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        address: '',
        aptSuite: '',
        city: '',
        state: '',
        country: 'India',
        zip: '',
        email: '',
        phone: '',
    });
    
    // Remove card payment details since we're using Razorpay
    const [orderNotes, setOrderNotes] = useState('')
    const [couponCode, setCouponCode] = useState('')
    const [pointsToUse, setPointsToUse] = useState(0)

    const { showToast } = useToast()
    const isRazorpayLoaded = useRazorpay()

    // Mutation for creating Razorpay order
    const createOrderMutation = useMutation({
        mutationFn: createRazorpayOrder,
        onError: (err: any) => {
            setIsLoading(false)
            setPaymentProcessing(false)
            showToast('error', 'Failed to create payment order')
            console.error('Create order error:', err)
        }
    })

    // Mutation for placing order after payment
    const mutation = useMutation({
        mutationFn: productCheckout,
        onSuccess: (data) => {
            showToast('success', 'Order placed successfully')
            console.log(data)
            if(isGuest){
                setSucessData(data.data.data)
            }else{
                setSucessData(data.data)
            }
            setIsLoading(false)
            setPaymentProcessing(false)
            setIsOrderSuccess(true)
            
            if (isGuest) {
                const orderData = {
                    orderId: data.data.data.orderId,
                    orderStatus: data.data.data.orderStatus,
                    totalAmount: data.data.data.totalAmount,
                    estimatedDelivery: data.data.data.estimatedDelivery,
                    pointsEarned: data.data.data.pointsEarned,
                    isGuestOrder: data.data.data.isGuestOrder,
                    orderItems: data.data.orderItems,
                    shippingDetails: shippingDetails,
                    couponCode: data.data.couponCode,
                    pointsToUse: data.data.pointsToUse,
                    orderNotes: data.data.orderNotes,
                    createdAt: new Date().toISOString()
                };

                if (typeof window !== 'undefined') {
                    try {
                        const existingOrders = JSON.parse(localStorage.getItem('guestOrderItems') || '[]');
                        const existingOrderIndex = existingOrders.findIndex(
                            (order: GuestOrder) => order.orderId === orderData.orderId
                        );

                        let updatedOrders;
                        if (existingOrderIndex !== -1) {
                            updatedOrders = existingOrders.map((order: GuestOrder, index: number) =>
                                index === existingOrderIndex ? { ...order, ...orderData } : order
                            );
                            console.log(`Updated existing order: ${orderData.orderId}`);
                        } else {
                            updatedOrders = [orderData, ...existingOrders];
                            console.log(`Added new order: ${orderData.orderId}`);
                        }

                        localStorage.setItem('guestOrderItems', JSON.stringify(updatedOrders));
                        console.log("Updated guest orders:", updatedOrders);
                    } catch (error) {
                        console.error('Error storing guest order:', error);
                        showToast('error', 'Failed to store order details');
                        return;
                    }
                }
            }
        },
        onError: (err) => {
            setIsLoading(false)
            setPaymentProcessing(false)
            showToast('error', 'Failed to place the order')
            console.log('Error placing order : ', err)
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsGuest(localStorage.getItem('guest') ? true : false)
        }
    }, []);

    // Calculate total amount
    const calculateTotal = () => {
        if (!orderSummary) return 0
        const itemTotal = orderSummary.price * quantity
        const shippingCost = 50 // Add your shipping calculation logic
        const discount = pointsToUse || 0
        return itemTotal + shippingCost - discount
    }

    // Handle Razorpay payment
    const initiateRazorpayPayment = async (orderData: any) => {
        if (!isRazorpayLoaded) {
            showToast('error', 'Payment system is loading. Please try again.')
            return
        }

        setPaymentProcessing(true)

        try {
            const totalAmount = calculateTotal()
            
            // Create Razorpay order
            const razorpayOrderResponse = await createOrderMutation.mutateAsync({
                amount: totalAmount,
                currency: 'INR',
                receipt: `order_${Date.now()}`
            })

            if (!razorpayOrderResponse.success) {
                throw new Error('Failed to create payment order')
            }

            const { data: razorpayOrder } = razorpayOrderResponse

            // Razorpay checkout options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: 'Fincarts',
                description: `Purchase of ${orderSummary?.name || 'Fish'}`,
                image: '/logo.png', // Your company logo
                order_id: razorpayOrder.id,
                prefill: {
                    name: shippingDetails.fullName,
                    email: shippingDetails.email,
                    contact: shippingDetails.phone
                },
                notes: {
                    address: `${shippingDetails.address}, ${shippingDetails.city}`
                },
                theme: {
                    color: '#3B82F6' // Your brand color
                },
                modal: {
                    ondismiss: () => {
                        setPaymentProcessing(false)
                        setIsLoading(false)
                        console.log('Payment modal closed')
                    }
                },
                handler: async (response: any) => {
                    try {
                        console.log('Payment successful:', response)
                        
                        // Update order data with Razorpay payment details
                        const finalOrderData = {
                            ...orderData,
                            paymentDetails: {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                payment_method: 'razorpay'
                            }
                        }

                        // Place the order with verified payment details
                        mutation.mutate(finalOrderData)
                        
                    } catch (error) {
                        console.error('Payment processing error:', error)
                        setPaymentProcessing(false)
                        setIsLoading(false)
                        showToast('error', 'Payment verification failed. Please contact support.')
                    }
                }
            }

            const rzp = new window.Razorpay(options)
            
            rzp.on('payment.failed', (response: any) => {
                setPaymentProcessing(false)
                setIsLoading(false)
                console.error('Payment failed:', response.error)
                showToast('error', `Payment failed: ${response.error.description}`)
            })

            rzp.open()

        } catch (error) {
            setPaymentProcessing(false)
            setIsLoading(false)
            console.error('Payment initiation error:', error)
            showToast('error', 'Failed to initiate payment. Please try again.')
        }
    }

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Validate required fields
        if (!shippingDetails.fullName || !shippingDetails.address || !shippingDetails.city || 
            !shippingDetails.state || !shippingDetails.zip || !shippingDetails.email) {
            showToast('error', 'Please fill all required shipping details')
            return
        }

        if (!orderSummary) {
            showToast('error', 'No items in order')
            return
        }

        setIsLoading(true)

        const orderData = {
            orderItems: [{ fishId: orderSummary?.id, quantity: quantity }],
            shippingDetails: {
                ...shippingDetails,
                shipping_cost: 50, // Add your shipping cost calculation
                shipping_method: 'standard'
            },
            couponCode: couponCode || null,
            pointsToUse: pointsToUse || null,
            orderNotes: orderNotes || null,
            guestInfo: isGuest ? {
                email: shippingDetails.email,
                fullName: shippingDetails.fullName,
                phoneNumber: shippingDetails.phone
            } : null
        }

        console.log('Order data prepared:', orderData)
        
        // Initiate Razorpay payment
        await initiateRazorpayPayment(orderData)
    }

    const toggleOrderSummary = () => {
        setIsOrderSummaryOpen(!isOrderSummaryOpen);
    };

    if (isOrderSuccess) return <OrderSuccessPage shippingDetails={shippingDetails} orderSummary={orderSummary} quantity={quantity} details={successData} />

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Checkout - Fincarts</title>
                <meta name="description" content="Complete your purchase of aquatic pets and supplies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <BackButton />

            <main className="md:px-30 mb-6 sm:mb-10 container mx-auto px-4 sm:px-6 md:px-30 py-4 sm:py-6 lg:px-20">
                {/* Mobile Order Summary Toggle */}
                <div className="lg:hidden mb-4 bg-white rounded-lg shadow-sm p-4">
                    <button
                        className="w-full flex justify-between items-center"
                        onClick={toggleOrderSummary}
                    >
                        <div>
                            <span className="font-medium text-lg text-gray-500">Order Summary</span>
                            <span className="ml-2 font-semibold text-gray-700">₹{calculateTotal().toFixed(2)}</span>
                        </div>
                        {isOrderSummaryOpen ? <ChevronUp size={20} className='text-gray-700' /> : <ChevronDown size={20} className='text-gray-700' />}
                    </button>

                    {isOrderSummaryOpen && (
                        <div className="mt-4 duration-300">
                            <OrderSummary orderSummary={orderSummary} setOrderSummary={setOrderSummary} quantity={quantity} setQuantity={setQuantity} />
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                    <div className="w-full lg:w-2/3">
                        <form onSubmit={handleCheckout} className="space-y-6">
                            <ShippingSection shippingDetails={shippingDetails} setshippingDetails={setShippingDetails} />
                            
                            {/* Payment Information Section */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
                                {/* <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                                    <img 
                                        src="/razorpay-logo.png" 
                                        alt="Razorpay" 
                                        className="h-8"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none'
                                        }}
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900">Secure Payment via Razorpay</p>
                                        <p className="text-sm text-gray-600">
                                            Pay securely with cards, UPI, net banking, and wallets
                                        </p>
                                    </div>
                                </div> */}
                                
                                {/* Order Notes */}
                                <div className="mt-4">
                                    <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-2">
                                        Order Notes (Optional)
                                    </label>
                                    <textarea
                                        id="orderNotes"
                                        value={orderNotes}
                                        onChange={(e) => setOrderNotes(e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Any special instructions for your order..."
                                    />
                                </div>

                                {/* Points Section (for logged-in users) */}
                                {/* {!isGuest && (
                                    <div className="mt-4">
                                        <label htmlFor="pointsToUse" className="block text-sm font-medium text-gray-700 mb-2">
                                            Use Points (Optional)
                                        </label>
                                        <input
                                            type="number"
                                            id="pointsToUse"
                                            value={pointsToUse}
                                            onChange={(e) => setPointsToUse(Number(e.target.value))}
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter points to use"
                                        />
                                    </div>
                                )} */}

                                {/* Coupon Code */}
                                {/* <div className="mt-4">
                                    <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
                                        Coupon Code (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="couponCode"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter coupon code"
                                    />
                                </div> */}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || paymentProcessing || !isRazorpayLoaded}
                                className={`w-full font-medium py-3 px-4 rounded-md transition-colors ${
                                    isLoading || paymentProcessing || !isRazorpayLoaded
                                        ? 'bg-gray-400 cursor-not-allowed text-white'
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                            >
                                {paymentProcessing 
                                    ? 'Processing Payment...' 
                                    : isLoading 
                                        ? 'Please wait...' 
                                        : !isRazorpayLoaded
                                            ? 'Loading Payment System...'
                                            : `Pay ₹${calculateTotal().toFixed(2)}`
                                }
                            </button>
                        </form>
                    </div>

                    {/* Desktop Order Summary - Hidden on mobile */}
                    <div className="hidden lg:block lg:w-1/3">
                        <div className="sticky top-4">
                            <OrderSummary orderSummary={orderSummary} setOrderSummary={setOrderSummary} quantity={quantity} setQuantity={setQuantity} />
                            
                            {/* Total Summary */}
                            <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal:</span>
                                        <span>₹{orderSummary ? (orderSummary.price * quantity).toFixed(2) : '0.00'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping:</span>
                                        <span>₹50.00</span>
                                    </div>
                                    {pointsToUse > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Points Discount:</span>
                                            <span>-₹{pointsToUse.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <hr />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>₹{calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Page;