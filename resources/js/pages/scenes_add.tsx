import { ResourceFormPage } from '@/components/resource-pages';
import { scenes } from '@/routes';

export default function ScenesAdd() {
    return (
        <ResourceFormPage
            title="Add Scene"
            action="/scenes"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Description', name: 'description', type: 'textarea' },
                { label: 'Location ID', name: 'location_id', type: 'number' },
            ]}
        />
    );
}

ScenesAdd.layout = {
    breadcrumbs: [
        {
            title: 'Scenes',
            href: scenes(),
        },
        {
            title: 'Add Scene',
            href: '',
        },
    ],
};
