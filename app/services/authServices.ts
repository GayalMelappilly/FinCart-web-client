'use client'

import { AuthResponse, LoginCredentials } from "@/app/types/auth/types"
import { ProfileFormData } from "@/app/types/types"
import { fetchWithAuth } from "../lib/fetchWithAuth"
import { FishListFilters, FishListResponse } from "../types/list/fishList"
import { config } from "dotenv"
import { SellerProfileResponse } from "../types/sellerProfile/type"
import { StandardResponse } from "../types/cart/type"
import Cookies from 'js-cookie';
import { OrderDetailsType, ShippingDetailsType } from "../types/checkout/type"
import { CartItem } from "../types/user/type"
config()

const apiUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVER_API : process.env.NEXT_PUBLIC_LOCAL_HOST_API

// Signup user
export const signUpUser = async (phoneNumber: string) => {
  const res = await fetch(`${apiUrl}/sign-up/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phoneNumber }),
    credentials: "include"
  })

  const response = await res.json()
  console.log(response)
  return response
}

// Verify Email
export const verifyEmail = async (email: string) => {
  const res = await fetch(`${apiUrl}/verify-email/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email }),
    credentials: "include"
  })

  const response = await res.json()
  console.log(response)
  return response
}

// Forgot password verify email
export const forgotPasswordVerifyEmail = async (email: string) => {
  const res = await fetch(`${apiUrl}/forgot-password/verify-email/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email }),
    credentials: "include"
  })

  const response = await res.json()
  console.log(response)
  return response
}

type OtpDataType = {
  code: string,
  type: string
}
// Confirm verification OTP
export const confirmOtp = async (data: OtpDataType) => {

  console.log('Verification code: ', data.code)

  const code = data.code

  let token;
  if (data.type === 'auth') {
    token = localStorage.getItem('vt')
  } else if (data.type === 'forgotPassword') {
    token = localStorage.getItem('fpvt')
  }

  if (!token) {
    console.log("No token found")
    return
  }

  const res = await fetch(`${apiUrl}/confirm-verification-code/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code, token }),
    credentials: "include"
  })

  const response = await res.json()
  console.log(response)
  return response
}

type changePasswordType = {
  newPassword: string,
  confirmPassword: string
}
// Change password 
export const changePassword = async (passwordData: changePasswordType) => {

  if (!passwordData.newPassword || !passwordData.confirmPassword) {
    return Error('Password must be provided')
  }

  let verificationToken;
  if (typeof window !== 'undefined') {
    verificationToken = localStorage.getItem('fpvt')
  }

  try {
    const response = await fetch(`${apiUrl}/change-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ verificationToken, newPassword: passwordData.newPassword })
    })

    const data = await response.json()
    console.log("data :", data)
    return data
  } catch (error) {
    console.error('Change password error : ', error)
    throw error;
  }
}

// Create user profile
export const createProfile = async (formData: ProfileFormData) => {
  try {
    const response = await fetch(`/api/users/create-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ formData }),
    });

    const res: AuthResponse = await response.json();

    if (!response.ok) {
      throw new Error(res.message || 'Registration failed');
    }

    return res;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Refresh Access Token
