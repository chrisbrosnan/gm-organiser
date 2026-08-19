import { ResourceFormPage } from '@/components/resource-pages';
import { scenes } from '@/routes';

interface Scene {
    id: number;
    name: string;
    description?: string | null;
    location_id?: number | null;
}

export default function ScenesView({ scene }: { scene: Scene }) {
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
                    label: 'Location ID',
                    name: 'location_id',
                    type: 'number',
                    value: scene.location_id ? String(scene.location_id) : '',
                },
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
