'use client'

import { useState } from 'react';
import Head from 'next/head';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/app/components/Header/Header';
import BackButton from '@/app/components/BackButton/BackButton';
import ShippingSection from '@/app/components/Checkout/ShippingSection';
import PaymentSection from '@/app/components/Checkout/PaymentSection';
import { OrderSummary } from '@/app/components/Checkout/OrderSummary';
import Footer from '@/app/components/Footer/Footer';
import { FishListing } from '@/app/types/list/fishList';

const Page = () => {
    const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
    const [orderSummary, setOrderSummary] = useState<FishListing | undefined>();
    // const [orderDetails, setOrderDetails] = useState({
    //     fishId: '',
    //     quantity: 1,
    //     subtotal: 0,
    //     total: 0
    // })
    const [quantity, setQuantity] = useState<number>(1)
    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        address: '',
        aptSuite: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: '',
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expDate: '',
        nameOnCard: '',
    })

    // useEffect(()=>{
    //     const orderDetails = {
    //         items: [
                
    //         ]
    //     }
    // }, [orderSummary, quantity])

    const orderDetails = {
        items: [
            {
                id: 1,
                name: 'Pleco fish',
                price: 10.0,
                quantity: 2,
                image: '/images/pleco.jpg',
            },
        ],
        subtotal: 20.0,
        total: 20.0,
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Process order logic would go here
        console.log('Order submitted', { shippingDetails, paymentDetails, orderDetails: { fishId: orderSummary?.id, quantity: quantity, total: orderSummary?.price && (orderSummary?.price * quantity).toFixed(2) }});
    };

    const toggleOrderSummary = () => {
        setIsOrderSummaryOpen(!isOrderSummaryOpen);
    };

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
                            <span className="ml-2 font-semibold text-gray-700">₹{orderDetails.total.toFixed(2)}</span>
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <ShippingSection shippingDetails={shippingDetails} setshippingDetails={setShippingDetails} />
                            <PaymentSection paymentDetails={paymentDetails} setPaymentDetails={setPaymentDetails} />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
                            >
                                Complete purchase
                            </button>
                        </form>
                    </div>

                    {/* Desktop Order Summary - Hidden on mobile */}
                    <div className="hidden lg:block lg:w-1/3">
                        <div className="sticky top-4">
                            <OrderSummary orderSummary={orderSummary} setOrderSummary={setOrderSummary} quantity={quantity} setQuantity={setQuantity} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Page;