'use client'

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/app/components/Header/Header';
import BackButton from '@/app/components/BackButton/BackButton';
import ShippingSection from '@/app/components/Checkout/ShippingSection';
import PaymentSection from '@/app/components/Checkout/PaymentSection';
import OrderSummary from '@/app/components/Checkout/OrderSummary';
import Footer from '@/app/components/Footer/Footer';


const Page = () => {

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

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Checkout - Fincarts</title>
                <meta name="description" content="Complete your purchase of aquatic pets and supplies" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <BackButton />

            <main className="container mx-auto px-30 py-6 mb-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <form onSubmit={handleSubmit}>
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
                    <OrderSummary orderDetails={orderDetails} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Page