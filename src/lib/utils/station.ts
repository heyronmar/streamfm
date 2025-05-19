import { Station } from '@/lib/constants/station';

const fallbackServers = ['de2', 'us1', 'nl1']; // Removed fr1 since it's unreachable

export async function fetchStationByUUID(uuid: string): Promise<Station | null> {
    if (!uuid) {
        console.warn('[❌ UUID Missing] Cannot fetch station without a UUID');
        return null;
    }

    for (const server of fallbackServers) {
        const url = `https://${server}.api.radio-browser.info/json/stations/byuuid/${uuid}`;

        try {
        console.log(`[🌐 Trying] ${url}`);

        const res = await fetch(url, {
            headers: {
            'Content-Type': 'application/json',
            },
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.warn(`[❌ Server Error] ${server}: ${res.status}`);
            continue;
        }

        const data: Station[] = await res.json();

        if (Array.isArray(data) && data.length > 0) {
            console.log(`[✅ Found] Server: ${server}`);
            return data[0];
        } else {
            console.warn(`[🟡 No Data] ${server} returned empty result`);
        }
        } catch (err) {
        console.warn(`[❌ Fetch Failed] ${server}:`, err);
        continue;
        }
    }

    return null;
}
