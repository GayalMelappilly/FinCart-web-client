'use server'

import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize, parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log("REACHED")

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { type } = req.query
    console.log("TYPE : ",type)

    const cookies = parse(req.headers.cookie || '');

    console.log(cookies)

    let refreshToken;

    if(type == 'user'){
        refreshToken = cookies.refreshToken;
    }else if(type == 'seller'){
        refreshToken = cookies.sellerRefreshToken
    }

    console.log("RFT : ", refreshToken)

    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.SERVER_API : process.env.LOCAL_HOST_API

    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

    const response = await fetch(`${apiUrl}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        credentials: 'include'
    });


    if (!response.ok) return res.status(401).json({
        success: false,
        message: 'Refresh token invalid or expired'
    });

    const data = await response.json()

    const accessToken = data.accessToken

    if(type == 'user'){
        res.setHeader('Set-Cookie', [
            serialize('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 15,
            }),
        ])
    }else if(type == 'seller'){
        res.setHeader('Set-Cookie', [
            serialize('sellerAccessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 15,
            }),
        ])
    }

    console.log("TOKEN REFRESHED")

    return res.status(200).json({
        success: true,
        accessToken: accessToken
    });
}
