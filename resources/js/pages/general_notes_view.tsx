import { ResourceFormPage } from '@/components/resource-pages';
import { general_notes } from '@/routes';

interface Note {
    id: number;
    title: string;
    content?: string | null;
    user_id?: string | number;
}

export default function GeneralNotesView({ auth, note }: { auth: { user: { id: string | number } }; note: Note }) {
    if (auth?.user.id !== note?.user_id) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this note.</p>
            </div>
        );
    }
    return (
        <ResourceFormPage
            title={`Edit Note: ${note.title}`}
            action={`/general-notes/${note.id}`}
            fields={[
                {
                    label: 'Summary',
                    name: 'title',
                    type: 'text',
                    value: note.title,
                },
                {
                    label: 'Content',
                    name: 'content',
                    type: 'textarea',
                    value: note.content ?? '',
                },
            ]}
        />
    );
}

GeneralNotesView.layout = {
    breadcrumbs: [
        {
            title: 'General Notes',
            href: general_notes(),
        },
    ],
};
