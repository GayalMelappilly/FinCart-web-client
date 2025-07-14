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
import { productCheckout } from '@/app/services/authServices';
import { useToast } from '@/app/providers/ToastProvider';
import OrderSuccessPage from '@/app/components/Checkout/OrderSuccessPage';
import { PostOrderDetails } from '@/app/types/types';

const Page = () => {
    const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
    const [orderSummary, setOrderSummary] = useState<FishListing | undefined>();
    const [quantity, setQuantity] = useState<number>(1)
    const [isGuest, setIsGuest] = useState(false)
    const [successData, setSucessData] = useState<PostOrderDetails>()
    const [isOrderSuccess, setIsOrderSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
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
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expDate: '',
        nameOnCard: '',
    })

    const { showToast } = useToast()

    const mutation = useMutation({
        mutationFn: productCheckout,
        onSuccess: (data) => {
            showToast('success', 'Order placed successfully')
            console.log(data)
            setSucessData(data.data)
            setIsLoading(false)
            setIsOrderSuccess(true)
        },
        onError: (err) => {
            showToast('error', 'Failed to place the order')
            console.log('Error placing order : ', err)
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsGuest(localStorage.getItem('guest') ? true : false)
        }
    }, []);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        // Process order logic would go here
        const details = {
            orderItems : [{ fishId: orderSummary?.id, quantity: quantity }],
            shippingDetails,
            paymentDetails,
            couponCode: null,
            pointsToUse: null,
            orderNotes: null,
            guestInfo: null
        }
        let guestInfo;
        if(isGuest){
            guestInfo = {
                email: shippingDetails.email,
                fullName: shippingDetails.fullName,
                phoneNumber: shippingDetails.phone
            }
        }else{
            setIsLoading(true)
            mutation.mutate( details )
        }
        console.log('Order submitted', { shippingDetails, guestInfo, paymentDetails, orderItems : { fishId: orderSummary?.id, quantity: quantity } });
    };

    const toggleOrderSummary = () => {
        setIsOrderSummaryOpen(!isOrderSummaryOpen);
    };

    if(isOrderSuccess) return <OrderSuccessPage shippingDetails={shippingDetails} orderSummary={orderSummary} quantity={quantity} details={successData} />

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
                            <span className="ml-2 font-semibold text-gray-700">₹{orderSummary?.price && (orderSummary?.price * quantity).toFixed(2)}</span>
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
                            <PaymentSection paymentDetails={paymentDetails} setPaymentDetails={setPaymentDetails} />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
                            >
                                {isLoading ? 'Please wait...' : 'Complete purchase'}
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