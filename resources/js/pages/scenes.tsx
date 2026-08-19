import { ResourceIndexPage } from '@/components/resource-pages';
import { scenes } from '@/routes';

interface Scene {
    id: number;
    name: string;
    description?: string | null;
    location_id?: number | null;
    created_at: string;
}

export default function Scenes({ scenes: sceneList }: { scenes: Scene[] }) {
    return (
        <ResourceIndexPage
            title="Scenes"
            addLabel="Add Scene"
            addPath="/scenes/add"
            emptyMessage="No scenes found. Create a new scene to get started."
            cards={sceneList.map((scene) => ({
                id: scene.id,
                title: scene.name,
                description: scene.description ?? null,
                meta: [
                    scene.location_id
                        ? `Location ID: ${scene.location_id}`
                        : 'No location linked yet.',
                    `Created At: ${new Date(scene.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/scenes/${scene.id}`,
            }))}
        />
    );
}

Scenes.layout = {
    breadcrumbs: [
        {
            title: 'Scenes',
            href: scenes(),
        },
    ],
};
