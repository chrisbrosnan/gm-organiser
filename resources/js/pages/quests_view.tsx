import { ResourceFormPage } from '@/components/resource-pages';
import { quests } from '@/routes';

interface Quest {
    id: number;
    name: string;
    type?: string | null;
    description?: string | null;
}

export default function QuestsView({ quest }: { quest: Quest }) {
    return (
        <ResourceFormPage
            title={`Edit Quest: ${quest.name}`}
            action={`/quests/${quest.id}`}
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
                    type: 'text',
                    value: quest.type ?? '',
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: 'textarea',
                    value: quest.description ?? '',
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
