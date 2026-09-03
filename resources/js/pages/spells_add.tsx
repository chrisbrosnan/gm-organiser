import { ResourceFormPage } from '@/components/resource-pages';
import { spells } from '@/routes';

export default function SpellsAdd({ pc_characters, npc_characters, enemy_characters }: { pc_characters: any[], npc_characters: any[], enemy_characters: any[] }) {
    return (
        <ResourceFormPage
            title="Add Spell"
            action="/spells"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Description', name: 'description', type: 'textarea' },
                {
                    label: 'Player Characters',
                    name: 'player_characters[]',
                    type: 'checkbox',
                    options: pc_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                },
                {
                    label: 'Non-Player Characters',
                    name: 'npc_characters[]',
                    type: 'checkbox',
                    options: npc_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                },
                {
                    label: 'Enemy Characters',
                    name: 'enemy_characters[]',
                    type: 'checkbox',
                    options: enemy_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                },
                { label: 'Thumbnail', name: 'thumbnail', type: 'file' },
                { label: 'Attachments', name: 'attachments[]', type: 'file', multiple: true },
            ]}
        />
    );
}

SpellsAdd.layout = {
    breadcrumbs: [
        {
            title: 'Spells',
            href: spells(),
        },
        {
            title: 'Add Spell',
            href: '',
        },
    ],
};
