import { ResourceIndexPage } from '@/components/resource-pages';
import { spells } from '@/routes';

interface Spell {
    id: number;
    name: string;
    description?: string | null;
    created_at: string;
}

export default function Spells({ spells: spellList }: { spells: Spell[] }) {
    return (
        <ResourceIndexPage
            title="Spells"
            addLabel="Add Spell"
            addPath="/spells/add"
            emptyMessage="No spells found. Create a new spell to get started."
            cards={spellList.map((spell) => ({
                id: spell.id,
                title: spell.name,
                description: spell.description ?? null,
                meta: [
                    `Created At: ${new Date(spell.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/spells/${spell.id}`,
            }))}
        />
    );
}

Spells.layout = {
    breadcrumbs: [
        {
            title: 'Spells',
            href: spells(),
        },
    ],
};
