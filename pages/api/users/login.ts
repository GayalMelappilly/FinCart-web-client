'use server'

import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { configDotenv } from 'dotenv';
configDotenv()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const apiUrl = process.env.NODE_ENV === "production" ? process.env.SERVER_API : process.env.LOCAL_HOST_API
  console.log('api url : ',apiUrl)
  console.log(process.env.NODE_ENV, process.env.SERVER_API, process.env.LOCAL_HOST_API)

  console.log("form data: ",req.body)

  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      credentials: 'include'
    });

    console.log(response)

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ success: false, error: err.message || 'Something went wrong' });
    }

    const data = await response.json();

    console.log("Login : ",data)

    // Assuming backend sends { accessToken, refreshToken }
    const { accessToken, refreshToken } = data.data;

    console.log('type : ',process.env.NODE_ENV)

    res.setHeader('Set-Cookie', [
      serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 60 * 15,
      }),
      serialize('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }),
    ]);

    return res.status(200).json({ message: 'User logged in', accessToken: accessToken});
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
