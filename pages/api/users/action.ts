'use server'

import { ProfileFormData } from "@/app/types/types"

const apiUrl = process.env.API_URL

// Signup user
export const signUpUser = async(phoneNumber: string) => {
    const res = await fetch(`${apiUrl}/sign-up/`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({phoneNumber}),
        credentials: "include"
    })

    const response = await res.json()
    console.log(response)
    return response
}

// Create user profile
export const createProfile = async(formData: ProfileFormData) => {
    const res = await fetch(`${apiUrl}/create-profile/`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({formData}),
        credentials: "include"
    })
    const response = await res.json()
    return response
}