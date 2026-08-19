import { ResourceFormPage } from '@/components/resource-pages';
import { items } from '@/routes';

export default function ItemsAdd() {
    return (
        <ResourceFormPage
            title="Add Item"
            action="/items"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Type', name: 'type', type: 'text' },
                { label: 'Description', name: 'description', type: 'textarea' },
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
