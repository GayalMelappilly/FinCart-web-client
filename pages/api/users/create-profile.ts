import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const apiUrl = process.env.API_URL || 'http://localhost:5000/api/v1'

  try {
    const response = await fetch(`${apiUrl}/create-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      credentials: 'include'
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.message || 'Something went wrong' });
    }

    const data = await response.json();

    // Assuming backend sends { accessToken, refreshToken }
    const { accessToken, refreshToken } = data.data;

    console.log(accessToken, refreshToken)

    res.setHeader('Set-Cookie', [
      serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15,
      }),
      serialize('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }),
    ]);

    return res.status(200).json({ message: 'Profile created', accessToken: accessToken });
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
