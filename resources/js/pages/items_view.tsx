import { ResourceFormPage } from '@/components/resource-pages';
import { items } from '@/routes';

interface Item {
    id: number;
    name: string;
    type?: string | null;
    description?: string | null;
}

export default function ItemsView({ item }: { item: Item }) {
    return (
        <ResourceFormPage
            title={`Edit Item: ${item.name}`}
            action={`/items/${item.id}`}
            fields={[
                { label: 'Name', name: 'name', type: 'text', value: item.name },
                {
                    label: 'Type',
                    name: 'type',
                    type: 'text',
                    value: item.type ?? '',
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: 'textarea',
                    value: item.description ?? '',
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
