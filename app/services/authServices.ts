import { AuthResponse, User } from "@/app/types/auth/types"
import { ProfileFormData } from "@/app/types/types"
import { fetchWithAuth } from "../lib/fetchWithAuth"

const apiUrl = process.env.API_URL || 'http://localhost:5000/api/v1'

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
    },accessToken, 'user')

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