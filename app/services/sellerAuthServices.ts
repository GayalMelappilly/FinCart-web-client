import { fetchWithAuth } from "../lib/fetchWithAuth"
import { SellerData } from "../types/seller/types"

const apiUrl = process.env.API_URL || 'http://localhost:5000/api/v1'

export const createSellerProfile = async (formData: SellerData) => {

    console.log("FORM DATA : ", formData)
    console.log("REACHED")

    try {
        const response = await fetch(`/api/seller/create-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        })


        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Registration error : ', error)
        throw error;
    }
}

export const getSellerDetails = async (accessToken: string) => {

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/get-current-seller`, {
            method: 'GET',
        }, accessToken, 'seller')

        const data = await response;

        console.log("GET SELLER D : ",data)

        if (!data.success) {
            throw new Error('Failed to fetch user profile');
        }
        return data;
    } catch (error) {
        console.error('Fetch user profile error:', error);
        throw error;
    }
}