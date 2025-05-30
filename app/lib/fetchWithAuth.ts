'use client'

export const fetchWithAuth = async (url: string, options: RequestInit = {}, accessToken: string, type: string) => {

    let res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
    });

    console.log("RES : ", res, url, accessToken)

    if (res.status === 401) {
        try {
            // Attempt to refresh token
            const refresh = await fetch(`/api/auth/refresh-token?type=${type}`, {
                credentials: 'include',
            });

            const data = await refresh.json()

            if (type == 'user') {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('accessToken', data.accessToken)
                }
            } else if (type == 'seller') {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('sellerAccessToken', data.accessToken)
                }
            }

            if (!data.success) throw new Error('Unable to refresh token');

            // Retry original request
            res = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.accessToken}`,
                },
                credentials: 'include',
            });

            const response = await res.json()

            return response

        } catch (err) {
            console.log(err)
            throw new Error('Session expired');
        }
    }

    console.log('response fetch with auth : ',res)

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
};
