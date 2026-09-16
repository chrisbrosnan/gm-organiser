import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { locations } from '@/routes';
import { useEffect, useState } from 'react';
// import TableBuilder from '@/components/table-builder';

interface Location {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export default function Locations({ auth, locations }: { auth: { user: { id: string | number } }, locations: Location[] }) {

    // Fetch All Games for User from API
    const [locationsData, setLocationsData] = useState<Location[]>(locations);

    const deleteConfirmModal = (location_id: number) => {
        if (confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
            // Window.href = `/locations/delete?location_id=${location_id}`
            window.location.href = `/locations/delete?location_id=${location_id}`;
        }
    };

    const duplicateConfirmModal = (location_id: number) => {
        if (confirm('Are you sure you want to duplicate this location?')) {
            window.location.href = `/locations/duplicate?location_id=${location_id}`;
        }
    };

    console.log(locationsData, 'locationsData');

    return (
        <>
            <Head title="Locations" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold float-left">Locations</h1>
                    <button
                        className="mt-0 rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 text-xs float-right"
                        onClick={() => window.location.href = '/locations/add'}
                    >
                        Add Location
                    </button>
                </div>
                {locationsData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <PlaceholderPattern className="w-full h-64" />
                        <p className="text-gray-500">No locations found. Create a new location to get started.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {locationsData.map((location) => (
                            <div key={location.id} className="border border-gray-300 rounded-md p-4">
                                <h2 className="text-xl font-bold text-center py-3">{location.name}</h2>
                                <p>Description: {location.description}</p>
                                <p>Created At: {new Date(location.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <div className="grid md:grid-cols-3 gap-2 mt-2 py-3">
                                    <button
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 text-xs"
                                        onClick={() => window.location.href = `/locations/${location.id}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 text-xs"
                                        onClick={() => duplicateConfirmModal(location.id)}
                                    >
                                        Duplicate
                                    </button>
                                    <button
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 text-xs"
                                        onClick={() => deleteConfirmModal(location.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

Locations.layout = {
    breadcrumbs: [
        {
            title: 'Locations',
            href: locations(),
        },
    ],
};
