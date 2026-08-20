import { ResourceFormPage } from '@/components/resource-pages';
import { scenes } from '@/routes';

interface Scene {
    id: number;
    name: string;
    description?: string | null;
    location_id?: number | null;
}

export default function ScenesView({ scene, locations }: { scene: Scene, locations: { id: number; name: string }[] }) {
    return (
        <ResourceFormPage
            title={`Edit Scene: ${scene.name}`}
            action={`/scenes/${scene.id}`}
            fields={[
                {
                    label: 'Name',
                    name: 'name',
                    type: 'text',
                    value: scene.name,
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: 'textarea',
                    value: scene.description ?? '',
                },
                {
                    label: 'Location',
                    name: 'location_id',
                    type: 'select',
                    options: locations.map(location => ({ label: location.name, value: String(location.id) })),
                    value: scene.location_id ? String(scene.location_id) : '',
                },
                { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                { label: 'Attachments', name: 'attachments[]', type: 'file', multiple: true },
            ]}
        />
    );
}

ScenesView.layout = {
    breadcrumbs: [
        {
            title: 'Scenes',
            href: scenes(),
        },
    ],
};
