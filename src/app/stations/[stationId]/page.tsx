import { fetchStationByUUID } from '@/lib/utils/station';
import StationClientView from '@/components/StationClientView';
import Link from 'next/link';

export default async function StationDetailPage({
    params,
    }: {
    params: Record<string, string>;
    }) {
    const { stationId } = params;

    if (!stationId) {
        console.warn('[❌ Missing stationId in params]');
        return <div className="p-6 text-red-500">Invalid station ID.</div>;
    }

    const station = await fetchStationByUUID(stationId);

    if (!station) {
        return <div className="p-6 text-gray-500">Station not found.</div>;
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
        <Link href="/stations" className="text-blue-500 underline text-sm mb-4 inline-block">
            ← Back to stations
        </Link>

        <StationClientView station={station} />
        </div>
    );
}
