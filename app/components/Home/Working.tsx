import { Search, ShoppingCart, Truck } from 'lucide-react'
import React from 'react'

const Working = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">How Fincarts Works</h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Join thousands of fish enthusiasts who are already buying and selling on our platform.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Search size={32} className="text-purple-500" />,
                            title: 'Browse & Find',
                            description: 'Search our extensive catalog of ornamental fish offered by trusted sellers.'
                        },
                        {
                            icon: <ShoppingCart size={32} className="text-teal-500" />,
                            title: 'Purchase Securely',
                            description: 'Use our secure payment system with buyer protection and verified sellers.'
                        },
                        {
                            icon: <Truck size={32} className="text-orange-500" />,
                            title: 'Safe Delivery',
                            description: 'Specialty fish shipping ensures your new aquatic friends arrive healthy.'
                        },
                    ].map((step, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-teal-50 mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Working