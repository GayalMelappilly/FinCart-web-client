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
            body: JSON.stringify( formData )
        })

        const data = await response.json()

        console.log(data)

        return data
    } catch (error) {
        console.error('Registration error : ', error)
        throw error;
    }
}