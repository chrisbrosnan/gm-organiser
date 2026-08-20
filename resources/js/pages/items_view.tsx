import { ResourceFormPage } from '@/components/resource-pages';
import { items } from '@/routes';

interface Item {
    id: number;
    name: string;
    type?: string | null;
    description?: string | null;
    thumbnail?: { attachment_path?: string } | null;
}

export default function ItemsView({ item }: { item: Item }) {
    return (
        <ResourceFormPage
            title={`Edit Item: ${item.name}`}
            action={`/items/${item.id}`}
            thumbnailPath={item.thumbnail?.attachment_path}
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
