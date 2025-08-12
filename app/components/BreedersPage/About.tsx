import React from 'react'

const About = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">About Tropical Fish Hobbyist</h2>

            <div className="space-y-4 text-gray-700">
                <p>
                    Welcome to my store! I&apos;m a passionate aquarium enthusiast with over 10 years of experience breeding and caring for tropical fish.
                </p>

                <p>
                    I specialize in breeding high-quality, healthy specimens with vibrant colors and strong genetics. All fish are raised in carefully maintained tanks with optimal water parameters.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">Shipping Information</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Orders are shipped Monday through Wednesday to ensure weekday delivery</li>
                    <li>Fish are packed with care using insulated boxes and heat packs when necessary</li>
                    <li>Live arrival guarantee on all shipments</li>
                    <li>Free shipping on orders over ₹2000</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2">Contact Information</h3>
                <p>
                    For questions about available fish or custom breeding requests, please send me a message through the platform.
                </p>

                <div className="flex items-center mt-4 text-gray-600">
                    <span>Member since July 2025</span>
                    <span className="mx-2">•</span>
                    <span>Usually responds within 24 hours</span>
                </div>
            </div>
        </div>
    )
}

export default About