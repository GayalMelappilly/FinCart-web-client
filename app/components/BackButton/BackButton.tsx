import { ChevronLeft } from 'lucide-react'
import React from 'react'

const BackButton = () => {

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="container mx-auto pt-10 px-4 sm:px-6">
            <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-blue-500 transition-colors"
            >
                <ChevronLeft size={20} />
                <span className="ml-1">Back</span>
            </button>
        </div>
    )
}

export default BackButton