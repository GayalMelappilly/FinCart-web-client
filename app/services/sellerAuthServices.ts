import { FishProduct } from "../components/Seller/Products/AddOrEditProduct/Form"
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

        return {
            success: true
        }

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

        if (!data.success) {
            throw new Error('Failed to fetch user profile');
        }
        return data;
    } catch (error) {
        console.error('Fetch user profile error:', error);
        throw error;
    }
}

interface FormData {
    emailOrMobile: string;
    password: string;
    rememberMe: boolean;
}

export const loginSeller = async (formData: FormData) => {
    console.log("FORM DATA : ", formData)
    console.log("REACHED")

    try {
        const response = await fetch(`/api/seller/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        })

        // if (!response.ok) {
        //     throw new Error('Login failed');
        // }

        const data = await response.json()

        console.log("data :", data)

        return data
    } catch (error) {
        console.error('Login error : ', error)
        throw error;
    }
}

export const logoutSeller = async (accessToken: string) => {

    console.log("Logout seller")

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/logout`, {
            method: 'GET',
        }, accessToken, 'seller')

        const data = await response;

        await fetch('/api/auth/logout', {
            credentials: 'include',
        })

        if (!data.success) {
            throw new Error('Failed to fetch user profile');
        }
        return data;
    } catch (error) {
        console.error('Fetch user profile error:', error);
        throw error;
    }
}

export const addProduct = async (productData: FishProduct) => {

    console.log("Product details : ",productData)


    const accessToken = localStorage.getItem('sellerAccessToken') as string
    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/product/add-product`, {
            method: 'POST',
            body: JSON.stringify(productData)
        },accessToken, 'seller')

        console.log("RESPONSE : ",response)

        const data = await response

        console.log("DATA : ",data)

        if (!data.success) {
            throw new Error('Failed to fetch user profile');
        }
        return data;

    } catch (error) {
        console.error('Error add new fish to the list : ', error);
        throw error;
    }

}

export const editProduct = async (productData: FishProduct) => {

    console.log("Product details : ",productData)
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/product/edit-product/${productData.id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        },accessToken, 'seller')

        console.log("RESPONSE : ",response)

        const data = await response

        console.log("DATA : ",data)

        if (!data.success) {
            throw new Error('Product edit error');
        }
        return data;

    } catch (error) {
        console.error('Error edit fish : ', error);
        throw error;
    }

}

export const deleteProduct = async (productId: string) => {
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/product/delete-product/${productId}`, {
            method: 'DELETE',
        },accessToken, 'seller')

        console.log("RESPONSE : ",response)

        const data = await response

        console.log("DATA : ",data)

        if (!data.success) {
            throw new Error('Product edit error');
        }
        return data;

    } catch (error) {
        console.error('Error edit fish : ', error);
        throw error;
    }
}

export const getSellerProducts = async () => {

    console.log("Get seller products")
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {

        const response = await fetchWithAuth(`${apiUrl}/seller/products`, {
            method: 'GET'
        }, accessToken, 'seller')

        const data = await response

        console.log('Seller list : ', data)

        if (!data.success) {
            throw new Error('Failed to fetch user profile');
        }

        return data;

    } catch (error) {
        console.error('Error fetching the seller list : ', error);
        throw error;
    }
}