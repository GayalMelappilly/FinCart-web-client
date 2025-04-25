import React, { FC } from 'react'

type Props = {
    step: number,
    setStep: (step: number) => void,
    isFormFilled: boolean
}

const FormButtons:FC<Props> = ({step, setStep, isFormFilled}) => {

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="flex justify-between pt-4">
            {step > 1 && (
                <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Back
                </button>
            )}

            {step < 3 ? (
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isFormFilled}
                    className={`ml-auto px-6 py-2 text-white rounded-md ${isFormFilled ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-gray-500 cursor-not-allowed'}`}
                >
                    Continue
                </button>
            ) : (
                <button
                    type="submit"
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Complete Profile
                </button>
            )}
        </div>
    )
}

export default FormButtons