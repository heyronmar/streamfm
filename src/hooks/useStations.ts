'use client';

import useSWR from 'swr';
import { resilientFetch } from '@/lib/utils/fetcher';
import { Station } from '@/lib/constants/station';

export function useStations(limit = 12) {
    const path = `/stations/search?limit=${limit}&hidebroken=true&order=clickcount&reverse=true`;

    const { data, error, isLoading } = useSWR<Station[]>(path, resilientFetch);
    console.log(`[SUCCESS] Loaded data from: ${path}`);
    return {
        stations: data || [],
        isLoading,
        isError: error,
    };
}