export const refreshAccessToken = async (): Promise<ProfileFormData | null> => {
  try {

    const response = await fetch(`/api/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (formData: LoginCredentials) => {

  if (!formData.identifier || !formData.password) {
    return Error('Identifier and password must be provided')
  }

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    console.log("data :", data)
    return data
  } catch (error) {
    console.error('Login error : ', error)
    throw error;
  }
}

// Logout user
export const logoutUser = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'DELETE',
      credentials: 'include'
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to logout user');
    }

    // Clear any local storage items
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }

    return data;
  } catch (error) {
    console.error('User logout error:', error);
    throw error;
  }
}

// Get current user
export const getCurrentUser = async (accessToken: string) => {

  if (!accessToken) {
    return {
      success: false,
      message: 'AccessToken not found'
    }
  }

  try {
    const response = await fetchWithAuth(`${apiUrl}/get-current-user`, {
      method: 'GET',
    }, accessToken, 'user')

    const data = await response;

    console.log('data user : ', data)

    if (!data.id) {
      throw new Error('Failed to fetch user profile');
    }

    localStorage.setItem('user', JSON.stringify(data))

    return {
      success: true,
      data: data
    }

  } catch (error) {
    console.error('Fetch user profile error:', error);
    throw error;
  }
};

// Get fish list
export const getFishList = async (filters: FishListFilters = {}): Promise<FishListResponse> => {

  try {
    // Build query parameters
    const queryParams = new URLSearchParams();

    // Add all filters to query parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    // Construct the URL with query parameters
    const url = `${apiUrl}/fish-list${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    console.log(url)

    // Make the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching fish listings: ${response.status}`);
    }

    const data: FishListResponse = await response.json();

    console.log('fish list : ', data)

    return data;
  } catch (error) {
    console.error('Error fetching fish listings:', error);
    throw error;
  }
};

// Get breeder info
export const getBreederInfo = async (id: string): Promise<SellerProfileResponse> => {
  try {
    const response = await fetch(`${apiUrl}/get-seller/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch breeder profile');
    }
    return data;
  } catch (error) {
    console.error('Fetch user breeder error:', error);
    throw error;
  }
}

// Add  to cart
export const addToCart = async (item: { fishId: string | undefined, quantity: number }) => {

  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = Cookies.get('refreshToken')
  console.log('refresh-token : ', refreshToken)
  console.log(item)

  if (!accessToken) {
    throw new Error('Failed to add to cart');
  }

  try {
    const response = await fetchWithAuth(`${apiUrl}/cart/add-item`, {
      method: 'POST',
      body: JSON.stringify(item)
    }, accessToken, 'user')

    const data = await response;

    console.log(data)

    if (!data.success) {
      throw new Error('Failed to add item to cart');
    }
    return data;
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
}

// Add to cart - Guest
export const addToCartGuest = async (item: { fishId: string | undefined, quantity: number }) => {

  const guestCartItems = localStorage.getItem('guestCartItems')
  if (!guestCartItems) {
    localStorage.setItem('guestCartItems', JSON.stringify([]))
  }

  try {
    const response = await fetch(`${apiUrl}/guest/cart/add-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })

    const data = await response.json();

    console.log(data)

    if (!data.success) {
      throw new Error('Failed to add item to cart');
    }
    return data;
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
}

// Edit cart item
export const editCartItem = async (item: { id: string, quantity: string | number }): Promise<StandardResponse> => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('Failed to add to cart');
  }

  try {
    const response = await fetchWithAuth(`${apiUrl}/cart/edit-item`, {
      method: 'PUT',
      body: JSON.stringify(item)
    }, accessToken, 'user')

    const data = await response;

    console.log(data)

    if (!data.success) {
      throw new Error('Failed to fetch breeder profile');
    }
    return data;
  } catch (error) {
    console.error('Fetch user breeder error:', error);
    throw error;
  }
}

// Delete cart item
export const deleteCartItem = async (id: string): Promise<StandardResponse> => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('Failed to add to cart');
  }

  try {
    const response = await fetchWithAuth(`${apiUrl}/cart/remove-item/${id}`, {
      method: 'DELETE',
    }, accessToken, 'user')

    const data = await response;

    console.log(data)

    if (!data.success) {
      throw new Error('Delete from cart unsuccessful');
    }
    return data;
  } catch (error) {
    console.error('Failed to delete item from cart:', error);
    throw error;
  }
}

// Add to wishlist
export const addToWishlist = async (id: string) => {
  const accessToken = localStorage.getItem('accessToken')
  console.log(id)

  if (!accessToken) {
    throw new Error('Failed to add to cart');
  }

  try {
    const response = await fetchWithAuth(`${apiUrl}/wishlist/add-item`, {
      method: 'POST',
      body: JSON.stringify({ id })
    }, accessToken, 'user')

    const data = await response;

    console.log(data)

    if (!data.success) {
      throw new Error('Failed to fetch breeder profile');
    }
    return data;
  } catch (error) {
    console.error('Fetch user breeder error:', error);
    throw error;
  }
}

// Delete from wishlist
export const deletewishlistItem = async (id: string): Promise<StandardResponse> => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('Failed to add to cart');
  }

  try {
    const response = await fetchWithAuth(`${apiUrl}/wishlist/remove-item/${id}`, {
      method: 'DELETE',
    }, accessToken, 'user')

    const data = await response;

    console.log(data)

    if (!data.success) {
      throw new Error('Delete from wishlist unsuccessful');
    }
    return data;
  } catch (error) {
    console.error('Failed to delete item from wishlist:', error);
    throw error;
  }
}

// Get Featured Fishes
export const getFeaturedFishes = async () => {
  try {
    const response = await fetch(`${apiUrl}/product/get-featured-fishes`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'GET'
    })

    const data = await response.json();

    console.log('data user : ', data)

    return {
      success: data.success,
      list: data.data,
      count: data.count
    }

  } catch (error) {
    console.error('Fetch user profile error:', error);
    throw error;
  }
}

// Get fish by category
export const getFishByCategory = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/product/get-fishes-by-category/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'GET'
    })

    const data = await response.json();

    console.log('data user : ', data)

    return {
      success: data.success,
      list: data.data,
      count: data.count
    }

  } catch (error) {
    console.error('Fetch user profile error:', error);
    throw error;
  }
}

