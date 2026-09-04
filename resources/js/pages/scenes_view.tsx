import { ResourceFormPage } from '@/components/resource-pages';
import { scenes } from '@/routes';

interface Scene {
    id: number;
    name: string;
    description?: string | null;
    location_id?: number | null;
    thumbnail?: { attachment_path?: string } | null;
    user_id?: string | number;
}

export default function ScenesView({
    auth,
    scene,
    locations,
    bucketUrl,
}: {
    auth: { user: { id: string | number } };
    scene: Scene;
    locations: { id: number; name: string }[];
    bucketUrl: string;
}) {

    if (auth?.user.id !== scene?.user_id) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this scene.</p>
            </div>
        );
    }

    return (
        <ResourceFormPage
            title={`Edit Scene: ${scene.name}`}
            action={`/scenes/${scene.id}`}
            thumbnailPath={scene.thumbnail?.attachment_path ? `${bucketUrl ?? ''}${scene.thumbnail.attachment_path}` : undefined}
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
                    options: locations.map((location) => ({
                        label: location.name,
                        value: String(location.id),
                    })),
                    value: scene.location_id ? String(scene.location_id) : '',
                },
                { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                {
                    label: 'Attachments',
                    name: 'attachments[]',
                    type: 'file',
                    multiple: true,
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
