import { ResourceFormPage } from '@/components/resource-pages';
import { general_notes } from '@/routes';

export default function GeneralNotesAdd() {
    return (
        <ResourceFormPage
            title="Add Note"
            action="/general-notes"
            fields={[
                { label: 'Summary', name: 'title', type: 'text' },
                { label: 'Content', name: 'content', type: 'textarea' },
            ]}
        />
    );
}

GeneralNotesAdd.layout = {
    breadcrumbs: [
        {
            title: 'General Notes',
            href: general_notes(),
        },
    ],
};
