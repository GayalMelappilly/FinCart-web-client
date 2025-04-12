import Link from 'next/link'
import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

const ContinueShoppingButton = () => {
    return (
        <Link href="/" className="text-gray-600 hover:text-gray-800 px-30 pt-10 flex items-center font-medium">
            <FiArrowLeft className="mr-2" />
            Continue Shopping
        </Link>
    )
}

export default ContinueShoppingButton