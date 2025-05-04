// import { FishDetails } from '@/app/datasets/fishDetails'
// import { FishListing } from '@/app/types/list/fishList'
import { Info } from 'lucide-react'
import React from 'react'

// type Props = {
//     fish: FishListing | undefined
// }

const CareInfo = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Info size={20} className="mr-2 text-blue-500" />
                Care Information
            </h2>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <h3 className="text-gray-500 text-sm">Care Level</h3>
                    <p className="text-gray-800">{fish.careLevel}</p>
                </div>

                <div>
                    <h3 className="text-gray-500 text-sm">Temperament</h3>
                    <p className="text-gray-800">{fish.temperament}</p>
                </div>

                <div>
                    <h3 className="text-gray-500 text-sm">Diet</h3>
                    <p className="text-gray-800">{fish.diet}</p>
                </div>

                <div>
                    <h3 className="text-gray-500 text-sm">Lifespan</h3>
                    <p className="text-gray-800">{fish.lifespan}</p>
                </div>

                <div>
                    <h3 className="text-gray-500 text-sm">Minimum Tank Size</h3>
                    <p className="text-gray-800">{fish.tankSize}</p>
                </div>

                <div>
                    <h3 className="text-gray-500 text-sm">Origin</h3>
                    <p className="text-gray-800">{fish.origin}</p>
                </div>
            </div> */}

            <h3 className="text-gray-800 font-medium mt-4 mb-2">Water Parameters</h3>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
                <div>
                    <h4 className="text-gray-500 text-sm">Temperature</h4>
                    <p className="text-gray-800">{fish.waterParameters.temperature}</p>
                </div>

                <div>
                    <h4 className="text-gray-500 text-sm">pH</h4>
                    <p className="text-gray-800">{fish.waterParameters.ph}</p>
                </div>

                <div>
                    <h4 className="text-gray-500 text-sm">Hardness</h4>
                    <p className="text-gray-800">{fish.waterParameters.hardness}</p>
                </div>
            </div> */}
        </div>
    )
}

export default CareInfo