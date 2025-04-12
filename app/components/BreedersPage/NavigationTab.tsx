import React, { FC } from 'react'

type Props = {
    activeTab: string,
    setActiveTab: (activeTab:string) => void
}

const NavigationTab:FC<Props> = ({activeTab, setActiveTab}) => {
    return (
        <nav className="bg-white border-b border-gray-200 mx-30">
            <div className="container mx-auto px-4">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('listings')}
                        className={`py-4 px-6 font-medium ${activeTab === 'listings'
                            ? 'text-blue-500 border-b-2 border-blue-500'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Listings
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`py-4 px-6 font-medium ${activeTab === 'about'
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