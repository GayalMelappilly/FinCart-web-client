'use server'

const apiUrl = process.env.API_URL

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