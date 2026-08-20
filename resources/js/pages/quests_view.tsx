import { ResourceFormPage } from '@/components/resource-pages';
import { quests } from '@/routes';

interface Quest {
    id: number;
    name: string;
    type?: string | null;
    description?: string | null;
    thumbnail?: { attachment_path?: string } | null;
}

export default function QuestsView({ quest }: { quest: Quest }) {
    return (
        <ResourceFormPage
            title={`Edit Quest: ${quest.name}`}
            action={`/quests/${quest.id}`}
            thumbnailPath={quest.thumbnail?.attachment_path}
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
