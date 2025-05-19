'use client';

import useSWR from 'swr';
import { resilientFetch } from '@/lib/utils/fetcher';
import { RADIO_BROWSER_ENDPOINTS } from '@/lib/constants/api';
import { Station } from '@/lib/constants/station';

export function useStationByUUID(uuid: string) {
    const url = RADIO_BROWSER_ENDPOINTS.BY_UUID(uuid);
    const { data, error, isLoading } = useSWR<Station[]>(url, resilientFetch); // returns an array

    return {
        station: data?.[0],
        isLoading,
        isError: error,
    };
}
