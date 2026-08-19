import { ResourceIndexPage } from '@/components/resource-pages';
import { general_notes } from '@/routes';

interface Note {
    id: number;
    title: string;
    content?: string | null;
    created_at: string;
}

export default function GeneralNotes({ notes }: { notes: Note[] }) {
    return (
        <ResourceIndexPage
            title="General Notes"
            addLabel="Add Note"
            addPath="/general-notes/add"
            emptyMessage="No notes found. Create a new note to get started."
            cards={notes.map((note) => ({
                id: note.id,
                title: note.title,
                description: note.content ?? null,
                meta: [
                    `Created At: ${new Date(note.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/general-notes/${note.id}`,
            }))}
        />
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
