import { ResourceFormPage } from '@/components/resource-pages';
import { items } from '@/routes';

export default function ItemsAdd() {
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
