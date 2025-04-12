import Link from 'next/link'
import React from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

type Props = {}

const TipsSection = (props: Props) => {
    return (
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <HiOutlineExclamationCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-800">Aquarium Tips</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        Before adding new fish to your aquarium, make sure your tank is properly cycled and has adequate space for your desired species.
                        Research each fish's compatibility with your existing aquarium inhabitants.
                    </p>
                    <div className="mt-3">
                        <Link href="/care-guides" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            Read our care guides →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TipsSection