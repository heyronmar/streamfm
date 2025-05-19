const fallbackServers = ['de2', 'us1', 'nl1', 'fr1'];

export async function resilientFetch<T>(
    path: string,
    options?: RequestInit
    ): Promise<T> {
    let lastError;

    for (const server of fallbackServers) {
        const url = `https://${server}.api.radio-browser.info/json${path}`;

        try {
        const res = await fetch(url, {
            ...options,
            headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
            },
        });

        if (!res.ok) {
            throw new Error(`Server ${server} error: ${res.status}`);
        }

        const data: T = await res.json();

        // Return if data is valid
        if (Array.isArray(data) && data.length === 0) {
            throw new Error(`Server ${server} returned empty result`);
        }

        return data;
        } catch (error) {
        console.warn(`[Fallback] Failed on ${server}:`, error);
        lastError = error;
        }
    }

    throw lastError;
}
