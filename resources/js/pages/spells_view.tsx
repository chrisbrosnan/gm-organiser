import { ResourceFormPage } from '@/components/resource-pages';
import { spells } from '@/routes';

interface Spell {
    id: number;
    name: string;
    description?: string | null;
    meta_data?: {
        pc_characters?: { id: number }[];
        npc_characters?: { id: number }[];
        enemy_characters?: { id: number }[];
    } | null;
    thumbnail?: { attachment_path?: string } | null;
}

export default function SpellsView({ spell, pc_characters, npc_characters, enemy_characters }: { spell: Spell, pc_characters: any[], npc_characters: any[], enemy_characters: any[] }) {
    return (
        <ResourceFormPage
            title={`Edit Spell: ${spell.name}`}
            action={`/spells/${spell.id}`}
            thumbnailPath={spell.thumbnail?.attachment_path}
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
                {
                    label: 'PC Characters',
                    name: 'pc_characters[]',
                    type: 'select',
                    multiple: true,
                    options: pc_characters.map(c => ({ label: c.name, value: c.id })),
                    preselected_values: spell?.meta_data?.pc_characters?.map(c => c.id) ?? [],
                },
                {
                    label: 'NPC Characters',
                    name: 'npc_characters[]',
                    type: 'select',
                    multiple: true,
                    options: npc_characters.map(c => ({ label: c.name, value: c.id })),
                    preselected_values: spell?.meta_data?.npc_characters?.map(c => c.id) ?? [],
                },
                {
                    label: 'Enemy Characters',
                    name: 'enemy_characters[]',
                    type: 'select',
                    multiple: true,
                    options: enemy_characters.map(c => ({ label: c.name, value: c.id })),
                    preselected_values: spell?.meta_data?.enemy_characters?.map(c => c.id) ?? [],
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

SpellsView.layout = {
    breadcrumbs: [
        {
            title: 'Spells',
            href: spells(),
        },
    ],
};
