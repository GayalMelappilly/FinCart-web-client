'use client'

import { config } from "dotenv"
config()

const apiUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVER_API : process.env.NEXT_PUBLIC_LOCAL_HOST_API

export const getAllCategoriesWithCount = async () => {
    try {
    const response = await fetch(`${apiUrl}/admin/get-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json();

    return {
      success: data.success,
      list: data.data,
      count: data.count
    }

  } catch (error) {
    console.error('Fetch categories error:', error);
    throw error;
  }
}