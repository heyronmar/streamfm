'use client';

import { useStations } from '@/hooks/useStations';
import { usePlayableStations } from '@/hooks/usePlayableStations';
import { Station } from '@/lib/constants/station';
import Link from 'next/link';

export default function StationsPage() {
    const { stations, isLoading: loadingStations, isError } = useStations(12);
    const { playable, loading: filteringPlayable } = usePlayableStations(stations ?? []);

    if (loadingStations || filteringPlayable) {
        return <p className="p-4 text-gray-500">Loading playable stations...</p>;
    }

    if (isError) {
        return <p className="p-4 text-red-500">Failed to load stations.</p>;
    }

    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Playable Stations</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {playable.map((station: Station) => (
            <Link
                key={station.stationuuid}
                href={`/stations/${station.stationuuid}`}
                className="border rounded-lg shadow-sm p-4 hover:shadow-md transition block"
            >
                <div className="flex items-center space-x-4 mb-3">
                <img
                    src={station.favicon || '/favicon.ico'}
                    alt={station.name}
                    className="w-12 h-12 rounded object-cover"
                />
                <div>
                    <h2 className="font-semibold text-lg">{station.name}</h2>
                    <p className="text-sm text-gray-500">{station.country}</p>
                </div>
                </div>

                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                Tags: {station.tags.split(',').slice(0, 4).join(', ') || 'None'}
                </p>
            </Link>
            ))}
        </div>
        </div>
    );
}