// Get fish category by name
export const getFishCategoryByName = async (name: string) => {
  try {
    const response = await fetch(`${apiUrl}/product/get-fishes-by-name/${name}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'GET'
    })

    const data = await response.json();

    console.log('data user : ', data)

    return {
      success: data.success,
      list: data.data,
      count: data.count
    }

  } catch (error) {
    console.error('Fetch user profile error:', error);
    throw error;
  }
}

type GuestInfoType = {
  email: string,
  fullName: string,
  phoneNumber: string
}

export interface RazorpayOrderRequest {
  amount: number;
  currency?: string;
  receipt?: string;
}

export interface RazorpayOrderResponse {
  success: boolean;
  data: {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
  };
}

// Place order
export const createRazorpayOrder = async (orderData: RazorpayOrderRequest): Promise<RazorpayOrderResponse> => {
  console.log('Creating Razorpay order...');
  
  const accessToken = localStorage.getItem('accessToken');
  
  try {
    const response = await fetch(`${apiUrl}/order/create-razorpay-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(orderData),
      credentials: 'include',
    });

    const data = await response.json();
    
    console.log('Razorpay order response:', data);
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to create payment order');
    }
    
    return data;
  } catch (error) {
    console.error('Create Razorpay order error:', error);
    throw error;
  }
};

export interface PaymentDetailsType {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  payment_method: string;
}

// Updated product checkout with Razorpay payment details
export const productCheckout = async (details: {
  orderItems: OrderDetailsType[];
  shippingDetails: ShippingDetailsType;
  paymentDetails: PaymentDetailsType;
  couponCode: string | null;
  pointsToUse: number | null;
  orderNotes: string | null;
  guestInfo: GuestInfoType | null;
}) => {
  console.log('Product checkout reached with Razorpay payment!');

  const accessToken = localStorage.getItem('accessToken');
  let isGuest = false;

  if (!accessToken) {
    isGuest = true;
    const guestOrderItems = localStorage.getItem('guestOrderItems');
    if (!guestOrderItems) {
      localStorage.setItem('guestOrderItems', JSON.stringify([]));
    }
  }

  const {
    orderItems,
    shippingDetails,
    paymentDetails,
    couponCode,
    pointsToUse,
    orderNotes,
    guestInfo
  } = details;

  try {
    const response = await fetch(`${apiUrl}/order/place-order`, {
      method: 'POST',
      body: JSON.stringify({
        orderItems,
        guestInfo,
        shippingDetails,
        paymentDetails, // This now contains Razorpay payment details
        couponCode,
        pointsToUse,
        orderNotes
      }),
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      credentials: 'include',
    });

    const data = await response.json();

    console.log('Order place data from services:', data);

    if (!data.success) {
      throw new Error(data.message || 'Failed to place order');
    }

    if (isGuest) {
      return {
        data,
        orderItems,
        shippingDetails,
        couponCode,
        pointsToUse,
        orderNotes
      };
    }

    return data;
  } catch (error) {
    console.error('Place order error:', error);
    throw error;
  }
};

export interface PaymentDetailsType {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  payment_method: string;
}

type selectedItemsType = {
  cartItemId: string,
  quantity: string
}

// Cart checkout with Razorpay payment
export const cartCheckout = async (details: {
  cartId: string | null;
  cartItems: CartItem[] | null;
  shippingDetails: ShippingDetailsType;
  paymentDetails: PaymentDetailsType;
  couponCode: string | null;
  pointsToUse: number | null;
  orderNotes: string | null;
  guestInfo: GuestInfoType | null;
  selectedItems: selectedItemsType[] | null;
}) => {
  console.log('Cart checkout reached with Razorpay payment!');

  const accessToken = localStorage.getItem('accessToken');
  let isGuest = false;

  if (!accessToken) {
    isGuest = true;
    const guestOrderItems = localStorage.getItem('guestOrderItems');
    if (!guestOrderItems) {
      localStorage.setItem('guestOrderItems', JSON.stringify([]));
    }
  }

  const {
    cartId,
    cartItems,
    shippingDetails,
    paymentDetails,
    couponCode,
    pointsToUse,
    orderNotes,
    guestInfo,
    selectedItems
  } = details;

  try {
    const response = await fetch(`${apiUrl}/order/cart-checkout`, {
      method: 'POST',
      body: JSON.stringify({
        cartId,
        cartItems,
        guestInfo,
        shippingDetails,
        paymentDetails, // This now contains Razorpay payment details
        couponCode,
        pointsToUse,
        orderNotes,
        selectedItems
      }),
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      credentials: 'include',
    });

    const data = await response.json();

    console.log('Cart checkout data from services:', data);

    if (!data.success) {
      throw new Error(data.message || 'Failed to place order');
    }

    if (isGuest) {
      return {
        data,
        cartId,
        cartItems,
        guestInfo,
        shippingDetails,
        couponCode,
        pointsToUse,
        orderNotes,
        selectedItems
      };
    }

    return data;
  } catch (error) {
    console.error('Cart checkout error:', error);
    throw error;
  }
};

// Verify razorpay payment status
export const verifyPaymentStatus = async (paymentId: string) => {
  const accessToken = localStorage.getItem('accessToken');
  
  try {
    const response = await fetch(`${apiUrl}/order/verify-payment-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify({ paymentId }),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to verify payment status');
    }
    
    return data;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

// Get featured categories
export const getFeaturedCategories = async () => {
  try {
    const response = await fetch(`${apiUrl}/get-featured-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch featured categories');
    }

    return data;
  } catch (error) {
    console.error('Fetch featured categories error:', error);
    throw error;
  }
}

