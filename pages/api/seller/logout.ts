'use server'

import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    // Clear the cookies on the client side
    res.setHeader('Set-Cookie', [
      serialize('sellerAccessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: -1, // Expire immediately
      }),
      serialize('sellerRefreshToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: -1, // Expire immediately
      }),
    ]);

    return res.status(200).json({ success: true, message: 'Seller logged out successfully' });
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}