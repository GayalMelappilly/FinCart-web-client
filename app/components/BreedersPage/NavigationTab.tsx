import React, { FC } from 'react'

type Props = {
    activeTab: string,
    setActiveTab: (activeTab: string) => void
}

const NavigationTab: FC<Props> = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="max-w-6xl bg-white border-b py-4 border rounded-lg shadow-sm border-gray-200 md:mx-auto lg:mx-auto">
            <div className="container mx-auto px-2 sm:px-4">
                <div className="flex justify-center sm:justify-start overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('listings')}
                        className={`py-3 px-4 sm:py-4 sm:px-6 font-medium whitespace-nowrap text-sm sm:text-base ${
                            activeTab === 'listings'
                                ? 'text-blue-500 border-b-2 border-blue-500'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Listings
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`py-3 px-4 sm:py-4 sm:px-6 font-medium whitespace-nowrap text-sm sm:text-base ${
                            activeTab === 'about'
                                ? 'text-blue-500 border-b-2 border-blue-500'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        About
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavigationTab