import { ChevronLeft } from 'lucide-react'
import React from 'react'

type Props = {}

const BackButton = (props: Props) => {

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="container mx-auto px-30 pt-10">
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