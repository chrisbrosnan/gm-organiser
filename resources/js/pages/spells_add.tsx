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
                { label: 'PC Characters', name: 'pc_characters[]', type: 'select', multiple: true, options: pc_characters.map(c => ({ label: c.name, value: c.id })) },
                { label: 'NPC Characters', name: 'npc_characters[]', type: 'select', multiple: true, options: npc_characters.map(c => ({ label: c.name, value: c.id })) },
                { label: 'Enemy Characters', name: 'enemy_characters[]', type: 'select', multiple: true, options: enemy_characters.map(c => ({ label: c.name, value: c.id })) },
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
