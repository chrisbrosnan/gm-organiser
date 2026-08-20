import { ResourceFormPage } from '@/components/resource-pages';
import { spells } from '@/routes';

export default function SpellsAdd() {
    return (
        <ResourceFormPage
            title="Add Spell"
            action="/spells"
            fields={[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Description', name: 'description', type: 'textarea' },
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
