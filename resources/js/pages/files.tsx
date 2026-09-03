import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { games } from '@/routes';
import { useEffect, useState } from 'react';
import TableBuilder from '@/components/table-builder';

interface File {
    id: number;
    object_type: string;
    attachment_type: string;
    attachment_path: string;
    user_id: number;
    created_at: string;
}

export default function Files({ auth, files }: { auth: { user: { id: string | number } }, files: File[] }) {

    // Fetch All Files for User from API
    const filesData = files;
    console.log(filesData);

    // const deleteConfirmModal = (attachment_id: number) => {
    //     if (confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
    //         // DELETE request to /api/files/{attachment_id}
    //         fetch(`/api/files/${attachment_id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
    //             },
    //         })
    //             .then(response => {
    //                 if (response.ok) {
    //                     // If the delete was successful, reload the page to reflect the changes
    //                     window.location.reload();
    //                 } else {
    //                     alert('Failed to delete the game. Please try again.');
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error deleting game:', error);
    //                 alert('An error occurred while trying to delete the game. Please try again.');
    //             });
    //     }
    // };

    // const duplicateConfirmModal = (game_id: number) => {
    //     if (confirm('Are you sure you want to duplicate this game?')) {
    //         // POST request to /api/games/{game_id}/duplicate
    //         fetch(`/api/games/${game_id}/duplicate`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
    //             },
    //         })
    //             .then(response => {
    //                 if (response.ok) {
    //                     // If the duplication was successful, reload the page to reflect the changes
    //                     window.location.reload();
    //                 } else {
    //                     alert('Failed to duplicate the game. Please try again.');
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error duplicating game:', error);
    //                 alert('An error occurred while trying to duplicate the game. Please try again.');
    //             });
    //     }
    // };

    return (
        <>
            <Head title="Files" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold float-left">Files</h1>
                    <button
                        className="mt-0 rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 float-right"
                        onClick={() => window.location.href = '/games/add'}
                    >
                        Add Game
                    </button>
                </div>
                {filesData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <PlaceholderPattern className="w-full h-64" />
                        <p className="text-gray-500">No files found. Add some to a record.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {filesData.map((file) => (
                            <div key={file.id} className="border border-gray-300 rounded-md p-4">
                                <h2 className="text-xl font-bold">{file.id}</h2>
                                <p>Type: {file.attachment_type.replace('_', ' ').replace('-', ' ').charAt(0).toUpperCase() + file.attachment_type.replace('_', ' ').replace('-', ' ').slice(1)}</p>
                                <p>Object Type: {file.object_type.replace('_', ' ').replace('-', ' ').charAt(0).toUpperCase() + file.object_type.replace('_', ' ').replace('-', ' ').slice(1)}</p>
                                <p>Created At: {new Date(file.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => window.location.href = `/files/${file.attachment_path}`}
                                    >
                                        View
                                    </button>
                                    {/* <button
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                                        onClick={() => duplicateConfirmModal(file.id)}
                                    >
                                        Duplicate
                                    </button>
                                    <button
                                        className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                                        onClick={() => deleteConfirmModal(file.id)}
                                    >
                                        Delete
                                    </button> */}
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
