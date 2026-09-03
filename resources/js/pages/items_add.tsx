import { ResourceFormPage } from '@/components/resource-pages';
import { items } from '@/routes';

export default function ItemsAdd({ pc_characters, npc_characters, enemy_characters }: { pc_characters: { id: number, name: string }[], npc_characters: { id: number, name: string }[], enemy_characters: { id: number, name: string }[] }) {
    return (
        <ResourceFormPage
            title="Add Item"
            action="/items"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Type', name: 'type', type: 'select', options: [
                    { label: 'Weapon', value: 'weapon' },
                    { label: 'Armor', value: 'armor' },
                    { label: 'Consumable', value: 'consumable' },
                    { label: 'Magic Item', value: 'magic' },
                    { label: 'Evidence', value: 'evidence' },
                    { label: 'Tool', value: 'tool' },
                    { label: 'Book', value: 'book' },
                    { label: 'Miscellaneous', value: 'misc' },
                ] },
                { label: 'Description', name: 'description', type: 'textarea' },
                {
                    label: 'Player Characters',
                    name: 'pc_characters[]',
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

ItemsAdd.layout = {
    breadcrumbs: [
        {
            title: 'Items',
            href: items(),
        },
        {
            title: 'Add Item',
            href: '',
        },
    ],
};
