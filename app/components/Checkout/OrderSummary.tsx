import { OrderDetailsType } from '@/app/types/formdata'
import React, { FC } from 'react'

type Props = {
    orderDetails: OrderDetailsType
}

const OrderSummary:FC<Props> = ({orderDetails}) => {
    return (
        <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white border border-zinc-300 rounded-md p-6">
                <h2 className="text-xl font-semibold mb-6 text text-gray-800">Order summary</h2>

                {/* Order Items */}
                {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex mb-4">
                        <div className="h-16 w-16 bg-gray-200 rounded-md flex-shrink-0">
                            {/* Placeholder for item image */}
                            <div className="w-full h-full bg-cover bg-center rounded-md"
                                style={{ backgroundImage: "url('/neon-tetra.jpeg')" }}>
                            </div>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-black font-medium">{item.name}</h3>
                            <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}

                {/* Order Calculations */}
                <div className="border-t border-zinc-300 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal ({orderDetails.items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                        <span className="font-medium text-black ">₹{orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                        Shipping calculated at checkout
                    </div>

                    {/* Promo Code */}
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors mb-4">
                        Add promo code
                    </button>

                    {/* Total */}
                    <div className="border-t border-zinc-300 pt-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Total</span>
                            <span className="font-medium text-black">₹{orderDetails.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">To be paid</span>
                            <span className="font-medium text-black">₹{orderDetails.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary