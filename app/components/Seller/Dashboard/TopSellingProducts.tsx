import React from 'react'

type Props = {}

const TopSellingProducts = (props: Props) => {

    const topSellingFish = [
        { id: 1, name: 'Atlantic Salmon', stock: 45, sold: 120, image: '/fish/salmon.png' },
        { id: 2, name: 'Tilapia', stock: 30, sold: 98, image: '/fish/tilapia.png' },
        { id: 3, name: 'Sea Bass', stock: 15, sold: 76, image: '/fish/seabass.png' },
        { id: 4, name: 'Tuna', stock: 22, sold: 65, image: '/fish/tuna.png' },
    ];

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Top Selling Fish</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-4">
                {topSellingFish.map((fish) => (
                    <div key={fish.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden relative">
                                <div className="w-10 h-10 relative">
                                    <div className="absolute inset-0 bg-gray-200 rounded-full" />
                                    {/* If you have fish images, use this */}
                                    {/* <Image src={fish.image} alt={fish.name} fill className="object-cover" /> */}
                                </div>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">{fish.name}</h3>
                                <p className="text-xs text-gray-500">Stock: {fish.stock}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{fish.sold} sold</p>
                            <p className="text-xs text-gray-500">This month</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopSellingProducts