import { Head } from '@inertiajs/react';

export default function Changelog({ auth }: { auth: { user: { id: string | number } } }) {

    return (
        <>
            <Head title="Changelog" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold float-left">Upcoming and New Changes</h1>
                </div>
                <div>
                    <h2>Latest Updates</h2>
                    <p>No updates available at the moment.</p>
                </div>
                <div>
                    <h2>Upcoming Changes</h2>
                    <p>
                        <ul>
                            <li>Forum functionality: Discussion threads and community engagement improvements.</li>
                            <li>Character sheet exporting: Ability to export character sheets as PDFs.</li>
                            <li>Game notes exporter: Ability to export game content for offline use.</li>
                            <li>Character presets: Preset character meta_data stats by system.</li>
                        </ul>
                    </p>
                </div>
            </div>
        </>
    );
}
