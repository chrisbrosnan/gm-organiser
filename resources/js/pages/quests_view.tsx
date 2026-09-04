import { ResourceFormPage } from '@/components/resource-pages';
import { quests } from '@/routes';

interface Quest {
    id: number;
    name: string;
    type?: string | null;
    description?: string | null;
    thumbnail?: { attachment_path?: string } | null;
    user_id?: string | number;
}

export default function QuestsView({ auth, quest, bucketUrl }: { auth: { user: { id: string | number } }; quest: Quest; bucketUrl: string }) {
    if (auth?.user.id !== quest?.user_id) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this quest.</p>
            </div>
        );
    }

    return (
        <ResourceFormPage
            title={`Edit Quest: ${quest.name}`}
            action={`/quests/${quest.id}`}
            thumbnailPath={quest.thumbnail?.attachment_path ? `${bucketUrl ?? ''}${quest.thumbnail.attachment_path}` : undefined}
            fields={[
                {
                    label: 'Name',
                    name: 'name',
                    type: 'text',
                    value: quest.name,
                },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'select',
                    options: [
                        { label: 'Main Quest', value: 'main' },
                        { label: 'Side Quest', value: 'side' },
                        { label: 'Miscellaneous', value: 'misc' },
                    ],
                    value: quest.type ?? '',
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: 'textarea',
                    value: quest.description ?? '',
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

QuestsView.layout = {
    breadcrumbs: [
        {
            title: 'Quests',
            href: quests(),
        },
    ],
};
