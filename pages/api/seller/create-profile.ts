'use server'

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const apiUrl = process.env.API_URL || 'http://localhost:5000/api/v1'

  console.log("FORM DATA : ",req.body)

  try {
    const response = await fetch(`${apiUrl}/seller/create-profile`, {
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

    console.log("SELLER DATA : ",data)

    return res.status(200).json({ message: 'Profile created'});
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
