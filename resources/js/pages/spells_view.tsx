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

    console.log(spell, 'Spell: ');

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
                    label: 'Player Characters',
                    name: 'pc_characters[]',
                    type: 'checkbox',
                    options: pc_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: spell?.meta_data?.pc_characters ?? [],
                },
                {
                    label: 'Non-Player Characters',
                    name: 'npc_characters[]',
                    type: 'checkbox',
                    options: npc_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: spell?.meta_data?.npc_characters ?? [],
                },
                {
                    label: 'Enemy Characters',
                    name: 'enemy_characters[]',
                    type: 'checkbox',
                    options: enemy_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: spell?.meta_data?.enemy_characters ?? [],
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
