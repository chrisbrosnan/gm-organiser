import { ResourceFormPage } from '@/components/resource-pages';
import { quests } from '@/routes';

export default function QuestsAdd() {
    return (
        <ResourceFormPage
            title="Add Quest"
            action="/quests"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Type', name: 'type', type: 'select', options: [
                    { label: 'Main Quest', value: 'main' },
                    { label: 'Side Quest', value: 'side' },
                    { label: 'Miscellaneous', value: 'misc' },
                ] },
                { label: 'Description', name: 'description', type: 'textarea' },
                { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                { label: 'Attachments', name: 'attachments[]', type: 'file', multiple: true },
            ]}
        />
    );
}

QuestsAdd.layout = {
    breadcrumbs: [
        {
            title: 'Quests',
            href: quests(),
        },
        {
            title: 'Add Quest',
            href: '',
        },
    ],
};
