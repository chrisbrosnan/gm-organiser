import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { useEffect, useState } from 'react';

interface Game {
    system_name: string;
    id: number;
    name: string;
    system_id: number;
    type: string;
    created_at: string;
}

export default function Dashboard({ auth }: { auth: { user: { id: string | number; name?: string } } }) {

    // Fetch All Games for User from API
    const [gamesData, setGamesData] = useState<Game[]>([]);

    useEffect(() => {
        fetch(`/api/games/user/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setGamesData(data));
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="p-4 relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h3 className="mb-2">Hello, {auth.user.name ? auth.user.name.substring(0, auth.user.name.indexOf(' ')) + "!" : 'User'}</h3>
                        <p>This is your dashboard. From here you can manage your games, locations, quests, items, characters and other content for your tabletop RPG games.</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h2 className="mb-2">Games</h2>
                        {gamesData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-4">
                                <PlaceholderPattern className="w-full h-64" />
                                <p className="text-gray-500">No games found. Create a new game to get started.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-1 gap-4 text-xs">
                                {gamesData.map((game) => (
                                    <div key={game.id} className="border border-gray-300 rounded-md p-4">
                                        <h2 className="text-xl font-bold">{game.name}</h2>
                                        <p>System: {game.system_name}</p>
                                        <button className="mt-2 rounded-md bg-blue-500 py-1 px-2 text-white hover:bg-blue-600" onClick={() => window.location.href = `/games/edit?game_id=${game.id}`}>Edit</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
