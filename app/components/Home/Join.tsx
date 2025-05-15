import Link from 'next/link'
import React from 'react'

const Join = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Dive Into Fincarts?</h2>
                <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
                    Join our community of fish enthusiasts, collectors, and sellers today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link href={'/signup'} className="bg-white py-3 px-8 rounded-lg text-black text-lg hover:shadow-lg font-medium hover:scale-105 duration-300">
                        Sign Up Now
                    </Link>
                    <Link href={'/seller/dashboard'} className="border-2 border-white text-white py-3 px-8 rounded-lg text-lg font-medium hover:scale-105 duration-300">
                        Become a seller
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Join