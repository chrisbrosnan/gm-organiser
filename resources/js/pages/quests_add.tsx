import { ResourceFormPage } from '@/components/resource-pages';
import { quests } from '@/routes';

export default function QuestsAdd() {
    return (
        <ResourceFormPage
            title="Add Quest"
            action="/quests"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Type', name: 'type', type: 'text' },
                { label: 'Description', name: 'description', type: 'textarea' },
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
