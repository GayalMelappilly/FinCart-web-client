import React, { FC } from 'react'

type Props = {
    step: number
}

const ProgressIndicatorMobile:FC<Props> = ({step}) => {
    return (
        <div className="flex justify-center mt-8 lg:hidden">
            <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${step === i ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProgressIndicatorMobile