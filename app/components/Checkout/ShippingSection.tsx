import { FormDataType } from '@/app/types/formdata'
import React, { FC } from 'react'

type Props = {
    formData: FormDataType,
    setFormData: (formData: FormDataType) => void
}

const ShippingSection:FC<Props> = ({formData, setFormData}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
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
                        value={formData.fullName}
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
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                    <input
                        type="text"
                        name="aptSuite"
                        placeholder="Apt, suite, etc. (optional)"
                        value={formData.aptSuite}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
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
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                    <input
                        type="text"
                        name="zip"
                        placeholder="Zip"
                        value={formData.zip}
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
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 placeholder:text-gray-400 text-black"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
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