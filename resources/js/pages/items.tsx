import { ResourceIndexPage } from '@/components/resource-pages';
import { items } from '@/routes';

interface Item {
    id: number;
    name: string;
    type?: string | null;
    description?: string | null;
    created_at: string;
}

export default function Items({ items: itemList }: { items: Item[] }) {
    return (
        <ResourceIndexPage
            title="Items"
            addLabel="Add Item"
            addPath="/items/add"
            emptyMessage="No items found. Create a new item to get started."
            cards={itemList.map((item) => ({
                id: item.id,
                title: item.name,
                description: item.description ?? null,
                meta: [
                    item.type ? `Type: ${item.type}` : 'No type set.',
                    `Created At: ${new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
                ],
                editPath: `/items/${item.id}`,
            }))}
        />
    );
}

Items.layout = {
    breadcrumbs: [
        {
            title: 'Items',
            href: items(),
        },
    ],
};
