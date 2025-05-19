import { fetchStationByUUID } from "@/lib/utils/station";

export default async function StationDetailPage({
    params,
    }: {
    params: { stationId?: string };
    }) {
    const stationId = params.stationId;

    if (!stationId) {
        console.warn('[❌ Missing stationId in params]');
        return <div className="p-6 text-red-500">Invalid station ID.</div>;
    }

    const station = await fetchStationByUUID(stationId);

    if (!station) {
        return <div className="p-6 text-gray-500">Station not found.</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{station.name}</h1>

        <pre className="text-sm bg-gray-100 p-4 rounded text-gray-800 overflow-x-auto">
            {JSON.stringify(station, null, 2)}
        </pre>
        </div>
    );
}
