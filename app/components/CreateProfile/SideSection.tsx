import React, { FC } from 'react'

type Props = {
    step: number
}

const SideSection:FC<Props> = ({step}) => {
    return (
        <div className="hidden lg:flex lg:w-1/3 h-fit mt-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow mb-6 border border-blue-200 flex-col justify-between p-8">
            <div>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Complete Your Profile</h1>
                <p className="mb-8 text-gray-700">Set up your profile to get the most out of our services.</p>

                <div className="mt-12">
                    <div className={`flex items-center mb-6 ${step >= 1 ? 'text-white' : 'text-white'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${step >= 1 ? 'bg-blue-500' : 'bg-blue-300'}`}>
                            1
                        </div>
                        <span className="text-lg text-gray-800">Personal Information</span>
                    </div>

                    <div className={`flex items-center mb-6 ${step >= 2 ? 'text-white' : 'text-white'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${step >= 2 ? 'bg-blue-500' : 'bg-blue-300'}`}>
                            2
                        </div>
                        <span className="text-lg text-gray-800">Delivery Address</span>
                    </div>

                    {/* <div className={`flex items-center ${step >= 3 ? 'text-white' : 'text-white'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${step >= 3 ? 'bg-blue-500' : 'bg-blue-300'}`}>
                            3
                        </div>
                        <span className="text-lg text-gray-800">Preferences</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SideSection