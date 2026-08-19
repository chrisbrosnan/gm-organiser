import { ResourceIndexPage } from '@/components/resource-pages';
import { quests } from '@/routes';

interface Quest {
    id: number;
    name: string;
    type?: string | null;
    description?: string | null;
    created_at: string;
}

export default function Quests({ quests: questList }: { quests: Quest[] }) {
    return (
        <ResourceIndexPage
            title="Quests"
            addLabel="Add Quest"
            addPath="/quests/add"
            emptyMessage="No quests found. Create a new quest to get started."
            cards={questList.map((quest) => ({
                id: quest.id,
                title: quest.name,
                description: quest.description ?? null,
                meta: [
                    quest.type ? `Type: ${quest.type}` : 'No type set.',
                    `Created At: ${new Date(quest.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/quests/${quest.id}`,
            }))}
        />
    );
}

Quests.layout = {
    breadcrumbs: [
        {
            title: 'Quests',
            href: quests(),
        },
    ],
};
