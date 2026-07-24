import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { games } from '@/routes';
import { useEffect, useState } from 'react';
import TableBuilder from '@/components/table-builder';

interface Game {
    system_name: string;
    id: number;
    name: string;
    system_id: number;
    type: string;
    created_at: string;
}

export default function Games({ auth }: { auth: { user: { id: string | number } } }) {

    // Fetch All Games for User from API
    const [gamesData, setGamesData] = useState<Game[]>([]);

    useEffect(() => {
        fetch(`/api/games/by_user/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setGamesData(data));
    }, []);

    const deleteConfirmModal = (game_id: number) => {
        if (confirm('Are you sure you want to delete this game? This action cannot be undone.')) {
            // Window.href = `/games/delete?game_id=${game_id}`
            window.location.href = `/games/delete?game_id=${game_id}`;
        }
    };

    const duplicateConfirmModal = (game_id: number) => {
        if (confirm('Are you sure you want to duplicate this game?')) {
            window.location.href = `/games/duplicate?game_id=${game_id}`;
        }
    };

    // console.log(gamesData, 'gamesData');

    return (
        <>
            <Head title="Games" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold float-left">Games</h1>
                    <button
                        className="mt-0 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 float-right"
                        onClick={() => window.location.href = '/games/add'}
                    >
                        Add Game
                    </button>
                </div>
                {gamesData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <PlaceholderPattern className="w-full h-64" />
                        <p className="text-gray-500">No games found. Create a new game to get started.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {gamesData.map((game) => (
                            <div key={game.id} className="border border-gray-300 rounded-md p-4">
                                <h2 className="text-xl font-bold">{game.name}</h2>
                                <p>System: {game.system_name}</p>
                                <p>Type: {game.type.replace('_', ' ').replace('-', ' ').charAt(0).toUpperCase() + game.type.replace('_', ' ').replace('-', ' ').slice(1)}</p>
                                <p>Created At: {new Date(game.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                        onClick={() => window.location.href = `/games/edit?game_id=${game.id}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                        onClick={() => duplicateConfirmModal(game.id)}
                                    >
                                        Duplicate
                                    </button>
                                    <button
                                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                        onClick={() => deleteConfirmModal(game.id)}
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

Games.layout = {
    breadcrumbs: [
        {
            title: 'Games',
            href: games(),
        },
    ],
};
