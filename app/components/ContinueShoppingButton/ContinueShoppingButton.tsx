import Link from 'next/link'
import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

const ContinueShoppingButton = () => {
    return (
        <Link href="/" className="text-gray-600 hover:text-gray-800 px-4 md:px-20 pt-25 pt-24 flex items-center font-medium">
            <FiArrowLeft className="mr-2 start" />
            Continue Shopping
        </Link>
    )
}

export default ContinueShoppingButton