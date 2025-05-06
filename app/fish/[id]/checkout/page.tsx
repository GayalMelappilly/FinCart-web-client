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

const Page = () => {
    const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        aptSuite: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: '',
        cardNumber: '',
        expDate: '',
        nameOnCard: '',
    });

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
        console.log('Order submitted', { formData, orderDetails });
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

            <main className="container mx-auto px-4 sm:px-6 md:px-30 py-4 sm:py-6 mb-6 sm:mb-10">
                {/* Mobile Order Summary Toggle */}
                <div className="lg:hidden mb-4 bg-white rounded-lg shadow-sm p-4">
                    <button
                        className="w-full flex justify-between items-center"
                        onClick={toggleOrderSummary}
                    >
                        <div>
                            <span className="font-medium text-lg text-gray-500">Order Summary</span>
                            <span className="ml-2 font-semibold text-gray-700">${orderDetails.total.toFixed(2)}</span>
                        </div>
                        {isOrderSummaryOpen ? <ChevronUp size={20} className='text-gray-700' /> : <ChevronDown size={20} className='text-gray-700' />}
                    </button>

                    {isOrderSummaryOpen && (
                        <div className="mt-4 duration-300">
                            <OrderSummary />
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                    <div className="w-full lg:w-2/3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <ShippingSection formData={formData} setFormData={setFormData} />
                            <PaymentSection formData={formData} setFormData={setFormData} />
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
                            <OrderSummary />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Page;