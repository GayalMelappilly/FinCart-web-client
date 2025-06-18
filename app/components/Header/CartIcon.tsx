import { CartItem } from '@/app/types/user/type'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const CartIcon = () => {

    const [cartItems, setCartItems] = useState<CartItem[]>();

    
    useEffect(() => {
        try {
            const storageData = typeof window !== 'undefined' ? localStorage.getItem('user') : ''
            const guestCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('guestCartItems') as string) : null
            if(guestCart){
                setCartItems(guestCart)
            }
            const userData = storageData ? JSON.parse(storageData) : ''
            if (userData) {
                setCartItems(userData.shoppingCarts[0].cartItems)
            }
        } catch (err) {
            console.log(err)
        }
    }, []);

    return (
        <div>
            <Link href={'/cart'} className="relative inline-block">
                <button className="bg-gray-100 hover:bg-amber-50 hover:text-amber-600 text-gray-800 transition-colors rounded-full p-2" aria-label="Cart">
                    <ShoppingCart size={18} />
                </button>
                {cartItems && cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-300 text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] shadow-sm">
                        {cartItems.length > 99 ? '99+' : cartItems.length}
                    </span>
                )}
            </Link>

        </div>
    )
}

export default CartIcon