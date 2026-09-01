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

export default function Games({ auth, games }: { auth: { user: { id: string | number } }, games: Game[] }) {

    // Fetch All Games for User from API
    const gamesData = games;

    const deleteConfirmModal = (game_id: number) => {
        if (confirm('Are you sure you want to delete this game? This action cannot be undone.')) {
            // DELETE request to /api/games/{game_id}
            fetch(`/api/games/${game_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
                },
            })
                .then(response => {
                    if (response.ok) {
                        // If the delete was successful, reload the page to reflect the changes
                        window.location.reload();
                    } else {
                        alert('Failed to delete the game. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting game:', error);
                    alert('An error occurred while trying to delete the game. Please try again.');
                });
        }
    };

    const duplicateConfirmModal = (game_id: number) => {
        if (confirm('Are you sure you want to duplicate this game?')) {
            // POST request to /api/games/{game_id}/duplicate
            fetch(`/api/games/${game_id}/duplicate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
                },
            })
                .then(response => {
                    if (response.ok) {
                        // If the duplication was successful, reload the page to reflect the changes
                        window.location.reload();
                    } else {
                        alert('Failed to duplicate the game. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error duplicating game:', error);
                    alert('An error occurred while trying to duplicate the game. Please try again.');
                });
        }
    };

    return (
        <>
            <Head title="Games" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold float-left">Games</h1>
                    <button
                        className="mt-0 rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 float-right"
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
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                                        onClick={() => window.location.href = `/games/${game.id}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                                        onClick={() => duplicateConfirmModal(game.id)}
                                    >
                                        Duplicate
                                    </button>
                                    <button
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
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
