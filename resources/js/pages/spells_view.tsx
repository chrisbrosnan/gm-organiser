import { ResourceFormPage } from '@/components/resource-pages';
import { spells } from '@/routes';

interface Spell {
    id: number;
    name: string;
    description?: string | null;
}

export default function SpellsView({ spell }: { spell: Spell }) {
    return (
        <ResourceFormPage
            title={`Edit Spell: ${spell.name}`}
            action={`/spells/${spell.id}`}
            fields={[
                {
                    label: 'Name',
                    name: 'name',
                    type: 'text',
                    value: spell.name,
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: 'textarea',
                    value: spell.description ?? '',
                },
                { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                { label: 'Attachments', name: 'attachments[]', type: 'file', multiple: true },
            ]}
        />
    );
}

SpellsView.layout = {
    breadcrumbs: [
        {
            title: 'Spells',
            href: spells(),
        },
    ],
};
