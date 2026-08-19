import { ResourceFormPage } from '@/components/resource-pages';
import { general_notes } from '@/routes';

interface Note {
    id: number;
    title: string;
    content?: string | null;
}

export default function GeneralNotesView({ note }: { note: Note }) {
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
