import { FishProduct } from "../components/Seller/Products/AddOrEditProduct/Form"
import { fetchWithAuth } from "../lib/fetchWithAuth"
import { SellerData } from "../types/seller/sellerDetails/types"
import { SellerDataCreate } from "../types/seller/types"

const apiUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVER_API : process.env.NEXT_PUBLIC_LOCAL_HOST_API

// Create seller profile
export const createSellerProfile = async (formData: SellerDataCreate) => {

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

// Get seller details
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
    identifier: string;
    password: string;
}

// Login seller
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

// Verify seller email
export const verifySellerEmail = async (email: string) => {
    const res = await fetch(`${apiUrl}/seller/verify-email`, {
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

// Confirm seller OTP
export const confirmSellerOtp = async (data: OtpDataType) => {

    const code = data.code

    let token;
    if (data.type === 'auth') {
        token = typeof window !== 'undefined' ? localStorage.getItem('svt') : null
    } else if (data.type === 'forgotPassword') {
        token = typeof window !== 'undefined' ? localStorage.getItem('fpvt') : null
    }

    console.log("tokken : ", token)

    if (!token) {
        console.log("No token found")
        return
    }

    const res = await fetch(`${apiUrl}/seller/confirm-verification-code`, {
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

// Logout seller
export const logoutSeller = async (accessToken: string) => {

    console.log("Logout seller")

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/logout`, {
            method: 'GET',
        }, accessToken, 'seller')

        const data = await response;

        await fetch('/api/seller/logout', {
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

// Add product
export const addProduct = async (productData: FishProduct) => {

    console.log("Product details : ", productData)


    const accessToken = localStorage.getItem('sellerAccessToken') as string
    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/product/add-product`, {
            method: 'POST',
            body: JSON.stringify(productData)
        }, accessToken, 'seller')

        console.log("RESPONSE : ", response)

        const data = await response

        console.log("DATA : ", data)

        if (!data.success) {
            throw new Error('Failed to fetch user profile');
        }
        return data;

    } catch (error) {
        console.error('Error add new fish to the list : ', error);
        throw error;
    }

}

// Edit product
export const editProduct = async (productData: FishProduct) => {

    console.log("Product details : ", productData)
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/product/edit-product/${productData.id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        }, accessToken, 'seller')

        console.log("RESPONSE : ", response)

        const data = await response

        console.log("DATA : ", data)

        if (!data.success) {
            throw new Error('Product edit error');
        }
        return data;

    } catch (error) {
        console.error('Error edit fish : ', error);
        throw error;
    }

}

// Delete product
export const deleteProduct = async (productId: string) => {
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/product/delete-product/${productId}`, {
            method: 'DELETE',
        }, accessToken, 'seller')

        console.log("RESPONSE : ", response)

        const data = await response

        console.log("DATA : ", data)

        if (!data.success) {
            throw new Error('Product edit error');
        }
        return data;

    } catch (error) {
        console.error('Error edit fish : ', error);
        throw error;
    }
}

// Get seller profile
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

// Update seller profile
export const updateSellerProfile = async (updatedData: SellerData) => {
    console.log("Product details : ", updatedData)
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/update-profile`, {
            method: 'PUT',
            body: JSON.stringify(updatedData)
        }, accessToken, 'seller')

        console.log("RESPONSE : ", response)

        const data = await response

        console.log("DATA : ", data)

        if (!data.success) {
            throw new Error('Profile update error');
        }
        return data;

    } catch (error) {
        console.error('Error updating the profile : ', error);
        throw error;
    }
}

export interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// Update seller password
export const updateSellerPassword = async (form: PasswordForm) => {
    console.log('passwords : ', form.currentPassword, form.confirmPassword)
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/update-password`, {
            method: 'PUT',
            body: JSON.stringify(form)
        }, accessToken, 'seller')

        console.log("RESPONSE : ", response)

        const data = await response

        if (!data.success) {
            throw new Error('Password update error');
        }
        return data;

    } catch (error) {
        console.error('Error updating password : ', error);
        throw error;
    }
}

type changePasswordType = {
    newPassword: string,
    confirmPassword: string
}
// Change seller password (Forgot password)
export const changeSellerPassword = async (passwordData: changePasswordType) => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
        return Error('Password must be provided')
    }

    let verificationToken;
    if (typeof window !== 'undefined') {
        verificationToken = localStorage.getItem('fpvt')
    }

    try {
        const response = await fetch(`${apiUrl}/seller/change-password/`, {
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
        console.error('Change seller password error : ', error)
        throw error;
    }
}

export const getAllOrders = async (page: number, limit: number, activeTab: string | null) => {
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/order/get-orders?page=${page}&limit=${limit}&status=${activeTab}`, {
            method: 'GET',
        }, accessToken, 'seller')

        const data = await response

        if (!data.success) {
            throw new Error('Get all orders error');
        }
        return data;

    } catch (error) {
        console.error('Error fetching all orders : ', error);
        throw error;
    }
}

type actionData = {
    action: string,
    orderId: string,
    receipt: string | null  
}

export const orderAction = async ({ action, orderId, receipt }: actionData) => {
    const accessToken = localStorage.getItem('sellerAccessToken') as string
    if (!action || !orderId) {
        return Error('Action and orderId must be provided')
    }

    

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/order/order-action`, {
            method: 'POST',
            body: JSON.stringify({action, orderId, receipt})
        }, accessToken, 'seller')

        const data = await response

        console.log("ORDER ACTION RESPONSE : ",data)

        if (!data.success) {
            throw new Error('Get all orders error');
        }
        return data;
    } catch (error) {
        console.error('Order action error : ', error)
        throw error;
    }
}

export const orderStatistics = async () => {
    const accessToken = localStorage.getItem('sellerAccessToken') as string

    try {
        const response = await fetchWithAuth(`${apiUrl}/seller/order/order-statistics`, {
            method: 'GET',
        }, accessToken, 'seller')

        const data = await response

        if (!data.success) {
            throw new Error('Get order statistics error');
        }
        return data;

    } catch (error) {
        console.error('Error fetching order statistics : ', error);
        throw error;
    }
}