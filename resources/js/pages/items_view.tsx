import { ResourceFormPage } from '@/components/resource-pages';
import { items } from '@/routes';

interface Item {
    id: number;
    name: string;
    type?: string | null;
    description?: string | null;
    meta_data?: {
        pc_characters?: { id: number }[];
        npc_characters?: { id: number }[];
        enemy_characters?: { id: number }[];
    } | null;
    effect?: string | null;
    thumbnail?: { attachment_path?: string } | null;
    user_id?: string | number;
}

export default function ItemsView({ auth, item, pc_characters, npc_characters, enemy_characters, bucketUrl }: { auth: { user: { id: string | number } }; item: Item, pc_characters: { id: number, name: string }[], npc_characters: { id: number, name: string }[], enemy_characters: { id: number, name: string }[], bucketUrl: string }) {
    if (auth?.user.id !== item?.user_id) {
        return (
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this item.</p>
            </div>
        );
    }

    return (
        <ResourceFormPage
            title={`Edit Item: ${item.name}`}
            action={`/items/${item.id}`}
            thumbnailPath={item.thumbnail?.attachment_path ? `${bucketUrl ?? ''}${item.thumbnail.attachment_path}` : undefined}
            fields={[
                { label: 'Name', name: 'name', type: 'text', value: item.name },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'select',
                    options: [
                        { label: 'Weapon', value: 'weapon' },
                        { label: 'Armor', value: 'armor' },
                        { label: 'Consumable', value: 'consumable' },
                        { label: 'Magic Item', value: 'magic' },
                        { label: 'Evidence', value: 'evidence' },
                        { label: 'Tool', value: 'tool' },
                        { label: 'Book', value: 'book' },
                        { label: 'Miscellaneous', value: 'misc' },
                    ],
                    value: item.type ?? '',
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: 'textarea',
                    value: item.description ?? '',
                },
                {
                    label: 'Effect',
                    name: 'effect',
                    type: 'text',
                    value: item.effect ?? '',
                },
                {
                    label: 'Player Characters',
                    name: 'player_characters[]',
                    type: 'checkbox',
                    options: pc_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: item?.meta_data?.pc_characters ?? [],
                },
                {
                    label: 'Non-Player Characters',
                    name: 'npc_characters[]',
                    type: 'checkbox',
                    options: npc_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: item?.meta_data?.npc_characters ?? [],
                },
                {
                    label: 'Enemy Characters',
                    name: 'enemy_characters[]',
                    type: 'checkbox',
                    options: enemy_characters.map(c => ({ label: c.name, value: c.id.toString() })),
                    preselected_values: item?.meta_data?.enemy_characters ?? [],
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

ItemsView.layout = {
    breadcrumbs: [
        {
            title: 'Items',
            href: items(),
        },
    ],
};
