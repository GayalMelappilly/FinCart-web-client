import { AuthResponse } from "@/app/types/auth/types"
import { ProfileFormData } from "@/app/types/types"
import { fetchWithAuth } from "../lib/fetchWithAuth"
import { FishListFilters, FishListResponse } from "../types/list/fishList"
import { config } from "dotenv"
import { SellerProfileResponse } from "../types/sellerProfile/type"
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

// Get current user
export const getCurrentUser = async (accessToken: string): Promise<ProfileFormData> => {
  try {
    const response = await fetchWithAuth(`${apiUrl}/get-current-user`, {
      method: 'GET',
    }, accessToken, 'user')

    const data = await response;

    if (!data.user.id) {
      throw new Error('Failed to fetch user profile');
    }
    return data.user;
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

