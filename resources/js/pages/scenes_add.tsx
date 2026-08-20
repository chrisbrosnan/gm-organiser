import { ResourceFormPage } from '@/components/resource-pages';
import { scenes } from '@/routes';

export default function ScenesAdd({ locations }: { locations: { id: number; name: string }[] }) {
    return (
        <ResourceFormPage
            title="Add Scene"
            action="/scenes"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Description', name: 'description', type: 'textarea' },
                { label: 'Location', name: 'location_id', type: 'select', options: locations.map(location => ({ label: location.name, value: String(location.id) })) },
                { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                { label: 'Attachments', name: 'attachments[]', type: 'file', multiple: true },
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
