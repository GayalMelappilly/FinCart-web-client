import { WishlistItemInterface } from '@/app/types/types'
import Image from 'next/image'
import React, { FC } from 'react'
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi'

type Props = {
    item: WishlistItemInterface,
    wishlistItems: WishlistItemInterface[],
    setWishlistItems: (wishlistItems: WishlistItemInterface[]) => void
}

const WishlistItem:FC<Props> = ({item, wishlistItems, setWishlistItems}) => {

    // Remove item handler
    const removeFromWishlist = (id: number) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    // Add to cart handler (would connect to cart functionality)
    const addToCart = (item: WishlistItemInterface) => {
        console.log(`Added ${item.name} to cart`);
        // Here you would integrate with your cart management
    };

    return (
        <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-48 bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                />
                <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Remove from wishlist"
                >
                    <FiTrash2 className="h-4 w-4 text-red-400" />
                </button>
            </div>

            <div className="p-4 flex-grow">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.species}</p>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">Size: {item.size}</span>
                    {item.inStock ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                            In Stock
                        </span>
                    ) : (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">${item.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${item.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <FiShoppingCart className="mr-1 h-4 w-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WishlistItem