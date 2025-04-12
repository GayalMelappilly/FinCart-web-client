import { CartItem } from '@/app/datasets/cartItems';
import React, { FC, useState } from 'react'
import { HiOutlineShieldCheck } from 'react-icons/hi'

type Props = {
    cartItems: CartItem[],
}

const OrderSummary:FC<Props> = ({cartItems}) => {

    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [loading, setLoading] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 12.99;
    const discount = promoApplied ? subtotal * 0.1 : 0;
    const tax = (subtotal - discount) * 0.07;
    const total = subtotal + shipping + tax - discount;

    const applyPromoCode = () => {
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setPromoApplied(true);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="w-full lg:w-4/12">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-8">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">Order Summary</h2>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-800 font-medium">
                                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                            </span>
                        </div>

                        {promoApplied && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount (10%)</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax (7%)</span>
                            <span className="text-gray-800 font-medium">${tax.toFixed(2)}</span>
                        </div>

                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-800">Total</span>
                            <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Promo code section */}
                    {!promoApplied && (
                        <div className="mt-6">
                            <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-2">
                                Promo Code
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    id="promo-code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                                    placeholder="Enter code"
                                />
                                <button
                                    type="button"
                                    onClick={applyPromoCode}
                                    disabled={!promoCode || loading}
                                    className={`px-4 py-2 rounded-r-md font-medium ${!promoCode || loading
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 ring-2 ring-blue-600'
                                        }`}
                                >
                                    {loading ? 'Applying...' : 'Apply'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Checkout button */}
                    <div className="mt-6">
                        <button
                            type="button"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Proceed to Checkout
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-6 bg-gray-50 rounded-md p-4">
                        <div className="flex items-center text-gray-600">
                            <HiOutlineShieldCheck className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm">Secure checkout</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                            All transactions are secure and encrypted. Fish are guaranteed to arrive alive and healthy.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary