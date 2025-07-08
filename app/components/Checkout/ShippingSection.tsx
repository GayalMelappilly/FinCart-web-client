import { ShippingDetailsType } from '@/app/types/types'
import React, { FC } from 'react'

type Props = {
    shippingDetails: ShippingDetailsType,
    setshippingDetails: (shippingDetails: ShippingDetailsType) => void
}

const ShippingSection:FC<Props> = ({shippingDetails, setshippingDetails}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setshippingDetails({
            ...shippingDetails,
            [name]: value,
        });
    };

    return (
        <section className="mb-8">
            <h2 className="text-xl text-gray-800 font-semibold mb-6 pb-3 border-b border-zinc-300">Shipping</h2>

            <div className="grid gap-4">
                <div>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                        value={shippingDetails.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={shippingDetails.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                    <input
                        type="text"
                        name="aptSuite"
                        placeholder="Apt, suite, etc. (optional)"
                        value={shippingDetails.aptSuite}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shippingDetails.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={shippingDetails.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                    <input
                        type="text"
                        name="zip"
                        placeholder="Zip"
                        value={shippingDetails.zip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={shippingDetails.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={shippingDetails.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                </div>
            </div>
        </section>
    )
}

export default ShippingSection