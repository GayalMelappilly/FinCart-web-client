'use client'

import { PaymentDetailsType } from '@/app/types/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { FC, useState } from 'react'

type Props = {
    paymentDetails: PaymentDetailsType,
    setPaymentDetails: (paymentDetails: PaymentDetailsType) => void
}

const PaymentSection: FC<Props> = ({ paymentDetails, setPaymentDetails }) => {

    // const [paymentMethod, setPaymentMethod] = useState('Credit card');
    const [isPaymentExpanded, setIsPaymentExpanded] = useState(true);
    const [saveInfo, setSaveInfo] = useState(false);

    const togglePaymentSection = () => {
        setIsPaymentExpanded(!isPaymentExpanded);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value,
        });
    };

    const handleCheckboxChange = () => {
        setSaveInfo(!saveInfo);
    };


    return (
        <section className="mb-8">
            <div
                className="flex justify-between items-center mb-6 pb-3 border-b border-zinc-300 cursor-pointer"
                onClick={togglePaymentSection}
            >
                <h2 className="text-xl font-semibold text-gray-800">Payment</h2>
                <button type="button" className="text-gray-500">
                    {isPaymentExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {isPaymentExpanded && (
                <div className="grid gap-4">
                    <div className="relative">
                        <div className="flex justify-between items-center w-full px-4 py-3 border border-zinc-300 rounded-md text-gray-700 bg-white">
                            {/* <span>{paymentMethod}</span> */}
                            <span>Credit Card</span>
                            <div className="flex">
                                <ChevronDown size={20} className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card number"
                            value={paymentDetails.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                            required
                        />
                        <input
                            type="text"
                            name="expDate"
                            placeholder="MM / YY"
                            value={paymentDetails.expDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="nameOnCard"
                            placeholder="Name on card"
                            value={paymentDetails.nameOnCard}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                            required
                        />
                    </div>

                    <div className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            id="saveInfo"
                            checked={saveInfo}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 border-gray-300 rounded placeholder:text-gray-400 text-black"
                        />
                        <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
                            Save this information and use it for future purchases
                        </label>
                    </div>
                </div>
            )}
        </section>
    )
}

export default PaymentSection