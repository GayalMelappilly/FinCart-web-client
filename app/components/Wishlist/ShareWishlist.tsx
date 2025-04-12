import { WishlistItemInterface } from '@/app/types/types'
import React, { FC } from 'react'
import { FiShare2 } from 'react-icons/fi'

type Props = {
    wishlistItems: WishlistItemInterface[]
}

const ShareWishlist: FC<Props> = ({ wishlistItems }) => {

    const shareWishlist = () => {
        // Copy sharable link to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert('Wishlist link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy link: ', err);
            });
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
            <button
                onClick={shareWishlist}
                className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
            >
                <FiShare2 className="mr-1" />
                Share Wishlist
            </button>
        </div>
    )
}

export default ShareWishlist