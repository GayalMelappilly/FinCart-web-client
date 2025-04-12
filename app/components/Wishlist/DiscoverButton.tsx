import Link from 'next/link'
import React from 'react'

const DiscoverButton = () => {
    return (
        <div className="mt-8 flex justify-center">
            <Link
                href="/"
                className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
                Discover More Fish
            </Link>
        </div>
    )
}

export default DiscoverButton