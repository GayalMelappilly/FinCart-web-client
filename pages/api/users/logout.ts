import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { configDotenv } from 'dotenv';
configDotenv();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end('Method Not Allowed');

  const apiUrl = process.env.NODE_ENV === "production" ? process.env.SERVER_API : process.env.LOCAL_HOST_API;
  
  try {
    // Extract the token from the cookies
    const { accessToken } = req.cookies;
    
    // Call the backend logout endpoint
    const response = await fetch(`${apiUrl}/logout`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include'
    });

    // Clear cookies regardless of backend response
    res.setHeader('Set-Cookie', [
      serialize('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 0, // Expire immediately
      }),
      serialize('refreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 0, // Expire immediately
      }),
    ]);

    if (!response.ok) {
      const error = await response.json();
      // We still return 200 to the frontend because we've cleared cookies locally
      return res.status(200).json({ 
        success: true, 
        message: 'Logged out locally. Backend sync issue: ' + (error.message || 'Unknown error')
      });
    }

    const data = await response.json();
    console.log('Logout data : ',data)
    return res.status(200).json({ success: true, message: 'Successfully logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    // Still return success as we've cleared cookies locally
    return res.status(200).json({ success: true, message: 'Logged out locally. Backend sync failed.' });
  }
}