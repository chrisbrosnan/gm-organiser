import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { general_notes } from '@/routes';
import { useEffect, useState } from 'react';
// import TableBuilder from '@/components/table-builder';

interface Note {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export default function GeneralNotes({ auth }: { auth: { user: { id: string | number } } }) {

    // Fetch All Games for User from API
    const [notesData, setNotesData] = useState<Note[]>([]);

    useEffect(() => {
        fetch(`/api/notes/by_user/${auth.user.id}`)
            .then(response => response.json())
            .then(data => setNotesData(data));
    }, []);

    const deleteConfirmModal = (note_id: number) => {
        if (confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
            // Window.href = `/notes/delete?note_id=${note_id}`
            window.location.href = `/notes/delete?note_id=${note_id}`;
        }
    };

    console.log(notesData, 'notesData');

    return (
        <>
            <Head title="General Notes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-bold float-left">General Notes</h1>
                    <button
                        className="mt-0 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 float-right"
                        onClick={() => window.location.href = '/general-notes/add'}
                    >
                        Add Note
                    </button>
                </div>
                {notesData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <PlaceholderPattern className="w-full h-64" />
                        <p className="text-gray-500">No notes found. Create a new note to get started.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {notesData.map((note) => (
                            <div key={note.id} className="border border-gray-300 rounded-md p-4">
                                <h2 className="text-xl font-bold">{note.name}</h2>
                                <p>Description: {note.description}</p>
                                <p>Created At: {new Date(note.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                        onClick={() => window.location.href = `/notes/edit?note_id=${note.id}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                        onClick={() => deleteConfirmModal(note.id)}
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

GeneralNotes.layout = {
    breadcrumbs: [
        {
            title: 'Notes',
            href: general_notes(),
        },
    ],
};
