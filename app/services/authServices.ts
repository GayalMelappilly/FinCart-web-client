import { AuthResponse, LoginCredentials } from "@/app/types/auth/types"
import { ProfileFormData } from "@/app/types/types"
import { fetchWithAuth } from "../lib/fetchWithAuth"
import { FishListFilters, FishListResponse } from "../types/list/fishList"
import { config } from "dotenv"
import { SellerProfileResponse } from "../types/sellerProfile/type"
import { StandardResponse } from "../types/cart/type"
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

export const confirmOtp = async (code: string) => {

  console.log('Verification code: ', code)

  const token = localStorage.getItem('vt')

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

  if(!accessToken){
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
      throw new Error('Failed to fetch breeder profile');
    }
    return data;
  } catch (error) {
    console.error('Fetch user breeder error:', error);
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
      body: JSON.stringify({id})
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