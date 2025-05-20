'use client';

import { Station } from '@/lib/constants/station';

export default function StationClientView({ station }: { station: Station }) {
    return (
        <>
        <div className="flex items-center space-x-4 mb-4">
            <img
            src={station.favicon || '/favicon.ico'}
            alt={station.name}
            className="w-16 h-16 rounded object-cover"
            />
            <div>
            <h1 className="text-2xl font-bold">{station.name}</h1>
            <p className="text-sm text-gray-600">{station.country} — {station.language}</p>
            </div>
        </div>

        <p className="text-sm text-gray-600 mb-2">Tags: {station.tags || 'None'}</p>
        <p className="text-sm text-gray-600 mb-2">Bitrate: {station.bitrate} kbps</p>
        <p className="text-sm text-gray-600 mb-6">Codec: {station.codec}</p>

        {station.url_resolved ? (
            <audio controls className="w-full">
            <source src={station.url_resolved} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
        ) : (
            <p className="text-sm text-red-400">No stream available</p>
        )}

        {station.homepage && (
            <a
            href={station.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 underline"
            >
            Visit Station Homepage
            </a>
        )}
        </>
    );
}