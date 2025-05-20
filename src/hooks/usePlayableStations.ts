import { useEffect, useState, useMemo } from 'react';
import { Station } from '@/lib/constants/station';
import { checkStreamPlayable } from '@/lib/utils/checkStreamPlayable';

export function usePlayableStations(stations: Station[]) {
    const [playable, setPlayable] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);

    const stableStations = useMemo(() => {
        return JSON.stringify(stations); // freeze input
    }, [stations]);

    useEffect(() => {
        const parsedStations = JSON.parse(stableStations) as Station[];

        if (!parsedStations || parsedStations.length === 0) {
        setPlayable([]);
        setLoading(false);
        return;
        }

        async function filterPlayable() {
        setLoading(true);
        const results = await Promise.all(
            parsedStations.map(async (station) => {
            const ok = await checkStreamPlayable(station.url_resolved);
            return ok ? station : null;
            })
        );

        setPlayable(results.filter(Boolean) as Station[]);
        setLoading(false);
        }

        filterPlayable();
    }, [stableStations]);

    return { playable, loading };
}