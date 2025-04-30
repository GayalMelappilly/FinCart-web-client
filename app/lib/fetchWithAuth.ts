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

    console.log("RES : ",res)

    if (res.status === 401) {
        try {
            // Attempt to refresh token
            const refresh = await fetch(`/api/auth/refresh-token?type=${type}`, {
                credentials: 'include',
            });

            const data = await refresh.json()

            if(type == 'user'){
                localStorage.setItem('accessToken', data.accessToken)
            }else if(type == 'seller'){
                localStorage.setItem('sellerAccessToken', data.accessToken)
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
            throw new Error('Session expired');
        }
    }

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
};
